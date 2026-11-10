# Logo

Logo de AxonCore en SVG inline; el logotipo usa currentColor y sigue el tema.

El consumidor elige `lockup` (`horizontal`, por defecto: isotipo a la izquierda del logotipo en una línea · `vertical`: isotipo sobre el logotipo en una línea · `isotype`), `tone` (`color` con isotipo en gradiente · `mono`) y `height` en px.

- Navegación: `lockup="horizontal"` a 28 px. Footer: `isotype`, `tone="mono"`, 24 px. Portadas y cierres: `vertical`.
- El color del logotipo hereda `color` del contenedor: deja `text-primary`.
- Respeta el área de seguridad (altura de la "o") y los mínimos: horizontal 24 px de alto, vertical 120 px de ancho, isotipo 20 px.
- No lo coloques en color sobre fotografía o gradiente: usa `tone="mono"` en blanco.
