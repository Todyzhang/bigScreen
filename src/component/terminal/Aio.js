import * as THREE from 'three';
import Terminal from '../Terminal'
import {aio, host} from "../texture"

class Aio extends Terminal {

  /**
   * 创建外观纹理材质
   */
  createMaterial() {
    let front = new THREE.MeshPhongMaterial({
        map: aio.normal.front
      }),
      back = new THREE.MeshPhongMaterial({
        map: host.normal.side
      }),
      side = new THREE.MeshPhongMaterial({
        map: host.normal.side
      }),
      base = new THREE.MeshPhongMaterial({color: 0x0079b2, wireframe: false});

    this.materials = {side, front, base, back};

  }

  setNormalMaterial() {
    this.materials.side.map = host.normal.side;
    this.materials.front.map = aio.normal.front;
    this.materials.back.map = host.normal.back;
  }

  setAlarmMaterial() {
    this.materials.side.map = host.alarm.side;
    this.materials.front.map = aio.alarm.front;
    this.materials.back.map = aio.alarm.back;
    // this.showFlag("锦行网络有限公司占领01关键节点")
  }

  setWarnMaterial() {
    this.materials.side.map = host.warn.side;
    this.materials.front.map = aio.warn.front;
    this.materials.back.map = aio.warn.back;

  }

  /**
   * 创建主体
   */
  createMainCube() {
    let mtrs = this.materials;

    const materials = [mtrs.side, mtrs.side, mtrs.side, undefined, mtrs.front, mtrs.back];//左边 右边 上边 下边 前边 后边
    const curvePts = [];
    curvePts.push(new THREE.Vector3(0, 0, 0));
    curvePts.push(new THREE.Vector3(0, 0, -1));
    curvePts.push(new THREE.Vector3(0, 0.5, -3.5));
    curvePts.push(new THREE.Vector3(0, 3, -4));
    curvePts.push(new THREE.Vector3(0, 4, -4));
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


    const screenGeo = new THREE.BoxGeometry(20, 12.2, 1);


    const aio = new THREE.Mesh(screenGeo, materials);
    aio.position.y = 4 + 5.5 - 1;
    aio.position.z = -4;


    this.add(base, aio)
  }

  animate() {
    console.log("animate")
    if (this.animated) {

    }
  }


}

export default Aio