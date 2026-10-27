// Panelist Interest Venn MicroSim - 4 overlapping sets, hover items for details
let canvasWidth = 800, drawHeight = 560, controlHeight = 40, canvasHeight = drawHeight + controlHeight;
const people = [
  {n:'Dan McCreary', c:[0,128,128], dx:-0.13, dy:-0.12},
  {n:'Arun Batchu', c:[230,160,0], dx:0.13, dy:-0.12},
  {n:'Rajeev Bukralia', c:[90,90,200], dx:-0.13, dy:0.12},
  {n:'Senthil Kumaran', c:[200,60,90], dx:0.13, dy:0.12}
];
// who: indexes into people
const items = [
  {t:'Agentic AI', w:[0,1,2,3]}, {t:'Teaching AI', w:[0,1,2,3]},
  {t:'AI in K-12 schools', w:[0,1]}, {t:'AI courseware & tutors', w:[0,1]},
  {t:'Hybrid symbolic + ML AI', w:[0,3]}, {t:'AI curriculum design', w:[0,2]},
  {t:'Small language models', w:[2]}, {t:'Healthcare AI', w:[1,3]},
  {t:'Trustworthy AI', w:[1,3]}, {t:'MSU Mankato teaching', w:[2,3]},
  {t:'MicroSims', w:[0]}, {t:'Knowledge graphs', w:[0]}, {t:'STEM Kits', w:[0]}, {t:'Intelligent Textbooks', w:[0]},
  {t:'Science bookstore', w:[1]}, {t:'Legacy modernization', w:[3]}, {t:'Data science MS/AI MS', w:[2]}
];
let hovered = null;
function setup(){ updateCanvasSize(); const cnv = createCanvas(canvasWidth, canvasHeight); cnv.parent(document.querySelector('main')); textFont('Arial'); }
function windowResized(){ updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); }
function updateCanvasSize(){ const m = document.querySelector('main'); canvasWidth = max(400, m.getBoundingClientRect().width || windowWidth); }
function centerOf(p){ const s = min(canvasWidth, drawHeight); return [canvasWidth/2 + p.dx*s*1.25, drawHeight/2 + 10 + p.dy*s]; }
function itemPos(it, k){
  // average of member centres, pushed outward for single-owner items; spread duplicates
  let x=0,y=0; it.w.forEach(i=>{const c=centerOf(people[i]); x+=c[0]; y+=c[1];}); x/=it.w.length; y/=it.w.length;
  if (it.w.length==1){ const c=centerOf(people[it.w[0]]); x += (c[0]-canvasWidth/2)*0.9; y += (c[1]-drawHeight/2-10)*0.9; }
  if (it.w.length==2){
    const a=people[it.w[0]], b=people[it.w[1]];
    if (a.dx==-b.dx && a.dy==-b.dy){ x=canvasWidth/2; y=drawHeight/2+10+48; } // diagonal pair: just below the centre
    else { x = canvasWidth/2 + (x-canvasWidth/2)*1.7; y = drawHeight/2+10 + (y-drawHeight/2-10)*1.5; }
  }
  const same = items.filter(o=>o.w.join()==it.w.join()); const j = same.indexOf(it);
  y += (j-(same.length-1)/2)*24; return [x,y];
}
function draw(){
  background('aliceblue'); fill('white'); noStroke(); rect(0,drawHeight,canvasWidth,controlHeight);
  fill(0); textAlign(CENTER,TOP); textSize(22); text('Panelist Interest Overlap - ACM AI Panel, Oct 28 2026', canvasWidth/2, 8);
  const r = min(canvasWidth, drawHeight)*0.30;
  people.forEach(p=>{ const [x,y]=centerOf(p); fill(p.c[0],p.c[1],p.c[2],50); stroke(p.c[0],p.c[1],p.c[2]); strokeWeight(2); circle(x,y,r*2);
    noStroke(); fill(p.c[0],p.c[1],p.c[2]); textSize(15); textStyle(BOLD); textAlign(CENTER,CENTER);
    text(p.n, x + (x-canvasWidth/2)*0.6, y + (y-drawHeight/2-10)*1.75); textStyle(NORMAL); });
  hovered = null; textSize(12);
  items.forEach((it,k)=>{ const [x,y]=itemPos(it,k); const w=textWidth(it.t)+10;
    const over = abs(mouseX-x)<w/2 && abs(mouseY-y)<9; if(over) hovered={it,x,y};
    fill(over?'yellow':(it.w.length==4?'gold':'white')); stroke(80); strokeWeight(1); rect(x-w/2,y-9,w,18,5);
    noStroke(); fill(0); textAlign(CENTER,CENTER); text(it.t,x,y); });
  fill(60); textSize(13); textAlign(LEFT,CENTER);
  text('Hover over an interest to see who shares it. Gold = shared by all four.', 10, drawHeight+controlHeight/2);
  if (hovered){ const names = hovered.it.w.map(i=>people[i].n).join(', ');
    const msg = hovered.it.t+': '+names; textSize(13); const w=textWidth(msg)+16; const tx=constrain(hovered.x-w/2,4,canvasWidth-w-4);
    fill(255,255,225); stroke(0); rect(tx,hovered.y+14,w,24,4); noStroke(); fill(0); textAlign(LEFT,CENTER); text(msg,tx+8,hovered.y+26); }
}
