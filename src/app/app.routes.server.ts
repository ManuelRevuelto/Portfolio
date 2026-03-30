import { RenderMode, ServerRoute } from '@angular/ssr';
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const serverRoutes: ServerRoute[] = [
  { path: '',         renderMode: RenderMode.Prerender },
  { path: 'about',    renderMode: RenderMode.Prerender },
  { path: 'projects', renderMode: RenderMode.Prerender },
  { path: 'blog',     renderMode: RenderMode.Prerender },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const contentDir = join(process.cwd(), 'content', 'blog');
      if (!existsSync(contentDir)) return [];
      const files = readdirSync(contentDir).filter(f => f.endsWith('.md'));
      return files.map(f => ({ slug: f.replace('.md', '') }));
    }
  },
  { path: 'contact',  renderMode: RenderMode.Prerender },
  { path: '**',       renderMode: RenderMode.Client }
];
