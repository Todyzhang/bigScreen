import Area from '../../../Area';
import Host from "../../../terminal/Host";

class Core extends Area{

  init(){

    this.createBgSign('核心区');
    this.createNodes();
    this.createCircleBorder(30,30);

  }


  createNodes(){

    const host=new Host();
    host.name='A101B401C101';

    host.position.x=20;
    host.position.z=-20;

    this.add(host);

  }
  
}

export default Core