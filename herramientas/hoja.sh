# hoja de contacto: hoja.sh carpeta prefijo salida.jpg
cd "$1"; ls ${2}_*.jpg | sort -t_ -k2 -g > _l.txt; n=$(wc -l < _l.txt)
awk '{print "file \x27"$0"\x27\nduration 1"}' _l.txt > lista.txt
ffmpeg -v error -y -f concat -safe 0 -i lista.txt -vf "scale=480:-1,tile=5x$(( (n+4)/5 ))" -frames:v 1 "$3"
