import Area from '../parent/Area';
import Cube from "./Cube";
import Computer from './Computer';

class DataArea extends Area{

  init(){

    this.createBgSign('数据区');
    this.createNodes();
    this.createBorder(15,15);

    this.createLinePath(["box","computer"],'right',10);
  }


  createNodes(){

    const box=new Cube();
    box.position.x=15;
    box.position.z=-45;
    box.name='box';

    const computer=new Computer();
    computer.position.x=15;
    computer.position.z=-15;
    computer.name='computer';

    this.add(box,computer);

  }
  
}

export default DataArea