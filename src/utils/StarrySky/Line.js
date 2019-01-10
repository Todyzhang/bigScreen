import opts from './state';

class Line {

  constructor() {
    this.reset();
  }

  reset() {
    this.rad = Math.random() * Math.PI * 2;
    this.len = opts.w * (opts.ellipseBaseRadius + Math.random() * opts.ellipseAddedRadius);
    this.lenVel = opts.lineBaseVel + Math.random() * opts.lineAddedVel;

    this.x = this.px = Math.cos(this.rad) * this.len;
    this.y = this.py = Math.sin(this.rad) * this.len;

    this.life = this.originalLife = opts.w * (opts.lineBaseLife + Math.random() * opts.lineAddedLife);

    this.alpha = .2 + Math.random() * .8;
  }

  step() {
    --this.life;

    // let ratio = 1 - .1 *  this.life / this.originalLife;

    this.px = this.x;
    this.py = this.y;

    this.rad += opts.radVel;
    this.len -= this.lenVel;

    this.x = Math.cos(this.rad) * this.len;
    this.y = Math.sin(this.rad) * this.len;

    if (this.life <= 0){
      this.reset();
    }
  }

  draw() {

    let ratio = Math.abs(this.life / this.originalLife - 1 / 2);
    const {ctx,w,tick}=opts;
    ctx.lineWidth = ratio * 5;
    let hue=tick + this.x / (w * (opts.ellipseBaseRadius + opts.ellipseAddedRadius)) * 100;
    let light=75 - ratio * 150;
    let alp=this.alpha;
    ctx.strokeStyle = ctx.shadowColor = `hsla(${hue}, 80%, ${light}%, ${alp})`;

    ctx.beginPath();
    ctx.moveTo(this.px, this.py);
    ctx.lineTo(this.x, this.y);

    ctx.stroke();
  }
}

export default Line;