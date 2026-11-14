# Musica original (thriller documental, 96 BPM) + efectos sintetizados. uso: python musica.py timeline.json sfx.json musica.wav fx.wav
import numpy as np, json, sys, soundfile as sf
from scipy.signal import butter, lfilter
SR=44100; tl=json.load(open(sys.argv[1])); sfx=json.load(open(sys.argv[2])); T=tl['total']; N=int(T*SR)
rng=np.random.default_rng(3); BPM=96; beat=60/BPM
def hz(m): return 440*2**((m-69)/12)
def env(L,a=.005,r=.05):
    e=np.ones(L); A=max(1,int(a*SR)); R=max(1,int(r*SR)); e[:A]=np.linspace(0,1,A); e[-R:]*=np.linspace(1,0,R); return e
def add(buf,at,sig):
    a=int(at*SR); 
    if a>=N or a<0: return
    b=min(N,a+len(sig)); buf[a:b]+=sig[:b-a]
mus=np.zeros(N)
prog=[45,41,48,43]  # A F C G (menor)
bars=int(T/(4*beat))+1
intro=tl['sceneStart'][2]  # antes de esto, solo pad + pulso (sin bateria completa) para que la voz respire
for bar in range(bars):
    t0=bar*4*beat; root=prog[bar%4]
    # pad
    L=int(4*beat*SR)+int(.3*SR); tt=np.arange(L)/SR; e=env(L,.4,.5)
    for m in (root+12,root+15 if bar%4 in(0,) else root+16,root+19):
        mm=m if bar%4!=0 else m
        mus_sig=sum(np.sin(2*np.pi*hz(mm)*(1+d/1000)*tt) for d in (-1.5,1.5))*e*.035
        add(mus,t0,mus_sig)
    # bajo ostinato en corcheas
    for k in range(8):
        L=int(beat/2*SR*.9); tt=np.arange(L)/SR; f=hz(root-12+(7 if k in(3,7) else 0))
        s=(np.sin(2*np.pi*f*tt)+.3*np.sign(np.sin(2*np.pi*f*tt)))*np.exp(-tt*6)*env(L,.004,.02)*.12
        add(mus,t0+k*beat/2,s)
    if t0<intro-.5: continue
    # bombo 1 y 3, caja suave 2 y 4, hats en corcheas
    for k in range(4):
        if k in(0,2):
            L=int(.35*SR);tt=np.arange(L)/SR; f=55+90*np.exp(-tt*28); s=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*9)*env(L,.002,.03)*.5; add(mus,t0+k*beat,s)
        else:
            L=int(.2*SR);tt=np.arange(L)/SR; n=lfilter(*butter(2,[900/(SR/2),6000/(SR/2)],'band'),rng.normal(0,1,L)); add(mus,t0+k*beat,n*np.exp(-tt*22)*env(L,.002,.03)*.18)
    for k in range(8):
        L=int(.05*SR);tt=np.arange(L)/SR; n=lfilter(*butter(2,7000/(SR/2),'high'),rng.normal(0,1,L)); add(mus,t0+k*beat/2,n*np.exp(-tt*80)*env(L,.001,.01)*(.06 if k%2 else .035))
    # pluck arpegio
    for k in range(8):
        m=root+24+[0,7,12,15,12,7,3,7][k]; L=int(.3*SR);tt=np.arange(L)/SR
        add(mus,t0+k*beat/2,np.sin(2*np.pi*hz(m)*tt)*np.exp(-tt*12)*env(L,.003,.03)*.035)
