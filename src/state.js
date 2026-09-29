export const STATE_KEY='JibiVidjet.state.v5';
export const defaultState={version:7,viewers:{},messages:[]};
export function loadState(){
  try{
    const saved=localStorage.getItem(STATE_KEY);
    if(!saved)return structuredClone(defaultState);
    const p=JSON.parse(saved);
    if(!p||p.version<7)return structuredClone(defaultState);
    return {...defaultState,...p,version:7,viewers:p.viewers||{},messages:[]};
  }catch(e){
    return structuredClone(defaultState);
  }
}
export function saveState(state){
  try{localStorage.setItem(STATE_KEY,JSON.stringify(state))}catch(e){}
}