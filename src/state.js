export const STATE_KEY='JibiVidjet.state.v4';
export const defaultState={version:6,viewers:{},messages:[]};
export function loadState(){try{const keys=[STATE_KEY,'JibiVidjet.state.v3','JibiVidjet.state.v2','JibiVidjet.state.v1'];for(const key of keys){const saved=localStorage.getItem(key);if(saved){const p=JSON.parse(saved);return {...defaultState,...p,version:6,viewers:p.viewers||{},messages:Array.isArray(p.messages)?p.messages:[]}}}return structuredClone(defaultState)}catch(e){return structuredClone(defaultState)}}
export function saveState(state){try{localStorage.setItem(STATE_KEY,JSON.stringify(state))}catch(e){}}
