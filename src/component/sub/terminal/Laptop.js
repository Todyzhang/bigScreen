import * as THREE from 'three';
import Terminal from '../../parent/Terminal'
import{laptop,host} from "../../../texture"


class Laptop extends Terminal{

  /**
   * 创建外观纹理材质
   */
  createMaterial(){
    const loader=Terminal.loader;
    let front=new THREE.MeshPhongMaterial({
      map:loader.load(laptop.front)
    }),

    side=new THREE.MeshPhongMaterial({
      map:loader.load(host.side)
    }),
      keyboard=new THREE.MeshBasicMaterial({
        map:loader.load(laptop.top)
      });

    this.materials=[side,front];
    this.createKeyboard(keyboard);
  }

  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;

    let screen = new THREE.Mesh(new THREE.BoxGeometry(18, 10, 1), [mtrs[0], mtrs[0], mtrs[0], null, mtrs[1], mtrs[0]]);
    screen.position.y = 5;
    screen.position.z = -5;

    this.add(screen);
  }

  createKeyboard(material){
    let keyboard = new THREE.Mesh(new THREE.BoxGeometry(18, 1, 10), material);

    this.add(keyboard)
  }



}

export default Laptop