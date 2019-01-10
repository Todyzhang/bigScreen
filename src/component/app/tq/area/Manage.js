import Area from '../../../Area';
import Host from "../../../terminal/Host";

class Manage extends Area{

  init(){

    this.createBgSign('管理区');
    this.createNodes();
    this.createCircleBorder(30,30);
    // this.createBorder(30,30);

  }


  createNodes(){

    const host=new Host();
    host.name='A101B201C101';

    host.position.x=20;
    host.position.z=-20;

    this.add(host);

  }
  
}

export default Manage