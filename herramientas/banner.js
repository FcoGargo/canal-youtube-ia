// uso: node banner.js salida.png [guia]  -> banner del canal 2560x1440 ("guia" dibuja la zona segura 1546x423 para revisar)
const {chromium}=require('playwright-core');const fs=require('fs');const path=require('path');
(async()=>{
 const b=await chromium.launch({channel:process.env.NAVEGADOR||'msedge',args:['--allow-file-access-from-files']});
 const p=await b.newPage({viewport:{width:1280,height:720}});
 p.on('pageerror',e=>console.log('PAGEERROR',e.message));
 await p.goto('file://'+path.resolve(__dirname,'banner.html')+(process.argv[3]==='guia'?'#guia':''));
 const d=await p.evaluate(()=>dibujar());
 fs.writeFileSync(process.argv[2],Buffer.from(d.split(',')[1],'base64'));await b.close();
})();
