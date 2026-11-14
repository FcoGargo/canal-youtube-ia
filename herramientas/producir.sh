# Del guion con voz ya generada al video final.
# uso (dentro de la carpeta del video, con las herramientas copiadas ahí): bash producir.sh nombre.mp4
# Usa el Python de la variable PYTHON (tu entorno virtual) o "python".
set -e
P=${PYTHON:-python}
export PYTHONWARNINGS=ignore PYTHONIOENCODING=utf-8
$P recortar.py $(ls voz/*_1.wav) > recortar.log
$P armar.py
node render.js timeline.json video_mudo.mp4 30
$P musica.py timeline.json sfx.json musica.wav fx.wav
ffmpeg -v error -y -i narracion.wav -i musica.wav -i fx.wav -filter_complex "[0]aresample=48000,asplit=2[v1][v2];[1]aresample=48000,volume=0.55[m];[m][v1]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400[md];[2]aresample=48000,volume=0.8[f];[v2][md][f]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]" -map "[a]" -ar 48000 mezcla.wav
ffmpeg -v error -y -i video_mudo.mp4 -i mezcla.wav -c:v copy -c:a aac -b:a 192k -shortest "$1"
node render.js timeline.json thumbnail.jpg 30 thumb
mkdir -p subtitulos && cp subtitles_en.srt subtitulos/
[ -f traducciones.json ] && $P subs.py timeline.json traducciones.json subtitulos
ffmpeg -hide_banner -i "$1" -af ebur128 -f null - 2>&1 | grep -E "I:|Peak" | tail -2
echo LISTO "$1"
