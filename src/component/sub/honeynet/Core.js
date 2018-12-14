import Area from '../../parent/Area';
import Computer from '../terminal/Computer';

class Core extends Area{

  init(){

    this.createBgSign('核心区');
    this.createNodes();
    this.createBorder(15,15);

  }


  createNodes(){

    const computer=new Computer();
    computer.position.x=15;
    computer.position.z=-15;
    computer.name='computer';

    this.add(computer);

  }
  
}

export default Core