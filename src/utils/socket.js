/**
 * var ws=new socket("ws://192.168.126.40:8001",(data)=>{
      console.log("ws:",data)
    });
 */
class Socket {
  constructor(wsUrl,cb){
    this.ws=new WebSocket(wsUrl);
    this.callback=cb;
    this.addEvents();
  }

  addEvents(){
    let that=this;
    this.ws.onopen = (evt)=>this.onOpen(evt)
    this.ws.onclose = (evt)=>this.onClose(evt)
    this.ws.onerror = (evt)=>this.onError(evt)

    this.ws.onmessage = (evt)=>this.onMessage(evt)
  }

  onOpen(evt){
    console.log('websocket connect')
    this.ws.send('game1')
  }

  onError(evt){

  }

  onMessage(evt){
    // console.log(evt)
    this.callback&&this.callback(evt.data);
    // let data=evt.data;
    // try{
    //   data=JSON.parse(data);
    // }catch (e){
    //   data={}
    // }
    // if(data.code===0){
    //   console.log(data.data)
    // }

  }

  onClose(evt){
    console.log('websocket close')
  }
}


export default Socket