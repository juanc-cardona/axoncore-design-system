# 05 · Layout, espaciado y superficies

## Retícula

- Unidad base **4 px**. Los layouts encajan en **8 px**; 4 px solo dentro de componentes.
- 12 columnas en escritorio (gutter 24 px), 8 en tablet, 4 en móvil (gutter 16 px).
- Contenedores: `container-max` 1280 px · `container-wide` 1440 px (dashboards, campaña) · `container-prose` 680 px (lectura).
- Breakpoints: sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536.

## Espaciado

| Token | px | Uso |
|---|---|---|
| `space-1` | 4 | Icono-texto compacto |
| `space-2` | 8 | Icono-texto, pilas apretadas |
| `space-3` | 12 | Padding vertical de controles |
| `space-4` | 16 | Gap por defecto, padding de card en móvil |
| `space-6` | 24 | Padding de card, gutter |
| `space-8` | 32 | Padding de panel |
| `space-10` | 40 | Entre grupos de cards |
| `space-16` | 64 | Entre bloques de una página |
| `space-24` | 96 | Padding de sección (escritorio) |
| `space-32` | 128 | Héroes, aire de campaña |

**Ticket alto = aire.** Ante la duda, sube un paso de espaciado.

## Radios

`radius-xs` 4 (badges, checkbox) · `radius-sm` 6 (inputs, botón sm) · `radius-md` 8 (botones, tabs) · `radius-lg` 12 (cards, popovers, diálogos) · `radius-xl` 16 (media, paneles hero) · `radius-2xl` 24 (app icon, marcos de campaña) · `radius-full` (pills, switches, avatares).

Suaves pero definidos, como los terminales redondeados del isotipo. Anidados: radio interior = radio exterior − padding.

## Elevación

| Nivel | Token | Oscuro | Claro | Uso |
|---|---|---|---|---|
| 0 | — | Borde `border-default` | Borde `border-default` | Contenido plano |
| 1 | `shadow-1` | Brillo superior + sombra corta | Sombra suave + hairline | Cards en reposo |
| 2 | `shadow-2` | Brillo + sombra difusa | Sombra difusa | Hover, dropdowns, header fijo |
| 3 | `shadow-3` | Brillo + sombra profunda | Sombra profunda | Diálogos, command palette |
| Signal | `shadow-signal` | Halo azul | Halo azul | Elemento IA activo / input hero enfocado (1 por vista) |

En oscuro, la elevación se lee por **superficie más clara + borde + brillo superior**, no por sombra.

## Translucidez (glass)

`bg-glass` + `backdrop-filter: blur(var(--blur-glass))` + `border-subtle`. Solo para: navegación fija, paneles sobre imagen o gradiente, tarjetas flotantes de dashboard. Nunca para contenedores de formularios largos ni texto extenso.

## Movimiento

| Token | Valor | Uso |
|---|---|---|
| `duration-instant` | 80 ms | Press, toggles |
| `duration-fast` | 140 ms | Hover, foco, color |
| `duration-base` | 220 ms | Menús, tabs, switches |
| `duration-slow` | 360 ms | Diálogos, drawers, secciones |
| `ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | Entradas y respuestas (por defecto) |
| `ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | Desplazamientos |
| `ease-in` | cubic-bezier(0.7, 0, 0.84, 0) | Salidas |

**Microinteracciones:** botón presionado baja 1 px; card interactiva sube 2 px y gana `shadow-2`; foco con anillo sólido inmediato; la línea de señal "viaja" solo en estados en vivo. Respeta siempre `prefers-reduced-motion`.

## Iconografía

El brandbook no define sistema de iconos. Se adopta **Lucide** (licencia ISC): trazo 1,5 px, terminaciones redondeadas (coherentes con el isotipo), tamaños 16/20/24 px, color `currentColor`. Sin iconos rellenos salvo estados (éxito, error) ni emoji en interfaz.
