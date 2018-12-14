import Area from '../../parent/Area';
import CloudNode from "../terminal/CloudNode";

class MainFirewall extends Area{

  init(){

    this.createNodes();

  }


  createNodes(){
    let node=new CloudNode();
    node.name="main"

    this.add(node);

  }
  

}

export default MainFirewall