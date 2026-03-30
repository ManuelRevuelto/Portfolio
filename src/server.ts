import 'dotenv/config';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import matter from 'gray-matter';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';

const __dirname = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = join(__dirname, '../browser');
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env['MAILGUN_API_KEY'] || '',
});
// Content directory resolution:
// 1. Vercel serverless: content/ is copied next to server.mjs
// 2. Local production: content/ is in browser/content/
// 3. Local development (ng serve): fall back to project root content/
const CONTENT_DIR = existsSync(join(__dirname, 'content'))
  ? join(__dirname, 'content')
  : existsSync(join(browserDistFolder, 'content'))
    ? join(browserDistFolder, 'content')
    : join(process.cwd(), 'content');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

// ─── Serve static files from /browser (FIRST, before API/SSR) ──────────────────
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// ─── API: Get public configuration ──────────────────────────────────────────
app.get('/api/config', (_req, res) => {
  res.json({
    recaptchaSiteKey: process.env['RECAPTCHA_SITE_KEY'] || '',
  });
});

// ─── API: Profile data ──────────────────────────────────────────────────────
app.get('/api/profile', (_req, res) => {
  try {
    const filePath = join(CONTENT_DIR, 'profile', 'profile.json');
    if (!existsSync(filePath)) { res.status(404).json({ error: 'Profile not found' }); return; }

    const raw = readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(raw));
  } catch (err) {
    console.error('[API /api/profile]', err);
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

// ─── Helper: calculate reading time ─────────────────────────────────────────
function readingTime(text: string): number {
  return Math.ceil(text.split(/\s+/).filter(Boolean).length / 200);
}

// ─── API: Blog listing ───────────────────────────────────────────────────────
app.get('/api/blog', (_req, res) => {
  try {
    const dir = join(CONTENT_DIR, 'blog');
    if (!existsSync(dir)) { res.json([]); return; }

    const files = readdirSync(dir).filter(f => f.endsWith('.md'));
    const posts = files.map(file => {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        ...data,
        slug: file.replace('.md', ''),
        readingTimeMinutes: readingTime(content),
      };
    });

    posts.sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
      new Date(b['date'] as string).getTime() - new Date(a['date'] as string).getTime()
    );

    res.json(posts);
  } catch (err) {
    console.error('[API /api/blog]', err);
    res.status(500).json({ error: 'Failed to load blog posts' });
  }
});

// ─── API: Single blog post ───────────────────────────────────────────────────
app.get('/api/blog/:slug', (req, res) => {
  try {
    const filePath = join(CONTENT_DIR, 'blog', `${req.params['slug']}.md`);
    if (!existsSync(filePath)) { res.status(404).json({ error: 'Post not found' }); return; }

    const raw = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    res.json({
      ...data,
      slug: req.params['slug'],
      content,
      readingTimeMinutes: readingTime(content),
    });
  } catch (err) {
    console.error('[API /api/blog/:slug]', err);
    res.status(500).json({ error: 'Failed to load post' });
  }
});

// ─── API: Projects listing ───────────────────────────────────────────────────
app.get('/api/projects', (_req, res) => {
  try {
    const dir = join(CONTENT_DIR, 'projects');
    if (!existsSync(dir)) { res.json([]); return; }

    const files = readdirSync(dir).filter(f => f.endsWith('.md'));
    const projects = files.map(file => {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        ...data,
        slug: file.replace('.md', ''),
        content,
      };
    });

    projects.sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
      ((a['order'] as number) ?? 99) - ((b['order'] as number) ?? 99)
    );

    res.json(projects);
  } catch (err) {
    console.error('[API /api/projects]', err);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// ─── Helper: Validate reCAPTCHA token ──────────────────────────────────────
async function validateRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  try {
    const secretKey = process.env['RECAPTCHA_SECRET_KEY'];
    if (!secretKey) {
      console.warn('[reCAPTCHA] Secret key not configured');
      return { success: true, score: 0.5 }; // Allow if not configured (dev mode)
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = (await response.json()) as { success: boolean; score: number };
    return { success: data.success, score: data.score };
  } catch (err) {
    console.error('[reCAPTCHA validation error]', err);
    return { success: false, score: 0 };
  }
}

// ─── API: Contact form submission ────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, recaptchaToken } = req.body;

    // Validation
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Validate reCAPTCHA
    if (recaptchaToken) {
      const captchaResult = await validateRecaptcha(recaptchaToken);
      if (!captchaResult.success || captchaResult.score < 0.5) {
        console.warn('[API /api/contact] reCAPTCHA validation failed', {
          success: captchaResult.success,
          score: captchaResult.score,
        });
        res.status(403).json({ error: 'reCAPTCHA validation failed' });
        return;
      }
    }

    const domain = process.env['MAILGUN_DOMAIN'] || '';
    if (!domain) {
      console.error('[API /api/contact] MAILGUN_DOMAIN not configured');
      res.status(500).json({ error: 'Email service not configured' });
      return;
    }

    const result = await mg.messages.create(domain, {
      from: `${name} <${process.env['MAILGUN_FROM_EMAIL'] || 'noreply@manuelrevuelto.com'}>`,
      to: process.env['MAILGUN_TO_EMAIL'] || 'manu.revuelto1111@gmail.com',
      subject: `New contact form submission from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      'h:Reply-To': email,
    });

    res.json({ success: true, id: result.id });
  } catch (err) {
    console.error('[API /api/contact]', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// ─── Angular SSR handler ─────────────────────────────────────────────────────
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then(response =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// ─── Start server ─────────────────────────────────────────────────────────────
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error?: Error) => {
    if (error) throw error;
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
export default reqHandler;
