import * as THREE from 'three';
// import TWEEN from 'three-tween';
import Model from '../Model';
import utils from "../../utils/utils";
import Business from "../sub/Business"


class Stage extends Model{

  init(){
    this.aminateRad=Math.PI/360/20;

    this.buildGround();

    let business=new Business();//业务区

    this.add(business);

  }

  buildGround () {
    let planeGeometry = new THREE.BoxBufferGeometry(320, 6, 320);
    let plane = utils.makeMesh('lambert', planeGeometry, 0x011c25);
    plane.position.y = -3;

    this.add(plane)
  }

  //动画统一入口
  animate(){

    // this.rotateY(-this.aminateRad);//旋转地板
  }

}

export default Stage