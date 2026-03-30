import { Component, OnDestroy, OnInit, signal, PLATFORM_ID, inject, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../../core/services/profile.service';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink],
  templateUrl: './hero-section.html'
})
export class HeroSection implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  readonly profileService = inject(ProfileService);

  displayedTitle = signal('');

  private titles: string[] = [];
  private titleIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    // Load titles when profile changes
    effect(() => {
      const profile = this.profileService.profile();
      if (profile?.heroTitles) {
        this.titles = profile.heroTitles;
        if (!this.displayedTitle()) {
          this.displayedTitle.set(this.titles[0]);
        }
      }
    });
  }

  ngOnInit(): void {
    this.profileService.loadProfile().subscribe(() => {
      if (isPlatformBrowser(this.platformId) && this.titles.length > 0) {
        this.typeWriter();
      } else if (!isPlatformBrowser(this.platformId) && this.titles.length > 0) {
        this.displayedTitle.set(this.titles[0]);
      }
    });
  }

  private typeWriter(): void {
    if (!this.titles.length) return;

    const current = this.titles[this.titleIndex];
    const speed = this.deleting ? 60 : 120;

    if (!this.deleting && this.charIndex <= current.length) {
      this.displayedTitle.set(current.slice(0, this.charIndex++));
    } else if (this.deleting && this.charIndex >= 0) {
      this.displayedTitle.set(current.slice(0, this.charIndex--));
    }

    if (!this.deleting && this.charIndex > current.length) {
      this.timer = setTimeout(() => {
        this.deleting = true;
        this.typeWriter();
      }, 2000);
      return;
    }

    if (this.deleting && this.charIndex < 0) {
      this.deleting = false;
      this.titleIndex = (this.titleIndex + 1) % this.titles.length;
      this.charIndex = 0;
    }

    this.timer = setTimeout(() => this.typeWriter(), speed);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
