# Subtitulos traducidos con los tiempos de cada frase. uso: python subs.py timeline.json traducciones.json carpeta_salida
import json,sys,os
tl=json.load(open(sys.argv[1]));tr=json.load(open(sys.argv[2],encoding='utf-8'));out=sys.argv[3];os.makedirs(out,exist_ok=True)
def ts(x):h=int(x//3600);m=int(x%3600//60);s=x%60;return f"{h:02d}:{m:02d}:{s:06.3f}".replace('.',',')
for lang,lines in tr.items():
    assert len(lines)==len(tl['lines']),(lang,len(lines))
    srt=[];k=1
    for L,txt in zip(tl['lines'],lines):
        ws=txt.split();chunks=[];c=[]
        for w in ws:
            c.append(w)
            if len(' '.join(c))>40 or (w[-1] in '.,?!:;।' and len(' '.join(c))>18): chunks.append(' '.join(c));c=[]
        if c: chunks.append(' '.join(c))
        tot=sum(len(x) for x in chunks);t=L['a']
        for x in chunks:
            d=(L['b']-L['a'])*len(x)/tot;srt.append(f"{k}\n{ts(t)} --> {ts(t+d)}\n{x}\n");k+=1;t+=d
    open(f"{out}/subtitles_{lang}.srt",'w',encoding='utf-8').write('\n'.join(srt))
print('ok',list(tr))
