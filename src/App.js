import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import utils from './utils/utils';
import Stage from './component/parent/Stage';
import crate from './textures/crate.gif';

class App extends Component {
  state = {
    scene: null,
    camera: null,
    renderer: null,
    stage: null,
    config: {
      background: 0x000000
    },
    infos: [{
      time: '2018-10-30 11:25:02',
      content: '***队伍被**区蜜罐捕获，***队伍从**区蜜罐逃逸，本次在蜜罐中耗时**分钟'
    },],
    infoStyles: null,
    barWidth:100,
  }

  componentDidMount() {

    const width = 1920;
    const height = 1010;

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000)
    camera.position.set(330, 330, 330)
    camera.lookAt(scene.position)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.querySelector('canvas')
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

  buildAuxSystem = () => {
    const { camera, renderer } = this.state;

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.rotateSpeed = 0.35
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
  buildAxis() {
    const { scene } = this.state;
    scene.add(new THREE.AxesHelper(300))
  }

  loop = () => {
    const { renderer, scene, camera, stage } = this.state;
    renderer.render(scene, camera)
    stage && stage.animate();
    requestAnimationFrame(this.loop)
  }

  begin() {
    const { scene } = this.state;
    let stage = new Stage();
    this.setState({
      stage: stage
    })
    scene.add(stage);
  }

  handleClick = () => {
    this.setState(({ infos }) => {
      let newInfos=infos.concat({
        time: '1111',
        content: '2222'
      });
      if(newInfos.length>4){
        newInfos=newInfos.slice(-4);
      }
      return {
        infos: newInfos,
        infoStyles:{
          transitionProperty:'none',
          bottom:-58
        }
      }
    },()=>{
      setTimeout(() => {        
        this.setState({infoStyles:{
          transitionProperty:'all',
          bottom:0,
        }})
      }, 0);
    });

    const barWidth=Math.floor(Math.random()*193);
    this.setState({barWidth})
  }

  render() {
    const { infos, infoStyles,barWidth } = this.state;
    return (
      <>
        <div className="header">
          <div id="title"></div>
          <div id="countDown">
            <span style={{ fontSize: 19, marginRight: 20 }}>比赛倒计时</span>
            <span style={{ fontSize: 23, fontWeight: 'bold', letterSpacing: 3 }}>01:30:14</span>
          </div>
        </div>
        <div id="main">
          <div id="left" onClick={this.handleClick}>
            <div className="ranks">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) =>
                (
                  <div className="rank">
                    <div className="num">{item}</div>
                    <div className="avatar">
                      <img src={crate} alt="" width="42" height="42" style={{ borderRadius: 3 }} />
                    </div>
                    <div className="rank-middle">
                      <div className="team-name">Team WE</div>
                      <div className="percentage">
                        <div className="percentage-bar">
                          <div className="percentage-bar-mask" style={{width:barWidth}}></div>
                        </div>
                      </div>
                    </div>
                    <div className="rank-right">50%</div>
                  </div>
                )
              )}

            </div>
          </div>
          <canvas id="displayBoard" />
          <div id="scrollInfo">
            <div className="info-items" style={infoStyles}>
              {infos.map(item => (
                <div className="info-item">
                  <div className="info-time">{item.time}</div>
                  <div className="info-content">{item.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default App;
