import * as THREE from 'three';
import Terminal from '../../parent/Terminal'
import {laptop, host} from "../../../texture"


class Laptop extends Terminal{

  /**
   * 创建外观纹理材质
   */
  createMaterial(){
    let front=new THREE.MeshPhongMaterial({
      map:laptop.normal.front
    }),

    side=new THREE.MeshPhongMaterial({
      map:host.normal.side
    }),
      keyboard=new THREE.MeshPhongMaterial({
        map:laptop.normal.keyboard
      });

    this.materials={side,front,keyboard};
    this.createKeyboard();
  }
  setNoramlMaterial(){
    this.materials.side.map=laptop.normal.side;
    this.materials.front.map=laptop.normal.front;
    this.materials.keyboard.map=laptop.normal.keyboard;
  }
  setAlarmMaterial(){
    this.materials.side.map=host.alarm.side;
    this.materials.front.map=laptop.alarm.front;
    this.materials.keyboard.map=laptop.alarm.keyboard;
  }
  setWarnMaterial(){
    this.materials.side.map=host.warn.side;
    this.materials.front.map=laptop.warn.front;
    this.materials.keyboard.map=laptop.warn.keyboard;
  }
  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;

    let screen = new THREE.Mesh(new THREE.BoxGeometry(18, 10, 1), [mtrs.side, mtrs.side, mtrs.side, null, mtrs.front, mtrs.side]);
    screen.position.y = 5;
    screen.position.z = -5;

    this.add(screen);
  }

  createKeyboard(){
    let keyboard = new THREE.Mesh(new THREE.BoxGeometry(18, 1, 10), this.materials.keyboard);

    this.add(keyboard)
  }



}

export default Laptop