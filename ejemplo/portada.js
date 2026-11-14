function thumb(){ cv.width=1280;cv.height=720; T=1.3;BOIL=0; g.save();
  const bg=g.createLinearGradient(0,0,1280,720);bg.addColorStop(0,'#2a1414');bg.addColorStop(1,'#0f2a1d');g.fillStyle=bg;g.fillRect(0,0,1280,720);
  g.strokeStyle='rgba(255,255,255,.07)';g.lineWidth=2;for(let x=0;x<1280;x+=80){g.beginPath();g.moveTo(x,0);g.lineTo(x,720);g.stroke();}
  // presentador desconcertado
  g.save();g.translate(1000,560);g.scale(.95,.95);g.translate(-470,-640);anchorDesk(470,640,1.05,1,{mood:'shock',look:-.8});g.restore();
  g.textBaseline='middle';g.textAlign='left';g.lineJoin='round';g.strokeStyle='#000';
  g.font='700 70px Patrick';g.lineWidth=12;g.strokeText('LOST',70,95);g.fillStyle='#ffffff';g.fillText('LOST',70,95);
  g.font='700 190px Patrick';g.lineWidth=20;g.strokeText('$80B',60,240);g.fillStyle='#ff3b2f';g.fillText('$80B',60,240);
  g.font='700 70px Patrick';g.lineWidth=12;g.strokeText('...now worth',70,420);g.fillStyle='#ffffff';g.fillText('...now worth',70,420);
  g.font='700 150px Patrick';g.lineWidth=18;g.strokeText('$1.4T?',60,560);g.fillStyle='#3fd486';g.fillText('$1.4T?',60,560);
  // flecha
  g.strokeStyle='#ffd600';g.lineWidth=14;g.lineCap='round';g.beginPath();g.moveTo(560,250);g.quadraticCurveTo(680,380,600,520);g.stroke();g.beginPath();g.moveTo(560,500);g.lineTo(600,525);g.lineTo(635,485);g.stroke();
  g.restore(); return cv.toDataURL('image/jpeg',.93); }
