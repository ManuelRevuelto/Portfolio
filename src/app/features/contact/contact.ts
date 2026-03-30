import { Component } from '@angular/core';
import { ContactSection } from '../home/sections/contact-section/contact-section';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [ContactSection],
  templateUrl: './contact.html'
})
export class Contact {
  constructor(seo: SeoService) {
    seo.setPage({
      title: 'Contacto',
      description: 'Ponte en contacto con Manuel Revuelto para colaboraciones, proyectos o simplemente para saludar.',
      url: '/contact'
    });
  }
}
