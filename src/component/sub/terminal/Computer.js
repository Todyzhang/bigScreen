import * as THREE from 'three';
import Terminal from '../../parent/Terminal'
import {computer, host} from "../../../texture"


class Computer extends Terminal {

  /**
   * 创建外观纹理材质
   */
  createMaterial() {
    let front = new THREE.MeshPhongMaterial({
      map: computer.normal.front
    }),
      back = new THREE.MeshPhongMaterial({
        map: computer.normal.back
      }),
      side = new THREE.MeshPhongMaterial({
        map: host.normal.side
      }),
      keyboard = new THREE.MeshPhongMaterial({
        map: computer.normal.keyboard
      });

    this.materials = {side, front, back,keyboard};
  }
  setNoramlMaterial(){
    this.materials.side.map=host.normal.side;
    this.materials.front.map=computer.normal.front;
    this.materials.back.map=computer.normal.back;
    this.materials.keyboard.map=computer.normal.keyboard;
  }
  setAlarmMaterial(){
    this.materials.side.map=host.alarm.side;
    this.materials.front.map=computer.alarm.front;
    this.materials.back.map=computer.alarm.back;
    this.materials.keyboard.map=computer.alarm.keyboard;
  }
  setWarnMaterial(){
    this.materials.side.map=host.warn.side;
    this.materials.front.map=computer.warn.front;
    this.materials.back.map=computer.warn.back;
    this.materials.keyboard.map=computer.warn.keyboard;
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

    let screen = new THREE.Mesh(new THREE.BoxGeometry(17, 10, 1), [mtrs.side, mtrs.side, mtrs.side, null, mtrs.front, mtrs.back]);
    screen.position.y = 4 + 5.5 - 1;
    screen.position.z = -5;

    this.add(screen);
  }

  createKeyboard() {
    let keyboard = new THREE.Mesh(new THREE.BoxGeometry(17, 0.5, 5),this.materials.keyboard);
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
    const mesh = new THREE.Mesh(geometry, this.materials.side);
    return mesh;
  }

}

export default Computer
