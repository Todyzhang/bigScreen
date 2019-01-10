import * as THREE from 'three';
import Model from './Model'

class Wire extends Model{
  init(){
    this.createMainCube();
  }

  /**
   * 创建主体
   */
  createMainCube(){
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 150;
    const ctx = canvas.getContext("2d");
    const grd = ctx.createLinearGradient(25, 0, 25, 150);
    grd.addColorStop(1, '#02b7c4');
    grd.addColorStop(0.25, 'rgba(255,255,255,0.5)');
    grd.addColorStop(0, 'rgba(255,255,255,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 50, 150);
    const canvasTexture=new THREE.CanvasTexture(canvas);

    const planeGeo=new THREE.PlaneGeometry(0.5,40);
    const hMaterial=new THREE.MeshBasicMaterial({map: canvasTexture,transparent:true, side: THREE.DoubleSide});
    const hPlane = new THREE.Mesh( planeGeo, hMaterial );
    hPlane.rotation.x=Math.PI/2;
    hPlane.rotation.z=-Math.PI/2;

    const circleGeo = new THREE.CircleGeometry( 1, 32 );
    const circleMaterial = new THREE.MeshBasicMaterial( { color: 0x02b8c5, side: THREE.DoubleSide } );
    const circle=new THREE.Mesh(circleGeo,circleMaterial);
    circle.position.x=-20;
    circle.rotation.y=Math.PI/2;

    const vGeoHeightArr=[44,48,45,39,43,50];
    for(let i=0;i<6;i+=1){
      const copy=hPlane.clone();
      copy.position.z=i*6;
      this.add(copy);

      const circleCopy=circle.clone();
      circleCopy.position.y=vGeoHeightArr[i];
      circleCopy.position.z=i*6;
      this.add(circleCopy);

      const geo=new THREE.PlaneGeometry(0.5,vGeoHeightArr[i]);
      const vMaterial=new THREE.MeshBasicMaterial({color: 0x02b8c5, side: THREE.DoubleSide});
      const vPlane=new THREE.Mesh(geo,vMaterial);
      vPlane.rotation.y=Math.PI/2;
      vPlane.position.x=-20;
      vPlane.position.y=vGeoHeightArr[i]/2;
      vPlane.position.z=i*6;
      this.add(vPlane);
    }
  }
}

export default Wire