# timeline de prueba (antes de tener la voz): 0.36 s por palabra. uso: python fake_tl.py guion.json timeline_fake.json
import json,sys
g=json.load(open(sys.argv[1],encoding='utf-8'));t=.5;lines=[];words=[];ss={}
for i,x in enumerate(g):
    if x['s'] not in ss: ss[x['s']]=max(0,t-.3) if i else 0
    cw=x['c'].split();d=len(x['t'].split())*.36+.4;a,b=t,t+d;lines.append({'a':a,'b':b})
    words.append([{'s':w,'a':a+d*j/len(cw),'b':a+d*(j+1)/len(cw)} for j,w in enumerate(cw)])
    t=b+max(x.get('pausa',0),(0.7 if i+1<len(g) and g[i+1]['s']!=x['s'] else .22))
ss[8]=t+.2
json.dump({'lines':lines,'sceneStart':[0]+[ss[k] for k in range(1,9)],'endAll':ss[8],'total':t+6.5,'words':words},open(sys.argv[2],'w'))
print([round(l['a'],1) for l in lines])
