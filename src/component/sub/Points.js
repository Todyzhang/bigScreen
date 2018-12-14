import * as THREE from 'three';
// import TWEEN from 'three-tween';
import Model from '../Model';
import arrow from '../../textures/arrow.png';
const TWEEN = require('@tweenjs/tween.js');

class Points extends Model {

  init() {
    this.progress = 0;
    this.curve = [];
    this.createPoints();
    // this.createCurvePath();

  }

  createPoints() {
    let pointGeo = new THREE.BoxGeometry(5, 5, 5);
    let pointMesh = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let point = new THREE.Mesh(pointGeo, pointMesh);
    this.add(point);
    point.visible = false;
    this.points = point
  }


  createCurvePath(points) {
    let curve = new THREE.CatmullRomCurve3(points, false/*是否闭合*/);
    let tubeGeometry2 = new THREE.TubeGeometry(curve, 100, 2, 50, false);
    let tubeMaterial2 = new THREE.MeshPhongMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.5,
    });
    let tube2 = new THREE.Mesh(tubeGeometry2, tubeMaterial2);
    this.add(tube2)
    this.curve = curve;

  }

  /**
   *
   * @param from
   * @param to
   */
  createPath(from, to) {
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
            Business 的B层不在此项
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
          f_sub !== "A101B101C101" && f_sub !== "A101B101C102" && path.push(f_sub);
        } else {
          break;
        }
      } else {
        f_sub !== "A101B101C101" && f_sub !== "A101B101C102" && path.push(f_sub);
      }
    }
    if (sameArea === -1) {
      sameArea = 0;
    }
    for (let i = 0 + sameArea; i < t_len; i++) {
      t_sub = to.substr(0, to.indexOf(toAry[i]) + 4);
      t_sub !== "A101B101C101" && t_sub !== "A101B101C102" && path.push(t_sub);
    }

    // console.log(from,to,path)

    this.path = path;
    this.to = currentTarget;
    return { path, currentTarget };

  }

  parsePath(path, currentTarget) {
    let points = [];//向量队列
    path = path || this.path || [];
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
      if (curt.length > next.length) {//向上

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
        if(curt.indexOf("A101B101C10")!=-1){
          if(ops){
            points.push(...ops)
          }
          if(ocps){
            points.push(...ocps.reverse())
          }
        }else{
          //相同层不加outPoints
          let c_floor=curt.match(/([A-Z])(\d)(\d\d)$/)[2];
          let n_floor=next.match(/([A-Z])(\d)(\d\d)$/)[2];
          if(c_floor!==n_floor&&ops){
            points.push(...ops)
          }
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
    if (last.length < prev.length) {//向上

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
      if(last.indexOf("A101B101C10")!=-1){
        if(ocps){
          points.push(...ocps)
        }
        if(ops){
          points.push(...ops)
        }
      }else{
        //相同层不加outPoints
        let c_floor=last.match(/([A-Z])(\d)(\d\d)$/)[2];
        let n_floor=prev.match(/([A-Z])(\d)(\d\d)$/)[2];
        if(c_floor!==n_floor&&ops){
          points.push(...ops)
        }
      }

      if (ps) {
        points.push(...ps)
      }

    }

    // this.debugPoints(points);
    // this.createCurvePath(points);

    this.move(points, currentTarget);

  }

  move(points, currentTarget) {
    if (!points || points.length < 2) return;
    const obj = this.createRouteObj2();
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
      currentTarget.setStatus("warn");
    });
    tweenArr[0].start();
  }

  createRouteObj() {
    const shape = new THREE.Shape();
    shape.moveTo(-3.5, 0);
    shape.lineTo(-2, 2);
    shape.lineTo(-2, 1);
    shape.lineTo(2, 1);
    shape.lineTo(2, -1);
    shape.lineTo(-2, -1);
    shape.lineTo(-2, -2);
    shape.lineTo(-3.5, 0);

    const curvePts = [];
    curvePts.push(new THREE.Vector3(0,0,0));
    curvePts.push(new THREE.Vector3(0,1,0));
    const extrudePath = new THREE.CatmullRomCurve3(curvePts);

    const extrudeSettings = {
      extrudePath,
      bevelEnabled: false,
    };

    const arrowGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const arrowMaterial = new THREE.MeshPhongMaterial({ color: 0xd93a49 });
    const mesh = new THREE.Mesh(arrowGeo, arrowMaterial);
    // mesh.rotation.x=Math.PI/2;
    // this.add(mesh)

    // const geometry = new THREE.SphereGeometry(2.5, 32, 32);
    // const material = new THREE.MeshPhongMaterial({ color: 0xCE0000 });
    // const obj = new THREE.Mesh(geometry, material);
    // obj.position.set(50, 2.5, 50);
    return mesh;
  }

  createRouteObj2(){
    const planeGeo=new THREE.PlaneGeometry(10,10);
    const texture=new THREE.TextureLoader().load(arrow);
    const material=new THREE.MeshBasicMaterial({map: texture,transparent:true, side: THREE.DoubleSide});
    const plane = new THREE.Mesh( planeGeo, material );
    plane.rotation.x=Math.PI/2;
    plane.position.y=0.01;
    return plane;
  }

  updateTween() {
    TWEEN.update();
  }

  // 渲染函数
  render() {
    // 使用加减法可以设置不同的运动方向
    if (this.curve.length === 0) return;
    this.points.visible = true;
    if (this.progress > 1.0) {
      this.curve = [];
      this.points.visible = false;
      this.to.setStatus("warn");
      return;    //停留在管道末端,否则会一直跑到起点 循环再跑
    }
    this.progress += 0.009;
    if (this.curve) {
      let point = this.curve.getPoint(this.progress);
      if (point && point.x) {
        this.points.position.set(point.x, point.y, point.z);
      }
    }

  }

}

export default Points