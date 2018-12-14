import{node} from "../../../texture";
import * as THREE from 'three';
import Terminal from '../../parent/Terminal'


class CloudNode extends Terminal{

  /**
   * 创建外观纹理材质
   */
  createMaterial(){
    const loader=Terminal.loader;
    let top=new THREE.MeshPhongMaterial({
      map:loader.load(node.top)
    }),
     front=new THREE.MeshPhongMaterial({
      map:loader.load(node.front)
    }),
     back=new THREE.MeshPhongMaterial({
      map:loader.load(node.back)
    }),
    side=new THREE.MeshPhongMaterial({
      map:loader.load(node.side)
    });

    this.materials=[top,front,back,side];

  }

  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;
    this.mainCube = new THREE.Mesh(
      new THREE.CubeGeometry(10, 2, 7.5),
      [mtrs[3],mtrs[3],mtrs[0],mtrs[0],mtrs[1],mtrs[2]] //左边 右边 上边 下边 前边 后边
    );

    this.mainCube.position.y=1;

    this.add(this.mainCube)
  }



}

export default CloudNode