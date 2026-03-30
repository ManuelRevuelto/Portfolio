import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { About } from './about';
import { SeoService } from '../../core/services/seo.service';

describe('About', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call seo.setPage on creation', () => {
    const seoService = TestBed.inject(SeoService);
    const spy = vi.spyOn(seoService, 'setPage').mockImplementation(() => {});
    TestBed.createComponent(About);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ title: 'Sobre mí' }));
  });

  it('should render name', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Manuel Revuelto');
  });

  it('should have skill groups', () => {
    const fixture = TestBed.createComponent(About);
    expect(fixture.componentInstance.skillGroups.length).toBe(3);
  });

  it('should have tech list', () => {
    const fixture = TestBed.createComponent(About);
    expect(fixture.componentInstance.allTechs.length).toBeGreaterThan(0);
    expect(fixture.componentInstance.allTechs).toContain('Angular');
  });
});
