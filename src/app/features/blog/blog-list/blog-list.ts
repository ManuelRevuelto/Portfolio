import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { BlogCard } from '../blog-card/blog-card';
import { AnimatedEntry } from '../../../shared/directives/animated-entry.directive';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-blog-list',
  imports: [BlogCard, AnimatedEntry],
  templateUrl: './blog-list.html'
})
export class BlogList implements OnInit {
  readonly contentService = inject(ContentService);

  selectedTag = signal<string | null>(null);

  readonly allTags = computed(() => {
    const tags = new Set<string>();
    this.contentService.posts().forEach(p => p.tags.forEach(t => tags.add(t)));
    return [...tags].sort();
  });

  readonly filteredPosts = computed(() => {
    const tag = this.selectedTag();
    return tag
      ? this.contentService.posts().filter(p => p.tags.includes(tag))
      : this.contentService.posts();
  });

  constructor(seo: SeoService) {
    seo.setPage({
      title: 'Blog',
      description: 'Artículos sobre Angular, TypeScript, desarrollo web y buenas prácticas de programación por Manuel Revuelto.',
      url: '/blog'
    });
  }

  ngOnInit(): void {
    this.contentService.loadPosts().subscribe();
  }
}
