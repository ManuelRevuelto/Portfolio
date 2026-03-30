import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { AboutPreviewSection } from './about-preview-section';

describe('AboutPreviewSection', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPreviewSection],
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AboutPreviewSection);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render techs', () => {
    const fixture = TestBed.createComponent(AboutPreviewSection);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
    expect(fixture.nativeElement.textContent).toContain('TypeScript');
  });

  it('should render stats', () => {
    const fixture = TestBed.createComponent(AboutPreviewSection);
    fixture.detectChanges();
    const stats = fixture.componentInstance.stats;
    expect(stats.length).toBe(4);
    expect(fixture.nativeElement.textContent).toContain('4+');
  });

  it('should have "Leer más sobre mí" link', () => {
    const fixture = TestBed.createComponent(AboutPreviewSection);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Leer más sobre mí');
  });
});
