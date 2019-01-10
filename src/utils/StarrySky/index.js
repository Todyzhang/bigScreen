import Line from './Line';
import Star from './Star';
import opts from './state';

class StarrySky {
  canvas = document.createElement('canvas');
  lines = [];
  stars = [];

  first = true;

  constructor(width, height) {
    this.canvas.width = opts.w;
    this.canvas.height = opts.h;
    if(width){
      this.canvas.width = width;
      opts.w=width;
    }
    if(height){
      this.canvas.height = height;
      opts.h=height;
    }

    opts.ctx = this.canvas.getContext('2d');
    this.canvas.style.position='absolute';
    this.canvas.style.left='0';
    this.canvas.style['z-index']=-1;
    this.init();
  }

  init() {
    this.lines.length = this.stars.length = 0;
    const {ctx,w,h}=opts;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
  }

  update() {
    this.step();
    this.draw();

    return this.canvas;
  }

  step() {
    let {lines, stars} = this;

    opts.tick += .5;

    if (lines.length < opts.lineCount && Math.random() < .5){
      lines.push(new Line());
    }

    if (stars.length < opts.starCount){
      stars.push(new Star());
    }

    lines.map(line => line.step());
    stars.map(star => star.step());
  }

  draw() {
    let {lines, stars} = this;
    const {ctx,w,h,repaintAlpha}=opts;

    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle =`rgba(0,0,0,${repaintAlpha})`;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';

    ctx.translate(opts.ellipseCX, opts.ellipseCY);
    ctx.rotate(opts.ellipseTilt);
    ctx.scale(opts.ellipseAxisMultiplierX, opts.ellipseAxisMultiplierY);

    lines.map(line => line.draw());

    ctx.scale(1 / opts.ellipseAxisMultiplierX, 1 / opts.ellipseAxisMultiplierY);
    ctx.rotate(-opts.ellipseTilt);
    ctx.translate(-opts.ellipseCX, -opts.ellipseCY);

    stars.map(star => star.draw());
  }

}

export default StarrySky;