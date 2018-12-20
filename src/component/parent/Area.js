import * as THREE from 'three';
import Model from '../Model';
import {signBg} from '../../texture';
import Terminal from "./Terminal";
import utils from "../../utils/utils";


class Area extends Model {

    /**
   * 画有背景的招牌字
   * @param msg
   */
  createBgSign(msg,fontSize=5) {
    utils.loadFont().then((font)=>{
      this.createWords(font, msg,fontSize,signBg);
    });

  }

  /**
   * 画招牌字
   * @param msg
   * @returns {Promise<any>}
   */
  createSign(msg,fontSize=15){
    return new Promise((resolve) => {
      utils.loadFont()
        .then((font) => {
          resolve(this.createWords(font,msg,fontSize));
        })
    });

  }


  createWords (font, msg,fontSize,bg) {
    let text;
    const color = 0xffffff;
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      depthTest:false //防止字体闪烁
    });
    const shapes = font.generateShapes(msg, fontSize);
    const geo = new THREE.ShapeBufferGeometry(shapes);
    text = new THREE.Mesh(geo, matLite);

    if(bg){
      this.createPlane(bg,text);
    }else{
      return text;
    }

  }

  /**
   * 把字体画到背景面板上
   * @param bg
   * @param text
   */
  createPlane(bg,text){
    const material = new THREE.MeshBasicMaterial({map: bg, transparent: true, side: THREE.DoubleSide,depthTest:true});
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(40, 60), material);
    //通过传入的object3D对象来返回当前模型的最小大小，值可以使一个mesh也可以使group
    //居中文字
    let box = new THREE.Box3();
    box.expandByObject(text);
    text.position.x = -box.max.x / 2;
    // text.position.z=0.01;
    plane.add(text)
    plane.position.y = 30;
    plane.position.x = 20;

    this.add(plane);
  }

  createNodes() {


  }

  /**
   * 画边框线
   * @param offsetX
   * @param offsetZ
   * @param width 指定宽度
   * @param height 指定高度
   * @param isCenter 是否居中
   */
  createBorder(offsetX = 20, offsetZ = 20,width=0,height=0,isCenter=false) {
    let x,z,border;
    let geometry = new THREE.Geometry(), line;
    if(width>0&&height>0){
      x=width;
      z=height;
    }else{
      border=this.getBorder();
      x=border.x;
      z=border.z;
    }
    x+=offsetX;
    z+=offsetZ;
    this.borderX=x;
    this.borderZ=z;
    geometry.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(x, 0, 0),
      new THREE.Vector3(x, 0, -z),
      new THREE.Vector3(0, 0, -z)
    );


    line = new THREE.LineLoop(geometry, new THREE.LineBasicMaterial({color: 0x009ad8}));
    this.add(line);
    line.position.y=0.1
    // line.rotateZ(Math.PI/2)
    isCenter&&line.position.set(-x/2,0,z/2)
  }

  /**
   * 得到box size
   * @returns {{x: *, z: *}}
   */
  getBorder(){
    if(this.borderX&&this.borderZ) return {x:this.borderX,z:this.borderZ};
    
    let box3 = new THREE.Box3(), size;
    box3.expandByObject(this);
    size = box3.getSize();
    let {x, z} = size;

    this.borderX=x;
    this.borderZ=z;
    return {x:x,z:z};
  }

  /**
   * 以当前区域坐标原点做参照，更新保存在Area子类及Terminal子类的边线点
   * @param group
   */
  updateNodeData(group){
    group.forEach((v)=>{
      //把局部坐标更换成 本对象里的坐标，以便画线
      let jl=v.userData.jionLine;
      let pos=v.position;
      jl&&jl.forEach((item)=>{
        item[0].add(pos);
        item[1].add(pos);
      });
      v.children.forEach((item)=>{
        if(item instanceof Terminal&&item.userData.points){
          item.userData.points.forEach((vv)=>{
            vv.add(pos);
          })
        }
      })
    });
  }

  /**
   * 画Area块之间的连线
   * @param points 线条各端点数组
   * @param lineColor 线条16进制颜色
   */
  addAreaLine(points,lineColor){
    let lineGeo = new THREE.Geometry();
    let color=[new THREE.Color(0x019fc4),new THREE.Color(0xffffff)];
    if(lineColor) lineColor=new THREE.Color(lineColor);
    lineGeo.vertices.push(...points);
    points.forEach((v,i)=>{
      if(lineColor){
        lineGeo.colors.push(lineColor);
      }else{
        lineGeo.colors.push(color[i%2]);
      }

    });
    let line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({vertexColors: true}));
    line.position.y=0.1;
    this.add(line);

    return line;
  }

  /**
   * 画模型组内的连接线路,模型原点在中间
   * @param meshes type:array 模型|模型名称 数组
   * @param dir 线的方向 left|right|up|down
   * @param width  线的长度
   * @param offset 相对模型中心的偏移量
   *
   * 方向如下：
   *       left
   *        |
   * down--mesh--up
   *        |
   *      right
   */
  createLinePath(meshes, dir = "up", width = 15, offset = 10) {
    let pos = null, p1 = null, p2 = null, pf = null, pla = null, line,
      offsetZ1 = 0, offsetZ2 = 0, offsetX1 = 0, offsetX2 = 0, len = meshes.length - 1;
    let lineGeo = new THREE.Geometry();
    //少于1个不连
    if (len < 0) return;

    switch (dir) {
      case "up":
        offsetZ1 = -offset;
        offsetZ2 = offsetZ1 - width;
        break;
      case "down":
        offsetZ1 = offset;
        offsetZ2 = offsetZ1 + width;
        break;
      case "left":
        offsetX1 = -offset;
        offsetX2 = offsetX1 - width;
        break;
      default:
        offsetX1 = offset;
        offsetX2 = offsetX1 + width;
    }

    meshes.forEach((mesh, i) => {
      mesh = typeof(mesh)==="string"?this.getObjectByName(mesh):mesh;
      if (mesh) {
        pos = mesh.position;
        //靠近中心点的为前
        p1 = new THREE.Vector3(pos.x + offsetX2, pos.y, pos.z + offsetZ2);
        p2 = new THREE.Vector3(pos.x + offsetX1, pos.y, pos.z + offsetZ1);
        if (i === 0) pf = p1;
        if (i === len) pla = p1;
        mesh.userData.points = mesh.userData.points || [];
        mesh.userData.points.push(p1.clone(),p2.clone());
        lineGeo.vertices.push(p1, p2);
      }

    });


    this.userData.jionLine = this.userData.jionLine || [];

    //大于1个加闭合线
    if (len > 0) {
      lineGeo.vertices.push(pf);
      lineGeo.vertices.push(pla);
      this.userData.jionLine.push([pf.clone(), pla.clone()]);
    }

    line = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({color: 0x28d272}));
    line.position.y=0.1
    this.add(line);

  }

  /**
   * 画区域块连接线路
   * @param area1 主模型
   * @param area2 次模型
   * @param dir 线的方向 left|right|up|down
   * @param offset1  向area2方向的偏移量
   * @param offset2  向area1方向的偏移量
   * @param lineColor  16进制链接线条颜色
   *
   * 方向如下：
   *       left
   *        |
   * down--area1--up
   *        |
   *      right
   */
  createAreaLinePath(area1,area2,dir="up", offset1 = 0,offset2=0,lineColor) {
    area1 = typeof(area1)==="string"?this.getObjectByName(area1):area1;
    area2 = typeof(area2)==="string"?this.getObjectByName(area2):area2;
    let isTerminal=area2 instanceof Terminal;
    let pos1=area1.position.clone();
    let pos2=[];
    let area2_border=area2.getBorder();
    let area2_center=area2.position.clone()
    let notJionLine=!(area2.userData.jionLine&&area2.userData.jionLine.length);

    if(notJionLine){
      if(isTerminal){
        pos2.push(area2_center)
      }else{
        pos2.push(area2_center.add(new THREE.Vector3(area2_border.x/2,0,-area2_border.z/2)));
      }
    }else{
      area2.userData.jionLine.forEach((v)=>{
        //得到点到线垂直相交点
        pos2.push(new THREE.Line3(v[0],v[1]).closestPointToPoint(pos1));
      });

    }
    switch (dir) {
      case "up":
        pos1.setZ(pos1.z-offset1);
        notJionLine&&pos2[0].setZ(pos2[0].z-offset2);
        break;
      case "down":
        pos1.setZ(pos1.z+offset1);
        notJionLine&&pos2[0].setZ(pos2[0].z+offset2);
        break;
      case "left":
        pos1.setX(pos1.x-offset1);
        notJionLine&&pos2[0].setX(pos2[0].x+offset2);
        break;
      default:
        pos1.setX(pos1.x+offset1);
        notJionLine&&pos2[0].setX(pos2[0].x-offset2);
    }

    area1.userData.outPoints=area1.userData.outPoints||[];
    area1.userData.outPoints.push(pos1);

    area2.userData.outPoints=area2.userData.outPoints||[];
    area2.userData.outPoints.push(...pos2);


    return this.addAreaLine([pos1,...pos2],lineColor);

  }

  /**
   * 画转弯(z)的区域块连接线路,注意：area的原点在左上角
   * @param area1 主模型
   * @param area2 次模型
   * @param dir 线的方向 left|right|up|down
   * @param offset1  向area2方向的偏移量
   * @param offset2  向area1方向的偏移量
   *
   * 方向如下：
   *       left
   *        |
   * down--area1--up
   *        |
   *      right
   */
  createAreaCornerLinePath(area1,area2,dir="up", offset1 = 5,offset2=10,isDebug) {
    area1 = typeof(area1)==="string"?this.getObjectByName(area1):area1;
    area2 = typeof(area2)==="string"?this.getObjectByName(area2):area2;
    let pos1=area1.position.clone();
    let pos2=[];
    let pos3=area2.position.clone();
    let notJionLine=!area2.userData.jionLine.length;//没有组内 层连线
    let border=area2.getBorder();
    let center=new THREE.Vector3(pos3.x+border.x/2,pos3.y,pos3.z+offset2);


    !notJionLine&&area2.userData.jionLine.forEach((v)=>{
      //得到点到线垂直相交的
      pos2.push(new THREE.Line3(v[0],v[1]).closestPointToPoint(center));
    });
    notJionLine&&pos2.push(center);
    //todo 暂时做了向上方向
    // switch (dir) {
    //   case "up":
    //     center.setZ(center.z-offset1);
    //     notJionLine&&pos2[0].setZ(pos2[0].z-offset2);
    //     break;
    //   case "down":
    //     center.setZ(center.z+offset1);
    //     notJionLine&&pos2[0].setZ(pos2[0].z+offset2);
    //     break;
    //   case "left":
    //     center.setX(center.x-offset1);
    //     notJionLine&&pos2[0].setX(pos2[0].x+offset2);
    //     break;
    //   default:
    //     center.setX(center.x+offset1);
    //     notJionLine&&pos2[0].setX(pos2[0].x-offset2);
    // }
    pos1.setZ(pos1.z-offset1);

    area1.userData.outPoints=area1.userData.outPoints||[];
    area1.userData.outPoints.push(pos1);

    let points=[new THREE.Vector3(pos1.x,pos1.y,center.z),center];
    area2.userData.outPoints=area2.userData.outPoints||[];
    area2.userData.outPoints.push(...pos2);
    area2.userData.outCornetPoints=area2.userData.outCornetPoints||[];
    area2.userData.outCornetPoints.push(...points);

    isDebug&&[pos1,...points,...pos2].forEach((v)=>{
      this.debugPoint(v)
    });
    isDebug&&console.log(this)
    return this.addAreaLine([pos1,...points,...pos2]);

  }

  animate() {

  }


}

export default Area