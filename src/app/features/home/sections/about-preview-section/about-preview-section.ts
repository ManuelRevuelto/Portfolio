import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimatedEntry } from '../../../../shared/directives/animated-entry.directive';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { TagBadge } from '../../../../shared/components/tag-badge/tag-badge';

@Component({
  selector: 'app-about-preview-section',
  imports: [RouterLink, AnimatedEntry, SectionHeader, TagBadge],
  templateUrl: './about-preview-section.html'
})
export class AboutPreviewSection {
  readonly techs = ['Angular', 'TypeScript', 'RxJS', 'Node.js', 'MySQL', 'Docker', 'Tailwind', 'Git'];

  readonly stats = [
    { value: '4+', label: 'Años de experiencia' },
    { value: '20+', label: 'Proyectos completados' },
    { value: '3', label: 'Tecnologías principales' },
    { value: '100%', label: 'Compromiso con el código' },
  ];
}
