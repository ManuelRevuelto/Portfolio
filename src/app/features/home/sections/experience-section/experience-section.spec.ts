import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ExperienceSection } from './experience-section';

describe('ExperienceSection', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceSection],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ExperienceSection);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have work items', () => {
    const fixture = TestBed.createComponent(ExperienceSection);
    expect(fixture.componentInstance.workItems.length).toBeGreaterThan(0);
  });

  it('should have education items', () => {
    const fixture = TestBed.createComponent(ExperienceSection);
    expect(fixture.componentInstance.educationItems.length).toBeGreaterThan(0);
  });

  it('should render work experience section', () => {
    const fixture = TestBed.createComponent(ExperienceSection);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Experiencia laboral');
  });

  it('should render education section', () => {
    const fixture = TestBed.createComponent(ExperienceSection);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Formación');
  });
});
