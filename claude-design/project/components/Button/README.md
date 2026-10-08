# Button

Acción del usuario en cinco variantes y tres tamaños.

- `primary` (monocromo, `action-primary`): la acción principal, **una por vista**.
- `signal` (`accent`, texto negro `on-accent`): el momento de intención — demo, IA, desplegar. Máximo uno por vista.
- `secondary` (borde `border-strong`) y `ghost`: alternativas y navegación. `danger`: destructivas.
- Tamaños `sm` 32 px, `md` 40 px, `lg` 48 px. `loading` muestra spinner y `aria-busy`; `iconOnly` exige `aria-label`; `href` lo convierte en enlace.
- Etiqueta = verbo + objeto en sentence case: "Solicitar demo", "Crear workspace". Nunca "OK" ni "Haz clic aquí".
