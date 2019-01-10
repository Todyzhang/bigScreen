let w=window.innerWidth;
let h=window.innerHeight;

const opts = {
  ctx:null,
  tick:0,
  w,
  h,
  lineCount: 30,
  starCount: 100,

  radVel: .01,
  lineBaseVel: .1,
  lineAddedVel: .1,
  lineBaseLife: .4,
  lineAddedLife: .01,

  starBaseLife: 10,
  starAddedLife: 10,

  ellipseTilt: -.3,
  ellipseBaseRadius: .15,
  ellipseAddedRadius: .02,
  ellipseAxisMultiplierX: 2,
  ellipseAxisMultiplierY: 1,
  ellipseCX: w / 2,
  ellipseCY: h / 2,

  repaintAlpha: .25
};


export default opts;