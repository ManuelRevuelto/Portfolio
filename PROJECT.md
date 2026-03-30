# Portfolio manuelrevuelto.com — Documentación del Proyecto

## Descripción general

Portfolio profesional de desarrollador mid-level construido con Angular 21. Incluye:
- Página principal con hero, sobre mí preview, proyectos destacados, experiencia y contacto
- Página de about con foto, bio, skills y tecnologías
- Catálogo de proyectos con modal de detalle (Angular CDK Dialog)
- Blog con sistema de comentarios (Giscus) y lectura de Markdown
- Formulario de contacto (EmailJS)

**URL:** https://manuelrevuelto.com
**Deploy:** Vercel (SSR serverless)
**Estado:** En desarrollo activo

---

## Stack técnico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Angular | 21.2.x |
| Change Detection | Zoneless (sin zone.js) | — |
| Estilos | Tailwind CSS (CSS-first) | v4.x |
| SSR | Angular SSR + prerendering | 21.2.x |
| Contenido | Archivos Markdown + gray-matter | — |
| Markdown render | ngx-markdown + marked | 21.1 / 17.x |
| Modales | Angular CDK Dialog (headless) | 21.x |
| Comentarios | Giscus (GitHub Discussions) | — |
| Contacto | EmailJS browser SDK | 4.x |
| Deploy | Vercel | — |

---

## Arquitectura clave: SSR + Contenido Markdown

### Flujo de datos

```
Build time:
  app.routes.server.ts getPrerenderParams → fs.readdir(content/blog) → slugs
  Angular prerendera estáticamente: /, /about, /projects, /blog, /blog/*, /contact

Runtime (petición):
  Browser → Express GET /api/blog → fs.readdir(content/blog) → gray-matter → JSON
  Angular ContentService → HttpClient GET /api/blog → Signal<BlogPost[]>
  TransferState → cachea en servidor → browser no re-fetcha
```

### Por qué Angular 21 es ZONELESS

Angular 21 elimina `zone.js` completamente por defecto. **NUNCA añadir `provideZoneChangeDetection()`** al `app.config.ts` — causará el error `NG0908` durante la extracción de rutas en el prerendering.

### Por qué `IS_DISCOVERING_ROUTES`

Durante la extracción de rutas del build, Angular renderiza los componentes. Para evitar llamadas HTTP fallidas en este contexto, `ContentService` inyecta `IS_DISCOVERING_ROUTES` de `@angular/ssr` y retorna arrays vacíos cuando este token es `true`.

---

## Estructura de ficheros

```
manuelrevuelto.com/
├── content/                    # Contenido Markdown (fuente de verdad)
│   ├── blog/                   # Posts: *.md con frontmatter
│   └── projects/               # Proyectos: *.md con frontmatter
├── public/                     # Assets estáticos copiados tal cual
│   └── images/
│       ├── profile.jpg         # Foto de perfil
│       ├── og-image.jpg        # Imagen Open Graph para redes sociales
│       ├── blog/               # Imágenes de posts
│       └── projects/           # Capturas de proyectos
├── src/
│   ├── server.ts               # ← Express SSR + API routes (/api/blog, /api/projects)
│   ├── main.ts                 # Bootstrap cliente
│   ├── main.server.ts          # Bootstrap servidor (SSR)
│   ├── styles.css              # Tailwind v4 @theme + design system completo
│   ├── index.html              # Shell HTML con Google Fonts
│   └── app/
│       ├── app.ts              # Root component (Navbar + RouterOutlet + Footer)
│       ├── app.config.ts       # Providers: Router, HttpClient, Markdown, Hydration
│       ├── app.config.server.ts # SSR config: provideServerRendering(withRoutes(...))
│       ├── app.routes.ts       # Lazy-loaded routes
│       ├── app.routes.server.ts # Prerender config + getPrerenderParams para slugs
│       ├── core/
│       │   ├── models/
│       │   │   ├── blog-post.model.ts
│       │   │   └── project.model.ts
│       │   └── services/
│       │       ├── content.service.ts   # HttpClient + TransferState + Signals
│       │       ├── seo.service.ts       # Meta/Title management
│       │       └── contact.service.ts   # EmailJS wrapper con Signals
│       ├── shared/
│       │   ├── components/
│       │   │   ├── navbar/navbar.ts     # Fixed, glass, mobile hamburger
│       │   │   ├── footer/footer.ts
│       │   │   ├── tag-badge/tag-badge.ts
│       │   │   └── section-header/section-header.ts
│       │   ├── directives/
│       │   │   └── animated-entry.directive.ts  # Intersection Observer fade-up
│       │   └── pipes/
│       │       └── reading-time.pipe.ts
│       └── features/
│           ├── home/
│           │   ├── home.ts             # Shell de la homepage
│           │   └── sections/
│           │       ├── hero-section/           # Typewriter, CTAs, social links
│           │       ├── about-preview-section/  # Bio preview + tech tags
│           │       ├── featured-projects-section/ # Últimos 3 proyectos
│           │       ├── experience-section/     # Timeline laboral + formación
│           │       └── contact-section/        # Formulario EmailJS (reutilizado)
│           ├── about/about.ts          # Foto, bio, skill bars, tech tags
│           ├── projects/
│           │   ├── projects.ts         # Grid con filtro por tag
│           │   └── project-modal/      # CDK Dialog con carrusel de imágenes
│           ├── blog/
│           │   ├── blog-list/          # Grid de artículos con filtro por tag
│           │   ├── blog-post/          # ngx-markdown + Giscus comments
│           │   └── blog-card/          # Card de blog reutilizable
│           └── contact/contact.ts      # Wrapper de ContactSection
├── angular.json                # assets incluye content/ → copiado al build
├── tsconfig.json               # baseUrl + path aliases
├── postcss.config.js           # @tailwindcss/postcss
├── vercel.json                 # Routing SSR en Vercel
└── PROJECT.md                  # Este archivo
```

