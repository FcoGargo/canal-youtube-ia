---
name: vigilar-referencias
description: Estudia el canal y el video de referencia de la persona para sacar temas que funcionan y el formato a imitar, sin copiar contenido. Úsala al arrancar, antes de elegir cada video nuevo, o cuando pidan "qué está subiendo el canal X" o "qué le funciona".
---

# Vigilar canales de referencia

## Canal
1. `python vigilancia/vigilar_canal.py <link_del_canal> --n 60` (o `--todos` para los de `vigilancia/canales.txt`).
2. Lee los **destacados** (2x o más la mediana): son temas que ese público ya quiere. Agrúpalos en 3 a 5 familias de temas.
3. Para el formato, baja solo los subtítulos de 2 o 3 destacados: `python vigilancia/vigilar_canal.py --subtitulos <link_video>`. Estudia la estructura (gancho, giros, cierre), no las frases.
4. Si hay canales pequeños del mismo nicho con videos que superan mucho su mediana, son la mejor evidencia: anótalos.

## Video de referencia (archivo de la persona)
1. `bash vigilancia/estudiar_video.sh referencia/<archivo> 5`.
2. Mira las hojas de `referencia/estudio/`: ritmo de cortes, texto en pantalla, presentador, colores, tipo de miniatura.
3. Transcribe `referencia/estudio/audio.wav` con Parakeet si hace falta ver el guion.

## Entrega a la persona
- 5 temas candidatos con su evidencia (título del destacado y cuántas veces superó la mediana).
- El formato en 5 líneas (duración, gancho, ritmo, presentador, miniatura).
- Qué harás distinto para que sea propio.

Nunca descargues el video ajeno completo ni uses sus imágenes o audio en tus videos.
