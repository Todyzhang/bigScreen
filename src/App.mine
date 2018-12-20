import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import utils from './utils/utils';
import Stage from './component/parent/Stage';
import * as Stats from "three-stats"
import InfoUI from "./component/parent/InfoUI";
// const Stats =require('three-stats')
window.THREE=THREE

const coordinates = {
  externalServiceDistr: {
    cubes: [
      [-60, 0, 140],
      [-36, 0, 140],
      [-12, 0, 140],
      [12, 0, 140],
      [36, 0, 140],
      [60, 0, 140],
    ],
    cuboids: [
      [-75, 0, 100],
      [-50, 0, 100],
      [-25, 0, 100],
      [0, 0, 100],
      [25, 0, 100],
      [50, 0, 100],
      [75, 0, 100],
    ]
  }
}

class App extends Component {
  state = {
    scene: null,
    camera: null,
    renderer: null,
    stage:null,
    stats:null,
    config: {
      background: 0x000000
    }
  }

  componentDidMount() {

    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000)
    camera.position.set(330, 330, 330)
    camera.lookAt(scene.position)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.getElementById('three-scene')
    });
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(this.state.config.background)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    this.setState({
      scene,
      camera,
      renderer,
    }, () => {
      this.buildAuxSystem()
      this.buildLightSystem()
      this.buildAxis()
      this.begin()
      this.loop()
    })
  }

  render() {
    return (
      <div>
        <div id="Stats-output"></div>
        <canvas id="three-scene" />
      </div>
    );
  }

  buildAuxSystem = () => {
    const {scene, camera, renderer } = this.state;

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.rotateSpeed = 0.35

    var stats = new Stats.Stats();
    this.setState({stats})
    //设置统计模式
    stats.setMode(0); // 0: fps, 1: ms
    //统计信息显示在左上角
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    //将统计对象添加到对应的<div>元素中
    document.getElementById("Stats-output").appendChild(stats.domElement);

  }

  buildLightSystem = () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
    directionalLight.position.set(300, 1000, 500);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;

    const d = 300;
    directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
    directionalLight.shadow.bias = 0.0001;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
    const { scene } = this.state;
    scene.add(directionalLight)

    const light = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(light)
  }
  buildAxis(){
    const { scene} = this.state;
    scene.add(new THREE.AxesHelper(300))
  }

  loop = () => {
    const { renderer, scene, camera,stage,stats } = this.state;
    stats&&stats.update()
    renderer.render(scene, camera)
    stage&&stage.animate();
    requestAnimationFrame(this.loop)
  }

  begin(){
    const { scene} = this.state;
    let stage=new Stage();
    this.setState({
      stage:stage
    });
    scene.add(stage);
  }


}


export default App;
