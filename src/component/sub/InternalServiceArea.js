import Area from '../parent/Area';
import Cube from "../sub/Cube";
import Aio from "../sub/Aio";
import Computer from "../sub/Computer";

class InternalServiceArea extends Area{

  init(){

    this.createBgSign('办公区');
    this.createNodes();
    this.createBorder(15,25);

    this.createLinePath(["box0","box1","box2","box3"],'down',7);
    this.createLinePath(["aio0","aio1","aio2","computer1"],'down',7,5);
    this.createLinePath(["aio3","aio4","aio5","computer0"],'down',7,5);
  }


  createNodes(){

    const box=new Cube();
    const aio=new Aio();
    const computer=new Computer();
    box.position.z=-70;
    for(let i=0;i<3;i++){
      const aio_t=aio.clone();
      aio_t.position.x=15+25*i;
      aio_t.position.z=-45;
      aio_t.name="aio"+i;
      this.add(aio_t);
    }

    for(let i=0;i<3;i++){
      const aio_t=aio.clone();
      aio_t.position.x=15+25*i;
      aio_t.position.z=-20;
      aio_t.name="aio"+(i+3);
      this.add(aio_t);
    }

    for(let i=0;i<4;i++){
      const box_t=box.clone();
      box_t.position.x=15+25*i;
      box_t.name="box"+i;
      this.add(box_t);
    }

    for(let i=0;i<2;i++){
      const computer_x=computer.clone();
      computer_x.position.x=90;
      computer_x.position.z=-20-i*25;
      computer_x.name="computer"+i;
      this.add(computer_x);
    }

  }
  
}

export default InternalServiceArea