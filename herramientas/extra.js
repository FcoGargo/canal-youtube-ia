// ---------- piezas extra ----------
// Nombre que sale en la mesa del presentador. Cámbialo por el de tu canal.
const CANAL_NOMBRE='MY CHANNEL';
// presentador de la casa (mismo personaje de perfil.png) detras de su mesa
function anchorDesk(x,y,s,p,{mood='n',look=0}={}){ if(p<=0)return;
  puppet(x,y-20*s,s,p,'anchor',{mood,look,seed:4});
  popIn(x,y+120*s,p,()=>{g.scale(s,s);g.fillStyle='#1f2a44';g.fillRect(-230,-40,460,150);path(rect(-230,-40,460,150),1,INK,6);
    g.fillStyle=RED;g.fillRect(-230,-40,460,22);g.fillStyle='#fff';g.font='700 40px Patrick';g.textAlign='center';g.textBaseline='middle';g.fillText(CANAL_NOMBRE,0,40);g.textAlign='left';});}
// grafica de linea que se dibuja sola. vals en 0..1 (1 = arriba)
function lineChart(x,y,w,h,p,vals,col=RED,{axis=true,lw=8}={}){ if(p<=0)return;
  if(axis){path([[x,y],[x,y+h],[x+w,y+h]],cl(p*3),INK,5);}
  const pts=vals.map((v,i)=>[x+20+i*(w-40)/(vals.length-1),y+h-v*h]); path(pts,cl(p*1.1-.1),col,lw);
  const k=cl(p*1.1-.1); if(k>0){const n=(pts.length-1)*k,i=Math.min(pts.length-2,Math.floor(n)),f=n-i;const q=[pts[i][0]+(pts[i+1][0]-pts[i][0])*f,pts[i][1]+(pts[i+1][1]-pts[i][1])*f];
    g.fillStyle=col;g.beginPath();g.arc(q[0],q[1],12,0,7);g.fill();}}
function tv(x,y,w,h,p){ if(p<=0)return; popIn(x+w/2,y+h/2,p,()=>{g.translate(-w/2,-h/2);g.fillStyle='#14192a';g.fillRect(-16,-16,w+32,h+32);g.fillStyle='#fdfbf3';g.fillRect(0,0,w,h);path(rect(-16,-16,w+32,h+32),1,INK,6);
  g.strokeStyle='rgba(80,120,190,.18)';g.lineWidth=2;for(let i=60;i<w;i+=60){g.beginPath();g.moveTo(i,0);g.lineTo(i,h);g.stroke();}for(let j=60;j<h;j+=60){g.beginPath();g.moveTo(0,j);g.lineTo(w,j);g.stroke();}});}
function bolt(x,y,s,p,col='#ffc400'){ popIn(x,y,p,()=>{g.scale(s,s);const b=[[10,-90],[-40,10],[0,10],[-15,90],[45,-15],[5,-15],[25,-90]];fillPoly(b,col);path(b.concat([b[0]]),1,INK,6);});}
function crack(x1,y1,x2,y2,p,seed=1,col=INK){ const pts=[];const n=12;for(let i=0;i<=n;i++){const f=i/n;pts.push([x1+(x2-x1)*f+(i%n?(rnd(seed*31+i)-.5)*70:0),y1+(y2-y1)*f+(i%n?(rnd(seed*17+i*3)-.5)*70:0)]);}
  path(pts,p,col,9); if(p>.5){path([pts[4],[pts[4][0]+60,pts[4][1]-70]],cl((p-.5)*3),col,6);path([pts[8],[pts[8][0]-50,pts[8][1]+80]],cl((p-.6)*3),col,6);}}
function header(n,s,p){ txt('CRACK #'+n,W/2,150,70,p/.5,{align:'center',col:RED,pop:true}); txt(s,W/2,250,110,(p-.3)/.8,{align:'center',hl:true}); crack(160,330,1760,330,(p-.2)/.8,n,RED);}
function bubbleBall(x,y,r,p,popped=0){ if(p<=0)return;
  if(popped>0){const k=ease(popped);g.save();g.globalAlpha=1-k;for(let i=0;i<14;i++){const a=i/14*6.283;path([[x+Math.cos(a)*r*(1+k*.2),y+Math.sin(a)*r*(1+k*.2)],[x+Math.cos(a)*r*(1+k*.8),y+Math.sin(a)*r*(1+k*.8)]],1,BLU,6);}g.restore();return;}
  popIn(x,y,p,()=>{const wob=1+Math.sin(T*3)*.02;g.scale(wob,1/wob);g.fillStyle='rgba(155,200,255,.28)';g.beginPath();g.arc(0,0,r,0,7);g.fill();path(ell(0,0,r,r,50),1,BLU,6);
    g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=14;g.lineCap='round';g.beginPath();g.arc(0,0,r*.72,3.6,4.3);g.stroke();});}
