import * as THREE from 'three';
import Terminal from '../../parent/Terminal'
import{aio,host} from "../../../texture"
import utils from "../../../utils/utils";
const TWEEN = require('@tweenjs/tween.js');

class Aio extends Terminal{

  /**
   * 创建外观纹理材质
   */
  createMaterial(){
    let front=new THREE.MeshPhongMaterial({
      map:aio.normal.front
    }),
    back=new THREE.MeshPhongMaterial({
      map:host.normal.side
    }),
    side=new THREE.MeshPhongMaterial({
      map:host.normal.side
    }),
    base=new THREE.MeshPhongMaterial({ color: 0x0079b2, wireframe: false });

    this.materials={side,front,base,back};
    this.bg=new THREE.CanvasTexture(this.createRadialMaterial());

    // this.createBg();
    // this.animated=false;

  }
  setNoramlMaterial(){
    this.materials.side.map=host.normal.side;
    this.materials.front.map=aio.normal.front;
    this.materials.back.map=host.normal.back;
  }
  setAlarmMaterial(){
    this.materials.side.map=host.alarm.side;
    this.materials.front.map=aio.alarm.front;
    this.materials.back.map=aio.alarm.back;
    this.createBg();
    this.createTextBorder();
    utils.loadFont()
      .then((font)=>{
        this.createWords(font,"锦行网络攻克了该服务器",4)
      })

  }
  setWarnMaterial(){
    this.materials.side.map=host.warn.side;
    this.materials.front.map=aio.warn.front;
    this.materials.back.map=aio.warn.back;

  }
  createBg(){
    if(!this.circle){
      let geo=new THREE.CircleGeometry(10, 80, 0, 2*Math.PI)
      let meshMaterial = new THREE.MeshPhongMaterial({map:this.bg,transparent:true,opacity:0.5});
      // meshMaterial.side = THREE.DoubleSide;
      let circle = new THREE.Mesh(geo, meshMaterial);


      circle.rotateX(-Math.PI/2)
      circle.position.y=0.1;//不粘地板，防止闪烁
      // circle.visible=false;
      this.circle=circle;
      this.add(circle);
    }
  }
  showBg(){
    let flag=false
  }
  createTextBorder(){
    if(!this.txtBorder){
      let shapes=new THREE.Shape();
      let point2d=[
        new THREE.Vector3(-3,-5,0),
        new THREE.Vector3(-20,-5,0),
        new THREE.Vector3(-25,-10,0),
        new THREE.Vector3(-25,-20,0),
        new THREE.Vector3(45,-20,0),
        new THREE.Vector3(50,-15,0),
        new THREE.Vector3(50,-5,0),
        new THREE.Vector3(3,-5,0),
        new THREE.Vector3(0,0,0),
      ]
      let geo=new THREE.Geometry();

      point2d.forEach((v)=>{
        shapes.lineTo(v.x,v.y);
        geo.vertices.push(v)
      });
      let shapeGeometry=new THREE.ShapeGeometry(shapes);
      let map=new THREE.Texture(this.createLinearMaterial());
      map.needsUpdate=true;
      let mesh = new THREE.Mesh(
        shapeGeometry,
        new THREE.MeshStandardMaterial({
          map:map,
          side:THREE.DoubleSide,
          depthTest:false,
          metalness:0.2,
          roughness:0.07
          // transparent:true
        }));

      let border=new THREE.LineLoop(geo,
        new THREE.LineBasicMaterial({color:0xffa95c,side:THREE.DoubleSide}));
      mesh.add(border)

      this.add(mesh)
      mesh.position.y=25
      mesh.rotateX(Math.PI);

      this.txtBorder=mesh;
      window.txtBorder=mesh;
    }

  }
  createLinearMaterial() {
    const canvas = document.createElement('canvas');
    canvas.width = 750;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    const grd = ctx.createLinearGradient(0,0,0,200);
    grd.addColorStop(0, 'transparent');
    grd.addColorStop(0.25, '#1b2023');
    grd.addColorStop(0.5, '#ffa95c');
    grd.addColorStop(0.75, '#1b2023');
    grd.addColorStop(1, 'transparent');

    return canvas;
  }
  createRadialMaterial() {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    const grd = ctx.createRadialGradient(50, 50,20,50,50, 50);
    grd.addColorStop(0, 'transparent');
    grd.addColorStop(1, '#ffa95c');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 100, 100);

    return canvas;
  }
  createWords (font, msg,fontSize,bg) {
    if(!this.text){
      let text;
      const color = 0xe8c857;
      const matLite = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        depthTest:false //防止字体闪烁
      });
      const shapes = font.generateShapes(msg, fontSize);
      const geo = new THREE.ShapeBufferGeometry(shapes);
      text = new THREE.Mesh(geo, matLite);

      text.position.x=-20
      text.position.y=35
      this.text=text;
      this.add(text)
    }

    // if(bg){
    //   this.createPlane(bg,text);
    // }else{
    //   return text;
    // }

  }
  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;

    const materials=[mtrs.side,mtrs.side,mtrs.side,null,mtrs.front,mtrs.back];//左边 右边 上边 下边 前边 后边
    const curvePts = [];
    curvePts.push(new THREE.Vector3(0,0,0));
    curvePts.push(new THREE.Vector3(0,0,-1));
    curvePts.push(new THREE.Vector3(0,0.5,-3.5));
    curvePts.push(new THREE.Vector3(0,3,-4));
    curvePts.push(new THREE.Vector3(0,4,-4));
    const randomSpline = new THREE.CatmullRomCurve3(curvePts);

    const extrudeSettings = {
      steps: 100,
      bevelEnabled: false,
      extrudePath: randomSpline
    };
    const pts = [];
    pts.push(new THREE.Vector2(2.5, 0.2));
    pts.push(new THREE.Vector2(-2.5, 0.2));
    pts.push(new THREE.Vector2(-2.5, -0.2));
    pts.push(new THREE.Vector2(2.5, -0.2));

    const shape = new THREE.Shape(pts);
    const baseGeo = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    const base = new THREE.Mesh(baseGeo, mtrs.side);



    const screenGeo=new THREE.BoxGeometry(20,12.2,1);


    const aio=new THREE.Mesh(screenGeo,materials);
    aio.position.y=4+5.5-1;
    aio.position.z=-4;


    this.add(base,aio)
  }

  animate(){
    console.log("animate")
    if(this.animated){

    }
  }




}

export default Aio