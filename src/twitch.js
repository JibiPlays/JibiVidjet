const RETRY_MS=3000;
export function connectStreamerBot({host='127.0.0.1',port=8080,onChatMessage}={}){
  let socket=null;
  let retryTimer=null;
  let closedByUs=false;
  let requestId=0;
  function connect(){
    if(closedByUs)return;
    try{
      socket=new WebSocket('ws://'+host+':'+port+'/');
    }catch(e){
      schedule();
      return;
    }
    socket.addEventListener('open',()=>{
      const id='jibividjet-'+Date.now()+'-'+(++requestId);
      socket.send(JSON.stringify({
        request:'Subscribe',
        id,
        events:{Twitch:['ChatMessage']}
      }));
    });
    socket.addEventListener('message',event=>{
      let packet;
      try{packet=JSON.parse(event.data)}catch(e){return}
      if(packet?.event?.source!=='Twitch'||packet?.event?.type!=='ChatMessage')return;
      const data=packet.data||{};
      if(data.isTest)return;
      if(typeof onChatMessage==='function')onChatMessage(data);
    });
    socket.addEventListener('close',()=>{
      socket=null;
      schedule();
    });
    socket.addEventListener('error',()=>{
      try{socket?.close()}catch(e){}
    });
  }
  function schedule(){
    if(retryTimer||closedByUs)return;
    retryTimer=setTimeout(()=>{retryTimer=null;connect()},RETRY_MS);
  }
  connect();
  return {
    close(){
      closedByUs=true;
      clearTimeout(retryTimer);
      retryTimer=null;
      try{socket?.close()}catch(e){}
      socket=null;
    }
  };
}