import { Component } from '@angular/core';
import { HeroSection } from './sections/hero-section/hero-section';
import { AboutPreviewSection } from './sections/about-preview-section/about-preview-section';
import { FeaturedProjectsSection } from './sections/featured-projects-section/featured-projects-section';
import { ExperienceSection } from './sections/experience-section/experience-section';
import { ContactSection } from './sections/contact-section/contact-section';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [HeroSection, AboutPreviewSection, FeaturedProjectsSection, ExperienceSection, ContactSection],
  templateUrl: './home.html'
})
export class Home {
  constructor(seo: SeoService) {
    seo.setPage({
      title: 'Manuel Revuelto — Software Developer',
      description: 'Portfolio de Manuel Revuelto, desarrollador de software especializado en Angular y tecnologías web modernas.',
      type: 'website'
    });
  }
}
