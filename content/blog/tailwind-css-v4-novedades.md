---
title: "Tailwind CSS v4: Todo lo que necesitas saber"
date: "2025-02-20"
tags: ["tailwind", "css", "frontend", "diseño"]
excerpt: "Tailwind CSS v4 revoluciona la forma en que configuramos estilos. Adiós al archivo JS de configuración, bienvenida la configuración CSS-first con @theme."
coverImage: "/images/blog/tailwind-v4.jpg"
featured: false
---

# Tailwind CSS v4: La revolución CSS-first

La versión 4 de Tailwind CSS representa el cambio más grande en la historia del framework.

## El gran cambio: @theme

```css
@import "tailwindcss";

@theme {
  --color-primary: #00d4aa;
  --font-sans: 'Inter', system-ui;
}
```

No más `tailwind.config.js`. Todo se define en CSS puro.

## Performance mejorado

Tailwind v4 es hasta 10x más rápido en build incremental gracias a su nuevo motor basado en Rust (Lightning CSS).

## Conclusión

Si estás empezando un proyecto nuevo en 2025, no hay razón para no usar Tailwind v4.
