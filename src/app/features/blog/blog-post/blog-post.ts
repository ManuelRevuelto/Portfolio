import { Component, inject, input, OnInit, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { ContentService } from '../../../core/services/content.service';
import { SeoService } from '../../../core/services/seo.service';
import { TagBadge } from '../../../shared/components/tag-badge/tag-badge';
import { ReadingTimePipe } from '../../../shared/pipes/reading-time.pipe';

// Giscus config — replace with your real values
const GISCUS_REPO = 'manuelrevuelto/portfolio';
const GISCUS_REPO_ID = 'R_XXXXXXXX';
const GISCUS_CATEGORY = 'Announcements';
const GISCUS_CATEGORY_ID = 'DIC_XXXXXXXX';

@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, MarkdownComponent, TagBadge, ReadingTimePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './blog-post.html'
})
export class BlogPost implements OnInit {
  // Bound from :slug route param via withComponentInputBinding()
  slug = input.required<string>();

  readonly contentService = inject(ContentService);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.contentService.getPostBySlug(this.slug()).subscribe(post => {
      this.seo.setArticle(post);
      if (isPlatformBrowser(this.platformId)) {
        this.loadGiscus();
      }
    });
  }

  private loadGiscus(): void {
    const container = document.getElementById('giscus-container');
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS_REPO);
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', GISCUS_CATEGORY);
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'dark_dimmed');
    script.setAttribute('data-lang', 'es');
    script.crossOrigin = 'anonymous';
    script.async = true;

    container.appendChild(script);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
