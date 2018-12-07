import * as THREE from 'three';
import Terminal from '../parent/Terminal'


class Firewall extends Terminal{

  /**
   * 创建外观纹理材质
   */
  createMaterial(){
    let canvas1 = this.getCanvas1(),canvas2 = this.getCanvas2(),canvas3 = this.getCanvas3();

    const material1 = new THREE.MeshPhongMaterial({ map: new THREE.CanvasTexture(canvas1) });
    const material2 = new THREE.MeshPhongMaterial({ map: new THREE.CanvasTexture(canvas2) });
    const material3 = new THREE.MeshPhongMaterial({ map: new THREE.CanvasTexture(canvas3) });
    this.materials=[material1,material2,material3];

  }

  /**
   * 创建主体
   */
  createMainCube(){
    let mtrs=this.materials;

    const firewallGeo = new THREE.BoxGeometry(16, 12, 4);
    const firewall = new THREE.Mesh(firewallGeo, [mtrs[1],mtrs[1],mtrs[2],mtrs[2],mtrs[0],mtrs[0]]);
    firewall.position.y = 6;
    this.add(firewall)
  }

  getCanvas1() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 150;
    const ctx = canvas.getContext("2d");
    const grd = ctx.createLinearGradient(120, 0, 80, 150);
    grd.addColorStop(0, '#281920');
    grd.addColorStop(0.25, '#3a1720');
    grd.addColorStop(0.5, '#62141f');
    grd.addColorStop(1, '#dc091c');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 200, 150);

    ctx.lineWidth = 3
    ctx.strokeStyle = '#f63133'
    const lineArr = [
      [0, 50, 60, 50],
      [70, 0, 70, 45],
      [0, 100, 90, 100],
      [70, 90, 70, 150],
      [140, 50, 140, 100],
      [200, 50, 155, 50],
      [200, 100, 170, 100],
      [0, 1, 200, 1],
      [199, 0, 199, 90],
    ];
    for (let i = 0; i < lineArr.length; i += 1) {
      ctx.moveTo(lineArr[i][0], lineArr[i][1]);
      ctx.lineTo(lineArr[i][2], lineArr[i][3]);
      ctx.stroke();
    }

    return canvas;
  }

  getCanvas2() {
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 150;
    const ctx = canvas.getContext("2d");
    const grd = ctx.createLinearGradient(25, 0, 25, 150);
    grd.addColorStop(0, '#281920');
    grd.addColorStop(0.25, '#121b23');
    grd.addColorStop(0.5, '#62141f');
    grd.addColorStop(1, '#dc091c');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 50, 150);

    ctx.lineWidth = 3
    ctx.strokeStyle = '#f63133'
    const lineArr = [
      [0, 1, 50, 1],
      [0, 50, 50, 50],
      [0, 100, 50, 100],
    ];
    for (let i = 0; i < lineArr.length; i += 1) {
      ctx.moveTo(lineArr[i][0], lineArr[i][1]);
      ctx.lineTo(lineArr[i][2], lineArr[i][3]);
      ctx.stroke();
    }

    return canvas;
  }

  getCanvas3() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext("2d");
    const grd = ctx.createLinearGradient(200, 25, 0, 25);
    grd.addColorStop(0, '#281920');
    grd.addColorStop(0.25, '#1d1a21');
    grd.addColorStop(0.5, '#62141f');
    grd.addColorStop(1, '#dc091c');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 200, 50);

    ctx.lineWidth = 3
    ctx.strokeStyle = '#f63133'
    const lineArr = [
      [0, 1, 200, 1],
      [0, 49, 200, 49],
      [1, 0, 1, 50],
      [199, 0, 199, 50],
    ];
    for (let i = 0; i < lineArr.length; i += 1) {
      ctx.moveTo(lineArr[i][0], lineArr[i][1]);
      ctx.lineTo(lineArr[i][2], lineArr[i][3]);
      ctx.stroke();
    }

    return canvas;
  }




}

export default Firewall