import Area from '../../parent/Area';
import Aio from "../terminal/Aio";

class ExternalService extends Area{

  init(){

    this.createBgSign('  外部\n服务区');
    this.createNodes();
    this.createBorder(15,30);

    this.createLinePath(["aio0","aio1","aio2","aio3","aio4","aio5"],"up",20);
  }


  createNodes(){
    let aio=new Aio(),aio_t=null;
    aio.position.z=-10;

    for(let i=0;i<6;i++){
      aio_t=aio.clone();
      aio_t.position.x=25+25*i;
      aio_t.name="aio"+i;
      this.add(aio_t);
    }


  }
  

}

export default ExternalService