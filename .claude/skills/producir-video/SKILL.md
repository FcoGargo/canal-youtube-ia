---
name: producir-video
description: Produce un video desde guion.json - voz con Chatterbox, recorte y tiempos por palabra, animación "Ink Notebook" en canvas, música y efectos originales, mezcla a -14 LUFS, miniatura y subtítulos en varios idiomas. Úsala cuando el guion ya tiene OK.
---

# Producir un video

Trabaja en `videos/NN-tema/`. Copia ahí todo `herramientas/` (con `fonts/`) y el `guion.json` aprobado. En `herramientas/` corre `npm install` una vez. Usa el Python del entorno (`PYTHON` en `.env`).

## 1. Escenas con tiempos de prueba
- `python fake_tl.py guion.json tl_fake.json`: tiempos falsos para animar antes de tener voz.
- Escribe `escenas.js` (funciones `S[1]..S[8]`, cámara `CAM`, efectos `SFX`) y `portada.js` (función `thumb()`). Mira `ejemplo/escenas.js` y `ejemplo/portada.js`: personajes de papel (`puppet`), presentador (`anchorDesk`), flechas, gráficas que se dibujan, cifras que cuentan.
- `python build.py escenas.js portada.js escena.html`.

## 2. Revisar antes de gastar tiempo
- `node render.js tl_fake.json prueba/s 30 2,8,15,25,40,60,90,120` saca fotos sueltas.
- `bash hoja.sh prueba s hoja.jpg` las junta. Míralas: nada cortado, texto legible, sin errores `PAGEERROR`.

## 3. Voz
- `mkdir voz` y `python voz.py all` (Chatterbox en CPU; tarda). `EX` (0.4 a 0.8) y `CFG` (0.3 a 0.6) ajustan la expresión.
- Escucha las frases. Rehaz las malas con otra semilla: `python voz.py 7 2,3` y anota la buena en `semillas.json` (`{"7": 3}`).
- Para otro idioma que no sea inglés usa el modelo multilingüe de Chatterbox (adapta `voz.py`) u otra voz local con licencia comercial.

## 4. Todo lo demás
- `bash producir.sh mi-video.mp4` hace: recorte (`recortar.py`), armado (`armar.py`, atempo 0.9, `timeline.json`, `narracion.wav`, `subtitles_en.srt`), render, música (`musica.py`), mezcla con sidechain y `loudnorm` a -14 LUFS, miniatura y subtítulos.
- Para subtítulos traducidos, antes escribe `traducciones.json`: `{"es": ["frase 1", ...], "pt": [...]}` con una traducción por frase del guion. `subs.py` los crea en `subtitulos/`.

## 5. Carpeta de subida
`subir/` con: un solo `.mp4`, `thumbnail.jpg`, `publicar.md` y `subtitulos/`. Muéstrale a la persona video, miniatura y título.

## Miniatura que funciona
1280x720, 2 o 3 palabras ENORMES con contorno negro y una cifra, colores muy contrastados, el presentador con cara de sorpresa y una flecha amarilla. Revisa que se lea en tamaño pequeño.
