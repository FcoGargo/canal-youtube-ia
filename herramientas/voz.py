# Narracion en ingles con Chatterbox (MIT), frase por frase. uso: python voz.py [indices|all] [semillas]
import torch, torchaudio as ta, json, sys, os
from chatterbox.tts import ChatterboxTTS
torch.set_num_threads(4)
m=ChatterboxTTS.from_pretrained(device="cpu")
g=json.load(open('guion.json'))
idx=[int(x) for x in sys.argv[1].split(',')] if len(sys.argv)>1 and sys.argv[1]!='all' else range(len(g))
seeds=[int(x) for x in sys.argv[2].split(',')] if len(sys.argv)>2 else [1]
for i in idx:
  for s in seeds:
    torch.manual_seed(s)
    w=m.generate(g[i]['t'],exaggeration=float(os.environ.get('EX',0.6)),cfg_weight=float(os.environ.get('CFG',0.45)))
    ta.save(f"voz/{i:02d}_{s}.wav",w,m.sr); print(i,s,round(w.shape[-1]/m.sr,2),flush=True)
