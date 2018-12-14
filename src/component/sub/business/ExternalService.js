import Area from '../../parent/Area';
import Cube from "../terminal/Cube";
import Host from "../terminal/Host";

class ExternalService extends Area{

  init(){

    this.createBgSign('  外部\n服务区');
    this.createNodes();
    this.createBorder(15,30);

    this.createLinePath(["A101B301C101","A101B301C102","A101B301C103","A101B301C104","A101B301C105","A101B301C106","A101B301C107"]);
    this.createLinePath(["A101B301C201","A101B301C202","A101B301C203","A101B301C204","A101B301C205","A101B301C206"]);
  }


  createNodes(){
    let box=new Cube(),box_t=null;
    let host=new Host(),host_t=null;
    box.position.z=-10;
    host.position.z=-50;
    for(let i=0,j=1;i<6;i++,j++){
      box_t=box.clone();
      box_t.position.x=25+25*i;
      box_t.name="A101B301C20"+j;
      host_t=host.clone();
      host_t.position.x=10+25*i;
      host_t.name="A101B301C10"+j;
      this.add(box_t,host_t);
    }
    host.position.x=10+25*6;
    host.name="A101B301C107";
    this.add(host);

  }
  

}

export default ExternalService