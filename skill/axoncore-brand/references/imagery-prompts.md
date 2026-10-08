# 08 · Imagen y prompts para IA

## Dirección de arte

**Concepto:** *estructura iluminada por una señal.* Entornos oscuros, materiales técnicos y una sola fuente de luz con intención.

| Sí | No |
|---|---|
| Negro profundo y grafito mate dominantes | Escenas saturadas tipo cyberpunk / neón total |
| Una luz de acento azul Signal (#0082FB) con matices magenta–violeta mínimos | Arcoíris, múltiples gradientes de color |
| Macro de materiales: vidrio, fibra óptica, aluminio mecanizado, cerámica técnica | Cerebros brillantes, robots humanoides, manos robóticas, lluvia de código binario |
| Personas reales trabajando, luz baja, encuadre editorial | Stock sonriente mirando a cámara |
| Composición con mucho espacio negativo para tipografía | Fondos cargados que compiten con el titular |
| Formas que evocan convergencia (cuatro vectores hacia un núcleo) | Placas de circuito y redes de nodos genéricas |

Tratamiento: grano fino, contraste alto, negros puros, sin viñeteado exagerado ni lens flare.

## Estructura de prompt

```
[SUJETO] + [ESCENARIO AXONCORE] + [LUZ] + [MATERIALES] + [CÁMARA / COMPOSICIÓN] + [ESTILO] + [PARÁMETROS]
```

**Bloque de estilo AxonCore (reutilizable, en inglés para mejores resultados):**

```
deep black environment, matte graphite surfaces, single precise rim light in electric blue #0082FB,
subtle magenta #FC1C70 to violet #C04AE1 accent reflections, premium minimal technology aesthetic,
high contrast, pure blacks, fine film grain, generous negative space, engineered precision, calm and serious mood
```

**Negativo:** `no text, no logos, no neon overload, no rainbow, no humanoid robots, no glowing brain, no binary code, no circuit board, no lens flare, no cartoon`

## Plantillas

**Héroe abstracto (web, 16:9)**
```
Macro photograph of four machined aluminum vectors converging into a concave core, [bloque de estilo],
centered composition with negative space on the left third for a headline, shallow depth of field, 85mm
--ar 16:9 --style raw
```

**Retrato de equipo (editorial, 4:5)**
```
Editorial portrait of a data engineer reviewing a dashboard in a dark studio, face lit by the blue glow of the screen,
[bloque de estilo], natural skin texture, candid, 50mm, f/2 --ar 4:5 --style raw
```

**Producto / dato físico (3D, 1:1)**
```
3D render of translucent glass fibers carrying a single pulse of light from magenta to blue into a graphite core,
[bloque de estilo], studio render, octane-like realism, black seamless background --ar 1:1
```

**Fondo para slides (16:9, texto encima)**
```
Ultra minimal dark gradient field from #1E1E1E at the top to pure black, a single thin horizontal line of light
fading from magenta to violet to blue at the lower third, [bloque de estilo], empty space for typography --ar 16:9
```

Parámetros: ajusta `--ar`, versión y estilizado a la herramienta (Midjourney, DALL·E, Firefly, Imagen). Para DALL·E/Imagen elimina los parámetros `--` y describe el formato en texto.

## Revisión antes de publicar

1. ¿El negro domina (≥ 60 %)? 2. ¿Hay una sola fuente de color? 3. ¿Queda espacio para el titular? 4. ¿Evita los clichés de IA? 5. ¿Sin texto ni logos falsos generados? El logo se añade después, desde los archivos oficiales.
