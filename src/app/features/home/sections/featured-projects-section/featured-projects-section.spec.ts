import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { FeaturedProjectsSection } from './featured-projects-section';
import { ContentService } from '../../../../core/services/content.service';

describe('FeaturedProjectsSection', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedProjectsSection],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FeaturedProjectsSection);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show loading state when no projects', () => {
    const fixture = TestBed.createComponent(FeaturedProjectsSection);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Cargando proyectos');
  });

  it('should render featured projects from ContentService', () => {
    const fixture = TestBed.createComponent(FeaturedProjectsSection);
    const contentService = TestBed.inject(ContentService);
    contentService['_projects'].set([
      { slug: 'p1', title: 'My Project', description: 'Desc', tags: ['Angular'], featured: true, order: 1 }
    ]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('My Project');
  });
});
