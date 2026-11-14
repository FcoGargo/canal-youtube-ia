# Instala todo lo que necesita el canal en Windows. Uso: powershell -ExecutionPolicy Bypass -File instalar.ps1
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
function Tiene($c) { [bool](Get-Command $c -ErrorAction SilentlyContinue) }
$paquetes = @{ "git" = "Git.Git"; "node" = "OpenJS.NodeJS.LTS"; "ffmpeg" = "Gyan.FFmpeg" }
foreach ($c in $paquetes.Keys) {
  if (-not (Tiene $c)) { Write-Host "Instalando $c..."; winget install -e --id $paquetes[$c] --accept-package-agreements --accept-source-agreements }
}
if (-not ((py -0 2>$null) -match "3\.11")) { Write-Host "Instalando Python 3.11..."; winget install -e --id Python.Python.3.11 --accept-package-agreements --accept-source-agreements }
$env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")

if (-not (Test-Path .venv)) { py -3.11 -m venv .venv }
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Push-Location herramientas; npm install; Pop-Location

$dir = Join-Path $HOME ".cache\parakeet"
if (-not (Get-ChildItem $dir -Directory -Filter "sherpa-onnx-nemo-parakeet*" -ErrorAction SilentlyContinue)) {
  New-Item -ItemType Directory -Force $dir | Out-Null
  $arch = Join-Path $dir "parakeet.tar.bz2"
  Write-Host "Descargando el modelo Parakeet (unos 600 MB)..."
  Invoke-WebRequest "https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8.tar.bz2" -OutFile $arch
  tar -xjf $arch -C $dir
  Remove-Item $arch
}
if (-not (Test-Path .env)) {
  (Get-Content .env.example) -replace '^PYTHON=$', 'PYTHON=.venv/Scripts/python.exe' | Set-Content .env -Encoding utf8
}
.\.venv\Scripts\python.exe -c "import chatterbox, sherpa_onnx, yt_dlp; print('Entorno listo')"
