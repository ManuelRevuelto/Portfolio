import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.html'
})
export class SectionHeader {
  eyebrow = input.required<string>();
  title = input.required<string>();
  subtitle = input<string>('');
}
