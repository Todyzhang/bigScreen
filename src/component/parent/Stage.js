import * as THREE from 'three';
// import TWEEN from 'three-tween';
import Model from '../Model';
import publicVal from "../../utils/publicVal";
import Business from "../sub/business"
import Honeynet from "../sub/honeynet"
import Points from "../sub/Points"
import socket from '../../utils/Socket'
// import pool from './Pool'

class Stage extends Model {

  init() {
    this.aminateRad = Math.PI / 360 / 10;

    let business = new Business();//业务区
    let honeynet = new Honeynet();//蜜网区
    this.points = new Points();


    business.position.z = 100;
    honeynet.position.z = -170;


    this.add(business, honeynet, this.points);

    //以当前原点为基准，更新business下terminal保存的坐标数据
    let center = business.position;
    Object.keys(publicVal.terminalName).forEach((key) => {
      let ter = this.getObjectByName(key);
      let ud = ter.userData;
      ud.points && ud.points.forEach((v, i, ary) => {
        ary[i] = v.clone().add(center);
      });
      ud.outPoints && ud.outPoints.forEach((v, i, ary) => {
        ary[i] = v.clone().add(center);
      });
      ud.outCornetPoints && ud.outCornetPoints.forEach((v, i, ary) => {
        ary[i] = v.clone().add(center);
      });

    });

    this.business = business;
    this.honeynet = honeynet;

    const pointArr = ['A101B101C102D101', 'A101B301C107', 'A101B101C101D101','A101B301','A101B201C101','A101B401C102'];

    setTimeout(() => {
      setInterval(() => {
        const from = pointArr[Math.floor(Math.random() * pointArr.length)];
        const to = pointArr[Math.floor(Math.random() * pointArr.length)];
        // console.log(from,to)
        const {path,currentTarget} = this.points.createPath(from, to);
        if(path.length<2) return;
        this.points.parsePath(path,currentTarget);
      },1000);

    }, 5000)

    this.connect();
  }

  connect(){
    new socket("ws://192.168.128.153:8489/tq/train/info",(data)=>{
      console.log("ws:",data)
    });
  }

  //动画统一入口
  animate() {

    this.rotateY(-this.aminateRad);//旋转地板
    this.points && this.points.animate()
    this.business && this.business.animate();
    this.honeynet && this.honeynet.animate();

  }


}

export default Stage