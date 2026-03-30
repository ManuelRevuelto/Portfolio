import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { BlogPost } from './blog-post';
import { ContentService } from '../../../core/services/content.service';
import { provideMarkdown } from 'ngx-markdown';

describe('BlogPost', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPost],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMarkdown(),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BlogPost);
    fixture.componentRef.setInput('slug', 'test-post');
    fixture.detectChanges();
    httpTesting.expectOne('/api/blog/test-post').flush({
      slug: 'test-post', title: 'Test', date: '2024-01-01',
      tags: [], excerpt: '', readingTimeMinutes: 3, content: '# Hello'
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show loading state when no currentPost', () => {
    const fixture = TestBed.createComponent(BlogPost);
    fixture.componentRef.setInput('slug', 'test-post');
    fixture.detectChanges();
    httpTesting.expectOne('/api/blog/test-post').flush({
      slug: 'test-post', title: '', date: '', tags: [], excerpt: '', readingTimeMinutes: 0
    });
    // Before post loads, shows loading
    const contentService = TestBed.inject(ContentService);
    contentService['_currentPost'].set(null);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Cargando artículo');
  });

  it('should render post when available', () => {
    const fixture = TestBed.createComponent(BlogPost);
    const contentService = TestBed.inject(ContentService);
    contentService['_currentPost'].set({
      slug: 'test-post', title: 'My Article', date: '2024-01-01',
      tags: ['Angular'], excerpt: 'excerpt', readingTimeMinutes: 5, content: '# Hello'
    });
    fixture.componentRef.setInput('slug', 'test-post');
    fixture.detectChanges();
    httpTesting.expectOne('/api/blog/test-post').flush({
      slug: 'test-post', title: 'My Article', date: '2024-01-01',
      tags: ['Angular'], excerpt: 'excerpt', readingTimeMinutes: 5, content: '# Hello'
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('My Article');
  });

  it('formatDate should return localized date', () => {
    const fixture = TestBed.createComponent(BlogPost);
    fixture.componentRef.setInput('slug', 'test');
    fixture.detectChanges();
    httpTesting.expectOne('/api/blog/test').flush({
      slug: 'test', title: '', date: '', tags: [], excerpt: '', readingTimeMinutes: 0
    });
    const result = fixture.componentInstance.formatDate('2024-03-15');
    expect(result).toContain('2024');
  });

  it('isBrowser should be false on server', () => {
    const fixture = TestBed.createComponent(BlogPost);
    fixture.componentRef.setInput('slug', 'test');
    fixture.detectChanges();
    httpTesting.expectOne('/api/blog/test').flush({
      slug: 'test', title: '', date: '', tags: [], excerpt: '', readingTimeMinutes: 0
    });
    expect(fixture.componentInstance.isBrowser).toBe(false);
  });
});
