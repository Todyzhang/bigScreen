import Area from '../../parent/Area';
import Aio from "../terminal/Aio";
import Computer from "../terminal/Computer";

class InternalServiceArea extends Area{

  init(){

    this.createBgSign(' 内部\n服务器');
    this.createNodes();
    this.createBorder(15,25);

    this.createLinePath(["aio0","aio1","aio2","computer0"],'down',15,5);
  }


  createNodes(){

    const aio=new Aio();
    const computer=new Computer();
    aio.position.z=-25
    for(let i=0;i<3;i++){
      const aio_t=aio.clone();
      aio_t.position.x=15+25*i;
      aio_t.name="aio"+i;
      this.add(aio_t);
    }
    computer.name="computer0";
    computer.position.z=-25
    computer.position.x=15+25*3
    this.add(computer)



  }
  
}

export default InternalServiceArea