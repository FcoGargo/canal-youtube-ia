# Estudia un video de referencia LOCAL: hoja de fotogramas (1 cada N s) + duración. Solo para analizar formato.
# uso: bash vigilancia/estudiar_video.sh referencia/mi_video.mp4 [cada_segundos=5]
set -e; V="$1"; N=${2:-5}; O="referencia/estudio"; mkdir -p "$O"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V"); echo "Duración: $D s"
ffmpeg -v error -y -i "$V" -vf "fps=1/$N,scale=480:-1,tile=5x6" -q:v 4 "$O/hoja_%02d.jpg"
ffmpeg -v error -y -i "$V" -ac 1 -ar 16000 "$O/audio.wav"
echo "Hojas en $O/ (mira el ritmo de cortes, texto en pantalla, miniatura). Audio en $O/audio.wav para transcribir."
