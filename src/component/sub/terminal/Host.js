import {host} from "../../../texture";
import * as THREE from 'three';
import Terminal from '../../parent/Terminal'


class Host extends Terminal{
  init(){
    super.init();
    this.adjust();

  }

  /**
   * 创建外观纹理材质
   */
  createMaterial(){
    let top=new THREE.MeshPhongMaterial({
      map:host.normal.top
    }),
     front=new THREE.MeshPhongMaterial({
      map:host.normal.front
    }),
     back=new THREE.MeshPhongMaterial({
      map:host.normal.back
    }),
    side=new THREE.MeshPhongMaterial({
      map:host.normal.side
    });

    this.materials={top,front,back,side};

  }
  setNoramlMaterial(){
    this.materials.top.map=host.normal.side;
    this.materials.front.map=host.normal.front;
    this.materials.back.map=host.normal.back;
    this.materials.side.map=host.normal.back;
  }
  setAlarmMaterial(){
    this.materials.top.map=host.alarm.side;
    this.materials.front.map=host.alarm.front;
    this.materials.back.map=host.alarm.back;
    this.materials.side.map=host.alarm.back;
  }
  setWarnMaterial(){
    this.materials.top.map=host.warn.side;
    this.materials.front.map=host.warn.front;
    this.materials.back.map=host.warn.back;
    this.materials.side.map=host.warn.back;
  }
  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;
    this.mainCube = new THREE.Mesh(
      new THREE.CubeGeometry(58, 120, 95),
      [mtrs.side,mtrs.side,mtrs.top,null,mtrs.front,mtrs.back] //左边 右边 上边 下边 前边 后边
    );

    this.add(this.mainCube)
  }

  /**
   * 调整主体位置
   */
  adjust(){
    this.mainCube.scale.set(0.16,0.16,0.16);
    this.mainCube.position.y=9.6;
  }


}

export default Host