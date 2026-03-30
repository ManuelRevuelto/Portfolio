import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { Projects } from './projects';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';

describe('Projects', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call seo.setPage on creation', () => {
    const seoService = TestBed.inject(SeoService);
    const spy = vi.spyOn(seoService, 'setPage').mockImplementation(() => {});
    TestBed.createComponent(Projects);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ title: 'Proyectos' }));
  });

  it('should start with no selected tag', () => {
    const fixture = TestBed.createComponent(Projects);
    expect(fixture.componentInstance.selectedTag()).toBeNull();
  });

  it('should show loading state when no projects', () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Cargando proyectos');
  });

  it('should compute allTags from projects', () => {
    const fixture = TestBed.createComponent(Projects);
    const contentService = TestBed.inject(ContentService);
    contentService['_projects'].set([
      { slug: 'p1', title: 'P1', description: 'D', tags: ['Angular', 'TypeScript'], featured: false },
      { slug: 'p2', title: 'P2', description: 'D', tags: ['Angular', 'Node.js'], featured: false },
    ]);
    const tags = fixture.componentInstance.allTags();
    expect(tags).toContain('Angular');
    expect(tags).toContain('TypeScript');
    expect(tags).toContain('Node.js');
  });

  it('should filter projects by selected tag', () => {
    const fixture = TestBed.createComponent(Projects);
    const contentService = TestBed.inject(ContentService);
    contentService['_projects'].set([
      { slug: 'p1', title: 'P1', description: 'D', tags: ['Angular'], featured: false },
      { slug: 'p2', title: 'P2', description: 'D', tags: ['Node.js'], featured: false },
    ]);
    fixture.componentInstance.selectedTag.set('Angular');
    const filtered = fixture.componentInstance.filteredProjects();
    expect(filtered.length).toBe(1);
    expect(filtered[0].slug).toBe('p1');
  });
});
