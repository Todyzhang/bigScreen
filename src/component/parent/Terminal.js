import * as THREE from 'three';

// THREE.SceneUtils = {
//   createMultiMaterialObject: function createMultiMaterialObject(geometry, materials) {
//     var group = new THREE.Group();
//
//     for (var i = 0, l = materials.length; i < l; i++) {
//       group.add(new THREE.Mesh(geometry, materials[i]));
//     }
//
//     return group;
//   },
//   detach: function detach(child, parent, scene) {
//     child.applyMatrix(parent.matrixWorld);
//     parent.remove(child);
//     scene.add(child);
//   },
//   attach: function attach(child, scene, parent) {
//     child.applyMatrix(new THREE.Matrix4().getInverse(parent.matrixWorld));
//     scene.remove(child);
//     parent.add(child);
//   }
// };

class Terminal extends THREE.Object3D{

  constructor() {
    super();
    this.statusColor={normal:new THREE.Color(0x000000),alarm:new THREE.Color(0xd4c800),warn:new THREE.Color(0xff0000)};
    this.init();

    this.createBg();
  }

  init(){
    this.createMaterial();
    this.createMainCube();
  }

  createMaterial(){}

  createMainCube(){}

  createBg(){
    let geo=new THREE.CircleGeometry(10, 30, 3, 2*Math.PI)
    let meshMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
    meshMaterial.side = THREE.DoubleSide;

    let wireFrameMaterial = new THREE.MeshBasicMaterial();
    wireFrameMaterial.wireframe = true;

    let circle = new THREE.Mesh(geo, meshMaterial);
    circle.depthTest=false;

    circle.rotateX(Math.PI/2)
    this.add(circle);
  }
  /**
   * 改变外观状态
   * @param type -normal 正常 -alarm 警告 -warn 报警
   */
  setStatus(type){
    let color=this.statusColor[type];
    color&&Array.isArray(this.materials)&&this.materials.map((v)=>v.emissive=color)
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



}
Terminal.loader=new THREE.TextureLoader();

export default Terminal