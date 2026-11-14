# Canal de YouTube con IA (plantilla replicable)

Sistema para montar un canal de YouTube de videos animados explicativos hechos con IA, de punta a punta: investigación con fuentes, guion, voz, animación, miniatura, música, subtítulos, shorts, subida a YouTube y vigilancia de canales de referencia. Todo con herramientas gratuitas o locales.

## Cómo se usa (2 minutos)
1. Abre **Claude Code** (app de escritorio, terminal o claude.ai/code).
2. Pega el link de este repo y escribe: **"Usa este repo para montar mi canal"**.
3. Tu Claude lee `CLAUDE.md`, te pide **un video de referencia** y **el link del canal que quieres tomar de modelo**, y te guía paso a paso.

## Qué significa "replicar" aquí
Se toman los **temas y el formato** de un canal que funciona (duración, gancho, ritmo, tipo de miniatura) y se hace **guion, investigación, arte, voz y música propios**. Nunca se descarga ni se resube contenido ajeno: eso viola derechos de autor y las reglas de YouTube.

## Qué trae
| Carpeta | Para qué |
|---|---|
| `CLAUDE.md` | El mandato que lee tu Claude al arrancar |
| `.claude/skills/` | Skills: replicar canal, instalar entorno, crear canal, guion, producción, shorts, subida, vigilancia |
| `herramientas/` | Pipeline del video (voz, recorte, armado, render, música, subtítulos, perfil, banner) |
| `shorts/` | Cortar shorts verticales del video largo |
| `subida/` | Subida a YouTube por API (privado por defecto) |
| `vigilancia/` | Revisar canales de referencia y estudiar un video de referencia |
| `guia/` | Guía paso a paso para crear tu canal y tu acceso a la API |
| `ejemplo/` | Un video de ejemplo (guion, escenas, portada, textos) para ver el formato |
| `canal.md` | Ficha de tu canal (se llena al arrancar) |

## Requisitos
Python 3.11, Node 18+, ffmpeg, Git y un navegador Chromium (Edge o Chrome). Ver `guia/01-instalar.md`.

## Seguridad
Tus claves van en `.env` y en `subida/` y nunca se suben: están en `.gitignore`. Copia `.env.example` a `.env` para empezar.

## Licencias
Código bajo MIT (ver `LICENSE`). Fuentes Caveat y Patrick Hand bajo SIL Open Font License (ver `herramientas/fonts/LEEME.md`). Chatterbox es MIT. Lo que produzcas es tuyo.
