// Capa vertical 1080x1920 (transparente) con titulo arriba y llamada abajo. uso: node overlay.js "LINEA1" "LINEA2" color2 salida.png [portada.jpg thumbnail.jpg]
const {chromium}=require(require('path').resolve(__dirname,'../herramientas/node_modules/playwright-core'));const path=require('path');const fs=require('fs');
(async()=>{const [l1,l2,c2,out,cover,thumb]=process.argv.slice(2);
 const font='data:font/ttf;base64,'+fs.readFileSync(path.resolve(__dirname,'../herramientas/fonts/PatrickHand.ttf')).toString('base64');
 const img=thumb?'data:image/jpeg;base64,'+fs.readFileSync(thumb).toString('base64'):'';
 const html=`<html><head><style>@font-face{font-family:P;src:url(${font})}html,body{margin:0;width:1080px;height:1920px;background:${cover?'linear-gradient(160deg,#141a2b,#3a1418)':'transparent'};font-family:P;overflow:hidden}
 .t{position:absolute;left:40px;right:40px;text-align:center;-webkit-text-stroke:14px #000;paint-order:stroke fill;line-height:1.02}
 .b{position:absolute;left:60px;right:60px;bottom:190px;text-align:center;font-size:62px;color:#fff;background:#e0362c;border:6px solid #000;border-radius:24px;padding:18px}
 .tag{position:absolute;top:120px;left:0;right:0;text-align:center;font-size:44px;color:#ffd600;letter-spacing:2px}
 img{position:absolute;left:0;top:640px;width:1080px;border-top:8px solid #000;border-bottom:8px solid #000}</style></head><body>
 <div class=tag>${process.env.CANAL_NOMBRE||'MY CHANNEL'}</div>
 <div class=t style="top:190px;font-size:${l1.length>16?104:130}px;color:#fff">${l1}</div>
 <div class=t style="top:${l1.length>16?420:330}px;font-size:84px;color:${c2}">${l2}</div>
 ${img?`<img src="${img}">`:''}
 <div class=b>Full story on the channel ▶</div></body></html>`;
 const b=await chromium.launch({channel:process.env.NAVEGADOR||'msedge'});const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:out,omitBackground:!cover,type:out.endsWith('.png')?'png':'jpeg'});
 if(cover){await p.screenshot({path:cover,type:'jpeg',quality:92});} await b.close();})();
