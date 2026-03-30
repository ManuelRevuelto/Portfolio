import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';
import { IS_DISCOVERING_ROUTES } from '@angular/ssr';
import { Observable, of, tap } from 'rxjs';
import { Profile } from '../models/profile.model';

const PROFILE_KEY = makeStateKey<Profile>('profile');

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);
  // True during build-time route extraction — skip HTTP calls to avoid errors
  private isDiscoveringRoutes = inject(IS_DISCOVERING_ROUTES, { optional: true }) ?? false;

  private _profile = signal<Profile | null>(null);

  readonly profile = this._profile.asReadonly();

  loadProfile(): Observable<Profile> {
    if (this.isDiscoveringRoutes) {
      return of({
        name: '',
        title: '',
        bio: [],
        heroTitles: [],
        experience: [],
        education: [],
        projectHighlights: [],
        skillGroups: [],
        allTechs: []
      });
    }

    const cached = this.transferState.get(PROFILE_KEY, null);
    if (cached) {
      this._profile.set(cached);
      return of(cached);
    }

    return this.http.get<Profile>('/api/profile').pipe(
      tap(profile => {
        this._profile.set(profile);
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(PROFILE_KEY, profile);
        }
      })
    );
  }
}
