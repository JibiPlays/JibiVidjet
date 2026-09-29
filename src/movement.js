export function clamp(v,min,max){return Math.max(min,Math.min(max,Number(v)||0))}
export function randomRange(min,max){return min+Math.random()*(max-min)}
export function randomizeVelocity(v){const speed=randomRange(4,11),angle=Math.random()*Math.PI*2;v.vx=Math.cos(angle)*speed;v.vy=Math.sin(angle)*speed;v.nextTurn=Date.now()+randomRange(700,2600)}
export function createViewer(id,name,x,y){return{id,name,x:clamp(x,8,92),y:clamp(y,10,82),vx:randomRange(-7,7),vy:randomRange(-5,5),nextTurn:Date.now()+randomRange(700,2200),type:Math.floor(Math.random()*5)+1}}
export function moveViewers(viewers,dt,now){for(const v of Object.values(viewers)){if(now>=v.nextTurn)randomizeVelocity(v);v.x+=v.vx*dt;v.y+=v.vy*dt;const minX=8,maxX=92,minY=10,maxY=82;if(v.x<=minX){v.x=minX;v.vx=Math.abs(v.vx)}if(v.x>=maxX){v.x=maxX;v.vx=-Math.abs(v.vx)}if(v.y<=minY){v.y=minY;v.vy=Math.abs(v.vy)}if(v.y>=maxY){v.y=maxY;v.vy=-Math.abs(v.vy)}}}
