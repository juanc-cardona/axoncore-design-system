# 06 · Componentes

Implementación: `src/css/components.css` (clases `.ax-*`) + `src/react/factory.js` (React, sin JSX). Tipos: `dist/react/index.d.ts`. Todos los estados usan tokens; foco universal = `outline: 2px solid var(--focus-ring); outline-offset: 2px`.

## Button

| Variante | Fondo | Texto | Hover | Pressed | Uso |
|---|---|---|---|---|---|
| `primary` | `action-primary` | `on-action-primary` | `action-primary-hover` | `action-primary-pressed` | La acción principal. **Una por vista.** |
| `signal` | `accent` | `on-accent` | `accent-hover` + `shadow-signal` | `accent-pressed` | Momento de intención: demo, IA, confirmar despliegue. Máx. una por vista. |
| `secondary` | transparente, borde `border-strong` | `text-primary` | `bg-hover` | `bg-selected` | Acciones alternativas. |
| `ghost` | transparente | `text-primary` | `bg-hover` | `bg-selected` | Navegación, acciones terciarias. |
| `danger` | transparente, borde `status-danger` | `status-danger` | `status-danger-subtle` | — | Acciones destructivas. |

Tamaños: `sm` 32 px · `md` 40 px · `lg` 48 px. Disabled: opacidad 0,4, sin sombra. Loading: spinner + `aria-busy`. Etiquetas: verbo + objeto, sentence case ("Solicitar demo", "Crear workspace").

```jsx
<Button variant="signal" size="lg" iconEnd={<ArrowRight />}>Solicitar demo</Button>
```

```html
<button class="ax-btn ax-btn--primary">Hablar con ventas</button>
```

```html
<!-- Tailwind -->
<button class="h-10 px-4 rounded-md bg-accent text-on-accent hover:bg-accent-hover font-sans text-label">Solicitar demo</button>
```

## TextField

Label (`type-label`) · input 40 px, `bg-sunken`, borde `border-strong`, radio `radius-sm` · hint (`type-caption`, `text-muted`). Estados: hover (borde `text-muted`), focus (borde `accent` + halo `tone-signal-subtle`), error (borde y mensaje `status-danger`, `aria-invalid`), disabled (0,5). `multiline` para textarea.

## Checkbox · Switch

Checkbox 18 px, `radius-xs`, marcado en `accent` con check negro. Switch 36×20, pista `bg-sunken` → `accent`; perilla `text-secondary` → `on-accent`. Switch = efecto inmediato; checkbox = se confirma al enviar.

## Badge

Altura 22 px, `radius-xs`, Geist 12/500. Tonos: `neutral`, `signal`, `pulse` (en vivo, con `live`), `synapse` (IA), `success`, `warning`, `danger`. Fondo `*-subtle`, texto del tono.

## Card

`bg-raised`, borde `border-default`, `radius-lg`, padding `space-6`, `shadow-1`. Partes: eyebrow (`type-eyebrow`), título (Agrandir 700 20 px), descripción (`text-secondary`). Variantes: `default`, `glass`, `signal` (hairline superior en `gradient-signal`; una por grupo). `interactive`: hover sube 2 px, `shadow-2`, borde `border-strong`.

## Tabs

Texto `text-muted` → `text-primary` seleccionado, con indicador inferior de 2 px en `gradient-signal`. Navegación con flechas.

## Alert

Tonos `info`, `success`, `warning`, `danger`, `ai` (Synapse, para contenido generado por IA). Fondo tintado, icono del tono, título 14/600, cuerpo `text-secondary`. `danger` usa `role="alert"`.

## Stat

Eyebrow mono + cifra en Agrandir Tight (48 px; `lg` 64 px) + badge de variación (`▲` success, `▼` danger) + caption. Toda cifra lleva contexto (periodo o comparación).

## Table

Contenedor `bg-raised` con borde y `radius-lg`. Cabeceras en Geist Mono 12 px mayúsculas `text-muted`; filas con divisor `border-subtle` y hover `bg-hover`; columnas numéricas alineadas a la derecha en mono tabular.

## SignalLine

Hairline de 1 px (o 2) en `gradient-signal` sobre `border-subtle`. `live` anima un impulso que recorre la línea (desactivado con movimiento reducido). Úsala para separar el héroe del contenido o marcar un proceso en curso.

## Logo

`<Logo lockup="vertical|horizontal|isotype" tone="color|mono" height={28} />` — SVG inline; logotipo en `currentColor`. Navegación: vertical a 28 px. Footer: isotipo mono a 24 px.
