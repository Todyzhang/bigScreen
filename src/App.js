import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import socket from './utils/Socket';
import publicVal from "./utils/publicVal";
import utils from "./utils/utils";
import TWEEN from '@tweenjs/tween.js';

import Stage from './component/app/tq/Stage';
import config from "./component/app/tq/config";

import pic from "./img/pic.png";
import StarrySky from './utils/StarrySky/index';
// import particles from './utils/particles/particles'

class App extends Component {
  state = {
    scene: null,
    camera: null,
    renderer: null,
    stage: null,
    config: {
      background: 0x000000
    },
    sky: null,
    infos: [],
    infoStyles: null,
    ranks: [],
    rankColors: {},
    ws: null,
    time: {
      name: '比赛时间',
      time: '00:00:00'
    },
    // mouse: new THREE.Vector2(),
    // raycaster: new THREE.Raycaster(),
    // INTERSECTED: undefined,
    // flagStyles:{
    //   top:0,
    //   left:0,
    //   display:'none'
    // },
    // clientX:0,
    // clientY:0,
  }

  componentDidMount() {

    const width = 1920;
    const height = 1010;

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 5000)
    camera.position.set(330, 330, 330)
    camera.lookAt(scene.position)
    // scene.background=skyTexture;

    const camera2=new THREE.OrthographicCamera(-width/2,width/2,height/2,-height/2,1,1000);
    camera2.zoom=2.5;
    camera2.updateProjectionMatrix();
    camera2.position.set(0, 330, 0);
    camera2.up.set(-1,0,0);
    camera2.lookAt(scene.position);
    const renderer2=new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: document.querySelector('#stage2')
    });

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: document.querySelector('#stage')
    });

    const sky = new StarrySky(1920, 1010);
    document.getElementById("displayBoard").appendChild(sky.canvas);

    // const sky=particles(1920,1010);
    // document.getElementById("displayBoard").appendChild(sky.canvas.el);

    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(this.state.config.background, 0)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.setState({
      scene,
      camera,
      renderer,
      camera2,
      renderer2,
      sky,
    }, () => {
      this.buildAuxSystem()
      this.buildLightSystem()
      // this.buildAxis()
      this.connect();
      this.begin()
      this.loop()
    });
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
    requestAnimationFrame(this.loop)
    const { renderer, scene, camera, stage, sky,renderer2,camera2 } = this.state;
    renderer.render(scene, camera);
    renderer2.render(scene,camera2);
    stage && stage.animate();
    sky.update();
    // camera.position.y-=1
    // camera.position.z+=1
    // this.updateMouseSelection();
    // TWEEN.update();

  }
  cameraAmin(){
    const {camera}=this.state;
    camera.position.y+=0.1
  }

  // updateMouseSelection = () => {
  //   const { mouse, camera, raycaster, scene } = this.state;
  //   let INTERSECTED = this.INTERSECTED;
  //   raycaster.setFromCamera(mouse, camera);
  //   const objs=[];
  //   const terminalNames=Object.values(config.terminalName);
  //   scene.traverse((ele)=>{
  //     if(terminalNames.includes(ele.name)){
  //       objs.push(ele);
  //     }
  //   });
  //   const intersects = raycaster.intersectObjects(objs,true);
  //   if(intersects.length>0){
  //     const intersect=intersects[0].object.parent;
  //     if(INTERSECTED && INTERSECTED!==intersect){
  //       this.changeChooseStatus(INTERSECTED,'out');
  //     }
  //     this.changeChooseStatus(intersect,'in');
  //     this.INTERSECTED=intersect;
  //     this.changeInfoDom('in');
  //   }else{
  //     if(INTERSECTED){
  //       this.changeChooseStatus(INTERSECTED,'out');
  //     }
  //     this.INTERSECTED=null;
  //     this.changeInfoDom('out');
  //   }
  // }

  // changeChooseStatus=(obj,status)=>{
  //   let hex;
  //   if(status==='in'){
  //     hex=0xff0000;
  //   }else if(status==='out'){
  //     hex=0x000000;
  //   }
  //   Object.values(obj.materials).forEach((item)=>{
  //     item.emissive.setHex(hex);
  //   });
  // }

  // changeInfoDom=(status)=>{
  //   let flagStyles;
  //   if(status==='in'){
  //     flagStyles={
  //       display:'block'
  //     };
  //   }else if(status==='out'){
  //     flagStyles={
  //       display:'none'
  //     };
  //   }
  //   this.setState({flagStyles});
  // }

  begin() {
    const { scene } = this.state;
    let stage = new Stage();
    this.setState({
      stage: stage
    })
    scene.add(stage);
    stage.position.z = -100
    // scene.add(new THREE.BoxHelper(stage,0xff0000))

  }

  connect() {
    let ws = new socket(publicVal.wsServer, (data) => {
      const parsedData = JSON.parse(data);
      console.log(data)
      this.dataHandler(parsedData);
    });
    this.setState({
      ws: ws
    })
  }

  dataHandler(data) {
    const { stage, rankColors } = this.state;
    const d=data.data;
    switch (data.data_type) {
      case 'ranking'://排名
        if(Array.isArray(d)&&d.length>0)this.setState({ ranks: data.data });
        break;
      case 'flag'://拿到flag
        stage && stage.flagAminate(data.data);
        this.updateInfo(data);
        break;
      case 'fire'://攻击
        let color = rankColors[d.team];
        if (!color) {
          color = utils.getRandomColor16();
          rankColors[d.team] = color;
        }
        // console.log(d.team,color,JSON.stringify(rankColors))
        stage && stage.fireAminate(d, color);
        this.updateInfo(data);
        break;
      case 'time'://时间-每秒更新一次
        this.updateTime(data);
        break;
      case 'end'://结束 关闭ws?
        this.state.ws.close();
        this.updateTime();
        if(Array.isArray(d)&&d.length>0)this.setState({ ranks: data.data });
        break;
      default:
        //暂不处理
        console.log(data)
    }
  }

  /**
   * 处理右下角消息更新
   */
  updateInfo(parsedData) {
    let content;
    const dataType = parsedData.data_type;
    const { infos } = this.state;
    if (dataType === 'flag') {
      content = `队伍 ${parsedData.data.team} 攻克了节点 ${parsedData.data.dst_ip}`;
    } else {
      content = `队伍 ${parsedData.data.team} ip ${parsedData.data.src_ip} 向 ${parsedData.data.dst_ip} 发动攻击`;
    }
    let newInfos = infos.concat({
      time: parsedData.time + "",
      content
    });
    if (newInfos.length > 4) {
      newInfos = newInfos.slice(-4);
    }

    this.setState({
      infos: newInfos,
      infoStyles: {
        transitionProperty: 'none',
        bottom: -58
      },
    });
    setTimeout(() => {
      this.setState({
        infoStyles: {
          transitionProperty: 'all',
          bottom: 0,
        }
      })
    }, 0);
  }

  test = () => {
    const { camera } = this.state;
    const tween = new TWEEN.Tween(camera.position).to({
      x: [0, 0],
      y: [300, 5],
      z: [300, -20]
    }, 2000).onUpdate(() => {
      camera.lookAt(0, 5, -30);
      this.setState({ camera });
    }).onComplete(() => {
    });
    tween.easing(TWEEN.Easing.Quadratic.InOut);
    tween.interpolation(TWEEN.Interpolation.CatmullRom);
    tween.start();
  }

  updateTime(data) {
    /*
    data={
      "time":"2018/12/19 14:02:01",
      "data_type":"time",
      "data":{
        "begin":"2018/12/19 14:00:00",//比赛开始时间
        "duration":12000,//比赛时长，单位秒
        "end":"2018/12/19 14:30:00" //比赛结束时间
      }
    };
     */
    let time = {
      name: '当前时间',
      time: ''
    };
    if (data && data.data) {
      let d = data.data;
      let crtTime = new Date(data.time);
      if (d.begin && d.duration) {
        //有比赛开始时间
        let begTime = new Date(d.begin);
        if (crtTime > begTime) {
          time.name = "比赛剩余时间";
          time.time = utils.parseSecToHMS(d.duration  - (crtTime - begTime)/1000);
        }
      }
    } else {
      time = {
        name: '比赛结束',
        time: ''
      };
    }
    this.setState({
      time: time
    });

  }


  getTeamImg(item) {
    let url = pic;
    if (item && item.team) {
      let img = config.teamList[item.team];
      if (img) {
        url = img;
      } else if (item.image) {
        url = (publicVal.imgHost + item.image);
      }
    }
    return url;
  }

  // handleMouseMove = (event) => {
  //   event.preventDefault();
  //   const { mouse } = this.state;
  //   const canvasDom=document.querySelector('#stage');
  //   const clientX=event.clientX;
  //   const clientY=event.clientY;
  //   mouse.x = (clientX / canvasDom.width) * 2 - 1;
  //   mouse.y = - ((clientY-70) / canvasDom.height) * 2 + 1;
  //   this.setState({ mouse,clientX,clientY });
  // }

  render() {
    const { infos, infoStyles, ranks, rankColors, time } = this.state;


    return (
      <>
        <div className="header">
          <div id="title"></div>
          <div id="countDown">
            <span style={{ fontSize: 19, marginRight: 20 }}>{time.name}</span>
            <span style={{ fontSize: 23, fontWeight: 'bold', letterSpacing: 3 }}>{time.time}</span>
          </div>
        </div>
        <div id="main">
          <div id="left" style={{ display: ranks.length ? 'block' : 'none' }}>
            <div className="ranks">
              {ranks.map((item, index) =>
                (
                  <div className="rank" key={index}>
                    <div className="num">{index + 1}</div>
                    <div className="avatar">
                      <img src={this.getTeamImg(item)} alt="" width="42" height="42" style={{ borderRadius: 3 }} />
                    </div>
                    <div className="rank-middle" data-color={rankColors[item.team] = rankColors[item.team] || utils.getRandomColor16()}>
                      <div className="team-name" style={{ color: rankColors[item.team] }}>{item.team}</div>
                      <div className="percentage">
                        <div className="percentage-bar">
                          <div className="percentage-bar-mask" style={{ width: item.flags / item.totle_flag_count * 193 }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="rank-right">{item.percent}%</div>
                  </div>
                )
              )}

            </div>
          </div>
          <div id="displayBoard" style={{ position: 'relative' }}><canvas id="stage" /></div>
          <div id="scrollInfo">
            <div className="info-items" style={infoStyles}>
              {infos.map((item, index) => (
                <div className="info-item" key={index}>
                  <div className="info-time">{item.time}</div>
                  <div className="info-content">{item.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div id="flagInfo" style={{left:clientX,top:clientY,...flagStyles}}></div> */}
        <canvas id="stage2"></canvas>
      </>
    );
  }
}

export default App;
