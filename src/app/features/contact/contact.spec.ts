import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { Contact } from './contact';
import { SeoService } from '../../core/services/seo.service';

describe('Contact', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call seo.setPage on creation', () => {
    const seoService = TestBed.inject(SeoService);
    const spy = vi.spyOn(seoService, 'setPage').mockImplementation(() => {});
    TestBed.createComponent(Contact);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ title: 'Contacto' }));
  });

  it('should render contact-section', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-contact-section')).toBeTruthy();
  });
});
