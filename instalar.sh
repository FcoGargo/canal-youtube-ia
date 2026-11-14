#!/usr/bin/env bash
# Instala todo lo que necesita el canal en Mac o Linux. Uso: bash instalar.sh
set -e
cd "$(dirname "$0")"
if command -v brew >/dev/null; then
  I="brew install"; PY=python3.11
  brew list python@3.11 >/dev/null 2>&1 || brew install python@3.11
elif command -v apt >/dev/null; then
  I="sudo apt install -y"; PY=python3.11
  command -v $PY >/dev/null || sudo apt install -y python3.11 python3.11-venv
else
  echo "Instala a mano: Python 3.11, Node 20+, ffmpeg y git"; exit 1
fi
command -v git >/dev/null || $I git
command -v node >/dev/null || $I nodejs
command -v ffmpeg >/dev/null || $I ffmpeg
[ -d .venv ] || $PY -m venv .venv
.venv/bin/pip install --upgrade pip
.venv/bin/pip install -r requirements.txt
(cd herramientas && npm install)
D="$HOME/.cache/parakeet"
mkdir -p "$D"
if ! ls -d "$D"/sherpa-onnx-nemo-parakeet* >/dev/null 2>&1; then
  echo "Descargando el modelo Parakeet (unos 600 MB)..."
  curl -L https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8.tar.bz2 | tar -xj -C "$D"
fi
[ -f .env ] || sed -e 's#^PYTHON=$#PYTHON=.venv/bin/python#' -e 's#^NAVEGADOR=msedge#NAVEGADOR=chrome#' .env.example > .env
.venv/bin/python -c "import chatterbox, sherpa_onnx, yt_dlp; print('Entorno listo')"
