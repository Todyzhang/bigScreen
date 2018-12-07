import * as THREE from 'three';


class Model extends THREE.Group{
  constructor(){
    super();
    this.init();
  }

  /**
   * 运行入口
   */
  init(){}
}
Model.loader={
  texture:new THREE.TextureLoader(),
  font:new THREE.FontLoader()
};
export default Model