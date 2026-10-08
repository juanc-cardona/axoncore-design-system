# 04 · Tipografía

## Sistema

| Rol | Familia | Por qué |
|---|---|---|
| **Display** (titulares, cifras, campaña) | **Agrandir** (Pangram Pangram) | La voz de la marca: grotesca contemporánea con cinco anchos que permiten expresar desde lujo editorial (Wide Light) hasta impacto (Grand Heavy). |
| **Texto y UI** | **Geist** (Vercel, SIL OFL) | Neogrotesca diseñada para interfaces y desarrolladores: legible a 12–16 px, neutra junto a Agrandir, con carácter tecnológico. Tipografía de acompañamiento para publicidad y comunicación. |
| **Código y datos** | **Geist Mono** (SIL OFL) | Misma estructura que Geist: tablas, CLI, IDs, eyebrows. |

Regla del brandbook: **máximo dos familias por pieza** (Agrandir + Geist; Geist Mono cuenta como parte de Geist).

## Las variantes nativas de Agrandir y su rol

| Familia CSS | Archivo | Peso | Rol |
|---|---|---|---|
| `Agrandir Wide` | WideLight | 300 | **Hero**: frase de marca, portadas premium. |
| `Agrandir Wide` | WideBlackItalic | 900 italic | **Sello** (`type-stamp`): CTA de campaña, stickers. Mayúsculas. |
| `Agrandir Grand` | GrandHeavy | 800 | **Impacto** (`type-impact`): titulares de campaña ≤ 4 palabras. |
| `Agrandir Grand` | GrandLight | 300 | Portadas y aperturas editoriales alternativas. |
| `Agrandir` | Regular | 400 | **Display / H1**: titulares de sección y página. |
| `Agrandir` | TextBold | 700 | **H2 / H3**: títulos de sección y de card. |
| `Agrandir` | ThinItalic | 100 italic | **Cita** (`type-quote`): pull quotes, acentos editoriales. |
| `Agrandir Tight` | Tight | 400 | **Métrica** (`type-metric`): KPIs, cifras grandes. |
| `Agrandir Narrow` | Narrow | 400 | **Overline** (`type-overline`): kickers de campaña, mayúsculas. |

## Escala

| Estilo | Familia | Tamaño / interlineado | Peso | Tracking | Móvil |
|---|---|---|---|---|---|
| `type-hero` | Agrandir Wide | 96 / 0.95 | 300 | −0.03em | 56 |
| `type-impact` | Agrandir Grand | 72 / 0.95 | 800 | −0.02em | 44 |
| `type-display` | Agrandir | 56 / 1.0 | 400 | −0.02em | 40 |
| `type-h1` | Agrandir | 40 / 1.1 | 400 | −0.015em | 32 |
| `type-h2` | Agrandir | 28 / 1.2 | 700 | −0.01em | — |
| `type-h3` | Agrandir | 20 / 1.3 | 700 | −0.005em | — |
| `type-metric` | Agrandir Tight | 64 / 1.0 | 400 | −0.02em | 48 |
| `type-quote` | Agrandir | 32 / 1.25 | 100 italic | −0.01em | 26 |
| `type-stamp` | Agrandir Wide | 18 / 1.0 | 900 italic | 0.02em · MAYÚS | — |
| `type-overline` | Agrandir Narrow | 14 / 1.2 | 400 | 0.06em · MAYÚS | — |
| `type-lead` | Geist | 20 / 30 | 400 | −0.01em | — |
| `type-body` | Geist | 16 / 24 | 400 | 0 | — |
| `type-body-sm` | Geist | 14 / 20 | 400 | 0 | — |
| `type-label` | Geist | 14 / 20 | 500 | 0 | — |
| `type-caption` | Geist | 12 / 16 | 400 | 0.01em | — |
| `type-eyebrow` | Geist Mono | 12 / 16 | 500 | 0.12em · MAYÚS | — |
| `type-code` | Geist Mono | 13 / 20 | 400 | 0 | — |
| `type-data` | Geist Mono | 14 / 20 | 500 · tabular | 0 | — |

## Reglas

1. **Agrandir nunca por debajo de 18 px**, salvo `type-overline` (14 px) y `type-stamp`. El texto corrido siempre en Geist.
2. **Sentence case** en titulares y UI. Mayúsculas solo en eyebrow, overline y stamp.
3. Un único `type-hero` o `type-impact` por página o pieza.
4. Titulares cortos: hero ≤ 6 palabras, impact ≤ 4.
5. Cifras de dashboards en `type-metric` o `type-data` (numerales tabulares).
6. Medida de lectura: 60–75 caracteres (`container-prose` 680 px).
7. Interlineado ajustado (0.95–1.1) solo a partir de 40 px.

## Licencias — acción requerida

- **Agrandir:** los archivos recibidos son la **licencia personal gratuita** de Pangram Pangram ("for personal use only"; prohíbe redistribuir). Para uso comercial (web, apps, publicidad, Claude Design) se necesita la licencia **Desktop + Web** en pangrampangram.com. Por eso el repositorio **no incluye** los archivos: colócalos en `fonts/agrandir/` (WOFF2) tras adquirir la licencia y ejecuta `npm run build`. Mientras tanto, los estilos display caen a Geist.
- **Geist / Geist Mono:** SIL Open Font License 1.1, incluidas en `fonts/geist/` con su licencia.
