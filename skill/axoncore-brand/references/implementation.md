# 09 · Implementación y Claude Design

## Modelo de fidelidad: una fuente, muchos destinos

```
tokens/axoncore.tokens.json  ─┐
src/css/components.css        ├─ npm run build ─▶ dist/css · dist/tailwind · dist/tokens (DTCG) · dist/react
src/react/factory.js          ─┘                └▶ dist/claude-design/tokens.json ─▶ Claude Design (Design System "AxonCore")
skill/axoncore-brand/          ─────────────────────▶ Skill instalada en Claude / Claude Code
```

1. **Nunca se edita un valor en dos sitios.** Todo cambio entra por `tokens/axoncore.tokens.json` (o `src/`) mediante pull request.
2. **CI valida** build + contraste (`npm run check`) en cada PR.
3. **Claude Design consume lo mismo:** `tokens.json` generado, el mismo CSS de componentes como `bundle.css` y el mismo código React como `bundle.js` (`window.AxonCore`). Un botón en Claude Design y en producción comparten clases, valores y lógica.
4. **La skill** enseña a Claude las reglas que el código no puede imponer (proporción de color, voz, usos del logo).

## Consumo por tipo de proyecto

| Proyecto | Qué importar |
|---|---|
| HTML/CSS estático | `dist/css/axoncore.css` + clases `.ax-*` y `.type-*`; `<html data-theme="dark|light|auto">` |
| React | `dist/css/axoncore.css` + `import { Button } from "@axoncore/design-system/react"` |
| Tailwind v3 | `presets: [require("@axoncore/design-system/tailwind")]` + CSS de tokens |
| Tailwind v4 | `@import` de `css/tokens.css` y `tailwind/axoncore-theme.css` |
| Figma (Tokens Studio) | `dist/tokens/dtcg/primitives.json`, `theme-dark.json`, `theme-light.json` |
| JS (gráficos, canvas, emails) | `dist/tokens/tokens.mjs` → valores resueltos por tema |
| Claude Design | Design System "AxonCore" (ver abajo) |

## Claude Design

El sistema "AxonCore" contiene: brand book (README), tokens de color en dos temas, escala tipográfica, espaciado, radios, sombras, gradientes, logos SVG y PNG, patrón, favicons, fuentes Geist y los 12 componentes con preview en vivo.

**Para máxima fidelidad:**

1. **Úsalo como sistema por defecto** de la cuenta, para que cualquier deck, diseño o landing creado con Claude lo aplique sin pedirlo.
2. **Pide por nombre:** "con el sistema de diseño AxonCore". Claude lee primero el README y los tokens.
3. **Agrandir:** cuando tengas la licencia web, sube los WOFF2 al sistema (carpeta de fuentes). Hasta entonces los titulares se ven en Geist.
4. **Cambios:** modifica el repo, deja que CI valide y pide a Claude "re-sincroniza el sistema AxonCore desde el repositorio". Evita editar valores directamente en la página del sistema sin reflejarlos en el repo; si ocurre, trasládalos al repo en el mismo día.
5. **Revisión:** antes de publicar cualquier pieza, pasa el checklist de la skill.

## Versionado

SemVer en `package.json`: **major** = cambia o se elimina un token/componente; **minor** = nuevos tokens/componentes; **patch** = correcciones de valor sin cambio de nombre. Cada decisión de marca se registra en `docs/decisiones.md`.