mus=lfilter(*butter(2,9000/(SR/2)),mus); t=np.arange(N)/SR
mus*=np.minimum(1,t/1.5)*np.minimum(1,(T-t)/3); mus/=np.abs(mus).max()+1e-9
sf.write(sys.argv[3],mus.astype(np.float32),SR)
# ---- efectos ----
fx=np.zeros(N)
def noise(L,lo,hi): return lfilter(*butter(2,[lo/(SR/2),hi/(SR/2)],'band'),rng.normal(0,1,L))
def mk(kind):
    if kind=='whoosh':
        L=int(.5*SR);tt=np.arange(L)/SR;n=noise(L,300,5000);return n*np.sin(np.pi*tt/.5)**2*.22
    if kind=='pop':
        L=int(.12*SR);tt=np.arange(L)/SR;f=500+900*np.exp(-tt*40);return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*30)*env(L,.001,.02)*.25
    if kind=='boom':
        L=int(1.2*SR);tt=np.arange(L)/SR;f=40+60*np.exp(-tt*8);return (np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*3)+noise(L,60,800)*np.exp(-tt*12)*.4)*env(L,.002,.2)*.6
    if kind=='sting':
        L=int(1.0*SR);tt=np.arange(L)/SR;return sum(np.sin(2*np.pi*hz(m)*tt) for m in (69,70,75))*np.exp(-tt*3)*env(L,.003,.2)*.08
    if kind=='shutter':
        L=int(.18*SR);tt=np.arange(L)/SR;n=noise(L,1500,8000);e=np.exp(-tt*60)+np.exp(-np.maximum(0,tt-.08)*60)*(tt>.08);return n*e*.35
    if kind=='stamp':
        L=int(.5*SR);tt=np.arange(L)/SR;return (np.sin(2*np.pi*70*tt)*np.exp(-tt*12)+noise(L,100,2000)*np.exp(-tt*40)*.6)*env(L,.001,.05)*.6
    if kind=='cash':
        L=int(.7*SR);tt=np.arange(L)/SR;s=sum(np.sin(2*np.pi*f*tt) for f in (2093,2637,3136))*np.exp(-tt*6);return (s*.07+noise(L,2000,8000)*np.exp(-tt*50)*.15)*env(L,.001,.1)
    if kind=='count':
        out=np.zeros(int(2.6*SR))
        for k in range(26):
            L=int(.03*SR);tt=np.arange(L)/SR;a=int(k*.1*SR);out[a:a+L]+=np.sin(2*np.pi*(1800+k*20)*tt)*np.exp(-tt*120)*.08
        return out
    if kind=='lock':
        L=int(.25*SR);tt=np.arange(L)/SR;return (noise(L,1000,6000)*np.exp(-tt*50)*.3+np.sin(2*np.pi*900*tt)*np.exp(-tt*40)*.1)*env(L,.001,.02)
    if kind=='type':
        out=np.zeros(int(1.2*SR))
        for k in range(10):
            L=int(.03*SR);tt=np.arange(L)/SR;a=int((k*.11+rng.uniform(0,.03))*SR);out[a:a+L]+=noise(L,1500,6000)*np.exp(-tt*150)*.25
        return out
    if kind=='boing':
        L=int(.5*SR);tt=np.arange(L)/SR;f=300+120*np.sin(2*np.pi*9*tt)*np.exp(-tt*4);return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*5)*env(L,.003,.05)*.18
    if kind=='rise':
        L=int(1.0*SR);tt=np.arange(L)/SR;f=300+900*tt;return np.sin(2*np.pi*np.cumsum(f)/SR)*tt*env(L,.01,.1)*.08
    if kind=='run':
        L=int(2.5*SR);tt=np.arange(L)/SR;return noise(L,200,3000)*(.5+.5*np.sin(2*np.pi*6*tt))*np.sin(np.pi*tt/2.5)*.1
    if kind=='buzz':
        L=int(.5*SR);tt=np.arange(L)/SR;return np.sign(np.sin(2*np.pi*110*tt))*env(L,.005,.05)*.07
    if kind=='tick':
        L=int(.08*SR);tt=np.arange(L)/SR;return np.sin(2*np.pi*1200*tt)*np.exp(-tt*60)*.15
    return np.zeros(10)
for at,kind in sfx: add(fx,at,mk(kind))
for s in tl['sceneStart'][2:]: add(fx,s-.05,mk('whoosh'))
sf.write(sys.argv[4],fx.astype(np.float32),SR)
print('ok',round(T,1),len(sfx))
