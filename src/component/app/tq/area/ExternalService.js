import Area from '../../../Area';
import Host from "../../../terminal/Host";

class ExternalService extends Area{

  init(){

    this.createBgSign('  外部\n服务区');
    this.createNodes();
    this.createBorder(30,30);

    this.createLinePath(['A101B301C101','A101B301C102'],"up",20);
    this.createLinePath(['A101B301C201'],"up",20);
  }


  createNodes(){
    let host=new Host(),host_t=null;
    host.position.x=50;
    host.position.z=-10;
    host.name='A101B301C201';
    for(let i=0,j=1;i<2;i++,j++){
      host_t=host.clone();
      host_t.position.x=20+60*i;
      host_t.position.z=-40
      host_t.name='A101B301C10'+j;
      this.add(host_t);
    }

    this.add(host)


  }
  

}

export default ExternalService