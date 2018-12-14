import Area from '../../parent/Area';
import Cube from "../terminal/Cube";
import Aio from "../terminal/Aio";
import Computer from "../terminal/Computer";

class InternalServiceArea extends Area{

  init(){

    this.createBgSign(' 内部\n服务器');
    this.createNodes();
    this.createBorder(15,25);

    this.createLinePath(["A101B101C102D101","A101B101C102D102","A101B101C102D103","A101B101C102D104"],'down',7,5);
    this.createLinePath(["A101B101C102D201","A101B101C102D202","A101B101C102D203","A101B101C102D204"],'down',7,5);
    this.createLinePath(["A101B101C102D301","A101B101C102D302","A101B101C102D303","A101B101C102D304"],'down',7);
  }


  createNodes(){

    const box=new Cube();
    const aio=new Aio();
    const computer=new Computer();

    box.position.z=-70;
    for(let i=0,j=1;i<4;i++,j++){
      const box_t=box.clone();
      box_t.position.x=15+25*i;
      box_t.name="A101B101C102D30"+j;
      this.add(box_t);
    }


    for(let i=0,j=1;i<3;i++,j++){
      const aio_t=aio.clone();
      aio_t.position.x=15+25*i;
      aio_t.position.z=-45;
      aio_t.name="A101B101C102D20"+j;
      this.add(aio_t);
    }

    for(let i=0,j=1;i<3;i++,j++){
      const aio_t=aio.clone();
      aio_t.position.x=15+25*i;
      aio_t.position.z=-20;
      aio_t.name="A101B101C102D10"+j;
      this.add(aio_t);
    }



    for(let i=0,j=1;i<2;i++,j++){
      const computer_x=computer.clone();
      computer_x.position.x=90;
      computer_x.position.z=-20-i*25;
      computer_x.name="A101B101C102D"+j+"04";
      this.add(computer_x);
    }

  }
  
}

export default InternalServiceArea