---

## Naming convention Angular 21

Angular 21 usa un nuevo convenio de nombres **sin sufijo `.component`**:
- ❌ Antes: `app.component.ts`, clase `AppComponent`
- ✅ Ahora: `app.ts`, clase `App`

Esto aplica a todos los componentes del proyecto: `home.ts` → clase `Home`, `navbar.ts` → clase `Navbar`, etc.

---

## Design System

### Paleta de colores (GitHub Dark + Cyan accent)

```css
--color-bg-base:       #0d1117   /* Fondo principal */
--color-bg-card:       #161b22   /* Cards, panels */
--color-bg-card-hover: #1c2128   /* Hover de cards */
--color-text-primary:  #e6edf3   /* Texto principal */
--color-text-secondary: #8b949e  /* Texto secundario */
--color-text-muted:    #656d76   /* Texto terciario, metadatos */
--color-accent:        #00d4aa   /* Color de acento (cyan-verde) */
--color-accent-hover:  #00b894   /* Hover del acento */
--color-border:        #30363d   /* Bordes normales */
--color-border-subtle: #21262d   /* Bordes sutiles */
```

### Tipografía

- **Sans**: Inter (Google Fonts)
- **Mono**: JetBrains Mono (Google Fonts) — usada para tags, código, eyebrows

### Clases CSS personalizadas (en `styles.css` @layer components)

| Clase | Uso |
|-------|-----|
| `.card` | Cards con hover lift + border accent |
| `.btn-primary` | Botón relleno con acento |
| `.btn-ghost` | Botón borde con hover |
| `.btn-icon` | Botón cuadrado para íconos |
| `.tag` | Badge accent para tecnologías |
| `.tag-secondary` | Badge gris secundario |
| `.section` | Padding vertical 5rem |
| `.container` | Max-width 72rem, centered |
| `.glass` | Efecto glassmorphism para navbar |
| `.animate-entry` + `.visible` | Fade-up al entrar en viewport |
| `.prose-portfolio` | Estilos para contenido Markdown de blog |

---

## Frontmatter de contenido

### Blog post (`content/blog/nombre-post.md`)

```yaml
---
title: "Título del artículo"
date: "2025-06-15"
tags: ["angular", "signals", "typescript"]
excerpt: "Resumen de 1-2 frases para las cards del listado."
coverImage: "/images/blog/cover-imagen.jpg"
featured: true   # Aparece en la sección featured de home
---
Contenido en Markdown...
```

### Proyecto (`content/projects/nombre-proyecto.md`)

```yaml
---
title: "Nombre del Proyecto"
description: "Descripción corta para la card (1-2 frases)."
tags: ["angular", "nodejs", "mysql"]
githubUrl: "https://github.com/usuario/repo"
liveUrl: "https://proyecto.vercel.app"   # Opcional
featured: true   # Aparece en la sección home
order: 1         # Orden en el listado (menor = primero)
images:
  - "/images/projects/captura-1.jpg"
  - "/images/projects/captura-2.jpg"
videos: []       # Opcional, URLs de video
---
Descripción detallada en Markdown (aparece en el modal)...
```

---

## Rutas y prerendering

| Ruta | Componente | RenderMode |
|------|-----------|------------|
| `/` | Home | Prerender |
| `/about` | About | Prerender |
| `/projects` | Projects | Prerender |
| `/blog` | BlogList | Prerender |
| `/blog/:slug` | BlogPost | Prerender (getPrerenderParams lee content/blog/) |
| `/contact` | Contact | Prerender |
| `/**` | — | Client |

---

## Servicios clave

### ContentService (`src/app/core/services/content.service.ts`)

