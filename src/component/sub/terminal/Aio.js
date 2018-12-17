import * as THREE from 'three';
import Terminal from '../../parent/Terminal'
import{aio,host} from "../../../texture"
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
    });

    this.materials={side,front,back};

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
  }
  setWarnMaterial(){
    this.materials.side.map=host.warn.side;
    this.materials.front.map=aio.warn.front;
    this.materials.back.map=aio.warn.back;

  }
  createBg(){
    let geo=new THREE.CircleGeometry(15, 80, 0, 2*Math.PI)
    let meshMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
    meshMaterial.side = THREE.DoubleSide;
    // meshMaterial.depthTest=false;//防止闪烁


    let circle = new THREE.Mesh(geo, meshMaterial);


    circle.rotateX(-Math.PI/2)
    circle.position.y=0.1;
    // circle.visible=false;
    this.circle=circle;
    this.add(circle);
  }
  showBg(){
    let flag=false
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
    // const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x0079b2 });
    const base = new THREE.Mesh(baseGeo, materials);



    const screenGeo=new THREE.BoxGeometry(20,12.2,1);


    const aio=new THREE.Mesh(screenGeo,materials);
    aio.position.y=4+5.5-1;
    aio.position.z=-4;


    this.add(base,aio)
  }

  animate(){
    if(this.animated){

    }
  }




}

export default Aio