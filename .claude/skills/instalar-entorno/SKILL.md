---
name: instalar-entorno
description: Revisa e instala lo que necesita el pipeline (Python 3.11, Node, ffmpeg, navegador, Chatterbox, Parakeet, yt-dlp, librerías de Google). Úsala al arrancar o cuando un paso falle por algo que falta.
---

# Instalar el entorno

Camino rápido (lo corres tú, no la persona): `powershell -ExecutionPolicy Bypass -File instalar.ps1` en Windows o `bash instalar.sh` en Mac/Linux. Si algo falla, sigue los pasos de abajo.

1. Comprueba versiones: `git --version`, `python --version` (o `py -3.11 --version`), `node --version`, `ffmpeg -version`.
2. Instala lo que falte siguiendo `guia/01-instalar.md`. En Windows usa `winget`; en Mac, `brew`. Pide permiso antes de instalar programas.
3. Crea el entorno virtual con Python 3.11 y `pip install -r requirements.txt`. Si falla `chatterbox-tts` por `pkg_resources`, confirma `setuptools<81`.
4. `cd herramientas && npm install`.
5. Descarga el modelo Parakeet a `~/.cache/parakeet/` (ver la guía).
6. Copia `.env.example` a `.env` y llena `PYTHON` y `NAVEGADOR`.
7. Prueba rápida: `python herramientas/fake_tl.py ejemplo/guion.json tl_prueba.json` y un render de una foto del ejemplo (ver skill `producir-video`, paso 3).

No pidas contraseñas ni claves en el chat.
