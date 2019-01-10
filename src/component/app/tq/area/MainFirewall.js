import Area from '../../../Area';
import Firewall from "../../../terminal/Firewall";

class MainFirewall extends Area{

  init(){

    this.createNodes();

  }


  createNodes(){

    let firewall=new Firewall();
    firewall.name="A101";
    // firewall.rotateY(Math.PI/2);
    this.add(firewall);

  }
  

}

export default MainFirewall