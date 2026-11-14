---
name: automatizar-canal
description: Deja el canal produciendo solo con un ciclo programado que vigila las referencias, elige tema, investiga, escribe, produce el video y los shorts, y los deja listos o los programa en YouTube. Úsala cuando el primer video ya salió bien, o cuando pidan "automatízalo", "que suba solo" o "que haga un video cada día".
---

# Automatizar el canal

El ciclo está en `automatizacion/rutina.md`. Cada vez que corre, hace un video completo de punta a punta.

## 1. Acordar con la persona (una sola vez)
- **Frecuencia**: por ejemplo, un video cada 2 días a las 9:00. Producir tarda horas en CPU, así que la computadora tiene que quedar encendida y conectada.
- **Horario de publicación** en YouTube (por ejemplo, 15:00 UTC).
- **Publicación automática**: por defecto NO, y el ciclo deja el video listo para revisar. Si la persona escribe en el chat que quiere que suba solo, anota en `canal.md`: `Publicación automática: sí` y el horario. Explícale que los videos saldrán sin que los vea antes.

## 2. Programarlo (lo haces tú)
Primero prueba un ciclo a mano: `powershell -ExecutionPolicy Bypass -File automatizacion/correr_ciclo.ps1` (o `bash automatizacion/correr_ciclo.sh`) y revisa `automatizacion/ultimo_ciclo.log`.

Después, según el sistema:
- **Windows** (Programador de tareas):
  `schtasks /Create /TN "CanalYouTube" /SC DAILY /MO 2 /ST 09:00 /TR "powershell -ExecutionPolicy Bypass -File \"<ruta del repo>\automatizacion\correr_ciclo.ps1\""`
- **Mac/Linux** (cron): en `crontab -e` añade `0 9 */2 * * bash <ruta del repo>/automatizacion/correr_ciclo.sh`.
- Si la persona usa la app de escritorio de Claude Code, también puede crear una **tarea programada** en la app con el texto de `automatizacion/rutina.md`.

## 3. Seguimiento
- Cada ciclo deja su resumen en la sección Estado de `canal.md` y su log en `automatizacion/ultimo_ciclo.log`.
- Una vez por semana, revisa con la persona las vistas en YouTube Studio y ajusta los temas: más de lo que funcionó y menos de lo que no.
- Para pausarlo: `schtasks /Change /TN "CanalYouTube" /DISABLE` en Windows, o comenta la línea en `crontab -e`.

## Límites que no se saltan
- Nunca resubir ni recortar contenido ajeno.
- Los temas con acusaciones o cifras dudosas pasan por revisión humana, aunque la publicación automática esté activa.
- La cuota diaria de la API de YouTube limita cuántos videos se pueden subir por día.
