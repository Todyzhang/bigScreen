import opts from './state';


class Star{

  constructor(){
    this.reset();
  }
  reset() {

    this.x = Math.random() * opts.w;
    this.y = Math.random() * opts.h;
    this.life = opts.starBaseLife + Math.random() * opts.starAddedLife;
  }
  step() {

    --this.life;

    if( this.life <= 0 ){
      this.reset();
    }

  }
  draw(){
    const {ctx,tick,w}=opts;
    const hue = tick + this.x / w * 100;
    ctx.fillStyle = ctx.shadowColor = `hsla(${hue}, 80%, 50%, .2)`;
    ctx.shadowBlur = this.life;
    // ctx.fillRect( this.x, this.y, 1, 1 );
    ctx.beginPath();
    ctx.arc(this.x, this.y,Math.random()*2,0,Math.PI,false);
    ctx.fill();
  };
}

export default Star;