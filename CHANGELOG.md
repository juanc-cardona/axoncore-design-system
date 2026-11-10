# Changelog

## 2.0.0 — 2026-11-10

Nueva norma de versiones del logo. Deja obsoleta la sección de versiones del BRANDBOOK AXONCORE.pdf.

- **Horizontal (nuevo, versión principal):** isotipo a la izquierda del logotipo entero en una línea. Isotipo a 1,6X, separación de 0,75X, centros alineados (X = altura del logotipo).
- **Vertical:** pasa a nombrar la versión con el isotipo sobre el logotipo en una línea (antes llamada "Horizontal").
- **Retirada** la versión con el logotipo partido en dos líneas (`axon` / `core`).
- Maestros SVG regenerados desde el vector oficial (antes vectorizados desde PNG): curvas y terminales exactos. Gradiente con los HEX del brandbook.
- Pool PNG sustituido por los archivos oficiales de 2026-11-10.
- **Cambio de API:** `<Logo lockup="vertical">` ahora es el logo apilado. En navegación y cabeceras usa `lockup="horizontal"` (valor por defecto).
- Área de seguridad = X; mínimos: horizontal 24 px de alto, vertical 120 px de ancho, isotipo 20 px.
- Docs, skill `axoncore-brand` y Claude Design actualizados.

## 1.1.1 — 2026-10-08

- Nuevo tagline: "IA Generativa para impulsar tu negocio" en portada, showcase, voz y tono, skill y Claude Design.
- `text-wrap: balance` en estilos display para cortes de línea equilibrados.

## 1.1.0 — 2026-10-08

- Agrandir con licencia comercial: 9 estilos en WOFF2 (web/Claude Design) y OTF (escritorio); `fonts.css` los carga automáticamente.
- Regla de nombre: AxonCore (por defecto) y AXONCORE (piezas en mayúsculas).
- Claude Design: portada con logo oficial, banner de marca en el brand book, fuentes Agrandir cargadas.
- Skill: fuentes embebidas (`axoncore-fonts.css`) y regla "toda pieza abre con logo y titulares en Agrandir".
- Guía de implementación paso a paso de Claude Design (docs/09).

## 1.0.0 — 2026-10-08

- Primera versión del sistema: tokens (97 colores en tema oscuro y claro), 18 estilos tipográficos, espaciado, radios, sombras, gradientes, movimiento y layout.
- Logos vectorizados desde el pool oficial: Horizontal, Vertical e Isotipo en positivo, negativo, mono negro y mono blanco; favicons y patrón Axon.
- 12 componentes (Logo, Button, TextField, Checkbox, Switch, Badge, Card, Tabs, Alert, Stat, Table, SignalLine) en CSS + React.
- Salidas para CSS, Tailwind v3/v4, DTCG (Figma), JS y Claude Design.
- Guía de marca completa y skill `axoncore-brand`.
