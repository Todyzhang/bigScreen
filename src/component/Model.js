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

  debugPoint(vector3){
    let geo=new THREE.BoxGeometry(3,30,3);
    let mar=new THREE.MeshBasicMaterial({color:0xff0000});
    let box=new THREE.Mesh(geo,mar);
    this.add(box);
    console.log(vector3)

    // box.position.set({x:vector3.x,y:vector3.y,z:vector3.z})
    box.position.x=vector3.x;
    box.position.y=vector3.y;
    box.position.z=vector3.z;
  }
  debugPoints(points){
    points.forEach((v)=>{
      this.debugPoint(v)
    })
  }
  debugLine(points){
    let lineGeo = new THREE.Geometry();
    let color=[new THREE.Color(0xff0000),new THREE.Color(0xffff00)];
    lineGeo.vertices.push(...points);
    points.forEach((v,i)=>{
      lineGeo.colors.push(color[i%2]);
    });
    let line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({vertexColors: true}));

    this.add(line);

    return line;
  }
}
Model.loader={
  texture:new THREE.TextureLoader(),
  font:new THREE.FontLoader()
};
export default Model