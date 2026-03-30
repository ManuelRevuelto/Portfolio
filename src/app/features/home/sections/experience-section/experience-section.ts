import { Component, inject } from '@angular/core';
import { AnimatedEntry } from '../../../../shared/directives/animated-entry.directive';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { ProfileService } from '../../../../core/services/profile.service';

@Component({
  selector: 'app-experience-section',
  imports: [AnimatedEntry, SectionHeader],
  templateUrl: './experience-section.html'
})
export class ExperienceSection {
  readonly profileService = inject(ProfileService);

  constructor() {
    this.profileService.loadProfile().subscribe();
  }
}
