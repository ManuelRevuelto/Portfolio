import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { BlogList } from './blog-list';
import { ContentService } from '../../../core/services/content.service';
import { SeoService } from '../../../core/services/seo.service';

describe('BlogList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BlogList);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call seo.setPage on creation', () => {
    const seoService = TestBed.inject(SeoService);
    const spy = vi.spyOn(seoService, 'setPage').mockImplementation(() => {});
    TestBed.createComponent(BlogList);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ title: 'Blog' }));
  });

  it('should show empty state when no posts', () => {
    const fixture = TestBed.createComponent(BlogList);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Aún no hay artículos publicados');
  });

  it('should start with no selected tag', () => {
    const fixture = TestBed.createComponent(BlogList);
    expect(fixture.componentInstance.selectedTag()).toBeNull();
  });

  it('should compute allTags from posts', () => {
    const fixture = TestBed.createComponent(BlogList);
    const contentService = TestBed.inject(ContentService);
    contentService['_posts'].set([
      { slug: 'p1', title: 'P1', date: '2024-01-01', tags: ['Angular', 'TypeScript'], excerpt: 'e', readingTimeMinutes: 3 },
      { slug: 'p2', title: 'P2', date: '2024-01-02', tags: ['Angular', 'RxJS'], excerpt: 'e', readingTimeMinutes: 5 },
    ]);
    const tags = fixture.componentInstance.allTags();
    expect(tags).toContain('Angular');
    expect(tags).toContain('TypeScript');
    expect(tags).toContain('RxJS');
  });

  it('should filter posts by selected tag', () => {
    const fixture = TestBed.createComponent(BlogList);
    const contentService = TestBed.inject(ContentService);
    contentService['_posts'].set([
      { slug: 'p1', title: 'P1', date: '2024-01-01', tags: ['Angular'], excerpt: 'e', readingTimeMinutes: 3 },
      { slug: 'p2', title: 'P2', date: '2024-01-02', tags: ['Node.js'], excerpt: 'e', readingTimeMinutes: 5 },
    ]);
    fixture.componentInstance.selectedTag.set('Angular');
    const filtered = fixture.componentInstance.filteredPosts();
    expect(filtered.length).toBe(1);
    expect(filtered[0].slug).toBe('p1');
  });
});
