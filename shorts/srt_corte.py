# Corta y reacomoda un srt segun segmentos "a-b a-b". uso: python srt_corte.py entrada.srt "segs" salida.srt
import re,sys
def p(t):h,m,s=t.replace(',','.').split(':');return int(h)*3600+int(m)*60+float(s)
def f(x):h=int(x//3600);m=int(x%3600//60);s=x%60;return f"{h:02d}:{m:02d}:{s:06.3f}".replace('.',',')
cues=[(p(a),p(b),t.strip()) for a,b,t in re.findall(r'(\S+) --> (\S+)\n(.*?)(?:\n\n|\Z)',open(sys.argv[1],encoding='utf-8').read(),re.S)]
segs=[tuple(map(float,s.split('-'))) for s in sys.argv[2].split()];out=[];off=0
for a,b in segs:
    for x,y,t in cues:
        if x>=a-.05 and y<=b+.3: out.append((max(0,x-a)+off,min(y,b)-a+off,t.upper()))
    off+=b-a
open(sys.argv[3],'w',encoding='utf-8').write('\n'.join(f"{i+1}\n{f(x)} --> {f(y)}\n{t}\n" for i,(x,y,t) in enumerate(out)))
