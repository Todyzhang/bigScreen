import Area from '../parent/Area';
import Cube from "../sub/Cube";
import Host from "../sub/Host";

class ExternalService extends Area{

  init(){

    this.createBgSign('  外部\n服务区');
    this.createNodes();
    this.createBorder(15,30);

    this.createLinePath(["box0","box1","box2","box3","box4","box5"]);
    this.createLinePath(["host0","host1","host2","host3","host4","host5","host6"]);
  }


  createNodes(){
    let box=new Cube(),box_t=null;
    let host=new Host(),host_t=null;
    box.position.z=-10;
    host.position.z=-50;
    for(let i=0;i<6;i++){
      box_t=box.clone();
      box_t.position.x=25+25*i;
      box_t.name="box"+i;
      host_t=host.clone();
      host_t.position.x=10+25*i;
      host_t.name="host"+i;
      this.add(box_t,host_t);
    }
    host.position.x=10+25*6;
    host.name="host6"
    this.add(host);

  }
  

}

export default ExternalService