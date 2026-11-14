# uso: bash short.sh salida_dir video_largo.mp4 thumbnail.jpg "L1" "L2" color "a1-b1 a2-b2 ..."
set -e; O=$1; V=$2; TH=$3; mkdir -p $O
node overlay.js "$4" "$5" "$6" $O/_t.jpg $O/bg.jpg
node overlay.js "$4" "$5" "$6" $O/_t2.jpg $O/thumbnail.jpg $TH
f=""; n=0
for s in $7; do a=${s%-*}; b=${s#*-}; d=$(python -c "print($b-$a)"); fo=$(python -c "print($b-$a-0.12)")
 f="$f[0:v]trim=$a:$b,setpts=PTS-STARTPTS[v$n];[0:a]atrim=$a:$b,asetpts=PTS-STARTPTS,afade=t=in:d=0.08,afade=t=out:st=$fo:d=0.12[a$n];"; n=$((n+1)); done
c=""; for i in $(seq 0 $((n-1))); do c="$c[v$i][a$i]"; done
f="$f${c}concat=n=$n:v=1:a=1[cv][ca];[cv]scale=1080:608[sv];[1:v]scale=1080:1920[bg];[bg][sv]overlay=0:640:shortest=1[o1];[2:v]scale=1080:608[th];[o1][th]overlay=0:640:enable='lt(t,0.7)',subtitles=$O/short.srt:fontsdir=../herramientas/fonts:force_style='FontName=Patrick Hand,FontSize=13,PrimaryColour=&H0000D6FF,OutlineColour=&H00000000,BorderStyle=1,Outline=2.2,Shadow=0,Alignment=2,MarginV=54,Bold=0'[vo];[ca]loudnorm=I=-14:TP=-1.5[ao]"
python srt_corte.py $(dirname $V)/subtitulos/subtitles_en.srt "$7" $O/short.srt
ffmpeg -v error -y -i $V -loop 1 -i $O/bg.jpg -loop 1 -i $TH -filter_complex "$f" -map "[vo]" -map "[ao]" -r 30 -c:v libx264 -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest $O/short.mp4
rm -f $O/_t.jpg $O/_t2.jpg; ffprobe -v error -show_entries format=duration -of csv=p=0 $O/short.mp4