function pin(x,y,s,p){ popIn(x,y,p,()=>{g.scale(s,s);path([[0,0],[-120,-120]],1,'#6b7280',7);g.fillStyle=RED;g.beginPath();g.arc(-130,-130,26,0,7);g.fill();path(ell(-130,-130,26,26,20),1,INK,5);});}
function barrel(x,y,s,p){ popIn(x,y,p,()=>{g.scale(s,s);g.fillStyle='#2b2f36';g.fillRect(-60,-80,120,160);path(rect(-60,-80,120,160),1,INK,6);path([[-60,-30],[60,-30]],1,'#6b7280',5);path([[-60,30],[60,30]],1,'#6b7280',5);
  g.fillStyle='#fff';g.font='700 34px Patrick';g.textAlign='center';g.fillText('OIL',0,12);g.textAlign='left';});}
function warehouse(x,y,s,p){ if(p>0){g.save();g.globalAlpha*=cl(p*2);fillPoly([[x-300*s,y-200*s],[x,y-320*s],[x+300*s,y-200*s],[x+300*s,y],[x-300*s,y]],'#e7e1d2');g.restore();}
  multi([[[x-300*s,y-200*s],[x,y-320*s],[x+300*s,y-200*s]],rect(x-300*s,y-200*s,600*s,200*s),rect(x-120*s,y-150*s,240*s,150*s)],p,INK,6);
  if(p>.7){g.save();g.globalAlpha=cl((p-.7)*4);for(let i=0;i<6;i++){g.strokeStyle='#8a8f99';g.lineWidth=4;g.beginPath();g.moveTo(x-118*s,y-150*s+i*25*s);g.lineTo(x+118*s,y-150*s+i*25*s);g.stroke();}g.restore();}}
function factory(x,y,s,p){ if(p>0){g.save();g.globalAlpha*=cl(p*2);g.fillStyle='#d9d4c7';g.fillRect(x-260*s,y-180*s,520*s,180*s);g.fillRect(x+150*s,y-340*s,60*s,160*s);g.restore();}
  multi([rect(x-260*s,y-180*s,520*s,180*s),[[x-260*s,y-180*s],[x-170*s,y-250*s],[x-170*s,y-180*s],[x-80*s,y-250*s],[x-80*s,y-180*s],[x+10*s,y-250*s],[x+10*s,y-180*s]],rect(x+150*s,y-340*s,60*s,160*s)],p,INK,6);}
function pauseIcon(x,y,s,p){ popIn(x,y,p,()=>{g.scale(s,s);g.fillStyle=RED;g.beginPath();g.arc(0,0,80,0,7);g.fill();path(ell(0,0,80,80,30),1,INK,6);g.fillStyle='#fff';g.fillRect(-32,-40,22,80);g.fillRect(10,-40,22,80);});}
function check(x,y,s,p,col=GRN){path([[x-30*s,y],[x-8*s,y+26*s],[x+36*s,y-30*s]],p,col,10*s);}
function lock(x,y,s,p){ popIn(x,y,p,()=>{g.scale(s,s);g.fillStyle='#e8b54a';g.fillRect(-60,-40,120,95);path(rect(-60,-40,120,95),1,INK,7);path([[-38,-40],[-38,-80],[0,-104],[38,-80],[38,-40]],1,INK,8);});}
function bigNum(s,x,y,size,p,col=RED){ txt(s,x,y,size,p/.5,{align:'center',col,pop:true}); }
function counter(v0,v1,p,fmt){ return fmt(v0+(v1-v0)*ease(cl(p))); }
function bigCard(x,y,w,h,p,head,big,col=RED,rot=0){ card(x,y,w,h,p,head,[],{headCol:col,rot}); if(p>0) txt(big,x+w/2,y+h*.62,Math.min(110,h*.42),cl(p*2-.6)/.5,{align:'center',col,pop:true}); }
function calendar(x,y,s,p,top,big,col=RED){ popIn(x,y,p,()=>{g.scale(s,s);g.fillStyle='#fffdf5';g.fillRect(-110,-110,220,220);g.fillStyle=col;g.fillRect(-110,-110,220,62);path(rect(-110,-110,220,220),1,INK,6);
  g.fillStyle='#fff';g.font='700 40px Patrick';g.textAlign='center';g.textBaseline='middle';g.fillText(top,0,-78);g.fillStyle=INK;g.font='700 110px Caveat';g.fillText(big,0,30);g.textAlign='left';});}
