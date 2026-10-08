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

## Claude Design: implementación paso a paso

Claude Design ofrece dos superficies que conviene cubrir:

| Superficie | Dónde se usa | Qué hacemos |
|---|---|---|
| **Design System en Claude (chat, Proyectos, Claude Code)** | Cualquier chat que cree decks, diseños, landings o docs | Ya creado: artefacto **AxonCore** (sistema de diseño) |
| **Claude Design standalone** (`claude.ai/design`) | Proyectos creados desde la home de Claude Design | Se configura una organización y se publica el sistema |

Requisitos: plan Pro, Max, Team o Enterprise (funcionalidad en beta). En Enterprise, un owner debe activar **Sistemas de diseño** en **Configuración de la organización › Artefactos**.

### Fase A — Activar el sistema AxonCore ya creado (chat)

1. **Ábrelo y revísalo.** Desde la tarjeta del chat o desde la galería de artefactos. Comprueba portada (logo + Agrandir), tokens en los dos temas, tipografía y los 12 componentes.
2. **Gestiónalo en Configuración › Sistemas de diseño.** Ahí aparecen los sistemas de la cuenta. En Team/Enterprise, un owner puede reservar quién publica y **fijar AxonCore como sistema por defecto de la organización**: desde ese momento cualquier deck o diseño lo aplica sin pedirlo.
3. **Compártelo con el equipo** desde el menú *Share* de la página del sistema (es privado hasta que lo compartas).
4. **Úsalo en el Proyecto "Brand".** Instala la skill `axoncore-brand` (botón *Save skill*). Con sistema + skill, cada petición del tipo "crea un deck de ventas" sale con logo, Agrandir, tokens y voz de marca.
5. **Prueba de validación** (5 minutos): pide en un chat nuevo *"Con el sistema de diseño AxonCore, crea una landing para el copiloto de IA, un deck de 6 slides de presentación comercial y un one-pager"*. Revisa con el checklist de la skill.

### Fase B — Claude Design standalone (`claude.ai/design`)

1. **Organización.** Abre Claude Design → clic en el nombre de la organización (abajo a la izquierda del selector de proyectos) → selecciona o crea **AxonCore** → completa el onboarding.
2. **Carga las fuentes de verdad** (en el onboarding o después desde la configuración de la organización), en este orden de prioridad:
   1. **Codebase:** el repositorio `axoncore-design-system` (enlazado o subido como zip). Es la fuente de mayor fidelidad: tokens, CSS y componentes React exactos.
   2. **Assets individuales:** `assets/logo/svg/*`, `assets/favicon/*`, `assets/pattern/*` y las fuentes `fonts/agrandir/*.woff2` + `fonts/geist/*.woff2`.
   3. **Documento de marca:** `BRANDBOOK AXONCORE.pdf` y la guía `docs/` (exportada a PDF) como contexto, nunca como fuente de valores (el repo manda).
   4. **Ejemplos reales:** `examples/index.html` (showcase) y la captura `docs/showcase.png`. Los ejemplos terminados transmiten el carácter mejor que una paleta.
3. **Revisa lo generado** contra el repo: paleta (núcleo negro, espectro, neutros), tipografía (Agrandir en display con sus 9 estilos, Geist en texto), componentes y espaciado. Si algo no coincide, súbelo de nuevo o corrígelo pidiéndoselo a Claude.
4. **Valida con un proyecto de prueba:** landing, dashboard y one-pager.
5. **Publica:** botón **Publicado**. A partir de ahí, los proyectos creados desde la home de Claude Design en la organización usan AxonCore en lugar del sistema por defecto.
6. **Actualizar:** Configuración de la organización → **Abrir** junto al sistema → **Remix** (arriba a la derecha) → pide el cambio en el chat.

Alternativa para equipos de producto: si el código vive en un repo React, ejecuta `/design-sync` en Claude Code dentro del repositorio para que Claude lea tokens y componentes directamente.

### Fase C — Gobierno y sincronización

1. **Fuente única:** todo cambio entra por el repo (PR + CI). Nunca edites valores solo en Claude Design.
2. **Re-sincronizar:** tras un merge, pide a Claude *"Re-sincroniza el sistema de diseño AxonCore desde el repositorio"* (o *Remix* en standalone con el nuevo zip).
3. **Responsable:** una persona (Brand/Design lead) aprueba publicaciones y cambios de default.
4. **Revisión trimestral:** auditoría de contraste (`npm run check`), revisión de piezas publicadas y del registro de decisiones.

## Versionado

SemVer en `package.json`: **major** = cambia o se elimina un token/componente; **minor** = nuevos tokens/componentes; **patch** = correcciones de valor sin cambio de nombre. Cada decisión de marca se registra en `docs/decisiones.md`.
