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

/**
 * 蜜网区
 */
class Honeynet extends Area {

  init(){
    this.createNodes();
    this.getBorder();
    this.createSign("蜜网区")
      .then((txt)=>{
        this.add(txt);
        txt.position&&txt.position.set(-this.borderX/2-42,60,90);
        txt.rotateY&&txt.rotateY(Math.PI/2);
        const wire=new Wire();
        wire.position.x=-182;
        wire.position.z=45;
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

    exter.name="A000B002C000";//外部服务区
    core.name="core";//核心区
    office.name="office";//办公区
    mfire.name="mfire";//防火墙区
    dataArea.name="dataArea";//数据区
    internalServiceArea.name="internalServiceArea";//内部服务区

    office.position.x=30;
    office.position.z=-55;

    exter.position.x=-80;
    exter.position.z=95;

    core.position.x=50;
    core.position.z=13;

    dataArea.position.x=-80;
    dataArea.position.z=13;

    internalServiceArea.position.x=-150;
    internalServiceArea.position.z=-55;

    this.add(mfire,exter,core,dataArea,office,internalServiceArea);

    this.updateNodeData([mfire,exter,office,core,dataArea,internalServiceArea])



    this.createAreaLinePath(mfire,exter,"down",10);
    this.createAreaLinePath(mfire,dataArea,"left",10,20);

    this.createAreaLinePath(mfire,core,"right",10,20);

    //画转折连线
    this.createAreaCornerLinePath(mfire,office,"up",10);
    this.createAreaCornerLinePath(mfire,internalServiceArea,"up",10);



  }

  buildGround () {
    let planeGeometry = new THREE.BoxBufferGeometry(320, 6, 200);
    let plane = utils.makeMesh('lambert', planeGeometry, 0x011c25);
    plane.position.y = -3;

    this.add(plane);
    this.createBorder(0,0,320,200,true)
  }



}

export default Honeynet