```typescript
// Signals de solo lectura expuestos
contentService.posts           // Signal<BlogPost[]>
contentService.projects        // Signal<Project[]>
contentService.featuredProjects  // computed Signal<Project[]> (top 3 por order)
contentService.featuredPosts     // computed Signal<BlogPost[]>

// Métodos Observable
contentService.loadPosts()          // GET /api/blog
contentService.loadProjects()       // GET /api/projects
contentService.getPostBySlug(slug)  // GET /api/blog/:slug
```

**Patrón:** `IS_DISCOVERING_ROUTES` → skip HTTP durante build. `TransferState` → evita doble fetch en hidratación.

### SeoService (`src/app/core/services/seo.service.ts`)

```typescript
seoService.setPage({ title, description, image?, url?, type? })
seoService.setArticle(post: BlogPost)
```

### ContactService (`src/app/core/services/contact.service.ts`)

```typescript
// Signals de solo lectura
contactService.isSending      // Signal<boolean>
contactService.wasSuccessful  // Signal<boolean>
contactService.errorMessage   // Signal<string | null>

// Método
await contactService.send({ name, email, message })
contactService.reset()
```

---

## Configuración pendiente (post-scaffold)

### 1. EmailJS — Formulario de contacto

Editar `src/app/core/services/contact.service.ts`:
```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';    // → tu Service ID de emailjs.com
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // → tu Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';    // → tu Public Key
```

### 2. Giscus — Comentarios del blog

Editar `src/app/features/blog/blog-post/blog-post.ts`:
```typescript
const GISCUS_REPO = 'manuelrevuelto/portfolio'; // → tu usuario/repo
const GISCUS_REPO_ID = 'R_XXXXXXXX';           // → obtenido en giscus.app
const GISCUS_CATEGORY = 'Announcements';
const GISCUS_CATEGORY_ID = 'DIC_XXXXXXXX';     // → obtenido en giscus.app
```

### 3. Información personal

- **Foto de perfil**: Añadir `/public/images/profile.jpg`
- **OG Image**: Añadir `/public/images/og-image.jpg` (1200×630px)
- **CV**: Añadir `/public/cv-manuel-revuelto.pdf`
- **Links sociales**: Actualizar URLs de GitHub/LinkedIn en `navbar.ts`, `footer.ts`, `hero-section.ts`, `about.ts`
- **Experiencia**: Actualizar datos reales en `experience-section.ts` (workItems, educationItems)
- **About bio**: Actualizar texto biográfico en `about.ts`

### 4. Deploy en Vercel

1. Conectar repositorio en vercel.com
2. Framework preset: **Otro** (framework: null en vercel.json)
3. Variables de entorno: EmailJS keys (si se migran de hardcoded a env vars)
4. Dominio: configurar `manuelrevuelto.com`

---

## Comandos de desarrollo

```bash
# Desarrollo
npm start                    # ng serve (con SSR en dev)

# Build producción
npm run build                # ng build (prerendering incluido)

# Probar SSR en local
node dist/manuelrevuelto.com/server/server.mjs
# → http://localhost:4000

# Verificar SSR (el HTML debe contener contenido renderizado)
curl http://localhost:4000/ | grep "Manuel Revuelto"
curl http://localhost:4000/api/blog
curl http://localhost:4000/api/projects
```

---

## Añadir contenido nuevo

### Nuevo post de blog

1. Crear `content/blog/mi-nuevo-post.md` con el frontmatter correcto
2. Añadir la imagen de cover en `public/images/blog/`
3. Hacer build o el dev server lo servirá automáticamente

### Nuevo proyecto

1. Crear `content/projects/mi-proyecto.md` con frontmatter
2. Añadir screenshots en `public/images/projects/`
3. Si `featured: true` y `order: N`, aparecerá en la home

---

## Notas importantes para agentes / colaboradores

1. **Sin zone.js** — Angular 21 es zoneless. NUNCA añadir `provideZoneChangeDetection()`.
2. **Naming convention** — Los archivos de componentes no llevan `.component.` en el nombre. Las clases no llevan `Component` suffix.
3. **Signals primero** — No usar `BehaviorSubject` para estado local. Usar `signal()`, `computed()`, `effect()`.
4. **Imports standalone** — No hay NgModules. Cada componente declara sus propios `imports: []`.
5. **Tailwind v4** — La configuración es CSS-first (`@theme { }` en styles.css). No hay `tailwind.config.js`.
6. **IS_DISCOVERING_ROUTES** — `ContentService` usa este token para evitar llamadas HTTP durante el prerendering del build.
7. **TransferState** — Se usa para evitar doble-fetch cliente/servidor. Siempre usar en `ContentService` al añadir nuevas llamadas HTTP.
8. **Rutas lazy** — Todas las rutas usan `loadComponent()`. Mantener esta convención.
9. **gray-matter** — Se usa SOLO en `src/server.ts` (Express API routes). No en código Angular.
10. **content/blog y content/projects** — Copiados automáticamente al build output via `angular.json assets`. No referenciar la ruta fuente desde el código Angular.
