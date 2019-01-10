import Area from '../../../Area';
import Cube from "../../../terminal/Cube";
import Laptop from "../../../terminal/Laptop";

class Office extends Area{

  init(){

    this.createBgSign('办公区');
    this.createNodes();
    this.createBorder(15,25);

    this.createLinePath(["A101B101C101D101","A101B101C101D102","A101B101C101D103","A101B101C101D104"],'down',10);
    this.createLinePath(["A101B101C101D201","A101B101C101D202","A101B101C101D203"],'down',10);
  }


  createNodes(){

    const box=new Cube();
    const laptop=new Laptop();
    box.position.z=-65;
    laptop.position.z=-25;
    for(let i=0,j=1;i<4;i++,j++){
      const laptop_t=laptop.clone();
      laptop_t.position.x=15+25*i;
      laptop_t.name="A101B101C101D10"+j;
      this.add(laptop_t);
    }

    for(let i=0,j=1;i<3;i++,j++){
      const box_t=box.clone();
      box_t.position.x=40+25*i;
      box_t.name="A101B101C101D20"+j;
      this.add(box_t);
    }

  }
  
}

export default Office