import Area from '../../parent/Area';
import Laptop from "../terminal/Laptop";

class Office extends Area{

  init(){

    this.createBgSign('办公区');
    this.createNodes();
    this.createBorder(15,25);

    this.createLinePath(["laptop0","laptop1","laptop2"],'down',10);
  }


  createNodes(){

    const laptop=new Laptop();
    laptop.position.z=-25;
    for(let i=0;i<3;i++){
      const laptop_t=laptop.clone();
      laptop_t.position.x=15+25*i;
      laptop_t.name="laptop"+i;
      this.add(laptop_t);
    }

  }
  
}

export default Office