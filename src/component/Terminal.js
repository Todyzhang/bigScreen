import * as THREE from 'three';
import utils from "../utils/utils";
import publicVal from "../utils/publicVal";

const TWEEN = require('@tweenjs/tween.js');

class Terminal extends THREE.Object3D {

  flagTimer=null;
  flagTxtMesh=null;
  flagLogos={
    logoAry:[],
    logoObj:{}
  };
  flagLogoWarp=new THREE.Group();

  constructor() {
    super();
    this.init();
    this.flagLogoWarp.position.x=-10;
    this.flagLogoWarp.position.y=25;
    this.add(this.flagLogoWarp);
  }

  init() {
    this.createMaterial();
    this.createMainCube();

  }

  createMaterial() {
  }

  createMainCube() {
  }

  /**
   * 改变外观状态
   * @param type -normal 正常 -alarm 警告 -warn 报警
   */
  setStatus(type) {
    if (type === "alarm") {
      this.setAlarmMaterial()
    } else if (type === "warn") {
      this.setWarnMaterial();
    } else {
      this.setNormalMaterial()
    }
  }

  setNormalMaterial() {
  }

  setAlarmMaterial() {
  }

  setWarnMaterial() {
  }

  /**
   * 得到box size
   * @returns {{x: *, z: *}}
   */
  getBorder() {
    if (this.borderX && this.borderZ) return {x: this.borderX, z: this.borderZ};

    let {x, z} = utils.getBorder(this);

    this.borderX = x;
    this.borderZ = z;
    return {x: x, z: z};
  }

  showFlag(txt, fontSize = 4) {
    if(this.showFlagTxt!==txt){
      this.showFlagTxt=txt;

      if (!this.ripples) {
        this.createRipples();
      }
      this.animateShowRipples();

      this.flagTxtMesh&&this.remove(this.flagTxtMesh);
      this.flagTxtMesh=new THREE.Object3D();
      this.add(this.flagTxtMesh);
      utils.loadFont()
        .then((font) => {
          this.createWords(font, txt, fontSize);
          this.hideFlag();
        });

    }
  }
  showLogo(team,logo){
    let logos=this.flagLogos;
    if(!logos.logoObj[team]){
      logos.logoObj[team]=1;
      logos.logoAry.push(logo);
      //组建logo icon
      let logoTer=publicVal.loader.texture.load(logo);
      let logoM=new THREE.MeshBasicMaterial({map:logoTer,side:THREE.DoubleSide});
      let geo = new THREE.CircleGeometry(3, 30, 0, 2 * Math.PI);
      let cl = new THREE.Mesh(geo, logoM);
      this.flagLogoWarp.add(cl);
      this.flagLogoWarp.children.forEach((mesh,i)=>{
        if(i>=5){
          mesh.position.set(6*(i-5),8,0)
        }else{
          mesh.position.set(6*i,0,0)
        }

      })
    }



  }
  //5秒后消失 todo有再显示
  hideFlag(){
    this.flagTimer&&clearInterval(this.flagTimer);
    this.flagTimer=setTimeout(()=>{
      this.hideRipples();
      this.remove(this.flagTxtMesh)
    },publicVal.hideFlagTime);

  }
  showLabel(txts){
    let txt=txts.join('\n');
    utils.loadFont()
      .then((font) => {
        let matLite = Terminal.fontMaterial;
        // matLite.color=new THREE.Color(0xffffff);
        let shapes = font.generateShapes(txt, 4);
        let geo = new THREE.ShapeBufferGeometry(shapes);
        let text = new THREE.Mesh(geo, matLite);
        text.position.y=20;
        text.position.x=-15;
        text.position.z=10;
        text.rotateY(Math.PI/6)
        this.add(text);
      });
  }
  createRipples() {
    let geo = new THREE.CircleGeometry(15, 80, 0, 2 * Math.PI);
    let c1 = new THREE.Mesh(geo, Terminal.ripplesMaterial);

    c1.rotateX(-Math.PI / 2);
    c1.position.y = 0.1;//不粘地板，防止闪烁
    c1.scale.set(0, 0, 0);

    let c2 = c1.clone();
    c2.position.y = 0.2;

    this.add(c1, c2);

    this.ripples = [c1, c2];
  }

  hideRipples(){
    this.ripples.forEach((v)=>{v.visible=false;v.scale.set(0, 0, 0);});
  }

  animateShowRipples(){
    this.ripples.forEach((v)=>{v.visible=true;});
    this.ripplesAnimate(...this.ripples);
  }

  ripplesAnimate(c1, c2) {
    let scale = {x: 0};
    let ani = new TWEEN.Tween(scale)
      .to({x: [1.2, 1]}, 300)
      .onUpdate(() => {
        c1.scale.set(scale.x, scale.x, scale.x);
      })
      .onComplete(() => {
        TWEEN.remove(ani);
      })
      .start();
    let scale2 = {x: 0};
    let ani2 = new TWEEN.Tween(scale2)
      .to({x: 1}, 1000)
      .repeat(2)
      .onUpdate(() => {
        c2.scale.set(scale2.x, scale2.x, scale2.x);
      })
      .onComplete(() => {
        TWEEN.remove(ani2);
      })
      .start();
  }

  createTextBorder(width = 75) {
    let shapes = new THREE.Shape();
    let point2d = [
      new THREE.Vector3(-3, -5, 0),
      new THREE.Vector3(-20, -5, 0),
      new THREE.Vector3(-25, -10, 0),
      new THREE.Vector3(-25, -20, 0),
      new THREE.Vector3(width - 30, -20, 0),
      new THREE.Vector3(width - 25, -15, 0),
      new THREE.Vector3(width - 25, -5, 0),
      new THREE.Vector3(3, -5, 0),
      new THREE.Vector3(0, 0, 0),
    ];
    let geo = new THREE.Geometry();

    point2d.forEach((v) => {
      shapes.lineTo(v.x, v.y);
      geo.vertices.push(v)
    });
    let shapeGeometry = new THREE.ShapeGeometry(shapes);
    let map = new THREE.Texture();
    map.needsUpdate = true;
    let mesh = new THREE.Mesh(
      shapeGeometry,
    );

    let border = new THREE.LineLoop(geo,
      new THREE.LineBasicMaterial({color: 0xffa95c, side: THREE.DoubleSide}));
    mesh.add(border)

    mesh.position.y = 20;
    mesh.rotateX(Math.PI);

    this.flagTxtMesh.add(mesh)

  }


  createWords(font, msg, fontSize) {
    let text;

    let matLite = Terminal.fontMaterial;
    // matLite.color=new THREE.Color(0xe8c857)
    let shapes = font.generateShapes(msg, fontSize);
    let geo = new THREE.ShapeBufferGeometry(shapes);
    text = new THREE.Mesh(geo, matLite);

    let {x} = utils.getBorder(text);

    this.createTextBorder(x + 10);

    text.position.set(-20,30,0);

    this.flagTxtMesh.add(text)

  }


}

Terminal.fontMaterial = new THREE.MeshBasicMaterial({
  color:0xe8c857,
  transparent: true,
  opacity: 1,
  side: THREE.DoubleSide,
  depthTest: false //防止字体闪烁
});

Terminal.ripplesMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.CanvasTexture(utils.canvas.terminalRipplesBg()),
  transparent: true,
  opacity: 0.5
});

Terminal.fontBgMaterial = new THREE.MeshStandardMaterial({
  map: utils.canvas.terminalFlagBg(),
  side: THREE.DoubleSide,
  depthTest: false,
  metalness: 0.2,
  roughness: 0.07,
  transparent:true
})

export default Terminal