// Video 4: "Anthropic Lost $80 Billion. Investors Still Want In." (IPO del 19 nov 2026)
CAM[1]=[[0,0,960,540,1],[1,0,1100,500,1.04],[2,0,960,540,1],[3,0,960,540,1]];
SFX.push([0,.05,'boom'],[0,1.2,'cash'],[1,0,'sting'],[1,1,'boom'],[2,0,'whoosh'],[2,.8,'rise'],[3,0,'whoosh'],[3,1.6,'pop']);
S[1]=(t,e)=>{
  txt('First half of 2026',190,110,90,(t-e(0,.1))/1.1,{hl:true});
  anchorDesk(470,640,1.05,(t-e(0,.4))/.6,{mood:t>e(1,1)?'shock':'n',look:.6});
  tv(860,220,880,520,(t-e(0,.6))/.6);
  txt('ANTHROPIC',1300,290,70,(t-e(0,1))/.6,{align:'center',col:INK});
  const r=t-e(0,2); if(r>0){const h=ease(cl(r/1))*180;g.fillStyle=GRN;g.fillRect(1020,560-h,180,h);path(rect(1020,560-h,180,h),1,INK,5);txt('+$16.3B',1110,560-h-40,56,cl(r*2),{align:'center',col:GRN});txt('revenue',1110,600,44,cl(r*2),{align:'center',font:'Patrick',bold:400});}
  const l=t-e(1,.6); if(l>0){const h=ease(cl(l/1))*300;g.fillStyle=RED;g.fillRect(1400,360,180,h);path(rect(1400,360,180,h),1,INK,5);path([[1000,360],[1700,360]],1,INK,4);
    txt('−$80B',1490,330,64,cl(l*2),{align:'center',col:RED});txt('loss',1490,700,44,cl(l*2),{align:'center',font:'Patrick',bold:400});}
  const b=t-e(2,0); if(b>0){wipe(b/.35);
    bell(500,420,1.6,b/.5); txt('Nasdaq · ANT',500,660,70,(b-.6)/.6,{align:'center',col:BLU});
    calendar(500,860,.8,(b-1)/.4,'NOV','19');
    txt('valued at up to',1250,330,60,(b-1.6)/.6,{align:'center',font:'Patrick',bold:400});
    bigNum(counter(0,1.4,(b-2)/1.4,v=>'$'+v.toFixed(1)+' TRILLION'),1250,470,110,(b-2),GRN);}
  const c=t-e(3,0); if(c>0){wipe(c/.35);
    scales(W/2,820,c/.8,Math.sin(T*1.5)*.3,'−$80B','$1.4T');
    txt('?',W/2,200,200,(c-1.6)/.4,{align:'center',col:RED,pop:true});}
};
CAM[2]=[[4,0,960,540,1],[5,0,960,540,1],[6,0,960,560,1],[7,0,960,540,1]];
SFX.push([4,0,'whoosh'],[5,0,'rise'],[5,2.6,'pop'],[6,0,'whoosh'],[6,.6,'count'],[7,0,'whoosh'],[7,1,'rise']);
S[2]=(t,e)=>{
  txt('What\'s going well',W/2,440,130,(t-e(4,0))/.8,{align:'center',col:GRN,hl:true});
  const a=t-e(5,0); if(a>0){wipe(a/.35);
    txt('Revenue, first half of the year',W/2,140,76,a/.6,{align:'center'});
    bars2(560,860,a/1.4,1.16,16.3,'2025','2026','$1.2B','$16.3B');
    bigNum('×14',1480,500,180,(a-2.6),GRN);}
  const b=t-e(6,0); if(b>0){wipe(b/.35);
    txt('customers paying $100k+ a year',W/2,140,70,b/.6,{align:'center'});
    txt('before',360,260,56,(b-.3)/.5,{align:'center',font:'Patrick',bold:400}); dots(250,330,10,4,(b-.4)/.4,GRY,14,40);
    txt('950',360,500,70,(b-.8)/.5,{align:'center',col:GRY});
    txt('now',1150,260,56,(b-1.2)/.5,{align:'center',font:'Patrick',bold:400}); dots(700,330,119,17,(b-1.4)/2.4,BLU,14,40);
    txt('≈ 11,900',1150,860,90,(b-3.6)/.6,{align:'center',col:BLU});
    txt('1 dot = 100',1650,940,44,(b-1.4)/.5,{align:'center',font:'Patrick',bold:400,col:GRY});}
  const c=t-e(7,0); if(c>0){wipe(c/.35);
    txt('Pace at the end of October',W/2,170,80,c/.6,{align:'center'});
    path(ell(W/2,700,330,330,60).slice(30,61),cl(c/.6),INK,10); const ang=Math.PI*(1+.82*ease(cl((c-.5)/1.6)));
    path([[W/2,700],[W/2+Math.cos(ang)*280,700+Math.sin(ang)*280]],cl(c*2),RED,10); g.fillStyle=INK;g.beginPath();g.arc(W/2,700,22,0,7);g.fill();
    bigNum('$81B a year',W/2,880,100,(c-1.8),GRN);}
};
CAM[3]=[[8,0,960,540,1],[9,0,960,540,1],[10,0,960,540,1],[11,0,960,540,1],[12,0,960,540,1],[13,0,960,540,1]];
SFX.push([8,0,'whoosh'],[8,2,'boing'],[9,0,'type'],[10,0,'rise'],[10,3,'stamp'],[11,0,'pop'],[12,0,'whoosh'],[12,1.6,'cash'],[13,0,'cash']);
S[3]=(t,e)=>{
  const a=t-e(8,0); txt('Where did $80B go?',W/2,380,130,a/.8,{align:'center',col:RED}); txt('mostly... nowhere',W/2,560,90,(a-2)/.6,{align:'center',pop:true});
  const b=t-e(9,0); if(b>0){wipe(b/.35);
    puppet(400,680,1.1,b/.5,'guy',{seed:3,look:.6,mood:'smile'}); txt('investors',400,880,56,(b-.4)/.5,{align:'center',font:'Patrick',bold:400});
    card(760,320,520,300,(b-.6)/.6,'NOTE',['can turn into','shares later'],{headCol:BLU,rot:-.04});
    arrow(1300,470,1520,470,(b-1.8)/.6,INK,6); txt('ANTHROPIC',1660,470,56,(b-2.2)/.5,{align:'center'});}
  const c=t-e(10,0); if(c>0){wipe(c/.35);
    txt('company value ↑',420,200,70,c/.6,{align:'center',col:GRN}); lineChart(160,260,520,400,(c-.2)/1.4,[.1,.2,.35,.5,.75,.95],GRN);
    txt('note value ↑',W/2,200,70,(c-1)/.6,{align:'center',col:GRN}); card(780,300,360,240,(c-1.2)/.6,'NOTE',['worth more'],{headCol:GRN});
    card(1360,260,440,420,(c-2)/.6,'ACCOUNTING',['increase =','LOSS'],{headCol:RED,rot:.03});
    stamp('ON PAPER',1580,800,(t-e(10,3))/.3,-.08,RED,.8);}
  const d=t-e(11,0); if(d>0){wipe(d/.35);
    building(W/2,880,1.8,d/.8); for(let i=0;i<5;i++)popIn(780+i*90,800,(d-.8-i*.12)/.3,()=>{g.fillStyle=GRN;g.fillRect(-36,-22,72,44);path(rect(-36,-22,72,44),1,INK,4);txt('$',0,2,36,1,{align:'center',col:'#fff'});});
    txt('No cash left the building',W/2,160,90,(d-1.2)/.8,{align:'center',hl:true});}
  const f=t-e(12,0); if(f>0){wipe(f/.35);
    card(260,240,640,320,f/.6,'ADJUSTED',['operating profit'],{headCol:GRN,rot:-.03}); bigNum('+$1.6B',580,700,140,(f-1.4),GRN);
    txt('its own measure',580,820,50,(f-2.2)/.6,{align:'center',font:'Patrick',bold:400,col:GRY});}
  const h=t-e(13,0); if(h>0){ card(1040,240,640,320,h/.6,'CASH FROM BUSINESS',['first half 2026'],{headCol:GRN,rot:.03}); bigNum('+$3.9B',1360,700,140,(h-1),GRN);}
};
CAM[4]=[[14,0,960,540,1],[15,0,960,540,1],[16,0,960,540,1],[17,0,960,540,1]];
SFX.push([14,0,'sting'],[15,0,'whoosh'],[15,1.6,'count'],[16,0,'lock'],[17,0,'rise']);
S[4]=(t,e)=>{
  const a=t-e(14,0); warnSign(W/2,420,1.6,a/.5); txt('the scarier number',W/2,780,90,(a-.6)/.8,{align:'center',col:RED});
  const b=t-e(15,0); if(b>0){wipe(b/.35);
    txt('Computing power deals',W/2,150,84,b/.6,{align:'center'});
    for(let r=0;r<2;r++)for(let c=0;c<4;c++)building(420+c*360,450+r*250,.7,(b-.4-(r*4+c)*.12)/.5);
    bigNum(counter(0,657,(b-1.6)/1.6,v=>'$'+Math.round(v)+' BILLION'),W/2,860,110,(b-1.6),INK);}
  const c=t-e(16,0); if(c>0){wipe(c/.35);
    lock(560,520,2.4,c/.5); bigNum('$498B',1250,420,170,(c-.4),RED); txt('can\'t be canceled',1250,580,80,(c-1)/.6,{align:'center'});
    txt('used or not',1250,700,64,(c-2.6)/.6,{align:'center',font:'Patrick',bold:400,col:GRY});}
  const d=t-e(17,0); if(d>0){wipe(d/.35);
    txt('AI demand',300,170,80,d/.5,{col:BLU}); lineChart(300,260,1300,560,(d-.2)/2,[.1,.18,.3,.42,.55,.68,.8,.92],BLU,{lw:8});
    txt('for years?',1300,860,80,(d-1.8)/.6,{col:RED});}
};
CAM[5]=[[18,0,960,540,1],[19,0,960,540,1],[20,0,960,540,1],[21,0,960,540,1],[22,0,960,540,1]];
SFX.push([18,0,'whoosh'],[18,.2,'boing'],[19,0,'whoosh'],[19,2.6,'cash'],[20,0,'pop'],[21,0,'whoosh'],[21,2,'tick'],[22,0,'whoosh'],[22,2,'stamp']);
const PARTNERS=['Nvidia','Google','Microsoft','AMD','Broadcom','Micron','TSMC'];
S[5]=(t,e)=>{
  const a=t-e(18,0); bell(W/2,430,2.2,a/.5); txt('The IPO',W/2,800,130,(a-.3)/.6,{align:'center',hl:true});
  const b=t-e(19,0); if(b>0){wipe(b/.35);
    txt('825 million shares',W/2,200,96,b/.6,{align:'center'}); txt('×  $70 – $78',W/2,350,96,(b-1)/.6,{align:'center',col:BLU});
    path([[560,450],[1360,450]],(b-1.8)/.4,INK,6); bigNum('up to $64 BILLION',W/2,600,120,(b-2.2),GRN);}
  const c=t-e(20,0); if(c>0){wipe(c/.35);
    blob(W/2,540,200,140,'ANTHROPIC',c/.6,INK,'#f1e7da');
    PARTNERS.forEach((s,i)=>{const an=i/7*6.283-1.57,x=W/2+Math.cos(an)*620,y=540+Math.sin(an)*360; txt(s,x,y,56,(c-.4-i*.15)/.5,{align:'center',col:BLU});
      arrow(x-Math.cos(an)*60,y-Math.sin(an)*40,W/2+Math.cos(an)*230,540+Math.sin(an)*160,(c-.5-i*.15)/.5,BLU,4);});
    txt('+$26B',W/2,770,80,(c-2)/.5,{align:'center',col:GRN,pop:true});}
  const d=t-e(21,0); if(d>0){wipe(d/.35);
    txt('Biggest IPOs (money raised)',W/2,150,76,d/.6,{align:'center'});
    bars2(560,860,d/1.6,85.7,64.35,'SpaceX','Anthropic (max)','$85.7B','$64B',BLU,520);
    txt('not a record',1520,500,70,(d-2.4)/.6,{align:'center',col:RED});}
  const f=t-e(22,0); if(f>0){wipe(f/.35);
    txt('hoped',560,300,70,f/.5,{align:'center',font:'Patrick',bold:400,col:GRY}); bigNum('$2T',560,450,170,(f-.4),GRY);
    arrow(780,450,1140,450,(f-1)/.6,RED,7);
    txt('range',1360,300,70,(f-1.2)/.5,{align:'center',font:'Patrick',bold:400}); bigNum('$1.4T',1360,450,170,(f-1.4),GRN);
    stamp('LOWER',W/2,780,(t-e(22,2))/.3,-.06,RED,.9);}
};
CAM[6]=[[23,0,960,540,1],[24,0,960,540,1],[25,0,960,540,1]];
SFX.push([23,0,'boom'],[24,0,'whoosh'],[24,2.6,'pop'],[25,0,'rise']);
S[6]=(t,e)=>{
  const a=t-e(23,0); cloud(W/2,420,2,a/.6); txt('Rough timing',W/2,800,120,(a-.4)/.6,{align:'center',hl:true});
  const b=t-e(24,0); if(b>0){wipe(b/.35);
    txt('Nov 5',420,180,70,b/.5,{align:'center'}); lineChart(160,260,520,400,(b-.2)/1.4,[.85,.8,.82,.6,.4,.2],RED); txt('AI stocks',420,740,60,(b-.6)/.5,{align:'center',col:RED});
    txt('Nov 12',1360,180,70,(b-2.2)/.5,{align:'center'}); chair(1360,600,1.2,(b-2.4)/.6); txt('Nvidia CEO: out',1360,780,60,(b-3)/.5,{align:'center',col:RED});}
  const c=t-e(25,0); if(c>0){wipe(c/.35);
    txt('%',600,520,300,c/.5,{align:'center',col:RED,pop:true}); arrow(820,700,820,300,(c-.4)/.6,RED,9);
    txt('borrowing costs more',1350,440,76,(c-1)/.8,{align:'center'}); building(1350,800,1,(c-1.6)/.8);}
};
CAM[7]=[[26,0,960,540,1],[27,0,960,540,1],[28,0,800,600,1.05]];
SFX.push([26,0,'whoosh'],[26,3,'pop'],[27,0,'whoosh'],[27,.6,'tick'],[27,2.6,'tick'],[28,0,'whoosh'],[28,2,'pop']);
S[7]=(t,e)=>{
  const a=t-e(26,0); scales(W/2,880,a/.8,Math.sin(T*1.2)*.25,'money machine','giant bet');
  txt('maybe both',W/2,200,110,(a-3)/.6,{align:'center',hl:true});
  const b=t-e(27,0); if(b>0){wipe(b/.35);
    txt('What we DON\'T know',W/2,150,110,b/.8,{align:'center'}); path([[620,225],[1300,232]],(b-.8)/.5,RED,7);
    [[0,'The final price (Nov 18)'],[2,'How it trades on day one']].forEach(([d,s],i)=>{const p=b-.6-d; path(rect(330,360+i*170,80,80),p/.3,INK,5); txt('?',370,400+i*170,90,(p-.3)/.3,{align:'center',col:RED,pop:true}); txt(s,460,400+i*170,76,(p-.3)/1,{font:'Patrick',bold:400});});}
  const f=t-e(28,0); if(f>0){wipe(f/.35);
    anchorDesk(520,640,1.05,f/.5,{mood:'smile',look:.5});
    txt('Would you buy it?',1000,320,110,(f-.6)/.8,{col:BLU});
    bubble(1000,520,620,170,(f-1.6)/.5,'Comment below',[],INK);
    txt('Not financial advice',1000,860,54,(f-2.6)/.6,{font:'Patrick',bold:400,col:GRY});}
};
CAM[8]=[[0,0,960,540,1]];
S[8]=(t,e)=>{ const p=t-TL.endAll;
  txt('Sources',190,150,100,p/.8,{hl:true});
  ['Anthropic S-1 filing, as reported by Fortune (Oct 27, 2026) and CNBC (Oct 26)','IPO terms: CNBC (Nov 10, 2026) · amended filing via CNBC','SpaceX IPO size: CNBC · AI sell-off: AP (Nov 5) · Nvidia CEO: Nvidia (Nov 12)','Terms may change before pricing · Not financial advice'].forEach((s,i)=>txt(s,190,300+i*90,50,(p-.6-i*.3)/1,{font:'Patrick',bold:400}));};
