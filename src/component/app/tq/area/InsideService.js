import Area from '../../../Area';
import Laptop from "../../../terminal/Laptop";
import Host from "../../../terminal/Host";
import Aio from "../../../terminal/Aio";


class InsideService extends Area{

  init(){

    this.createBgSign('  内部\n服务区');
    this.createNodes();
    // this.createBorder(15,15);
    this.createCircleBorder(50,70,20);
    this.createLinePath(['A101B101C101','A101B101C102','A101B101C103','A101B101C104','A101B101C105'],"down",15);
    this.createLinePath(['A101B101C201','A101B101C202','A101B101C203','A101B101C204','A101B101C205'],"down",15);
  }


  createNodes(){

    const host=new Host();
    host.name='A101B101C101';
    host.position.x=13;
    host.position.z=-45;

    const aio = new Aio();
    aio.name='A101B101C102';
    aio.position.x=58;
    aio.position.z=-45;

    const aio2 = aio.clone();
    aio2.name='A101B101C103';
    aio2.position.x=103;

    const host1=host.clone();
    host1.name='A101B101C104';
    host1.position.x=148;

    const host2=host.clone();
    host2.name='A101B101C105';
    host2.position.x=193;

    const lap=new Laptop();
    lap.name='A101B101C201';
    lap.position.x=13;
    lap.position.z=-105;

    const lap2=lap.clone();
    lap2.name='A101B101C202';
    lap2.position.x=58;

    const lap3=lap.clone();
    lap3.name='A101B101C203';
    lap3.position.x=103;

    const host4=host.clone();
    host4.name='A101B101C204';
    host4.position.x=148;
    host4.position.z=-105;

    const host5=host4.clone();
    host5.name='A101B101C205';
    host5.position.x=193;

    this.add(host,aio,aio2,host1,host2,lap,lap2,lap3,host4,host5);

  }
  
}

export default InsideService