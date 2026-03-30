import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ContentService } from '../../core/services/content.service';
import { Project } from '../../core/models/project.model';
import { ProjectModal } from './project-modal/project-modal';
import { TagBadge } from '../../shared/components/tag-badge/tag-badge';
import { AnimatedEntry } from '../../shared/directives/animated-entry.directive';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-projects',
  imports: [TagBadge, AnimatedEntry],
  templateUrl: './projects.html'
})
export class Projects implements OnInit {
  readonly contentService = inject(ContentService);
  private dialog = inject(Dialog);

  selectedTag = signal<string | null>(null);

  readonly allTags = computed(() => {
    const tags = new Set<string>();
    this.contentService.projects().forEach(p => p.tags.forEach(t => tags.add(t)));
    return [...tags].sort();
  });

  readonly filteredProjects = computed(() => {
    const tag = this.selectedTag();
    return tag
      ? this.contentService.projects().filter(p => p.tags.includes(tag))
      : this.contentService.projects();
  });

  constructor(seo: SeoService) {
    seo.setPage({
      title: 'Proyectos',
      description: 'Explora los proyectos de Manuel Revuelto: aplicaciones web, herramientas y más.',
      url: '/projects'
    });
  }

  ngOnInit(): void {
    this.contentService.loadProjects().subscribe();
  }

  openModal(project: Project): void {
    this.dialog.open(ProjectModal, {
      data: project,
      maxWidth: '90vw',
      panelClass: 'project-dialog-panel',
    });
  }
}
