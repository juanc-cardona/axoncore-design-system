# 02 · Logo

El logo combina el **isotipo** (cuatro terminales triangulares unidas por un núcleo cóncavo: señales que convergen en un centro) y el **logotipo** `axoncore`, un lettering geométrico redondeado propio. El logotipo **no es Agrandir** ni ninguna fuente: usa siempre los archivos.

## Versiones (nomenclatura del pool de archivos)

La nomenclatura sigue la dirección del logotipo:

| Versión | Composición | Usar en |
|---|---|---|
| **Horizontal** | Isotipo centrado sobre el logotipo en una línea. | Portadas, firmas centradas, pantallas de carga, merch frontal. |
| **Vertical** | Isotipo a la izquierda del logotipo en dos líneas (`axon` / `core`). | Navegación web, cabeceras de documentos, firmas de email, espacios horizontales. |
| **Isotipo** | El símbolo solo. | Favicon, app icon, avatares, marcas de agua, espacios < tamaño mínimo del logo completo. |

## Colorways

| Archivo | Isotipo | Logotipo | Fondo |
|---|---|---|---|
| `*-positive.svg` | Gradiente Signal | Negro #000000 | Claros (blanco, mist, `ink-100`–`ink-200`) |
| `*-negative.svg` | Gradiente Signal | Blanco #FFFFFF | Oscuros (negro, `ink-850`–`ink-1000`) — **versión principal** |
| `*-mono-black.svg` | Negro | Negro | Claros, impresión a una tinta, grabado |
| `*-mono-white.svg` | Blanco | Blanco | Oscuros, fotografía, fondos de color, bordado |

Archivos: `assets/logo/svg/` (maestros vectoriales) y `assets/logo/png/` (pool original). En código usa el componente `<Logo>`: el logotipo hereda `currentColor` y se adapta al tema.

## Gradiente del isotipo

Horizontal, de izquierda a derecha, en tres paradas: **#FC1C70 (0 %) → #C04AE1 (50 %) → #0082FB (100 %)**, ajustado al ancho del isotipo. Los PNG originales usan una versión convertida desde CMYK (#E52873 → #3975BA); los SVG maestros restauran los valores RGB del brandbook para pantalla.

## Área de seguridad

- **Logo completo:** X = altura de la letra `o` del logotipo. Deja X libre en los cuatro lados.
- **Isotipo solo:** X = 25 % del ancho del isotipo.
- Nada (texto, bordes, otros logos, cortes de página) entra en esa área.

## Tamaño mínimo

| Versión | Pantalla | Impresión |
|---|---|---|
| Horizontal | 120 px de ancho | 30 mm |
| Vertical | 96 px de ancho | 24 mm |
| Isotipo | 20 px (16 px solo favicon) | 6 mm |

## Usos incorrectos

Del brandbook y de las inconsistencias detectadas en sus mockups:

1. Deformar, estirar o comprimir el logo.
2. Cambiar colores: un solo azul, el logotipo en gradiente, el isotipo en un color de marca plano.
3. Reescribir el logotipo con cualquier fuente (incluida Agrandir).
4. Desenfocar, pixelar o usar el logo con poca legibilidad.
5. **Reflejar (espejo) o rotar** el logo o el isotipo.
6. Aplicar el gradiente al logotipo (solo el isotipo lleva gradiente).
7. Colocar la versión a color sobre fondos de gradiente o fotografías cargadas: usa `mono-white`.
8. Añadir sombras, contornos, brillos o efectos 3D.
9. Reordenar o reescalar por separado isotipo y logotipo.
10. Usar el logo como parte de una frase.

## Patrón Axon

`assets/pattern/axon-pattern.svg`: retícula del isotipo para merch, packaging y fondos de campaña. Siempre en una tinta (`ink-*` o blanco al 6–12 % de opacidad sobre negro). Nunca detrás de texto de lectura ni en producto digital.
