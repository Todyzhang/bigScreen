import Area from '../parent/Area';
import CloudNode from "../sub/CloudNode";
import Firewall from "../sub/Firewall";

class MainFirewall extends Area{

  init(){

    this.createNodes();

    this.createLinePath(["firewall"],"up",15,5);
    this.createLinePath(["firewall"],"down",15,5);
    this.createLinePath(["firewall"],"left",20,10);
    this.createLinePath(["firewall"],"right",20,10);
  }


  createNodes(){
    let node=new CloudNode();
    let firewall=new Firewall();
    let node2=node.clone();
    let node3=node.clone();
    let node4=node.clone();

    firewall.name="firewall";

    node2.position.x=40;
    node3.position.x=-40;
    node4.position.z=30;
    node.position.z=-30;

    this.add(firewall,node,node2,node3,node4);

  }
  

}

export default MainFirewall