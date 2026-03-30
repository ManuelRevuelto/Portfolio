import { cpSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist/manuelrevuelto.com';
const OUT = '.vercel/output';

// Create directory structure
mkdirSync(join(OUT, 'static'), { recursive: true });
mkdirSync(join(OUT, 'functions', 'ssr.func'), { recursive: true });

// 1. Browser files → static (served by Vercel CDN)
cpSync(join(DIST, 'browser'), join(OUT, 'static'), { recursive: true });

// 2. Server files → serverless function
cpSync(join(DIST, 'server'), join(OUT, 'functions', 'ssr.func'), { recursive: true });

// 3. Content directory → function (needed by API endpoints)
const contentSrc = join(DIST, 'browser', 'content');
if (existsSync(contentSrc)) {
  cpSync(contentSrc, join(OUT, 'functions', 'ssr.func', 'content'), { recursive: true });
}

// 4. Function config
writeFileSync(
  join(OUT, 'functions', 'ssr.func', '.vc-config.json'),
  JSON.stringify({
    runtime: 'nodejs22.x',
    handler: 'server.mjs',
    launcherType: 'Nodejs',
    maxDuration: 30,
  })
);

// 5. ESM support
writeFileSync(
  join(OUT, 'functions', 'ssr.func', 'package.json'),
  JSON.stringify({ type: 'module' })
);

// 6. Routing: static files first, then SSR function for everything else
writeFileSync(
  join(OUT, 'config.json'),
  JSON.stringify({
    version: 3,
    routes: [
      { src: '/api/(.*)', dest: '/ssr' },
      { handle: 'filesystem' },
      { src: '/(.*)', dest: '/ssr' },
    ],
  })
);

console.log('Vercel Build Output API structure created');
