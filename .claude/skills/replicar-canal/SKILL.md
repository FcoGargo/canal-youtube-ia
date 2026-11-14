---
name: replicar-canal
description: Monta un canal de YouTube de videos animados con IA tomando como modelo los temas y el formato de un canal de referencia, con guion, investigación, arte y voz propios. Úsala al arrancar este repo, o cuando pidan "replicar", "clonar" o "hacer un canal como" otro.
---

# Replicar un canal (temas y formato, contenido propio)

"Replicar" = estudiar qué temas y qué formato le funcionan a un canal y hacer videos **propios** con eso. Nunca descargar, recortar o resubir videos ajenos, ni copiar nombres, personajes, frases o miniaturas.

## Pasos
1. **Video de referencia**: pide a la persona que suba un video que muestre el tipo de contenido que quiere. Guárdalo en `referencia/`. Corre `bash vigilancia/estudiar_video.sh referencia/<archivo>`, mira las hojas y transcribe el audio (Parakeet, igual que en `herramientas/recortar.py`). Anota: duración, cada cuántos segundos cambia la imagen, cómo es el gancho de los primeros 10 s, si hay presentador, cómo cierra.
2. **Canal de referencia**: pide el link. Ponlo en `vigilancia/canales.txt` y sigue la skill `vigilar-referencias`. Sale una lista de temas destacados (los que superan 2x la mediana del canal).
3. **Ficha**: llena `canal.md` con la persona. Propón 3 nombres propios (distintos del canal de referencia), una mascota original y una paleta. Comprueba que el handle esté libre.
4. **Entorno**: skill `instalar-entorno`.
5. **Canal y API**: skill `crear-canal-youtube` (lo hace la persona, tú la guías).
6. **Primer video**: skill `canal-nuevo-youtube` para elegir el tema (cruza dos temas destacados de la referencia), luego `guion-con-fuentes`. Resume el guion a la persona y espera su OK.
7. **Producción**: skill `producir-video`. Enseña hojas de prueba antes del render completo.
8. **Revisión**: muestra video, miniatura, título y descripción. Cambia lo que pida.
9. **Publicación**: skill `subir-youtube`, solo con OK escrito.
10. **Shorts**: skill `shorts-desde-largo` (2 o 3 por video largo).
11. **Ritmo**: al terminar cada video, corre `python vigilancia/vigilar_canal.py --todos` para ver temas nuevos de la referencia y propone el siguiente. Anota el estado en `canal.md`.

## Qué se toma y qué es propio
| De la referencia (sí) | Propio (siempre) |
|---|---|
| Temas que funcionan, duración, ritmo, tipo de gancho, estructura, estilo general de miniatura | Investigación, guion, frases, personajes, dibujos, voz, música, nombre y marca |
