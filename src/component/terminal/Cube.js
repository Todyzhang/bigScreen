import * as THREE from 'three';
import Terminal from '../Terminal'
import {host} from "../texture"

class Cube extends Terminal{

  /**
   * 创建外观纹理材质
   */
  createMaterial(){
    let back=new THREE.MeshPhongMaterial({
        map:host.normal.back
      }),
      side=new THREE.MeshPhongMaterial({
        map:host.normal.side
      }),
      top=new THREE.MeshPhongMaterial({
        map:host.normal.top
      }),
      line = new THREE.LineBasicMaterial({ color: 0x009ad8 });

    this.materials={side,back,top,line};

  }
  setNormalMaterial(){
    this.materials.side.map=host.normal.side;
    this.materials.back.map=host.normal.back;
    this.materials.top.map=host.normal.top;
    this.materials.line.color=new THREE.Color(0x009ad8);
  }
  setAlarmMaterial(){
    this.materials.side.map=host.alarm.side;
    this.materials.back.map=host.alarm.back;
    this.materials.top.map=host.alarm.top;
    this.materials.line.color=new THREE.Color(0xffa95c)
  }
  setWarnMaterial(){
    this.materials.side.map=host.warn.side;
    this.materials.back.map=host.warn.back;
    this.materials.top.map=host.warn.top;
    this.materials.line.color=new THREE.Color(0xff3332)
  }
  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;
    //左边 右边 上边 下边 前边 后边
    const box = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10, 1, 3, 1), [mtrs.side, mtrs.side, mtrs.top, undefined, mtrs.side, mtrs.side]);

    const square = new THREE.Geometry();
    const halfSize = 10 / 2;
    square.vertices.push(new THREE.Vector3(halfSize, halfSize, -halfSize));
    square.vertices.push(new THREE.Vector3(halfSize, halfSize, halfSize));
    square.vertices.push(new THREE.Vector3(-halfSize, halfSize, halfSize));
    square.vertices.push(new THREE.Vector3(-halfSize, halfSize, -halfSize));
    square.vertices.push(new THREE.Vector3(halfSize, halfSize, -halfSize));
    // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x009ad8 });
    const lineSquare = new THREE.Line(square, mtrs.line);
    box.add(lineSquare);
    let box_s=box.clone();
    box.position.y=5;
    box_s.scale.set(0.5,0.5,0.5)
    box_s.position.x=5;
    box_s.position.y=3
    box_s.position.z=-10

    this.add(box,box_s)


  }





}

export default Cube