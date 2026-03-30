import { inject, Injectable, PLATFORM_ID, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';
import { IS_DISCOVERING_ROUTES } from '@angular/ssr';
import { Observable, of, tap } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { Project } from '../models/project.model';

const POSTS_KEY = makeStateKey<BlogPost[]>('blog-posts');
const POST_KEY_PREFIX = 'blog-post-';
const PROJECTS_KEY = makeStateKey<Project[]>('projects');

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);
  // True during build-time route extraction — skip HTTP calls to avoid errors
  private isDiscoveringRoutes = inject(IS_DISCOVERING_ROUTES, { optional: true }) ?? false;

  private _posts = signal<BlogPost[]>([]);
  private _projects = signal<Project[]>([]);
  private _currentPost = signal<BlogPost | null>(null);

  readonly posts = this._posts.asReadonly();
  readonly projects = this._projects.asReadonly();
  readonly currentPost = this._currentPost.asReadonly();

  readonly featuredProjects = computed(() =>
    this._projects()
      .filter(p => p.featured)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
      .slice(0, 3)
  );

  readonly featuredPosts = computed(() =>
    this._posts().filter(p => p.featured).slice(0, 3)
  );

  loadPosts(): Observable<BlogPost[]> {
    if (this.isDiscoveringRoutes) return of([]);

    const cached = this.transferState.get(POSTS_KEY, null);
    if (cached) {
      this._posts.set(cached);
      return of(cached);
    }
    return this.http.get<BlogPost[]>('/api/blog').pipe(
      tap(posts => {
        this._posts.set(posts);
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(POSTS_KEY, posts);
        }
      })
    );
  }

  getPostBySlug(slug: string): Observable<BlogPost> {
    if (this.isDiscoveringRoutes) return of({ slug, title: '', date: '', tags: [], excerpt: '', readingTimeMinutes: 0 });

    const stateKey = makeStateKey<BlogPost>(`${POST_KEY_PREFIX}${slug}`);
    const cached = this.transferState.get(stateKey, null);
    if (cached) {
      this._currentPost.set(cached);
      return of(cached);
    }
    return this.http.get<BlogPost>(`/api/blog/${slug}`).pipe(
      tap(post => {
        this._currentPost.set(post);
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(stateKey, post);
        }
      })
    );
  }

  loadProjects(): Observable<Project[]> {
    if (this.isDiscoveringRoutes) return of([]);

    const cached = this.transferState.get(PROJECTS_KEY, null);
    if (cached) {
      this._projects.set(cached);
      return of(cached);
    }
    return this.http.get<Project[]>('/api/projects').pipe(
      tap(projects => {
        this._projects.set(projects);
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(PROJECTS_KEY, projects);
        }
      })
    );
  }
}
