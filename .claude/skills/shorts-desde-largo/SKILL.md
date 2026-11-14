---
name: shorts-desde-largo
description: Corta 2 o 3 shorts verticales (1080x1920, menos de 60 s) de un video largo propio, con título arriba, subtítulos grandes y llamada al video completo. Úsala después de producir un video largo.
---

# Shorts desde el video largo

1. Elige 2 o 3 tramos que se entiendan solos (un dato fuerte y su explicación). Mira `timeline.json` para los tiempos. Total de 25 a 55 s por short.
2. Desde la carpeta `shorts/` (con `CANAL_NOMBRE` en el entorno para la etiqueta de arriba):
   ```bash
   bash short.sh <salida> ../videos/NN/mi-video.mp4 ../videos/NN/thumbnail.jpg "TITULO" "SUBTITULO" "#ffd600" "12.0-31.5 40.2-55.0"
   ```
   Sale `<salida>/short.mp4` y `<salida>/thumbnail.jpg` (portada vertical, que también es el primer fotograma).
3. Escribe `<salida>/publicar.md` (título con #Shorts, 2 líneas de descripción y el link al video largo).
4. Solo se cortan videos **propios**. Nunca tramos de videos ajenos.
