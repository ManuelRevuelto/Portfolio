import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../../core/services/content.service';
import { AnimatedEntry } from '../../../../shared/directives/animated-entry.directive';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { TagBadge } from '../../../../shared/components/tag-badge/tag-badge';

@Component({
  selector: 'app-featured-projects-section',
  imports: [RouterLink, AnimatedEntry, SectionHeader, TagBadge],
  templateUrl: './featured-projects-section.html'
})
export class FeaturedProjectsSection implements OnInit {
  readonly contentService = inject(ContentService);

  ngOnInit(): void {
    this.contentService.loadProjects().subscribe();
  }
}
