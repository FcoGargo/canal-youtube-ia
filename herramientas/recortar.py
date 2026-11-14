# Corta cada frase justo despues de la ultima palabra reconocida (quita la basura que Chatterbox deja al final)
# y guarda tiempos por palabra para los subtitulos. uso: python recortar.py voz/00_1.wav ...
import os, sherpa_onnx, numpy as np, glob, subprocess, sys, json, re, soundfile as sf
# Modelo Parakeet (sherpa-onnx): carpeta en la variable PARAKEET_DIR o dentro de ~/.cache/parakeet/
d=os.environ.get('PARAKEET_DIR') or glob.glob(os.path.expanduser('~/.cache/parakeet/')+'sherpa-onnx-nemo-parakeet*')[0]
r=sherpa_onnx.OfflineRecognizer.from_transducer(encoder=f"{d}/encoder.int8.onnx",decoder=f"{d}/decoder.int8.onnx",joiner=f"{d}/joiner.int8.onnx",tokens=f"{d}/tokens.txt",model_type="nemo_transducer")
g=json.load(open('guion.json'))
norm=lambda s:re.sub(r"[^a-z0-9 ]","",s.lower().replace('-',' ').replace('.',''))
for f in sys.argv[1:]:
    i=int(f.split('/')[-1][:2]); y,sr=sf.read(f,dtype='float32')
    x=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout
    s=r.create_stream(); s.accept_waveform(16000,np.frombuffer(x,np.int16).astype(np.float32)/32768); r.decode_stream(s)
    toks,ts=s.result.tokens,s.result.timestamps
    # agrupa tokens en palabras
    words=[]
    for tk,t in zip(toks,ts):
        if tk.startswith('▁') or tk.startswith(' ') or not words: words.append([tk.strip('▁ '),t])
        else: words[-1][0]+=tk
    target=norm(g[i]['t']).split(); heard=[norm(w[0]) for w in words]
    # ultima palabra del guion: buscar su ultima aparicion en lo escuchado dentro de lo razonable
    last=target[-1]; k=None
    for j in range(len(heard)):
        if heard[j] and (heard[j]==last or heard[j].startswith(last[:4])): k=j
    if k is None: k=len(words)-1
    extra=len(heard)-(k+1)
    end_t = (ts[ts.index(words[k+1][1])] if k is not None and k+1<len(words) else (ts[-1]+0.35 if ts else len(y)/sr))
    if k is not None and k+1<len(words): end_t=words[k+1][1]-0.02
    end_t=min(end_t, len(y)/sr)
    # busca caida de energia despues de la ultima palabra (no cortar la cola natural)
    hop=int(sr*.01); start=int((words[k][1] if k is not None else 0)*sr)+int(.12*sr); cut=int(end_t*sr)
    for q in range(start,cut,hop):
        if 20*np.log10(np.sqrt(np.mean(y[q:q+hop]**2))+1e-9)<-42: cut=q+int(.05*sr); break
    fd=int(.05*sr); z=y[:cut].copy(); z[-fd:]*=np.linspace(1,0,fd)
    sf.write(f.replace('.wav','_t.wav'),z,sr)
    json.dump([[w[0],w[1]] for w in words if w[1]<cut/sr],open(f.replace('.wav','_w.json'),'w'))
    ok=' '.join(heard[:(k+1) if k is not None else len(heard)])
    miss=set(target)-set(heard)
    print(f"{i:02d} dur {len(y)/sr:.2f} cut {cut/sr:.2f} extra_words {extra} miss {sorted(miss)} | {' '.join(w[0] for w in words)}")
