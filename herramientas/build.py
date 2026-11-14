# Arma escena.html de un video nuevo: base (herramientas/escena.html) + extra.js + escenas propias + portada propia.
# uso: python build.py escenas.js portada.js salida.html
import sys, os, re
H = os.path.dirname(os.path.abspath(__file__))
base = open(os.path.join(H, 'escena.html'), encoding='utf-8').read()
extra = open(os.path.join(H, 'extra.js'), encoding='utf-8').read()
scenes = open(sys.argv[1], encoding='utf-8').read()
thumb = open(sys.argv[2], encoding='utf-8').read()
a = base.index('// ---------- escenas ----------'); b = base.index('// ---------- subtitulos (palabra a palabra) ----------')
c = base.index('// ---------- portada 1280x720 ----------'); d = base.index('window.setup=')
out = base[:a] + extra + '\n// ---------- escenas ----------\nconst S=[],CAM=[],SFX=[];\n' + scenes + '\n' + base[b:c] + '// ---------- portada 1280x720 ----------\n' + thumb + '\n' + base[d:]
# personajes nuevos: 'anchor' (presentador de la casa) y 'kress'
rep = [
 ("const body=kind==='alice'?'#c8323b':kind==='jensen'?'#23262d':'#4a6fa5';",
  "const body=kind==='alice'?'#c8323b':kind==='jensen'?'#23262d':kind==='anchor'?'#1f2a44':kind==='kress'?'#2f5d8a':'#4a6fa5';"),
 ("if(kind==='alice'){g.fillStyle='#f6f1e4';",
  "if(kind==='anchor'){g.fillStyle='#f4f4f0';g.beginPath();g.moveTo(-26,-45);g.lineTo(0,10);g.lineTo(26,-45);g.fill();g.fillStyle='#c4232b';g.beginPath();g.moveTo(-8,-40);g.lineTo(8,-40);g.lineTo(13,30);g.lineTo(0,46);g.lineTo(-13,30);g.closePath();g.fill();path([[-8,-40],[8,-40],[13,30],[0,46],[-13,30],[-8,-40]],1,INK,3);g.fillStyle='#e0362c';g.fillRect(44,-10,30,14);}\n    if(kind==='kress'){g.fillStyle='#f6f1e4';g.beginPath();g.moveTo(-20,-45);g.lineTo(0,-10);g.lineTo(20,-45);g.fill();}\n    if(kind==='alice'){g.fillStyle='#f6f1e4';"),
 ("g.fillStyle=kind==='alice'?'#1e1b1b':kind==='jensen'?'#c9ccd1':'#5b3a24';",
  "g.fillStyle=kind==='alice'?'#1e1b1b':kind==='jensen'?'#c9ccd1':kind==='anchor'?'#2a211c':kind==='kress'?'#d9b46a':'#5b3a24';"),
 ("else {g.beginPath();g.ellipse(0,-170,70,40,0,Math.PI,0);g.fill();}",
  "else if(kind==='anchor'){g.beginPath();g.moveTo(-74,-110);g.quadraticCurveTo(-82,-205,0,-206);g.quadraticCurveTo(80,-206,74,-110);g.quadraticCurveTo(60,-160,10,-170);g.quadraticCurveTo(-30,-150,-60,-160);g.quadraticCurveTo(-70,-140,-74,-110);g.fill();}\n    else if(kind==='kress'){g.beginPath();g.ellipse(0,-150,80,62,0,Math.PI,0);g.lineTo(84,-80);g.quadraticCurveTo(72,-150,10,-158);g.quadraticCurveTo(-60,-150,-84,-80);g.fill();}\n    else {g.beginPath();g.ellipse(0,-170,70,40,0,Math.PI,0);g.fill();}"),
]
for x, y in rep:
    assert x in out, x[:40]
    out = out.replace(x, y)
open(sys.argv[3], 'w', encoding='utf-8').write(out)
print('ok', sys.argv[3])
