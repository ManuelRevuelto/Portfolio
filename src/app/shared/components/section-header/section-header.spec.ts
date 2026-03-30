import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SectionHeader } from './section-header';

@Component({
  imports: [SectionHeader],
  template: `
    <app-section-header
      [eyebrow]="eyebrow"
      [title]="title"
      [subtitle]="subtitle"
    />
  `
})
class TestHostComponent {
  eyebrow = '// test';
  title = 'Test Title';
  subtitle = '';
}

describe('SectionHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-section-header')).toBeTruthy();
  });

  it('should render eyebrow text', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('// test');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Test Title');
  });

  it('should not render subtitle when empty', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.subtitle = '';
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p.mt-3');
    expect(p).toBeNull();
  });

  it('should render subtitle when provided', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.subtitle = 'Test subtitle';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Test subtitle');
  });
});
