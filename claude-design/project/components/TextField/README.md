# TextField

Campo de texto con label, ayuda y error; admite textarea.

El consumidor pasa `label`, `placeholder`, `hint` o `error` (sustituye al hint y marca `aria-invalid`), y `multiline` para textarea. Todo prop de input nativo se reenvía.

- Fondo `bg-sunken`, borde `border-strong`, foco con borde `accent` y halo `tone-signal-subtle`.
- Labels en sentence case, sin dos puntos. Ayuda breve y concreta: "Minúsculas y guiones."
- Mensajes de error accionables: qué pasó y cómo resolverlo.
