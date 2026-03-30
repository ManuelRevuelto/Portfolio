---
title: "Portfolio Personal"
description: "Portfolio profesional construido con Angular 21, SSR, Tailwind CSS v4 y sistema de blog con Markdown."
tags: ["angular", "typescript", "tailwind", "ssr", "markdown"]
githubUrl: "https://github.com/manuelrevuelto/portfolio"
liveUrl: "https://manuelrevuelto.com"
featured: true
order: 1
images: ["/images/projects/portfolio-1.jpg", "/images/projects/portfolio-2.jpg"]
videos: []
---

## Descripción

Portfolio profesional desarrollado desde cero usando Angular 21 con Server-Side Rendering para optimización SEO. El proyecto incluye un sistema de blog basado en archivos Markdown con frontmatter, gestión del contenido sin CMS externo.

## Características principales

- **Angular 21** con Standalone Components y Signals
- **SSR + Prerendering** para máximo rendimiento en SEO
- **Tailwind CSS v4** con design system personalizado (paleta GitHub Dark)
- **Blog** con archivos Markdown parseados con gray-matter
- **Angular CDK Dialog** para modales de proyectos sin overhead de Material
- **Giscus** para comentarios via GitHub Discussions
- **EmailJS** para formulario de contacto sin backend propio
- **Vercel** para deploy con soporte SSR

## Retos técnicos

El mayor reto fue la arquitectura SSR: Angular corre en Node.js en servidor pero en el browser no puede acceder al filesystem. La solución fue crear rutas Express API (`/api/blog`, `/api/projects`) que leen los `.md` con gray-matter, y usar `TransferState` para cachear los datos en el servidor y evitar re-fetch en el cliente.

## Resultado

Lighthouse: 96 SEO, 92 Performance, 100 Accessibility.
