# 1. Instalar el entorno

Tu Claude puede correr casi todo esto por ti. Necesitas:

1. **Git** y **Python 3.11** (https://www.python.org). Chatterbox no funciona bien con 3.12+.
2. **Node 18+** (https://nodejs.org).
3. **ffmpeg** en el PATH (Windows: `winget install Gyan.FFmpeg`; Mac: `brew install ffmpeg`; Linux: `apt install ffmpeg`).
4. Un navegador **Edge o Chrome** (el render usa Playwright con el navegador instalado).

## Entorno de Python
```bash
python3.11 -m venv .venv
```
Actívalo (Windows: `.venv\Scripts\activate`; Mac/Linux: `source .venv/bin/activate`) e instala:
```bash
pip install -r requirements.txt
```
Pon la ruta del Python del entorno en `PYTHON` dentro de `.env` (por ejemplo `.venv/Scripts/python.exe`).

## Node (render)
```bash
cd herramientas && npm install
```
En Mac/Linux pon `NAVEGADOR=chrome` en `.env`.

## Modelo Parakeet (tiempos por palabra para subtítulos)
Descarga `sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8.tar.bz2` de los releases de sherpa-onnx (https://github.com/k2-fsa/sherpa-onnx/releases, etiqueta `asr-models`) y descomprímelo en `~/.cache/parakeet/` (o pon la carpeta en `PARAKEET_DIR`).

## Comprobar
```bash
python -c "import chatterbox, sherpa_onnx, yt_dlp; print('ok')"
```
La primera vez que corras `voz.py`, Chatterbox descarga su modelo (unos 3 GB).
