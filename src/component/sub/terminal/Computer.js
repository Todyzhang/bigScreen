import * as THREE from 'three';
import Terminal from '../../parent/Terminal'
import { computer, host } from "../../../texture"


class Computer extends Terminal {

  /**
   * 创建外观纹理材质
   */
  createMaterial() {
    const loader = Terminal.loader;
    let front = new THREE.MeshPhongMaterial({
      map: loader.load(computer.front)
    }),
      back = new THREE.MeshPhongMaterial({
        map: loader.load(computer.back)
      }),
      side = new THREE.MeshPhongMaterial({
        map: loader.load(host.side)
      }),
      keyboard = new THREE.MeshBasicMaterial({
        map: loader.load(computer.keyboard)
      });

    this.materials = [side, front, back,keyboard];
  }

  /**
   * 创建主体
   */
  createMainCube() {
    this.createScreen();
    this.createKeyboard();
    this.createBase();
  }

  createScreen() {
    let mtrs = this.materials;

    let screen = new THREE.Mesh(new THREE.BoxGeometry(17, 10, 1), [mtrs[0], mtrs[0], mtrs[0], null, mtrs[1], mtrs[2]]);
    screen.position.y = 4 + 5.5 - 1;
    screen.position.z = -5;

    this.add(screen);
  }

  createKeyboard() {
    let keyboard = new THREE.Mesh(new THREE.BoxGeometry(17, 0.5, 5),this.materials[0]);
    keyboard.position.z = 2;
    keyboard.position.y = 0.25;

    this.add(keyboard)
  }

  createBase(){
    const base = this.createCircleExtrude(0.3, 2.5);
    const neck = this.createCircleExtrude(3.2, 0.8);
    base.position.z = -5;
    neck.position.y = 0.3;
    neck.position.z = -5;
    this.add(base);
    this.add(neck);
  }

  /**生成柱状体 */
  createCircleExtrude(height, circleRadius){
    const curvePts = [];
    curvePts.push(new THREE.Vector3(0, 0, 0));
    curvePts.push(new THREE.Vector3(0, height, 0));
    const spline = new THREE.CatmullRomCurve3(curvePts);
    const extrudeSettings = {
      // bevelEnabled:true,
      extrudePath: spline,
    };
    const circleShape = new THREE.Shape();
    circleShape.moveTo(0, circleRadius);
    circleShape.quadraticCurveTo(circleRadius, circleRadius, circleRadius, 0);
    circleShape.quadraticCurveTo(circleRadius, - circleRadius, 0, - circleRadius);
    circleShape.quadraticCurveTo(- circleRadius, - circleRadius, - circleRadius, 0);
    circleShape.quadraticCurveTo(- circleRadius, circleRadius, 0, circleRadius);
    const geometry = new THREE.ExtrudeGeometry(circleShape, extrudeSettings);
    const mesh = new THREE.Mesh(geometry, this.materials[0]);
    return mesh;
  }

}

export default Computer