function chair(x,y,s,p){ if(p<=0)return; const pts=[[[x-70*s,y-220*s],[x-70*s,y],[x+70*s,y]],[[x+70*s,y],[x+70*s,y+90*s]],[[x-70*s,y],[x-70*s,y+90*s]],rect(x-70*s,y-220*s,140*s,130*s)];
  if(p>.3){g.save();g.globalAlpha*=cl((p-.3)*2);g.fillStyle='#2b2f36';g.fillRect(x-70*s,y-220*s,140*s,130*s);g.fillRect(x-80*s,y-12*s,160*s,24*s);g.restore();} multi(pts,p,INK,7*s);}
function magnifier(x,y,s,p){ popIn(x,y,p,()=>{g.scale(s,s);g.fillStyle='rgba(155,200,255,.3)';g.beginPath();g.arc(0,0,70,0,7);g.fill();path(ell(0,0,70,70,30),1,INK,9);path([[50,50],[130,130]],1,INK,18);});}
function orgChart(cx,cy,p,n=60){ if(p<=0)return; for(let i=0;i<n;i++){const a=Math.PI*(.08+.84*i/(n-1)),r=330+(i%3)*70;const x=cx+Math.cos(a)*r*1.5,y=cy+Math.sin(a)*r*.75; const k=cl((p-.2-i*.012)*4);
  if(k>0){path([[cx,cy],[x,y]],k,'rgba(29,36,51,.35)',2);g.fillStyle=BLU;g.beginPath();g.arc(x,y,13*k,0,7);g.fill();}}}
function bars2(x,y,p,a,b,la,lb,va,vb,col=GRN,maxH=460){ path([[x-60,y],[x+640,y]],cl(p*3),INK,5); const m=Math.max(a,b);
  [[a,la,va,0],[b,lb,vb,1]].forEach(([v,l,s,i])=>{const k=ease(cl((p-.2-i*.8)/1)),h=k*v/m*maxH,bx=x+60+i*340; if(k>0){g.fillStyle=col;g.fillRect(bx,y-Math.max(h,6),200,Math.max(h,6));path(rect(bx,y-Math.max(h,6),200,Math.max(h,6)),1,INK,5);
    txt(s,bx+100,y-Math.max(h,6)-50,64,1,{align:'center',col});txt(l,bx+100,y+48,46,1,{align:'center',font:'Patrick',bold:400});}});}
function dots(x,y,n,cols,p,col=BLU,r=12,gap=34){ const m=Math.floor(n*ease(cl(p))); for(let i=0;i<m;i++){g.fillStyle=col;g.beginPath();g.arc(x+(i%cols)*gap,y+Math.floor(i/cols)*gap,r,0,7);g.fill();}}
function bell(x,y,s,p){ popIn(x,y,p,()=>{g.scale(s,s);g.rotate(Math.sin(T*9)*.12);const b=[[-80,60],[-70,-10],[-50,-60],[0,-80],[50,-60],[70,-10],[80,60]];fillPoly(b.concat([[80,60]]),'#e8b54a');path(b.concat([[-80,60]]),1,INK,6);g.fillStyle=INK;g.beginPath();g.arc(0,74,16,0,7);g.fill();});}
function warnSign(x,y,s,p){ popIn(x,y,p,()=>{g.scale(s,s);const t=[[0,-110],[120,90],[-120,90]];fillPoly(t,'#ffd23f');path(t.concat([t[0]]),1,INK,8);g.fillStyle=INK;g.font='700 130px Caveat';g.textAlign='center';g.textBaseline='middle';g.fillText('!',0,24);g.textAlign='left';});}
function cloud(x,y,s,p,col='#8a8f99'){ popIn(x,y,p,()=>{g.scale(s,s);g.fillStyle=col;[[-80,0,70],[0,-30,90],[90,0,70],[0,20,80]].forEach(([a,b,r])=>{g.beginPath();g.arc(a,b,r,0,7);g.fill();});for(let i=0;i<4;i++)path([[-70+i*45,100],[-85+i*45,150]],1,BLU,6);});}
function scales(x,y,p,tilt,l,r){ if(p<=0)return; path([[x,y],[x,y-300]],cl(p*2),INK,8); const a=tilt*.25; g.save();g.translate(x,y-300);g.rotate(a);path([[-360,0],[360,0]],cl(p*2-.3),INK,8);
  [[-360,l,GRN],[360,r,BLU]].forEach(([dx,s,c])=>{path([[dx,0],[dx-90,140]],cl(p*2-.6),INK,4);path([[dx,0],[dx+90,140]],cl(p*2-.6),INK,4);g.save();g.translate(dx,140);g.rotate(-a);path([[-120,0],[120,0]],cl(p*2-.7),INK,8);txt(s,0,-70,64,cl(p*2-1),{align:'center',col:c});g.restore();});g.restore();}
