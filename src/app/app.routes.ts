import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.Home),
    title: 'Manuel Revuelto — Software Developer'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about').then(m => m.About),
    title: 'Sobre mí — Manuel Revuelto'
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects').then(m => m.Projects),
    title: 'Proyectos — Manuel Revuelto'
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog-list/blog-list').then(m => m.BlogList),
    title: 'Blog — Manuel Revuelto'
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./features/blog/blog-post/blog-post').then(m => m.BlogPost),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact').then(m => m.Contact),
    title: 'Contacto — Manuel Revuelto'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
