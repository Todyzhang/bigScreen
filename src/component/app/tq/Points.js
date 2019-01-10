import * as THREE from 'three';
import Model from '../../Model';
import {arrowBg} from '../../texture';
const TWEEN = require('@tweenjs/tween.js');


class Points extends Model {

  init() {
    this.createPoints();
  }

  createPoints() {
    if(this.points){
      return this.points.clone();
    }else{
      const planeGeo=new THREE.PlaneGeometry(10,10);
      const material=new THREE.MeshPhongMaterial({map: arrowBg,transparent:true, side: THREE.DoubleSide});
      const arrow_plane = new THREE.Mesh( planeGeo, material );
      arrow_plane.rotation.x=Math.PI/2;
      arrow_plane.position.y=0.01;
      this.points = arrow_plane;
      arrow_plane.visible=false;
      return arrow_plane.clone();
    }
  }


  /**
   *
   * @param from
   * @param to
   */
  createPath(from, to,color) {
    let fromAry = from.match(/[A-Z]\d{3}/g);
    let toAry = to.match(/[A-Z]\d{3}/g);
    let f_len = fromAry.length, t_len = toAry.length, len = Math.min(f_len, t_len),
      f_sub = "", t_sub = "", f_item_ary, t_item_ary,
      sameArea = -1, isSameFloor = false, sameName = "";
    let path = [];
    const currentTarget = this.parent.getObjectByName(to);
    //相同返回一个
    if (from === to) {
      return { path: [from], currentTarget };
    }

    for (let i = len - 1; i >= 0; i--) {
      f_sub = from.substr(0, from.indexOf(fromAry[i]) + 4);
      t_sub = to.substr(0, to.indexOf(toAry[i]) + 4);
      if (f_sub === t_sub) {
        if (i + 1 < len) {
          f_item_ary = fromAry[i + 1].split("");
          t_item_ary = toAry[i + 1].split("");
          /*
            true-同区域且同层 false-同区域不同层
            B层不在此项
           */
          isSameFloor = f_item_ary[0] === t_item_ary[0] && f_item_ary[0] !== 'B';
        }
        sameArea = i + 1;
        sameName = f_sub;
        break;
      }
    }

    for (let i = f_len - 1; i >= 0; i--) {
      f_sub = from.substr(0, from.indexOf(fromAry[i]) + 4);
      if (f_sub === sameName) {
        if (!isSameFloor) {
          !/^A101B\d01$/.test(f_sub) && path.push(f_sub);
        } else {
          break;
        }
      } else {
        !/^A101B\d01$/.test(f_sub) && path.push(f_sub);
      }
    }
    if (sameArea === -1) {
      sameArea = 0;
    }
    for (let i = 0 + sameArea; i < t_len; i++) {
      t_sub = to.substr(0, to.indexOf(toAry[i]) + 4);
      !/^A101B\d01$/.test(t_sub) && path.push(t_sub);
    }

    this.parsePath(path, currentTarget,color);

  }

