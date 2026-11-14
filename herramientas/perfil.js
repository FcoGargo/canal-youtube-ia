// uso: node perfil.js salida.png  -> imagen de perfil 800x800 del canal
const {chromium}=require('playwright-core');const fs=require('fs');const path=require('path');
(async()=>{
 const b=await chromium.launch({channel:process.env.NAVEGADOR||'msedge',args:['--allow-file-access-from-files']});
 const p=await b.newPage({viewport:{width:800,height:800}});
 p.on('pageerror',e=>console.log('PAGEERROR',e.message));
 await p.goto('file://'+path.resolve(__dirname,'perfil.html'));
 const d=await p.evaluate(()=>dibujar());
 fs.writeFileSync(process.argv[2],Buffer.from(d.split(',')[1],'base64'));await b.close();
})();
