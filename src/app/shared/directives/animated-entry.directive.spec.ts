import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { AnimatedEntry } from './animated-entry.directive';

@Component({
  imports: [AnimatedEntry],
  template: `<div appAnimatedEntry>content</div>`
})
class TestHostComponent {}

describe('AnimatedEntry Directive', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should add animate-entry class to host element', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div');
    expect(el.classList.contains('animate-entry')).toBe(true);
  });
});

describe('AnimatedEntry Directive on server', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
  });

  it('should create without IntersectionObserver on server', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
