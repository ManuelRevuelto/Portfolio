import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tag-badge',
  templateUrl: './tag-badge.html'
})
export class TagBadge {
  label = input.required<string>();
  variant = input<'accent' | 'secondary'>('accent');
}
