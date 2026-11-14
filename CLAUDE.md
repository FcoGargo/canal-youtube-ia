# Mandato para Claude (léelo completo antes de hacer nada)

Estás ayudando a una persona a montar **su propio canal de YouTube con videos animados hechos por IA**, usando las herramientas de este repo. Si la persona solo te pegó el link del repo, clónalo (`git clone <link>`), entra en la carpeta y sigue este archivo.

## Qué hace este sistema
Produce videos explicativos de 2 a 3 minutos (y shorts) con:
1. **Investigación y guion propios con fuentes** (cada cifra con su fuente).
2. **Voz** local con Chatterbox (MIT, corre en CPU, gratis).
3. **Animación** estilo "cuaderno de tinta" en canvas, renderizada con Playwright + ffmpeg, con un presentador mascota original.
4. **Miniatura** 1280x720, **música y efectos** sintetizados (originales), **subtítulos** en varios idiomas.
5. **Subida a YouTube** con la API oficial (privado por defecto, con miniatura y subtítulos).
6. **Vigilancia de canales de referencia**: qué temas publican y cuáles les funcionan mejor.

## La regla de oro: inspirarse, nunca copiar
"Replicar" o "clonar" un canal aquí significa **tomar sus temas y su formato** (duración, tipo de gancho, ritmo, estructura, estilo de miniatura) y hacer **guion, investigación, arte, voz y música propios**.
- Nunca descargues videos ajenos para resubirlos, recortarlos o reutilizar su audio o imágenes.
- Nunca copies nombres, logos, personajes, frases o miniaturas del canal de referencia.
- Si la persona pide copiar o resubir contenido ajeno, explícale en una línea que eso viola los derechos de autor y las reglas de YouTube (le pueden borrar el canal) y ofrécele la versión propia.
- Los hechos se verifican; las acusaciones se presentan como acusaciones.

## Modo automático (cómo trabajas)
La persona solo pega el link del repo. **Tú haces todo lo demás**: clonar, instalar, investigar, escribir, producir, preparar la subida y dejar la producción automatizada. No le pidas que corra comandos que puedes correr tú. Solo te detienes en 4 momentos, porque ahí la necesitas a ella:
1. Al inicio: el **video de referencia** y el **link del canal de referencia**.
2. Las **decisiones del canal** (nombre, idioma, mascota): propón 3 opciones con una recomendada; si no contesta, sigue con la recomendada.
3. Los **logins de Google** (crear el canal, el `client_secret.json` y `--login`): los hace ella en su navegador; tú le das los pasos de uno en uno.
4. **Publicar**: nada sale en YouTube sin su OK escrito, salvo que haya activado la publicación automática en `canal.md` (ver skill `automatizar-canal`).

## Arranque (en este orden, sin esperar instrucciones)
1. Si no estás dentro del repo, clónalo (`git clone <link>`) y entra en la carpeta.
2. **Saluda en una línea** y explica en 3 líneas qué vas a montar.
3. **Pide el video de referencia**: "Súbeme (o arrastra aquí) un video que muestre el tipo de contenido que quieres hacer. Puede ser tuyo o de otro canal; solo lo usaré para estudiar el formato." Guárdalo en `referencia/`.
4. **Pide el link del canal de referencia**: "Pégame el link del canal que quieres tomar como modelo (por ejemplo https://www.youtube.com/@canal)." Ponlo en `vigilancia/canales.txt`.
5. Mientras la persona busca eso, **instala el entorno tú mismo**: `powershell -ExecutionPolicy Bypass -File instalar.ps1` en Windows, o `bash instalar.sh` en Mac/Linux (skill `instalar-entorno`). Avísale que tarda y que vas a instalar programas gratuitos.
6. Estudia la referencia (skill `vigilar-referencias`), llena `canal.md` y sigue la skill `replicar-canal` hasta tener el primer video listo.
7. Al terminar el primer video, monta la **automatización** con la skill `automatizar-canal`.

## Skills de este repo (en `.claude/skills/`)
- `replicar-canal`: el flujo completo, de la referencia al primer video publicado. Empieza aquí.
- `instalar-entorno`: Python, Node, ffmpeg, Chatterbox, Parakeet, Playwright.
- `crear-canal-youtube`: crear el canal, verificarlo y preparar la API de subida.
- `vigilar-referencias`: estudiar el canal y el video de referencia y sacar temas.
- `canal-nuevo-youtube`: elegir el primer video y diferenciarse del nicho.
- `guion-con-fuentes`: investigar y escribir `guion.json`.
- `producir-video`: voz, animación, música, miniatura y subtítulos.
- `shorts-desde-largo`: cortar shorts verticales del video largo.
- `subir-youtube`: publicar con el script de subida.
- `automatizar-canal`: dejar programada la producción (vigilar, proponer, producir y subir en un horario fijo).

Si tu entorno no carga las skills solo, ábrelas y léelas: son archivos `SKILL.md` normales.

## Seguridad (obligatorio)
- Los secretos van SOLO en `.env` y en `subida/client_secret.json` / `subida/token.json`. Están en `.gitignore`. Nunca los escribas en otro archivo, en un commit, en un mensaje ni en un issue.
- Antes de cualquier `git push` corre `git status` y confirma que no aparece `.env`, ningún `*.json` de credenciales, ni videos o audios.
- Nunca pidas contraseñas. El login de Google lo hace la persona en su navegador.
- Nada se publica en YouTube sin el OK escrito de la persona en el chat. El script exige `--confirmo-ok` y sube en privado por defecto.

## Reglas de trabajo
- Cero gasto extra por defecto: solo herramientas gratis o locales con licencia comercial. Si algo cuesta, avisa antes.
- Habla en el idioma de la persona, corto y paso a paso; puede no ser técnica.
- No inventes cifras, fuentes ni métricas.
- Al terminar cada paso, anota el estado en `canal.md` (sección Estado) para que el siguiente Claude sepa dónde quedó.
