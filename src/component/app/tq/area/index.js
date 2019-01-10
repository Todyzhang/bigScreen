import * as THREE from 'three';
import Area from '../../../Area';
import utils from '../../../../utils/utils';

import MainFirewall from './MainFirewall';
import ExternalService from './ExternalService';
import Core from './Core';
import Manage from "./Manage";
import InsideService from "./InsideService";

class TQ extends Area {

  init() {
    this.createNodes();
    this.getBorder();

  }

  createNodes() {

    let mfire = new MainFirewall();
    let external = new ExternalService();
    let core = new Core();
    let manage = new Manage();
    let insideServer = new InsideService();

    // external.position.x = -40;
    // external.position.z = 230;
    // external.name = 'A101B301';

    // core.position.x = -190;
    // core.position.z = 15;
    // core.name = 'A101B401';

    // manage.position.x = 170;
    // manage.position.z = 15;
    // manage.name = 'A101B201';

    // insideServer.position.x = -110;
    // insideServer.position.z = -180;
    // insideServer.name = 'A101B101';

    external.position.x=-50;
    external.position.z=230;
    external.name='A101B301';

    core.position.x=-140;
    core.position.z=21;
    core.name='A101B401';

    manage.position.x=100;
    manage.position.z=21;
    manage.name='A101B201';

    insideServer.position.x=-110;
    insideServer.position.z=-90;
    insideServer.name='A101B101';

    this.add(mfire, external, core, manage, insideServer);
    this.updateNodeData([mfire, external, core, manage, insideServer]);
    this.buildGround();

    this.createAreaLinePath(mfire, external, 'down', 6);
    this.createAreaLinePath(mfire, core, 'left', 10, 10);
    this.createAreaLinePath(mfire, manage, 'right', 10, 10);
    this.createAreaLinePath(mfire, insideServer, 'up', 10, 10);
  }

  buildGround() {
    let planeGeometry = new THREE.BoxBufferGeometry(320, 6, 480);
    let plane = utils.makeMesh('lambert', planeGeometry, 0x011c25);
    plane.position.y = -3.1;

    this.add(plane);
    this.createBorder(0,0,320,480,true);

  }

  buildRoundGround() {
    const groundArr = [[
      30, 30, 6, 0, -3.1, 0
    ], [
      80, 80, 6, -178, -3.1, 0
    ], [
      80, 80, 6, 178, -3.1, 0
    ], [
      80, 80, 6, 0, -3.1, 200
    ], [
      120, 120, 6, 0, -3.1, -220
    ]];
    groundArr.forEach((item) => {
      const [rTop, rBottom, h, x, y, z] = item;
      const planeGeo = new THREE.CylinderGeometry(rTop, rBottom, h, 50);
      const plane = utils.makeMesh('lambert', planeGeo, 0x011c25);
      plane.position.x = x;
      plane.position.y = y;
      plane.position.z = z;
      this.add(plane);

      const borderGeo = new THREE.RingGeometry(rTop - 1, rTop, 100);
      const borderMaterial = new THREE.MeshBasicMaterial({ color: 0x009ad8, side: THREE.DoubleSide });
      const border = new THREE.Mesh(borderGeo, borderMaterial);
      border.rotation.x = Math.PI / 2;
      border.position.x = x;
      border.position.z = z;
      this.add(border);
    });
  }

}

export default TQ