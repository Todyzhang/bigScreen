import Area from '../../../Area';
import CloudNode from "../../../terminal/CloudNode";
import Firewall from "../../../terminal/Firewall";

class MainFirewall extends Area{

  init(){

    this.createNodes();

    this.createAreaLinePath("A101","A101B101","up",5,-7,0x28d272);
    this.createAreaLinePath("A101","A101B201","right",10,8,0x28d272);
    this.createAreaLinePath("A101","A101B301","down",5,-7,0x28d272);
    this.createAreaLinePath("A101","A101B401","left",10,8,0x28d272);
  }


  createNodes(){
    let node=new CloudNode();
    let firewall=new Firewall();
    let node2=node.clone();
    let node3=node.clone();
    let node4=node.clone();

    firewall.name="A101";

    node2.position.x=40;//right
    node3.position.x=-40;//left
    node4.position.z=30;//down
    node.position.z=-30;//up

    node.name="A101B101";
    node2.name="A101B201";
    node4.name="A101B301";
    node3.name="A101B401";


    this.add(firewall,node,node2,node3,node4);

  }
  

}

export default MainFirewall