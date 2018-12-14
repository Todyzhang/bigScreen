import{host} from "../../../texture";
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
    const loader=Terminal.loader;
    let top=new THREE.MeshPhongMaterial({
      map:loader.load(host.top)
    }),
     front=new THREE.MeshPhongMaterial({
      map:loader.load(host.front)
    }),
     back=new THREE.MeshPhongMaterial({
      map:loader.load(host.back)
    }),
    side=new THREE.MeshPhongMaterial({
      map:loader.load(host.side)
    });

    this.materials=[top,front,back,side];

  }

  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;
    this.mainCube = new THREE.Mesh(
      new THREE.CubeGeometry(58, 120, 95),
      [mtrs[3],mtrs[3],mtrs[0],mtrs[0],mtrs[1],mtrs[2]] //左边 右边 上边 下边 前边 后边
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