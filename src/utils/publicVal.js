import * as THREE from 'three'
const location=window.location;

let wsServer,imgHost;
if(location.href.indexOf('localhost')!=-1){
  wsServer='ws://192.168.131.157:48489/tq/train/info';
  imgHost='http://192.168.131.157:48489'
}else{
  // wsServer = location.protocol.replace('http', 'ws') + '//' + location.host + '/api/bscreen/tq/train/info';
  // imgHost = location.protocol.replace('https','http') + '//' + location.hostname +":" + (location.port||'48489');
  wsServer=window.WSSERVER;
  imgHost=window.IMGHOST;
}

export default {
  loader: {
    img:new THREE.ImageLoader(),
    texture: new THREE.TextureLoader(),
    font: new THREE.FontLoader()
  },
  fontUrl: './fonts/Droid Sans Fallback_Regular.json',
  //api/serve1/tq/train/info
  wsServer,
  imgHost,
  hideFlagTime:10000
}

