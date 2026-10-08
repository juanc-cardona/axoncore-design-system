# Alert

Mensaje en línea sobre el estado del sistema.

`tone`: `info`, `success`, `warning`, `danger` (usa `role="alert"`), `ai` (Synapse, para contenido generado por IA). Pasa `title` y `children`. Título = qué pasó; cuerpo = por qué y qué hacer. Marca siempre el contenido generado por IA con `tone="ai"`.
