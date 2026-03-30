import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../../core/models/blog-post.model';
import { TagBadge } from '../../../shared/components/tag-badge/tag-badge';
import { ReadingTimePipe } from '../../../shared/pipes/reading-time.pipe';

@Component({
  selector: 'app-blog-card',
  imports: [RouterLink, TagBadge, ReadingTimePipe],
  templateUrl: './blog-card.html'
})
export class BlogCard {
  post = input.required<BlogPost>();

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
