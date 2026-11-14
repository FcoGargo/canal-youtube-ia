---
name: crear-canal-youtube
description: Guía a la persona para crear su canal de YouTube, verificarlo, subir perfil y banner, y preparar la API de subida (client_secret y login). Úsala cuando todavía no hay canal o falta el acceso para subir.
---

# Crear el canal y preparar la subida

La persona hace los clics y los logins; tú le das los pasos de uno en uno y esperas a que confirme.

1. Sigue `guia/02-crear-canal.md`: crear canal (cuenta de marca si tendrá varios), handle, verificar teléfono, audiencia "no es para niños" salvo que lo sea.
2. Genera la imagen de marca con la mascota de `canal.md`: adapta `herramientas/perfil.html` y `herramientas/banner.html` (colores, ropa, prop del tema, nombre), y corre `node herramientas/perfil.js perfil.png` y `node herramientas/banner.js banner.png guia` (con `guia` dibuja la zona segura). La persona los sube a mano en Studio.
3. Pon el nombre del canal en `CANAL_NOMBRE` de `herramientas/extra.js` (sale en la mesa del presentador) y en `.env`.
4. Sigue `guia/03-youtube-api.md` para el `client_secret.json`. La persona corre `python subida/subir_youtube.py --login` en su terminal; tú le pides el ID que imprime y lo pones en `.env` como `CANAL_ID`. Luego `--probar` debe dar OK.
5. Anota en `canal.md`: handle, URL y que el login está hecho. **No** escribas el ID ni nada secreto en archivos que se suban a GitHub si la persona va a publicar su copia del repo.
