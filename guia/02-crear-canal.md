# 2. Crear tu canal de YouTube

1. **Cuenta de Google**: usa una tuya (mejor una dedicada al canal).
2. **Crear el canal**: entra a https://www.youtube.com/account y elige "Crear un canal". Para tener varios canales en la misma cuenta, elige crear una **cuenta de marca** (nombre propio del canal).
3. **Nombre y handle**: el que elegiste con tu Claude en `canal.md`. Si el handle está ocupado, prueba variantes cortas.
4. **Verifica el teléfono** en https://www.youtube.com/verify. Sin esto no puedes poner miniaturas personalizadas ni subir videos de más de 15 minutos.
5. **Imagen de marca**: sube a mano `perfil.png` (800x800) y `banner.png` (2560x1440) en YouTube Studio > Personalización > Imagen de marca. La API no permite hacerlo. Los genera tu Claude con `node perfil.js perfil.png` y `node banner.js banner.png`.
6. **Datos básicos** en Studio > Personalización > Información básica: descripción del canal, links y correo de contacto (usa uno de trabajo, no el personal).
7. **Audiencia**: en Studio > Configuración > Canal > Configuración avanzada, marca "No, no es para niños" salvo que de verdad lo sea. Marcarlo mal desactiva comentarios y limita el alcance.
8. **Contenido sintético**: al subir, YouTube pregunta si el contenido es "alterado o sintético" realista. Una animación caricaturesca normalmente no lo es, pero una voz de IA que imita a una persona real sí: declara cuando aplique.
9. **Monetización** (más adelante): el Programa de Socios pide suscriptores y horas de visualización mínimas y contenido original. Por eso todo aquí es propio.

Siguiente: `guia/03-youtube-api.md` para poder subir desde tu computadora.
