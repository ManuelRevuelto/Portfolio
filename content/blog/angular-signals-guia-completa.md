---
title: "Angular Signals: Guía completa para desarrolladores"
date: "2025-03-15"
tags: ["angular", "signals", "typescript", "frontend"]
excerpt: "Aprende todo sobre Angular Signals, el nuevo sistema de reactividad que lleva Angular al siguiente nivel. Desde los conceptos básicos hasta patrones avanzados."
coverImage: "/images/blog/angular-signals.jpg"
featured: true
---

# Angular Signals: Guía completa

Angular Signals es el sistema de reactividad primitivo introducido en Angular 16 y que se ha convertido en el estándar de facto en Angular 17+.

## ¿Qué es un Signal?

Un Signal es un contenedor de valores que notifica a los consumidores cuando su valor cambia.

```typescript
import { signal, computed, effect } from '@angular/core';

const count = signal(0);
const doubled = computed(() => count() * 2);

effect(() => {
  console.log(`Count: ${count()}, Doubled: ${doubled()}`);
});

count.set(5); // Logs: Count: 5, Doubled: 10
```

## Ventajas sobre RxJS

- **Sin subscriptions manuales**: No hay que hacer `subscribe()` ni `unsubscribe()`
- **Lazy evaluation**: `computed()` solo recalcula cuando sus dependencias cambian
- **Sin boilerplate**: Más código expresivo y menos verboso

## Patrones avanzados

### Signal stores

Puedes crear mini-stores con signals para gestionar estado local sin NgRx:

```typescript
@Injectable({ providedIn: 'root' })
export class TodoStore {
  private _todos = signal<Todo[]>([]);

  readonly todos = this._todos.asReadonly();
  readonly pending = computed(() => this._todos().filter(t => !t.done));

  add(todo: Todo) { this._todos.update(todos => [...todos, todo]); }
  complete(id: string) {
    this._todos.update(todos => todos.map(t => t.id === id ? { ...t, done: true } : t));
  }
}
```

## Conclusión

Los Signals representan el futuro de Angular. Si todavía estás usando `BehaviorSubject` para estado local, es hora de migrar.
