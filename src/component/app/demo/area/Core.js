import Area from '../../../Area';
import Cube from "../../../terminal/Cube";
import Computer from '../../../terminal/Computer';

class Core extends Area{

  init(){

    this.createBgSign('核心区');
    this.createNodes();
    this.createBorder(15,15);

    this.createLinePath(["A101B201C101","A101B201C102"],'left',10);
  }


  createNodes(){

    const box=new Cube();
    box.position.x=15;
    box.position.z=-45;
    box.name='A101B201C101';

    const computer=new Computer();
    computer.position.x=15;
    computer.position.z=-15;
    computer.name='A101B201C102';

    this.add(box,computer);

  }
  
}

export default Core