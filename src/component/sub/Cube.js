import * as THREE from 'three';
import Terminal from '../parent/Terminal'
import {computer, host} from "../../texture"

class Cube extends Terminal{

  /**
   * 创建外观纹理材质
   */
  createMaterial(){
    const loader=Terminal.loader;
    let back=new THREE.MeshPhongMaterial({
        map:loader.load(computer.back)
      }),
      side=new THREE.MeshPhongMaterial({
        map:loader.load(host.side)
      });

    this.materials=[side,back];

  }

  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;

    const box = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10, 1, 3, 1), [mtrs[0], mtrs[0], mtrs[1], null, mtrs[0], mtrs[0]]);

    const square = new THREE.Geometry();
    const halfSize = 10 / 2;
    square.vertices.push(new THREE.Vector3(halfSize, halfSize, -halfSize));
    square.vertices.push(new THREE.Vector3(halfSize, halfSize, halfSize));
    square.vertices.push(new THREE.Vector3(-halfSize, halfSize, halfSize));
    square.vertices.push(new THREE.Vector3(-halfSize, halfSize, -halfSize));
    square.vertices.push(new THREE.Vector3(halfSize, halfSize, -halfSize));
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x009ad8 });
    const lineSquare = new THREE.Line(square, lineMaterial);
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