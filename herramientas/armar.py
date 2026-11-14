# Une frases recortadas, crea timeline.json (con palabras para subtitulos), narracion.wav y subtitulos.srt
import json, numpy as np, soundfile as sf, os, subprocess
TEMPO=0.9  # narracion un poco mas pausada (sin cambiar el tono)
g=json.load(open('guion.json')); SR=24000; seed=json.load(open('semillas.json')) if os.path.exists('semillas.json') else {}
out=[np.zeros(int(0.5*SR))]; t=0.5; lines=[]; ss={}; words=[]
for i,x in enumerate(g):
    s=seed.get(str(i),1); subprocess.run(['ffmpeg','-v','error','-y','-i',f'voz/{i:02d}_{s}_t.wav','-af',f'atempo={TEMPO}',f'voz/{i:02d}_{s}_s.wav'],check=True)
    y,sr=sf.read(f'voz/{i:02d}_{s}_s.wav',dtype='float32'); assert sr==SR
    asr=[[w,t/TEMPO] for w,t in json.load(open(f'voz/{i:02d}_{s}_w.json'))]
    if x['s'] not in ss: ss[x['s']]=max(0,t-0.3) if i else 0
    a,b=t,t+len(y)/SR; lines.append({'a':a,'b':b})
    cw=x['c'].split(); m=len(asr); n=len(cw); lw=[]
    for j,w in enumerate(cw):
        k=min(m-1,int(j*m/n)) if m else 0; st=a+(asr[k][1] if m else (b-a)*j/n)
        lw.append({'s':w,'a':st})
    for j in range(n): lw[j]['b']=lw[j+1]['a'] if j+1<n else b
    words.append(lw); out.append(y); t=b
    nxt=g[i+1]['s'] if i+1<len(g) else 9
    gap=0.7 if nxt!=x['s'] else 0.22
    gap=max(gap,x.get('pausa',0))  # pausa extra tras un remate (reaccion)
    out.append(np.zeros(int(gap*SR))); t+=gap
ss[8]=t+0.2; total=t+6.5
json.dump({'lines':lines,'sceneStart':[0]+[ss[k] for k in range(1,9)],'endAll':ss[8],'total':total,'words':words},open('timeline.json','w'))
v=np.concatenate(out); v=np.concatenate([v,np.zeros(int(total*SR)-len(v))]); sf.write('narracion.wav',v,SR)
def ts(x):h=int(x//3600);m=int(x%3600//60);s=x%60;return f"{h:02d}:{m:02d}:{s:06.3f}".replace('.',',')
srt=[];k=1
for lw in words:
    c=[]
    for w in lw+[None]:
        if w: c.append(w)
        if c and (w is None or len(' '.join(q['s'] for q in c))>40):
            srt.append(f"{k}\n{ts(c[0]['a'])} --> {ts(c[-1]['b'])}\n{' '.join(q['s'] for q in c)}\n");k+=1;c=[]
open('subtitles_en.srt','w').write('\n'.join(srt))
print('total',round(total,1),'escenas',[round(ss[k],1) for k in range(1,9)])
