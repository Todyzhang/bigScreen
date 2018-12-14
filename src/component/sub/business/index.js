import * as THREE from 'three';
import Area from '../../parent/Area';
import ExternalService from "./ExternalService";
import Office from './Office';
import MainFirewall from "./MainFirewall";
import Core from "./Core";
import DataArea from "./DataArea";
import InternalServiceArea from "./InternalServiceArea";
import utils from "../../../utils/utils";
import Wire from '../Wire';
import Terminal from "../../parent/Terminal";

/**
 * 业务区
 */
class Business extends Area {

  init(){
    this.createNodes();
    this.getBorder();
    this.createSign("业务区")
      .then((txt)=>{
        this.add(txt);
        txt.position&&txt.position.set(-this.borderX/2-42,60,45);
        txt.rotateY&&txt.rotateY(Math.PI/2);
        const wire=new Wire();
        wire.position.x=-182;
        this.add(wire);
      })

  }

  createNodes() {
    let exter = new ExternalService();
    let core = new Core();
    let office = new Office();
    let mfire = new MainFirewall();
    let dataArea = new DataArea();
    let internalServiceArea = new InternalServiceArea();

    this.buildGround();

    exter.name="exter";//外部服务区
    core.name="core";//核心区
    office.name="office";//办公区
    mfire.name="mfire";//防火墙区
    dataArea.name="dataArea";//数据区
    internalServiceArea.name="internalServiceArea";//内部服务区

    office.position.x=40;
    office.position.z=-65;

    exter.position.x=-80;
    exter.position.z=150;

    core.position.x=80;
    core.position.z=30;

    dataArea.position.x=-120;
    dataArea.position.z=30;

    internalServiceArea.position.x=-150;
    internalServiceArea.position.z=-65;

    this.add(mfire,exter,core,dataArea,office,internalServiceArea);

    this.updateNodeData([mfire,exter,office,core,dataArea,internalServiceArea]);

    //画转折连线
    this.createAreaCornerLinePath("A101B101",internalServiceArea,"up",6,10);
    this.createAreaCornerLinePath("A101B101",office,"up",6);

    //画垂直连线
    this.createAreaLinePath("A101B201",core,"right",8);
    this.createAreaLinePath("A101B301",exter,"down",6,);
    this.createAreaLinePath("A101B401",dataArea,"left",8);


    //主区域对外节点更新为终端中心点
    ["A101","A101B101","A101B201","A101B301","A101B401"].forEach((v)=>{
      let ter=this.getObjectByName(v);
      ter.userData.outPoints=[ter.position];
      // console.log(ter.name,ter.userData)
    });

    //对外连接线坐标加入到各终端
    [exter,core,dataArea,office,internalServiceArea].forEach((v)=>{
      v.children.forEach((vv)=>{
        if(vv instanceof Terminal){

          if(v.userData.outPoints){
            vv.userData.outPoints=vv.userData.outPoints||[];
            let floor=vv.name.match(/([A-Z])(\d)(\d{2})$/)
            floor&&(floor=floor[2]-1);
            vv.userData.outPoints.push(v.userData.outPoints[floor].clone());
            if(v.userData.outCornetPoints){
              vv.userData.outCornetPoints=v.userData.outCornetPoints.map((vvv)=>{return vvv.clone()});
            }
            // console.log(vv.name,floor,vv.userData)
          }
          // console.log(vv.name,vv.userData)
        }
      })
    });

    // console.log(mfire);


  }

  buildGround () {
    let planeGeometry = new THREE.BoxBufferGeometry(320, 6, 320);
    let plane = utils.makeMesh('lambert', planeGeometry, 0x011c25);
    plane.position.y = -3;

    this.add(plane);
    this.createBorder(0,0,320,320,true)
  }

}

export default Business