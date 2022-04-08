/// <reference path="../../node_modules/@types/p5/global.d.ts" />

let points;
let brush;
let m;
let palette;
let count;

function setup() {
  createCanvas(720, 720);
  noiseDetail(1);

  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = 5;

  initialize();
}

function initialize() {
  count = 0;
  noiseSeed(random(10000));
  m = random(0.001, 0.005);

  // create palette
  palette = createPalette();

  // create points
  const margin = 15;
  const pds = new PoissonDiskSampling({
    shape: [width + margin * 2, height + margin * 2],
    minDistance: 20,
  });
  points = pds.fill().map((p) => createVector(p[0] - margin, p[1] - margin));

  // background
  const blendColor = lerpColor(palette[0], palette[1], 0.5);
  const bgColor = lerpColor(blendColor, color(255), 0.5);
  background(bgColor);
}

function draw() {
  if (count >= points.length * 0.5) return;

  const p = points[frameCount % points.length];
  const brush = new Brush(p.x, p.y, 15);
  const c = getColor(p.x, p.y);
  stroke(c);

  const shadowColor = lerpColor(c, color(0), 0.5);
  shadowColor.setAlpha(80);

  drawingContext.shadowColor = shadowColor;
  brush.draw();

  count++;
}

function keyPressed() {
  if (keyCode === ENTER) {
    initialize();
  }
}

class Brush {
  particles;

  constructor(x, y, radius, density = 0.4) {
    const particleNum = round(radius * radius * PI * density);
    this.particles = [...Array(particleNum)].map(() => {
      const angle = random(TAU);
      const r = radius * sqrt(random());
      return new Particle(x + r * cos(angle), y + r * sin(angle));
    });
  }

  draw() {
    this.particles.forEach((p) => p.draw());
  }
}

class Particle {
  pos;
  prevPos;
  life;

  constructor(x, y) {
    this.pos = createVector(x, y);
    this.life = random(5, 50);
  }

  draw() {
    const step = 4;
    while (this.life > 0) {
      const angle = this.getAngle(this.pos);
      this.prevPos = this.pos.copy();
      this.pos.add(step * cos(angle), step * sin(angle));
      line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
      this.life -= step;
    }
  }

  getAngle(pos) {
    const n = noise(pos.x * m, pos.y * m);
    const angle = map(n, 0, 1, 0, 2 * TAU);
    return angle;
  }
}

function createPalette() {
  return [...Array(2)].map(() => color(random(255), random(255), random(255)));
}

function getColor(x, y) {
  const r = map(x, 0, width, red(palette[0]), red(palette[1]), true);
  const g = map(y, 0, height, green(palette[0]), green(palette[1]), true);
  const b = map(x, 0, width, blue(palette[0]), blue(palette[1]), true);
  const a = 80;
  return color(r, g, b, a);
}
