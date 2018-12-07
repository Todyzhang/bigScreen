import * as THREE from 'three';
import Terminal from '../parent/Terminal'
import{aio,host} from "../../texture"


class Aio extends Terminal{

  /**
   * 创建外观纹理材质
   */
  createMaterial(){
    const loader=Terminal.loader;
    let front=new THREE.MeshPhongMaterial({
      map:loader.load(aio.front)
    }),
    side=new THREE.MeshPhongMaterial({
      map:loader.load(host.side)
    });

    this.materials=[side,front];

  }

  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;

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
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x0079b2, wireframe: false });
    const base = new THREE.Mesh(baseGeo, baseMaterial);



    const screenGeo=new THREE.BoxGeometry(20,12.2,1);

    const materials=[mtrs[0],mtrs[0],mtrs[0],null,mtrs[1],mtrs[0]];//左边 右边 上边 下边 前边 后边
    const aio=new THREE.Mesh(screenGeo,materials);
    aio.position.y=4+5.5-1;
    aio.position.z=-4;


    this.add(base,aio)
  }




}

export default Aio