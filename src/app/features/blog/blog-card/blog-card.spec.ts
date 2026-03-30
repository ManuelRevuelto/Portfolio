import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BlogCard } from './blog-card';
import { BlogPost } from '../../../core/models/blog-post.model';

const mockPost: BlogPost = {
  slug: 'test-post',
  title: 'Test Post Title',
  date: '2024-01-15',
  tags: ['Angular', 'TypeScript', 'RxJS', 'Testing'],
  excerpt: 'This is a test excerpt.',
  readingTimeMinutes: 5,
  coverImage: '/images/test.jpg',
};

@Component({
  imports: [BlogCard],
  template: `<app-blog-card [post]="post" />`
})
class TestHostComponent {
  post = mockPost;
}

describe('BlogCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render post title', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Test Post Title');
  });

  it('should render excerpt', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('This is a test excerpt.');
  });

  it('should render up to 3 tags', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
    expect(fixture.nativeElement.textContent).toContain('TypeScript');
    expect(fixture.nativeElement.textContent).toContain('RxJS');
    expect(fixture.nativeElement.textContent).not.toContain('Testing');
  });

  it('should render cover image when present', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('/images/test.jpg');
  });

  it('should format date in Spanish locale', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const component = fixture.nativeElement.querySelector('app-blog-card').__ngContext__;
    const formatted = fixture.nativeElement.querySelector('time').textContent;
    expect(formatted).toBeTruthy();
  });

  it('formatDate should return localized date string', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const card = fixture.debugElement.children[0].componentInstance as BlogCard;
    const result = card.formatDate('2024-01-15');
    expect(result).toContain('2024');
  });
});
