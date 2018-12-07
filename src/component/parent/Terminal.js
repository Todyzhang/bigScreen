import * as THREE from 'three';


class Terminal extends THREE.Mesh{

  constructor() {
    super();
    this.statusColor={normal:new THREE.Color(0x000000),alarm:new THREE.Color(0xd4c800),warn:new THREE.Color(0xff0000)};
    this.init();

  }

  init(){
    this.createMaterial();
    this.createMainCube();
  }

  createMaterial(){}

  createMainCube(){}

  /**
   * 改变外观状态
   * @param type -normal 正常 -alarm 警告 -warn 报警
   */
  setStatus(type){
    let color=this.statusColor[type];
    color&&Array.isArray(this.materials)&&this.materials.map((v)=>v.emissive=color)
  }



}
Terminal.loader=new THREE.TextureLoader();

export default Terminal