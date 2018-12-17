import * as THREE from 'three';

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
  namespace:{
    "A101":1,
    "A101B101":1,
    "A101B101C101D101":1,
    "A101B101C101D102":1,
    "A101B101C101D103":1,
    "A101B101C101D104":1,
    "A101B101C101D201":1,
    "A101B101C101D202":1,
    "A101B101C101D203":1,
    "A101B101C102D101":1,
    "A101B101C102D102":1,
    "A101B101C102D103":1,
    "A101B101C102D104":1,
    "A101B101C102D201":1,
    "A101B101C102D202":1,
    "A101B101C102D203":1,
    "A101B101C102D204":1,
    "A101B101C102D301":1,
    "A101B101C102D302":1,
    "A101B101C102D303":1,
    "A101B101C102D304":1,
    "A101B201":1,
    "A101B201C101":1,
    "A101B201C102":1,
    "A101B301":1,
    "A101B301C101":1,
    "A101B301C102":1,
    "A101B301C103":1,
    "A101B301C104":1,
    "A101B301C105":1,
    "A101B301C106":1,
    "A101B301C107":1,
    "A101B301C201":1,
    "A101B301C202":1,
    "A101B301C203":1,
    "A101B301C204":1,
    "A101B301C205":1,
    "A101B301C206":1,
    "A101B401":1,
    "A101B401C101":1,
    "A101B401C102":1,
    // "A201":1
  },
  animateAry:[]
}

export default utils