  parsePath(path, currentTarget,color) {
    let points = [];//向量队列
    let parent = this.parent;
    let len = path.length;
    if (path.length < 2) throw new Error("路径数据必须大于2个");

    for (let i = 0; i < len - 1; i++) {
      /*
        1.判断当前到下一个是向上连还是向下连，方法是判断当前及下一个的名称位数大小，
          大-》小 向上；小-》大 向下；相同 同区域
          取当前的userData.points，向上points倒序加入队列，向下顺序加入
        2.判断当前与上一个的关系

       */
      let curt = path[i];
      let next = path[i + 1];

      let ter = parent.getObjectByName(curt);
      let ps = ter.userData.points;
      let ops = ter.userData.outPoints;
      let ocps = ter.userData.outCornetPoints;
      ps = ps && ps.concat();
      ops = ops && ops.concat();
      ocps = ocps && ocps.concat();
      if(!ps&&!ops&&!ocps){
        points.push(ter.position.clone().add(ter.parent.position))
      }
      else if (curt.length > next.length) {//向上

        if (ps) {
          points.push(...ps.reverse())
        }
        if (ops) {
          points.push(...ops)
        }
        if (ocps) {
          points.push(...ocps.reverse())
        }
      }
      else if (curt.length < next.length) {//向下

        if (ps) {
          points.push(...ps)
        }
        if (ops) {
          points.push(...ops)
        }
        if (ocps) {
          points.push(...ocps)
        }
      }
      else {//相同
        if (ps) {
          points.push(...ps.reverse())
        }
        //相同层不加outPoints
        let c_floor=curt.match(/([A-Z])(\d)(\d\d)$/)[2];
        let n_floor=next.match(/([A-Z])(\d)(\d\d)$/)[2];
        if(c_floor!==n_floor&&ops){
          points.push(...ops)
        }
      }
    }
    //todo最后一项
    let last = path[len - 1];
    let prev = path[len - 2];
    let ter_l = parent.getObjectByName(last);

    let ps = ter_l.userData.points;
    let ops = ter_l.userData.outPoints;
    let ocps = ter_l.userData.outCornetPoints;
    ps = ps && ps.concat();
    ops = ops && ops.concat();
    ocps = ocps && ocps.concat();
    if(!ps&&!ops&&!ocps){
      points.push(ter_l.position.clone().add(ter_l.parent.position))
    }
    else if (last.length < prev.length) {//向上

      if (ocps) {
        points.push(...ocps)
      }
      if (ops) {
        points.push(...ops)
      }
      if (ps) {
        points.push(...ps)
      }
    }
    else if (last.length > prev.length) {//向下

      if (ocps) {
        points.push(...ocps)
      }
      if (ops) {
        points.push(...ops)
      }
      if (ps) {
        points.push(...ps)
      }

    }
    else {//相同
      //相同层不加outPoints
      let c_floor=last.match(/([A-Z])(\d)(\d\d)$/)[2];
      let n_floor=prev.match(/([A-Z])(\d)(\d\d)$/)[2];
      if(c_floor!==n_floor&&ops){
        points.push(...ops)
      }

      if (ps) {
        points.push(...ps)
      }

    }
    // this.debugPoints(points)
    this.move(points, currentTarget,color);

  }

  move(points, currentTarget,color) {
    if (!points || points.length < 2) return;
    const obj = this.createPoints();
    obj.material=new THREE.MeshPhongMaterial({map: arrowBg,transparent:true, side: THREE.DoubleSide,emissive:color});
    // obj.material.emissive=color;
    this.add(obj);
    const startPoint = points[0];
    obj.position.x = startPoint.x;
    obj.position.z = startPoint.z;
    const speed = 0.1;

    const tweenArr = [];
    for (let i = 1; i < points.length; i += 1) {
      const oldPoint = points[i - 1];
      const newPoint = points[i];
      const distance = oldPoint.distanceTo(newPoint);
      const duration = distance / speed;

      const nextTween = new TWEEN.Tween(obj.position).to({
        x: newPoint.x,
        z: newPoint.z,
      }, duration);
      nextTween.onStart(()=>{
        // obj.lookAt(new THREE.Vector3(newPoint.x,newPoint.y,newPoint.z));
        if(newPoint.x!==oldPoint.x){
          if(newPoint.x-oldPoint.x>0){
            obj.rotation.z=-Math.PI/2;
          }else{
            obj.rotation.z=Math.PI/2;
          }
        }else{
          if(newPoint.z-oldPoint.z>0){
            obj.rotation.z=0;
          }else{
            obj.rotation.z=Math.PI;
          }
        }
      })
      tweenArr.push(nextTween);
      if (i >= 2) {
        tweenArr[i - 2].chain(nextTween);
      }
    }
    tweenArr[tweenArr.length - 1].onComplete(() => {
      this.remove(obj);
      tweenArr.forEach((v)=>{TWEEN.remove(v)});
      currentTarget.setStatus("warn");
    });
    obj.visible=true;
    tweenArr[0].start();
  }

  fireAminate(from,to,color){
    this.createPath(from,to,color);
  }

  flagAminate(dst,team){
    let mesh=this.parent.getObjectByName(dst);
    mesh.setStatus("alarm");
    mesh.showFlag(`${team}攻克了该台服务器`);
  }


}

export default Points