import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';

describe('Navbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render logo', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('mr');
  });

  it('should render desktop nav links', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('ul li a');
    expect(links.length).toBe(5);
  });

  it('should start with menu closed', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('should toggle menu on button click', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[aria-label="Abrir menú"]');
    button.click();
    expect(fixture.componentInstance.menuOpen()).toBe(true);
    button.click();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('should close menu when closeMenu is called', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    fixture.componentInstance.menuOpen.set(true);
    fixture.componentInstance.closeMenu();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('should update scrolled state on onScroll', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    expect(fixture.componentInstance.scrolled()).toBe(false);
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    fixture.componentInstance.onScroll();
    expect(fixture.componentInstance.scrolled()).toBe(true);
  });
});
