import * as THREE from 'three';
import Area from '../parent/Area';
import ExternalService from "../sub/ExternalService";
import Office from '../sub/Office';
import MainFirewall from "../sub/MainFirewall";
import Core from "../sub/Core";
import DataArea from "../sub/DataArea";
import InternalServiceArea from "../sub/InternalServiceArea";
import Terminal from "../parent/Terminal";
/**
 * 业务区
 */
class Business extends Area {

  init(){
    this.createNodes();
    this.createBorder(0,0,true);
    this.createSign("业务区")
      .then((txt)=>{
        this.add(txt);
        txt.position&&txt.position.set(-this.borderX/2-20,50,20);
        txt.rotateY&&txt.rotateY(Math.PI/2);
      })

  }

  createNodes() {
    let exter = new ExternalService();
    let core = new Core();
    let office = new Office();
    let mfire = new MainFirewall();
    let dataArea = new DataArea();
    let internalServiceArea = new InternalServiceArea();

    exter.name="exter";
    core.name="core";
    office.name="office";
    mfire.name="mfire";
    dataArea.name="dataArea";
    internalServiceArea.name="internalServiceArea";

    office.position.x=40;
    office.position.z=-65;

    exter.position.x=-80
    exter.position.z=150

    core.position.x=80
    core.position.z=30

    dataArea.position.x=-120
    dataArea.position.z=30

    internalServiceArea.position.x=-150
    internalServiceArea.position.z=-60

    this.add(mfire,exter,core,dataArea,office,internalServiceArea);

    this.updateNodeData([mfire,exter,office,core,dataArea,internalServiceArea])



    this.createAreaLinePath(mfire,exter,"down",40);
    this.createAreaLinePath(mfire,dataArea,"left",50);
    this.createAreaLinePath(mfire,core,"right",50);
    let line1=this.createAreaLinePath(mfire,office,"up",50);
    line1.position.x=office.position.x+office.borderX/2
    let line2=this.createAreaLinePath(mfire,internalServiceArea,"up",50);
    line2.position.x=internalServiceArea.position.x+internalServiceArea.borderX/2
    console.log(line1,line2)
    line1.updateMatrixWorld();

    let ps2=[]
    line1.geometry.vertices.forEach((p)=>{
      p.applyMatrix4( line1.matrixWorld );
      ps2.push(p.clone());
    })
    this.addDebugLine(ps2)
    // this.createLinePath([office,internalServiceArea],"down")

    // console.log(core.position,core.userData.jionLine[0])


  }




}

export default Business