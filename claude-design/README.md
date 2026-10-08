# Claude Design — fuente del sistema "AxonCore"

Esta carpeta guarda los textos (brand book, secciones, guías de componentes) y las previews del Design System publicado en Claude Design. El resto se genera desde el repo:

| En Claude Design | Desde el repo |
|---|---|
| `project/tokens.json` | `dist/claude-design/tokens.json` |
| `project/components/bundle.js` | `dist/react/axoncore.umd.js` |
| `project/components/bundle.css` | `dist/css/components.css` |
| `project/components/index.d.ts` | `dist/react/index.d.ts` |
| `project/fonts/*` | `fonts/geist/*.woff2` (+ Agrandir WOFF2 con licencia) |
| `project/assets/*` | `assets/logo/*`, `assets/favicon/*`, `assets/pattern/*` |

Para re-sincronizar: `npm run build`, luego pide a Claude "re-sincroniza el sistema de Claude Design AxonCore desde el repositorio axoncore-design-system".
