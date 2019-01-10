/**
 * var ws=new socket("ws://192.168.128.153:8489/tq/train/info",(data)=>{
      console.log("ws:",data)
    });
 */

class Socket {
  constructor(wsUrl, cb) {
    this.ws = null;
    this.wsUrl = wsUrl;
    this.callback = cb;

    this.createWS();
  }

  createWS() {
    this.ws = new WebSocket(this.wsUrl);
    this.addEvents();
  }

  addEvents() {
    this.ws.onopen = (evt) => this.onOpen(evt)
    this.ws.onclose = (evt) => this.onClose(evt)
    this.ws.onerror = (evt) => this.onError(evt)

    this.ws.onmessage = (evt) => this.onMessage(evt);

    window.onbeforeunload = (evt) => this.onBeforeUnload(evt);
  }

  onOpen(evt) {
    console.log('websocket connect')
    this.ws.send('ranking')
  }

  onError(evt) {

  }

  onMessage(evt) {
    // console.log(evt)
    this.callback && this.callback(evt.data);
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

  onBeforeUnload(evt) {
    this.ws.send('quit');
  }

  onClose(evt) {
    this.createWS();
    console.log('websocket close')
  }

  close() {
    this.ws.close();
  }
}


export default Socket