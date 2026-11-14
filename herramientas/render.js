// uso: node render.js timeline.json salida.mp4 [fps] [tiempos,de,prueba | thumb]
const {chromium}=require('playwright-core');const fs=require('fs');const {spawn}=require('child_process');const path=require('path');
(async()=>{
 const tl=JSON.parse(fs.readFileSync(process.argv[2]));const out=process.argv[3];const fps=+(process.argv[4]||30);const shots=process.argv[5];
 const b=await chromium.launch({channel:process.env.NAVEGADOR||'msedge',args:['--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1920,height:1080}});
 p.on('pageerror',e=>console.log('PAGEERROR',e.message));
 await p.goto('file://'+path.resolve(__dirname,'escena.html'));await p.evaluate('window.ready');
 const sfx=await p.evaluate(t=>setup(t),tl); fs.writeFileSync(path.resolve(__dirname,'sfx.json'),JSON.stringify(sfx));
 if(shots==='thumb'){const d=await p.evaluate(()=>thumb());fs.writeFileSync(out,Buffer.from(d.split(',')[1],'base64'));await b.close();return;}
 if(shots){for(const t of shots.split(',')){const d=await p.evaluate(([t,f])=>render(t,f),[+t,Math.round(t*fps)]);fs.writeFileSync(`${out}_${t}.jpg`,Buffer.from(d.split(',')[1],'base64'));}await b.close();return;}
 const N=Math.ceil(tl.total*fps);
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',out]);
 for(let i=0;i<N;i++){const d=await p.evaluate(([t,f])=>render(t,f),[i/fps,i]);if(!ff.stdin.write(Buffer.from(d.split(',')[1],'base64')))await new Promise(r=>ff.stdin.once('drain',r));if(i%600==0)console.log(i,'/',N);}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('ok',out);
})();
