import * as THREE from 'three'
import Model from '../../Model';
import config from './config'
import TQ from "./area/index"

import Points from "./Points"
import pic from "../../../img/pic.png";
import bz from "../../../img/pic/bz.jpg";
import ChaMd5 from "../../../img/pic/ChaMd5.jpg";
import kn0ck from "../../../img/pic/kn0ck.jpg";
import Lancet from "../../../img/pic/Lancet.jpg";
import Nu1L from "../../../img/pic/Nu1L.jpg";
import r3kapig from "../../../img/pic/r3kapig.jpg";
import SAINTSEC from "../../../img/pic/SAINTSEC.jpg";
import tqj from "../../../img/pic/tq.jpg";

const TWEEN = require('@tweenjs/tween.js');

const tenDeg=Math.PI/36;
let dir=-1;
let dirY=-1;
class Stage extends Model {

  init() {
    this.aminateRad = Math.PI / 180 / 30;

    let tq = new TQ();//业务区

    this.points = new Points();


    this.add(tq, this.points);

    //以当前原点为基准，更新business下terminal保存的坐标数据
    let center = tq.position;
    tq.updateAreaUserData(config.terminalName,center);


    // const pointArr = ['A101B101C102', 'A101B301C201', 'A101B301C102', 'A101B301C101','A101B201C101'];
    //
    // setTimeout(() => {
    //   setInterval(() => {
    //     const from = pointArr[Math.floor(Math.random() * pointArr.length)];
    //     const to = pointArr[Math.floor(Math.random() * pointArr.length)];
    //
    //
    //     this.points.createPath(from,to);
    //   },1000);
    //   this.points.createPath('A101B101C102', 'A101B301C101');
    // }, 3000)

    // this.showTabel();

    // this.getObjectByName('A101B101C102').showLogo('team1',bz);

    this.tween();

  }

  showTabel(){
    let labels={};
    let names=config.terminalName;

    Object.keys(names).forEach((k) => {
      let v=names[k];
      labels[v]=labels[v]||[];
      labels[v].push(k);
    });
    Object.keys(labels).forEach((k) => {
      let v=labels[k];
      let ter = this.getObjectByName(k);
      if(ter){
        ter.showLabel(v);
      }
    });
  }

  fireAminate(data,color){
    let from=config.terminalName[data.src_ip];
    let to=config.terminalName[data.dst_ip];
    let t_color=new THREE.Color(color);
    from&&to&&this.points.fireAminate(from,to,t_color);
  }

  flagAminate(data){
    let dst=config.terminalName[data.dst_ip];
    dst&&this.points.flagAminate(dst,data.team);
  }
  tween(){
    let data={x:0,y:0,z:0};
    let onUpdate=(d)=>{
      this.rotation.set(d.x,d.y,0);
    }
    let rotate1=new TWEEN.Tween(data)
      .to({x:0,y:-tenDeg*2,z:tenDeg},9000)
      // .repeat(Infinity)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(onUpdate)
    let rotate2=new TWEEN.Tween(data)
      .to({x:-tenDeg,y:-tenDeg*2,z:tenDeg},9000)
      // .repeat(Infinity)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(onUpdate);
    let rotate3=new TWEEN.Tween(data)
      .to({x:-tenDeg,y:tenDeg*2,z:tenDeg},9000)
      // .repeat(Infinity)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(onUpdate);
    let rotate4=new TWEEN.Tween(data)
      .to({x:tenDeg,y:tenDeg*2,z:tenDeg},9000)
      // .repeat(Infinity)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(onUpdate);
    let rotate5=new TWEEN.Tween(data)
      .to({x:0,y:0,z:0},3000)
      // .repeat(Infinity)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(onUpdate);
    rotate1.chain(rotate2);
    rotate2.chain(rotate3);
    rotate3.chain(rotate4);
    rotate4.chain(rotate5);
    rotate5.chain(rotate1);
    rotate1.start();
  }
  //动画统一入口
  animate() {

    TWEEN.update();

  }


}

export default Stage