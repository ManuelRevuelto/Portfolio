import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
    service = TestBed.inject(SeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setPage without errors', () => {
    expect(() => service.setPage({
      title: 'Test',
      description: 'Test description',
    })).not.toThrow();
  });

  it('should call setArticle without errors', () => {
    expect(() => service.setArticle({
      slug: 'test-post',
      title: 'Test Post',
      date: '2024-01-01',
      tags: ['Angular'],
      excerpt: 'Test excerpt',
      readingTimeMinutes: 5,
    })).not.toThrow();
  });
});
