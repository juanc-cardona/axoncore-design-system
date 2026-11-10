# Logo

El logo combina el **isotipo** (cuatro terminales triangulares unidas por un núcleo cóncavo: señales que convergen en un centro) y el **logotipo** `axoncore`, un lettering geométrico redondeado propio. El logotipo **no es Agrandir** ni ninguna fuente: usa siempre los archivos.

## Versiones

> **Norma vigente desde el 2026-11-10.** Sustituye a la sección de versiones del `BRANDBOOK AXONCORE.pdf`, que queda obsoleta en este punto hasta su actualización. El logotipo se usa **siempre entero, en una línea**: la versión con el logotipo partido en dos líneas (`axon` / `core`) queda retirada.

| Versión | Composición | Usar en |
|---|---|---|
| **Horizontal** · principal | Isotipo a la izquierda del logotipo en una línea. | Navegación web y de producto, cabeceras de documentos, firmas de email, pies de página, cualquier espacio de poca altura. |
| **Vertical** | Isotipo centrado sobre el logotipo en una línea. | Portadas, cierres de deck, pantallas de carga, formatos cuadrados o verticales, redes, merch frontal. |
| **Isotipo** | El símbolo solo. | Favicon, app icon, avatares, marcas de agua, espacios por debajo del tamaño mínimo del logo completo. |

## Construcción del horizontal

X = altura del logotipo `axoncore` (no tiene ascendentes ni descendentes: su altura es su altura de x).

| Parámetro | Valor | Ejemplo con X = 120 px |
|---|---|---|
| Altura del isotipo | **1,6X** | 192 px |
| Separación isotipo → logotipo | **0,75X** (del extremo de los brazos al borde izquierdo de la `a`) | 90 px |
| Alineación vertical | Centro del isotipo = centro del logotipo; el isotipo sobresale **0,3X** arriba y abajo | 36 px + 36 px |
| Proporción del conjunto | ≈ 7,36 : 1 (ancho : alto) | 1413 × 192 px |

El vertical conserva la construcción del archivo original: isotipo de ≈ 2,7X, centrado sobre el logotipo, separación ≈ 0,4X. Cada versión tiene su propia proporción porque cada una está limitada por una dimensión distinta (el horizontal por la altura, el vertical por el ancho); lo constante es el logotipo.

## Colorways

| Archivo | Isotipo | Logotipo | Fondo |
|---|---|---|---|
| `*-positive.svg` | Gradiente Signal | Negro #000000 | Claros (blanco, mist, `ink-100`–`ink-200`) |
| `*-negative.svg` | Gradiente Signal | Blanco #FFFFFF | Oscuros (negro, `ink-850`–`ink-1000`) — **versión principal** |
| `*-mono-black.svg` | Negro | Negro | Claros, impresión a una tinta, grabado |
| `*-mono-white.svg` | Blanco | Blanco | Oscuros, fotografía, fondos de color, bordado |

Archivos: grupo **Logos** (SVG maestros) y **Logos-PNG** (pool original). En código usa el componente `<Logo>`: el logotipo hereda `currentColor` y se adapta al tema.

## Gradiente del isotipo

Horizontal, de izquierda a derecha, en tres paradas: **#FC1C70 (0 %) → #C04AE1 (50 %) → #0082FB (100 %)**, ajustado al ancho del isotipo.

## Área de seguridad

- **Logo completo (horizontal y vertical):** X = altura del logotipo (equivale a la altura de la `o`). Deja X libre en los cuatro lados.
- **Isotipo solo:** X = 25 % del ancho del isotipo.
- Nada (texto, bordes, otros logos, cortes de página) entra en esa área.

## Tamaño mínimo

| Versión | Pantalla | Impresión |
|---|---|---|
| Horizontal | 24 px de alto (≈ 177 px de ancho) | 5 mm de alto (≈ 37 mm de ancho) |
| Vertical | 120 px de ancho | 30 mm de ancho |
| Isotipo | 20 px (16 px solo favicon) | 6 mm |

Por debajo del mínimo del horizontal, usa el isotipo solo.

## Usos incorrectos

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
11. Partir el logotipo en dos líneas (versión retirada).
12. Cambiar la proporción, la separación o la alineación del horizontal: usa siempre los archivos maestros.

## Patrón Axon

Grupo **Pattern** (`axon-pattern.svg`, `axon-pattern-black.svg`): retícula del isotipo para merch, packaging y fondos de campaña. Siempre en una tinta (`ink-*` o blanco al 6–12 % de opacidad sobre negro). Nunca detrás de texto de lectura ni en producto digital.
