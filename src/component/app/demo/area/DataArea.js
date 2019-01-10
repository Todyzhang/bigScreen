import Area from '../../../Area';
import Cube from "../../../terminal/Cube";
import Computer from '../../../terminal/Computer';

class DataArea extends Area{

  init(){

    this.createBgSign('数据区');
    this.createNodes();
    this.createBorder(15,15);

    this.createLinePath(["A101B401C101","A101B401C102"],'right',10);
  }


  createNodes(){

    const box=new Cube();
    box.position.x=15;
    box.position.z=-45;
    box.name='A101B401C101';

    const computer=new Computer();
    computer.position.x=15;
    computer.position.z=-15;
    computer.name='A101B401C102';

    this.add(box,computer);

  }
  
}

export default DataArea