---
name: subir-youtube
description: Sube un video terminado a YouTube con subida/subir_youtube.py (privado, público o programado, con miniatura y subtítulos). Úsala solo cuando la persona dio su OK escrito para ese video.
---

# Subir a YouTube

1. Requisitos: `subida/client_secret.json`, login hecho (`--probar` da OK) y `CANAL_ID` en `.env`. Si falta, skill `crear-canal-youtube`.
2. Confirma con la persona: qué video, título, y si va **privado** (por defecto), **público** o **programado** (fecha y hora con zona horaria).
3. Con su OK escrito en el chat:
   ```bash
   python subida/subir_youtube.py --subir videos/NN-tema/subir --confirmo-ok
   ```
   Añade `--publico` o `--publicar-en 2026-12-01T15:00:00Z` solo si lo pidió.
4. Reporta el link `https://youtu.be/...` y el de Studio. Anota en `canal.md` qué se subió y cuándo.
5. Si la miniatura falla, el canal no ha verificado el teléfono (youtube.com/verify).

Nunca uses el token de otro canal. Nunca muestres el contenido de `token.json` ni de `client_secret.json`.
