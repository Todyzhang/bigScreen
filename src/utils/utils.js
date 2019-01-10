import * as THREE from 'three';
import publicVal from "./publicVal"

let font=null;
let box3=new THREE.Box3();
let utils = {
  makeShape: function () {
    let shape
    if (window.THREE && arguments.length) {
      let arry = arguments[0]
      shape = new THREE.Shape()
      shape.moveTo(arry[0][0], arry[0][1])
      for (let i = 1; i < arry.length; i++) {
        shape.lineTo(arry[i][0], arry[i][1])
      }
      if (arguments.length > 1) {
        for (let i = 1; i < arguments.length; i++) {
          let pathCoords = arguments[i]
          let path = new THREE.Path()
          path.moveTo(pathCoords[0][0], pathCoords[0][1])
          for (let i = 1; i < pathCoords.length; i++) {
            path.lineTo(pathCoords[i][0], pathCoords[i][1])
          }
          shape.holes.push(path)
        }
      }
      return shape
    } else {
      console.error('Something wrong!')
    }
  },
  makeExtrudeGeometry: function (shape, amount) {
    let extrudeSetting = {
      steps: 1,
      amount: amount,
      bevelEnabled: false
    }
    let geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSetting)
    geometry.rotateX(-0.5 * Math.PI)
    return geometry
  },
  makeShapeGeometry: function (shapeCoords) {
    let shape = this.makeShape(shapeCoords)
    let geometry = new THREE.ShapeGeometry(shape)
    return geometry
  },
  makeMesh: function (type, geometry, color) {
    let material
    let mesh
    if (type === 'lambert') {
      material = new THREE.MeshLambertMaterial({color: color,depthTest:true})
    } else if (type === 'phong') {
      material = new THREE.MeshPhongMaterial({color: color,depthTest:true})
    } else {
      console.error('unrecognized type!')
    }

    mesh = new THREE.Mesh(geometry, material)

    mesh.castShadow = true
    mesh.receiveShadow = true

    return mesh
  },
  loadFont(){
    return new Promise((resolve) => {
      if(font){
        resolve(font);
      }else{
        publicVal.loader.font.load(publicVal.fontUrl, (_font)=>{
          font=_font;
          resolve(font);
        });
      }
    });
  },
  //得到外框大小
  getBorder(mesh){
    let size=new THREE.Vector3();
    box3.makeEmpty();//清空数据
    box3.expandByObject(mesh);
    box3.getSize(size);
    return size;
  },
  canvas:{
    terminalFlagBg() {
      let canvas = document.createElement('canvas');
      canvas.width = 75;
      canvas.height = 20;
      let ctx = canvas.getContext("2d");
      let grd = ctx.createLinearGradient(0, 0, 0, 20);
      grd.addColorStop(0, 'transparent');
      // grd.addColorStop(0.25, '#1b2023');
      grd.addColorStop(0.5, '#ffa95c');
      // grd.addColorStop(0.75, '#1b2023');
      grd.addColorStop(1, 'transparent');
      // document.body.appendChild(canvas)
      return canvas;
    },

    terminalRipplesBg() {
      let canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      let ctx = canvas.getContext("2d");
      let grd = ctx.createRadialGradient(50, 50, 20, 50, 50, 50);
      grd.addColorStop(0, 'transparent');
      grd.addColorStop(1, '#ffa95c');

      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 100, 100);

      return canvas;
    }
  },

  getRandomColor16(){//十六进制颜色随机
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var color = `rgb(${r},${g},${b})`;
    return color;
  },
  parseSecToHMS(seconds){
    let h=Math.floor(seconds/3600);
    let ms=seconds-h*3600;
    let m=Math.floor(ms/60);
    let s=ms-m*60;
    // return `${(h+'').padStart(2, '0')}:${(m+'').padStart(2, '0')}:${(s+'').padStart(2, '0')}`;
    return `${utils.padZeroStart(h)}:${utils.padZeroStart(m)}:${utils.padZeroStart(s)}`;
  },
  padZeroStart(number){
    return (number+'').padStart(2, '0')
  }

}

export default utils
