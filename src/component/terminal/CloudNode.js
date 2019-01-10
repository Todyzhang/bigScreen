import {node} from "../texture";
import * as THREE from 'three';
import Terminal from '../Terminal'


class CloudNode extends Terminal{

  /**
   * 创建外观纹理材质
   */
  createMaterial(){

    let top=new THREE.MeshPhongMaterial({
      map:node.normal.top
    }),
     front=new THREE.MeshPhongMaterial({
      map:node.normal.front
    }),
     back=new THREE.MeshPhongMaterial({
      map:node.normal.back
    }),
    side=new THREE.MeshPhongMaterial({
      map:node.normal.side
    });

    this.materials={top,front,back,side};

  }
  setNormalMaterial(){
    this.materials.top.map=node.normal.side;
    this.materials.front.map=node.normal.front;
    this.materials.back.map=node.normal.back;
    this.materials.side.map=node.normal.side;
  }
  setAlarmMaterial(){
    this.materials.top.map=node.alarm.side;
    this.materials.front.map=node.alarm.front;
    this.materials.back.map=node.alarm.back;
    this.materials.side.map=node.alarm.side;
  }
  setWarnMaterial(){
    this.materials.top.map=node.warn.side;
    this.materials.front.map=node.warn.front;
    this.materials.back.map=node.warn.back;
    this.materials.side.map=node.warn.side;
  }
  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;
    this.mainCube = new THREE.Mesh(
      new THREE.CubeGeometry(10, 2, 7.5),
      [mtrs.side,mtrs.side,mtrs.top,undefined,mtrs.front,mtrs.back] //左边 右边 上边 下边 前边 后边
    );

    this.mainCube.position.y=1;

    this.add(this.mainCube)
  }



}

export default CloudNode