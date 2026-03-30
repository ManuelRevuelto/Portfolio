import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BlogPost } from '../models/blog-post.model';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SITE_NAME = 'Manuel Revuelto';
const DEFAULT_IMAGE = '/images/og-image.jpg';
const SITE_URL = 'https://manuelrevuelto.com';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);

  setPage(config: SeoConfig): void {
    const fullTitle = `${config.title} — ${SITE_NAME}`;
    const image = config.image ?? DEFAULT_IMAGE;
    const url = config.url ? `${SITE_URL}${config.url}` : SITE_URL;
    const type = config.type ?? 'website';

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

  setArticle(post: BlogPost): void {
    this.setPage({
      title: post.title,
      description: post.excerpt,
      image: post.coverImage,
      url: `/blog/${post.slug}`,
      type: 'article'
    });
    this.meta.updateTag({ name: 'article:published_time', content: post.date });
    this.meta.updateTag({ name: 'article:tag', content: post.tags.join(', ') });
  }
}
