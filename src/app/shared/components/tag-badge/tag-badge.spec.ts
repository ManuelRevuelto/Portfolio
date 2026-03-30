import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TagBadge } from './tag-badge';

@Component({
  imports: [TagBadge],
  template: `<app-tag-badge [label]="label" [variant]="variant" />`
})
class TestHostComponent {
  label = 'Angular';
  variant: 'accent' | 'secondary' = 'accent';
}

describe('TagBadge', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('app-tag-badge');
    expect(el).toBeTruthy();
  });

  it('should render the label', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
  });

  it('should apply accent class when variant is accent', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.variant = 'accent';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList.contains('tag')).toBe(true);
  });

  it('should apply secondary class when variant is secondary', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.variant = 'secondary';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList.contains('tag-secondary')).toBe(true);
  });
});
