import Model from "../Model";
import * as THREE from "three";

class InfoUI extends Model{

  init(){
    this.sprite=new THREE.Sprite(new THREE.MeshBasicMaterial({color:0xff000,transparent:true,opacity:0.5}));
    // this.loadFont()
    //   .then((font)=>{
    //     this.sprite.add(this.createWords(font,"ISW 2018企业内网安全攻防对抗战",30))
    //   })
    this.add(this.createSpriteText())
  }

  createSpriteText(){
    //先用画布将文字画出
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width=1000;
    canvas.height=1000
    ctx.fillStyle = "#ff0000";
    ctx.font = "Bold 10px Arial";
    ctx.lineWidth = 1;
    ctx.fillText("ISW 2018企业内网安全攻防对抗战",0,0);
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    //使用Sprite显示文字
    let material = new THREE.SpriteMaterial({map:texture});
    let textObj = new THREE.Sprite(material);
    textObj.scale.set(200, 200, 10);
    textObj.position.set(0,98,98);
    return textObj;
  }
  loadFont(){
    const fontUrl = './fonts/Microsoft YaHei_Bold.json';
    return new Promise((resolve) => {
      Model.loader.font.load(fontUrl, resolve);
    });
  }
  createWords (font, msg,fontSize,bg) {
    let text;
    const color = 0xffffff;
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide
    });
    const shapes = font.generateShapes(msg, fontSize);
    const geo = new THREE.ShapeBufferGeometry(shapes);
    text = new THREE.Mesh(geo, matLite);

    if(bg){
      this.createPlane(bg,text);
    }else{
      return text;
    }

  }
}

export default InfoUI