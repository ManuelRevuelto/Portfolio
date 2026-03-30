import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ContentService } from './content.service';
import { BlogPost } from '../models/blog-post.model';
import { Project } from '../models/project.model';

const mockPosts: BlogPost[] = [
  {
    slug: 'test-post',
    title: 'Test Post',
    date: '2024-01-01',
    tags: ['Angular', 'TypeScript'],
    excerpt: 'Test excerpt',
    readingTimeMinutes: 5,
    featured: true,
  },
];

const mockProjects: Project[] = [
  {
    slug: 'test-project',
    title: 'Test Project',
    description: 'Test description',
    tags: ['Angular'],
    featured: true,
    order: 1,
  },
];

describe('ContentService', () => {
  let service: ContentService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ContentService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty posts', () => {
    expect(service.posts()).toEqual([]);
  });

  it('should initialize with empty projects', () => {
    expect(service.projects()).toEqual([]);
  });

  it('should initialize with null currentPost', () => {
    expect(service.currentPost()).toBeNull();
  });

  it('should load posts via HTTP', () => {
    service.loadPosts().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpTesting.expectOne('/api/blog');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);

    expect(service.posts()).toEqual(mockPosts);
  });

  it('should load projects via HTTP', () => {
    service.loadProjects().subscribe(projects => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpTesting.expectOne('/api/projects');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);

    expect(service.projects()).toEqual(mockProjects);
  });

  it('should compute featuredProjects correctly', () => {
    service['_projects'].set(mockProjects);
    const featured = service.featuredProjects();
    expect(featured.length).toBe(1);
    expect(featured[0].slug).toBe('test-project');
  });

  it('should compute featuredPosts correctly', () => {
    service['_posts'].set(mockPosts);
    const featured = service.featuredPosts();
    expect(featured.length).toBe(1);
    expect(featured[0].slug).toBe('test-post');
  });

  it('should get post by slug via HTTP', () => {
    const mockPost: BlogPost = { ...mockPosts[0], content: '# Content' };

    service.getPostBySlug('test-post').subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpTesting.expectOne('/api/blog/test-post');
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);

    expect(service.currentPost()).toEqual(mockPost);
  });
});
