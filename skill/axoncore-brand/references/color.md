# 03 · Color

Fuente de verdad: `tokens/axoncore.tokens.json`. Todos los pares texto/fondo están auditados (WCAG 2.x) con `npm run check` en ambos temas.

## Arquitectura en tres capas

1. **Primitivas de marca** — los valores exactos del brandbook (`brand-*`).
2. **Escalas** — `ink-*` (neutros) y las rampas `pulse-*`, `synapse-*`, `signal-*` (50–950).
3. **Semánticos** — lo que se usa en diseño y código (`bg-*`, `text-*`, `border-*`, `accent`, `tone-*`, `status-*`). Cambian por tema; **diseña siempre con semánticos**.

## Primitivas (brandbook)

| Token | HEX | RGB | CMYK | Rol |
|---|---|---|---|---|
| `brand-black` | #000000 | 0, 0, 0 | 91 79 62 97 | Núcleo. Fondo principal. |
| `brand-graphite` | #3A3A3A | 58, 58, 58 | 67 58 55 61 | Oscuro secundario. |
| `brand-mist` | #F6F6F6 | 246, 246, 246 | 4 3 4 0 | Claro principal. |
| `brand-white` | #FFFFFF | 255, 255, 255 | 0 0 0 0 | Logotipo sobre negro. |
| `brand-pulse` | #FC1C70 | 252, 28, 112 | 0 92 24 0 | Espectro · inicio. |
| `brand-synapse` | #C04AE1 | 192, 74, 225 | 53 74 0 0 | Espectro · centro. |
| `brand-signal` | #0082FB | 0, 130, 251 | 79 49 0 0 | Espectro · final. Acento de interacción. |

Matices del brandbook conservados como pasos 600/700: Pulse #DD1969 / #C11765 · Synapse #AC46CE / #9642BA · Signal #057ED8 / #0B6CA8 · Neutros #141414, #1E1E1E, #3F3F3F, #494949, #E6E7E8, #D4D6D8.

## Neutros `ink-*`

1000 #000000 · 950 #0A0A0A · 900 #141414 · 850 #1E1E1E · 800 #2A2A2A · 750 #3A3A3A · 700 #3F3F3F · 650 #494949 · 550 #5C5C5C · 500 #6B6B6B · 400 #8C8C8C · 350 #A1A1A1 · 300 #B5B5B5 · 200 #D4D6D8 · 150 #E6E7E8 · 100 #F6F6F6 · 0 #FFFFFF

> Los grises del brandbook son neutros (no fríos). Se respetan por fidelidad; la sensación técnica y fría la aporta el azul Signal sobre negro.

## Semánticos principales

| Token | Oscuro | Claro | Uso |
|---|---|---|---|
| `bg-canvas` | #000000 | #FFFFFF | Fondo de página |
| `bg-surface` | #0A0A0A | #F6F6F6 | Secciones, sidebars |
| `bg-raised` | #141414 | #FFFFFF | Cards, paneles |
| `bg-overlay` | #1E1E1E | #FFFFFF | Menús, diálogos |
| `bg-sunken` | #000000 | #F6F6F6 | Inputs, pozos de código |
| `bg-inverse` | #F6F6F6 | #000000 | Bloques invertidos |
| `text-primary` | #F6F6F6 | #000000 | Texto principal |
| `text-secondary` | #A1A1A1 | #3F3F3F | Texto de apoyo |
| `text-muted` | #8C8C8C | #6B6B6B | Meta, captions, placeholders |
| `text-link` | #54A0FE | #0B6CA8 | Enlaces |
| `border-subtle` / `default` / `strong` | #1E1E1E / #2A2A2A / #6B6B6B | #E6E7E8 / #D4D6D8 / #8C8C8C | Divisores / contornos / controles |
| `accent` (+ `on-accent`) | #0082FB (+ #000000) | #0082FB (+ #000000) | Botón signal, selección |
| `action-primary` (+ `on-action-primary`) | #F6F6F6 (+ #000) | #000000 (+ #FFF) | Botón principal monocromo |
| `focus-ring` | #54A0FE | #0082FB | Anillo de foco 2 px, offset 2 px |
| `tone-pulse` / `synapse` / `signal` | #FC6088 / #D567F5 / #54A0FE | #C11765 / #9642BA / #0B6CA8 | Texto de acento por significado |
| `status-success` / `warning` / `danger` | #2FD49A / #F5B53D / #FF6B47 | #0B7A52 / #8F5A00 / #C2340E | Estados (siempre con icono o palabra) |

## Decisiones de accesibilidad

- **Texto sobre Signal = negro.** El blanco sobre #0082FB solo alcanza 3,8:1; el negro logra 5,6:1 y refuerza el carácter técnico.
- **El botón principal es monocromo** (blanco sobre oscuro, negro sobre claro): lectura premium y contraste máximo. El azul queda para el momento de acción con intención (demo, IA, confirmación).
- **Error ≠ marca.** `status-danger` es naranja-rojo (tono 35°) para no confundirse con Pulse (magenta, 8°).
- Los estados nunca dependen solo del color: siempre acompañados de icono o texto.

## Gradiente Signal

`gradient-signal`: `linear-gradient(90deg, #FC1C70 0%, #C04AE1 50%, #0082FB 100%)`

**Sí:** isotipo · líneas de señal de 1–2 px · indicador de pestaña activa · borde superior de una card destacada · un dato clave · merch y campaña (con moderación).

**No:** fondos de sección · detrás de texto de lectura · botones · texto y logotipo · más de un gradiente por vista · gradientes inventados (otros ángulos, otros colores, radiales de color).

`gradient-core` (radial grafito → negro) aporta profundidad a héroes y portadas oscuras.

## Correcciones respecto al brandbook

| Hallazgo en el brandbook | Decisión |
|---|---|
| PNG del logo con gradiente desaturado (conversión CMYK) | SVG maestros con los HEX del brandbook |
| Mockups con logotipo en gradiente, logo reflejado y rotado | Prohibido (ver Logo) |
| Grandes superficies en gradiente (taza, tote, libreta) | Solo en merch/campaña; nunca en producto digital |
| Tipografías secundarias sin definir | Geist + Geist Mono (ver Tipografía) |
| Nombre escrito como "Axoncore" y "AXONCORE" | Válidos "AxonCore" (por defecto) y "AXONCORE" (piezas en mayúsculas); "Axoncore" no |
