import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { HeroSection } from './hero-section';

describe('HeroSection', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSection],
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeroSection);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render name', () => {
    const fixture = TestBed.createComponent(HeroSection);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Manuel Revuelto');
  });

  it('should show initial title via signal', () => {
    const fixture = TestBed.createComponent(HeroSection);
    fixture.detectChanges();
    expect(fixture.componentInstance.displayedTitle).toBeDefined();
  });

  it('should clean up timer on destroy', () => {
    const fixture = TestBed.createComponent(HeroSection);
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });
});

describe('HeroSection on server', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSection],
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();
  });

  it('should set first title on server without typewriter', () => {
    const fixture = TestBed.createComponent(HeroSection);
    fixture.detectChanges();
    expect(fixture.componentInstance.displayedTitle()).toBe('Software Developer');
  });
});
