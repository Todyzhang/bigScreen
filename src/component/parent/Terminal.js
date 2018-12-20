import * as THREE from 'three';

class Terminal extends THREE.Object3D{

  constructor() {
    super();
    // this.statusColor={normal:new THREE.Color(0x000000),alarm:new THREE.Color(0xd4c800),warn:new THREE.Color(0xff0000)};
    this.animated=false;//是否有动画
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
    if(type==="alarm"){
      this.setAlarmMaterial()
    }else if(type==="warn"){
      this.setWarnMaterial();
    }else{
      this.setNoramlMaterial()
    }
  }
  setNoramlMaterial(){
  }
  setAlarmMaterial(){
  }
  setWarnMaterial(){
  }

  /**
   * 得到box size
   * @returns {{x: *, z: *}}
   */
  getBorder(){
    if(this.borderX&&this.borderZ) return {x:this.borderX,z:this.borderZ};

    let box3 = new THREE.Box3(), size;
    box3.expandByObject(this);
    size = box3.getSize();
    let {x, z} = size;

    this.borderX=x;
    this.borderZ=z;
    return {x:x,z:z};
  }

  /**
   * 动画
   */
  animate(){}



}

export default Terminal