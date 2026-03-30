import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html'
})
export class Navbar {
  readonly navLinks: NavLink[] = [
    { label: 'Inicio', path: '' },
    { label: 'Sobre mí', path: 'about' },
    { label: 'Proyectos', path: 'projects' },
    { label: 'Blog', path: 'blog' },
    { label: 'Contacto', path: 'contact' },
  ];

  menuOpen = signal(false);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
