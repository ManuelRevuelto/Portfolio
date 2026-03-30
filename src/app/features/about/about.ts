import { Component, inject } from '@angular/core';
import { TagBadge } from '../../shared/components/tag-badge/tag-badge';
import { AnimatedEntry } from '../../shared/directives/animated-entry.directive';
import { SeoService } from '../../core/services/seo.service';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-about',
  imports: [TagBadge, AnimatedEntry],
  templateUrl: './about.html'
})
export class About {
  readonly profileService = inject(ProfileService);

  constructor(seo: SeoService) {
    seo.setPage({
      title: 'Sobre mí',
      description: 'Conoce más sobre Manuel Revuelto: desarrollador de software especializado en Angular, TypeScript y tecnologías web modernas.',
      url: '/about'
    });

    this.profileService.loadProfile().subscribe();
  }

}
