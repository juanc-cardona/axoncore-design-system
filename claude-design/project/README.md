**Dark Core, Signal Spectrum.** AxonCore es una compañía tecnológica AI-First de ticket alto: seria, experta, contemporánea y flexible. El negro de marca sostiene la identidad; el espectro Axon — Pulse `#FC1C70` → Synapse `#C04AE1` → Signal `#0082FB` — aparece como un impulso de señal, nunca como fondo.

Pilares: **Precisión e inteligencia** · **Conectividad dinámica** · **Claridad técnica**.

## Cómo usar este sistema

- Diseña en el tema **Dark · Core** por defecto (`bg-canvas` negro). Usa **Light** para documentos, propuestas, documentación extensa e impresión.
- Usa siempre tokens semánticos (`bg-*`, `text-*`, `border-*`, `accent`, `tone-*`, `status-*`); las escalas `ink-*`, `pulse-*`, `synapse-*`, `signal-*` son para casos puntuales (gráficos, ilustración).
- Componentes: clases `.ax-*` de `bundle.css` o React vía `window.AxonCore` (`Logo`, `Button`, `TextField`, `Checkbox`, `Switch`, `Badge`, `Card`, `Tabs`, `Alert`, `Stat`, `Table`, `SignalLine`). Tipografía: clases `.type-*`.
- Pon `class="ax-root"` en `body` para fondo, color y fuente base.

## Color

**Proporción por composición:** núcleo oscuro 60–70 % (`bg-canvas`, `bg-surface`, `bg-raised`) · neutros 20–30 % (`text-*`, `border-*`) · Signal ≤ 8 % (`accent`, `tone-signal`) · espectro, Pulse y Synapse ≤ 2 %.

- Texto principal `text-primary`; apoyo `text-secondary`; meta y placeholders `text-muted`; enlaces `text-link`. Todos cumplen ≥ 4,5:1 sobre cualquier `bg-*` en ambos temas.
- Cards en `bg-raised` + `border-default` + `shadow-1`; menús y diálogos en `bg-overlay` + `shadow-3`; inputs en `bg-sunken` + `border-strong`.
- **Botón principal monocromo:** `action-primary` con `on-action-primary` (blanco sobre oscuro, negro sobre claro). Una acción principal por vista.
- **Signal** (`accent`) es el único color de acción: botón signal, selección, foco de datos. **El texto sobre `accent` es negro** (`on-accent`); el blanco no alcanza contraste.
- Significado del espectro: `tone-pulse` = en vivo, tiempo real, energía · `tone-synapse` = contenido generado por IA, modelos · `tone-signal` = interacción, datos. Fondos tintados con `tone-*-subtle`.
- Estados: `status-success`, `status-warning`, `status-danger` (naranja-rojo, nunca confundible con Pulse), `status-info`; siempre con icono o palabra.
- Foco: `outline: 2px solid var(--focus-ring); outline-offset: 2px` en todo elemento interactivo.
- `gradient-signal` solo en: isotipo, líneas de señal de 1–2 px (`SignalLine`), indicador de pestaña activa, hairline superior de una card destacada, un dato clave. Nunca detrás de texto, en botones, en texto ni en el logotipo; nunca dos por vista. `gradient-core` da profundidad a héroes oscuros.

## Tipografía

- **Agrandir** para display, con roles fijos: `type-hero` (Wide Light, ≤ 6 palabras, una por página) · `type-impact` (Grand Heavy, ≤ 4 palabras, campaña) · `type-display` y `type-h1` (Regular) · `type-h2`, `type-h3` (Text Bold) · `type-metric` (Tight, KPIs) · `type-quote` (Thin Italic) · `type-stamp` (Wide Black Italic, mayúsculas, sellos y CTA de campaña) · `type-overline` (Narrow, mayúsculas).
- **Geist** para texto y UI: `type-lead`, `type-body`, `type-body-sm`, `type-label`, `type-caption`. **Geist Mono** para `type-eyebrow`, `type-code`, `type-data`.
- Máximo dos familias por pieza. Agrandir nunca por debajo de 18 px (salvo overline y stamp); el texto corrido siempre en Geist. Sentence case; mayúsculas solo en eyebrow, overline y stamp.
- Agrandir requiere licencia comercial; hasta cargar sus webfonts, los estilos display se muestran en Geist.

## Espacio, forma y movimiento

- Unidad 4 px; layouts en 8 px: `space-4` gap por defecto, `space-6` padding de card y gutter, `space-16` entre bloques, `space-24` padding de sección. Contenedor 1280 px, 12 columnas. Ticket alto = aire: ante la duda, un paso más de espacio.
- Radios: `radius-sm` inputs, `radius-md` botones y tabs, `radius-lg` cards y diálogos, `radius-xl` media y paneles hero, `radius-full` pills y switches.
- Elevación en oscuro = superficie más clara + borde + brillo superior (`shadow-1`…`shadow-3`). `shadow-signal` solo para el elemento IA activo, una vez por vista.
- Glass (`bg-glass` + `blur-glass` + `border-subtle`) solo en navegación fija, paneles sobre imagen y tarjetas flotantes de dashboard.
- Movimiento: 80 / 140 / 220 / 360 ms con `cubic-bezier(0.16, 1, 0.3, 1)`. Botón presionado baja 1 px; card interactiva sube 2 px. Respeta `prefers-reduced-motion`.

## Iconografía

Lucide, trazo 1,5 px, terminaciones redondeadas, 16 / 20 / 24 px, `currentColor`. Sin emoji en interfaz. Iconos rellenos solo para estados.

## Logo

Usa siempre los archivos de **Logos**: nunca reescribas `axoncore` con una fuente. *Horizontal* = isotipo sobre logotipo en una línea; *Vertical* = isotipo a la izquierda del logotipo en dos líneas; *Isotipo* = símbolo solo. `negative` sobre oscuro (principal), `positive` sobre claro, `mono-white` sobre fotografía o color. En React: `<Logo lockup="vertical" height={28} />`. Detalle en la sección Logo.

## Voz

Profesional, confiable, directa y visionaria. Voz activa, frases cortas, datos antes que adjetivos, tuteo, sin emoji ni exclamaciones ni buzzwords. Botones = verbo + objeto: "Solicitar demo", "Crear workspace". Tagline: *Inteligencia, conectada.* Detalle en la sección Voz y tono.

## Nombre

Escribe **AxonCore**. Nunca Axoncore, AXONCORE ni Axon Core.
