const palettes=[
  ['#ff6b6b','#ffd166'],['#4dabf7','#74c0fc'],['#69db7c','#b2f2bb'],
  ['#b197fc','#e5dbff'],['#ffa94d','#ffe8cc'],['#f06595','#fcc2d7'],
  ['#20c997','#96f2d7'],['#845ef7','#d0bfff'],['#15aabf','#99e9f2'],
  ['#e64980','#ffc9de'],['#82c91e','#d8f5a2'],['#7950f2','#d0bfff']
];
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function colors(v){
  if(!v.colors){
    const pair=palettes[(v.variant??v.type??0)%palettes.length];
    v.colors={body:v.color||pair[0],accent:pair[1],eye:'#1d1d24',belly:'#ffffff'};
  }else if(v.color)v.colors.body=v.color;
  return v.colors;
}
function esc(text){
  return String(text??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function svgFor(v){
  const p=colors(v);
  const k=(v.variant??0)%8;
  const common='<circle class="eye" cx="34" cy="48" r="3.2" fill="'+p.eye+'"/><circle class="eye" cx="49" cy="48" r="3.2" fill="'+p.eye+'"/>';
  const mouth='<path d="M38 58 Q42 62 46 58" fill="none" stroke="'+p.eye+'" stroke-width="2" stroke-linecap="round"/>';
  let art='';
  if(k===0)art='<path class="tail" d="M59 79 Q75 70 68 56" fill="none" stroke="'+p.accent+'" stroke-width="7" stroke-linecap="round"/><path class="body" d="M22 31 Q27 20 40 20 Q55 20 61 34 L58 79 Q54 94 41 97 Q27 94 21 80Z" fill="'+p.body+'"/>'+common+mouth;
  if(k===1)art='<path class="tail" d="M59 78 Q76 80 70 62 Q67 57 62 61" fill="none" stroke="'+p.body+'" stroke-width="8" stroke-linecap="round"/><path d="M25 31 L27 13 L39 25 L49 13 L56 32Z" fill="'+p.body+'"/><ellipse class="body" cx="41" cy="61" rx="23" ry="37" fill="'+p.body+'"/>'+common+mouth;
  if(k===2)art='<path d="M35 25 Q31 12 26 9 M48 25 Q53 12 58 9" fill="none" stroke="'+p.accent+'" stroke-width="4" stroke-linecap="round"/><circle cx="26" cy="9" r="4" fill="'+p.accent+'"/><circle cx="58" cy="9" r="4" fill="'+p.accent+'"/><ellipse class="body" cx="41" cy="62" rx="24" ry="39" fill="'+p.body+'"/>'+common+mouth;
  if(k===3)art='<path class="tail" d="M60 78 Q74 83 69 95" fill="none" stroke="'+p.accent+'" stroke-width="7" stroke-linecap="round"/><path class="body" d="M18 75 Q18 38 28 27 Q40 17 53 27 Q64 39 64 75 Q61 94 41 99 Q21 94 18 75Z" fill="'+p.body+'"/><ellipse cx="32" cy="77" rx="10" ry="8" fill="'+p.accent+'" opacity=".7"/><ellipse cx="50" cy="77" rx="10" ry="8" fill="'+p.accent+'" opacity=".7"/>'+common;
  if(k===4)art='<path d="M22 45 Q10 37 8 25 Q20 27 29 36" fill="'+p.accent+'"/><path d="M60 45 Q72 37 74 25 Q62 27 53 36" fill="'+p.accent+'"/><ellipse class="body" cx="41" cy="63" rx="25" ry="34" fill="'+p.body+'"/><path d="M60 61 L75 68 L60 75Z" fill="'+p.accent+'"/>'+common;
  if(k===5)art='<path d="M25 35 Q20 11 30 7 Q37 20 41 29 Q45 20 52 7 Q62 11 57 35" fill="'+p.body+'"/><ellipse class="body" cx="41" cy="65" rx="23" ry="36" fill="'+p.body+'"/><ellipse cx="41" cy="72" rx="12" ry="16" fill="'+p.accent+'" opacity=".85"/>'+common+mouth;
  if(k===6)art='<path d="M25 33 L20 10 L33 24 Q41 20 49 24 L62 10 L57 33" fill="'+p.body+'"/><path class="body" d="M19 72 Q17 39 41 28 Q65 39 63 72 Q60 96 41 99 Q22 96 19 72Z" fill="'+p.body+'"/><path d="M27 77 Q41 88 55 77" fill="none" stroke="'+p.accent+'" stroke-width="5" stroke-linecap="round"/>'+common+mouth;
  if(k===7)art='<path class="body" d="M15 76 Q14 42 24 28 Q31 18 41 20 Q51 18 58 28 Q68 42 67 76 Q62 97 41 100 Q20 97 15 76Z" fill="'+p.body+'"/><path d="M25 85 Q30 101 35 85 M47 85 Q52 101 57 85" fill="none" stroke="'+p.accent+'" stroke-width="6" stroke-linecap="round"/>'+common+mouth;
  return '<svg class="creature" viewBox="0 0 82 112" aria-hidden="true"><g class="creature-shape">'+art+'</g></svg>';
}
export function ensureViewerElement(v){
  let el=document.getElementById('viewer-'+v.id);
  if(el)return el;
  el=document.createElement('div');
  el.className='person type'+((v.variant??0)%8);
  el.id='viewer-'+v.id;
  el.innerHTML='<div class="name-tag" style="--name-color:'+esc(v.color||'#ffffff')+'">'+esc(v.displayName||v.name||'Зритель')+'</div><div class="avatar">'+svgFor(v)+'</div>';
  document.getElementById('scene').appendChild(el);
  return el;
}
export function renderViewer(v){
  const el=ensureViewerElement(v);
  const scene=document.getElementById('scene');
  const ground=document.querySelector('.ground');
  if(scene&&ground){
    const sceneRect=scene.getBoundingClientRect();
    const groundRect=ground.getBoundingClientRect();
    el.style.left=v.x+'%';
    el.style.top='auto';
    el.style.bottom=(sceneRect.bottom-groundRect.top)+'px';
  }else{
    el.style.left=v.x+'%';
    el.style.top='auto';
    el.style.bottom='36px';
  }
  el.style.setProperty('--walk-speed',Math.max(.34,Math.min(.55,5.5/Math.max(4,Math.abs(v.vx||5))))+'s');
  el.style.setProperty('--creature-color',v.color||'#ffffff');
  el.classList.toggle('walking-left',(v.vx||0)<0);
  el.classList.toggle('walking-right',(v.vx||0)>=0);
}
export function renderViewers(viewers){Object.values(viewers).forEach(renderViewer)}
export function removeViewerElement(id){document.getElementById('viewer-'+id)?.remove()}