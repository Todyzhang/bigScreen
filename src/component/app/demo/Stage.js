import Model from '../../Model';
import config from './config'
import Business from "./area/index"

import Points from "./Points"
// import pool from './Pool'

const TWEEN = require('@tweenjs/tween.js');
class Stage extends Model {

  init() {
    this.aminateRad = Math.PI / 360 / 10;

    let business = new Business();//业务区

    this.points = new Points();



    this.add(business, this.points);

    //以当前原点为基准，更新business下terminal保存的坐标数据
    let center = business.position;
    business.updateAreaUserData(config.terminalName,center);


    const pointArr = ['A101B101C102D101', 'A101B101C101D101','A101B201C101'];

    setTimeout(() => {
      setInterval(() => {
        const from = pointArr[Math.floor(Math.random() * pointArr.length)];
        const to = pointArr[Math.floor(Math.random() * pointArr.length)];
        // console.log(from,to)
        // const {path,currentTarget} = this.points.createPath(from, to);
        // if(path.length<2) return;
        this.points.createPath(from,to);
      },1000);

    }, 3000)

  }


  fireAminate(data){
    let from=config.terminalName[data.src_ip];
    let to=config.terminalName[data.dst_ip];
    from&&to&&this.points.fireAminate(from,to);
  }

  flagAminate(data){
    let dst=config.terminalName[data.dst_ip];
    this.points.flagAminate(dst,data.team);
  }

  //动画统一入口
  animate() {
    this.rotateY(-this.aminateRad);//旋转地板
    TWEEN.update();

  }


}

export default Stage