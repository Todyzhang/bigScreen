import Area from '../parent/Area';
import Cube from "../sub/Cube";
import Host from "../sub/Host";
import Laptop from "../sub/Laptop";

class Office extends Area{

  init(){

    this.createBgSign('办公区');
    this.createNodes();
    this.createBorder(15,25);

    this.createLinePath(["box0","box1","box2"],'down',10);
    this.createLinePath(["laptop0","laptop1","laptop2","laptop3"],'down',10);
  }


  createNodes(){

    const box=new Cube();
    const laptop=new Laptop();
    box.position.z=-65;
    laptop.position.z=-25;
    for(let i=0;i<4;i++){
      const laptop_t=laptop.clone();
      laptop_t.position.x=15+25*i;
      laptop_t.name="laptop"+i;
      this.add(laptop_t);
    }

    for(let i=0;i<3;i++){
      const box_t=box.clone();
      box_t.position.x=40+25*i;
      box_t.name="box"+i;
      this.add(box_t);
    }

  }
  
}

export default Office