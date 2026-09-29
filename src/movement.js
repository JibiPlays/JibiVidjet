export function clamp(v,min,max){return Math.max(min,Math.min(max,Number(v)||0))}
export function randomRange(min,max){return min+Math.random()*(max-min)}
export function randomizeVelocity(v){const speed=randomRange(4,8);v.vx=(Math.random()<.5?-1:1)*speed;v.vy=0;v.nextTurn=Date.now()+randomRange(1400,3200)}
export function createViewer(id,name,x,y){return{id,name,x:clamp(x,8,92),y:84,vx:(Math.random()<.5?-1:1)*randomRange(4,8),vy:0,nextTurn:Date.now()+randomRange(1400,3200),type:Math.floor(Math.random()*5)+1,phase:Math.random()*Math.PI*2}}
export function moveViewers(viewers,dt,now){for(const v of Object.values(viewers)){if(now>=v.nextTurn)randomizeVelocity(v);v.x+=v.vx*dt;const minX=7,maxX=93;if(v.x<=minX){v.x=minX;v.vx=Math.abs(v.vx)}if(v.x>=maxX){v.x=maxX;v.vx=-Math.abs(v.vx)}v.y=84+Math.sin(now*.006+(v.phase||0))*0.35}}
