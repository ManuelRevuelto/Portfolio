import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Footer } from './footer';

describe('Footer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render current year', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const year = new Date().getFullYear().toString();
    expect(fixture.nativeElement.textContent).toContain(year);
  });

  it('should render Angular version', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('21');
  });

  it('should contain navigation links', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('nav a');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should contain GitHub and LinkedIn links', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a[href*="github"], a[href*="linkedin"]');
    expect(links.length).toBe(2);
  });
});
