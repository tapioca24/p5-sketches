/// <reference path="../../node_modules/@types/p5/global.d.ts" />

const browser = bowser.getParser(window.navigator.userAgent).parsedResult;
const isMobile = browser.platform.type === "mobile";
const isTablet = browser.platform.type === "tablet";

const COOLORS_URLS = [
  "https://coolors.co/36213e-554971-a3a5c3-a9d2d5-cbf3d2",
  "https://coolors.co/fdbb6d-d77280-b16986-695c78-435675",
  "https://coolors.co/2b3a67-496a81-66999b-8fb393-ffc482",
  "https://coolors.co/5c5185-6c7ba1-8eb4bd-b2d4c9-c7edc9",
  "https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500",
  "https://coolors.co/141414-1d3557-71a9b7-c7bdbf-ffffff",
  "https://coolors.co/e78f8e-824c71-96c0b7-d4dfc7-fef6c9",
];

let palette;
let bg;
let myCircle;
let g;

function setup() {
  const canvasWidth = isMobile || isTablet ? windowWidth : 800;
  const canvasHeight = isMobile || isTablet ? windowHeight : 800;
  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);
  initialize();

  // create noise graphics
  g = createGraphics(width, height);
  for (let i = 0; i < g.width * g.height * 0.1; i++) {
    const x = random(g.width);
    const y = random(g.height);
    g.stroke(255, 30);
    g.point(x, y);
  }
}

function initialize() {
  palette = createColors(random(COOLORS_URLS));
  palette = shuffle(palette);

  bg = palette[0];

  const radius = min(width, height) * 0.75;
  const circlePalette = palette.slice(1);
  myCircle = new MyCircle(0, 0, radius, 100, circlePalette);
}

function draw() {
  background(bg);

  push();
  translate(width / 2, height / 2);
  scale(-1, 1);
  myCircle.draw();
  pop();

  image(g, 0, 0);
}

function keyReleased() {
  if (key === "s") {
    save("sketch");
  }
}

function mouseClicked() {
  initialize();
  redraw();
}

class MyCircle {
  constructor(x, y, radius, arcNum, palette) {
    this.radius = radius;

    this.arcs = [...Array(arcNum)].map(() => {
      const arcRadius = radius * random();
      const arcAngle = TAU * random();
      const arcLength = TAU * random(0.1, 0.3);
      const arcWeight = radius * random(0.03, 0.08);
      const arcColor = color(random(palette).levels);
      arcColor.setAlpha(170);

      return new MyArc(
        x,
        y,
        arcRadius,
        arcAngle,
        arcLength,
        arcWeight,
        arcColor
      );
    });

    const dashMax = this.radius * 0.11;
    const dashMin = this.radius * 0.008;
    this.dash = [...Array(100)].map((_, i) => {
      if (i % 2 === 1) return dashMin;
      return max(dashMax * pow(0.8, i / 2), 5);
    });
  }

  draw() {
    push();
    drawingContext.setLineDash(this.dash);
    drawingContext.shadowBlur = this.radius * 0.05;
    drawingContext.shadowOffsetX = this.radius * 0.01;
    drawingContext.shadowOffsetY = this.radius * 0.01;

    this.arcs.forEach((a) => a.draw());
    pop();
  }
}

class MyArc {
  constructor(x, y, radius, angle, length, weight, col) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
    this.length = length;
    this.weight = weight;
    this.vel = -TAU * 0.0001 * random(1, 30);
    this.col = color(col.levels);
    this.shadowColor = this.getShadowColor(col);
  }

  draw() {
    push();
    noFill();
    strokeCap(SQUARE);
    strokeWeight(this.weight);
    stroke(this.col);
    drawingContext.shadowColor = this.shadowColor;

    const start = this.angle + frameCount * this.vel;
    const stop = start + this.length;
    arc(this.x, this.y, this.radius, this.radius, start, stop);
    pop();
  }

  getShadowColor(col) {
    let c = color(col.levels);
    c.setAlpha(255);
    c = lerpColor(c, color(0), 0.3);
    c.setAlpha(150);
    return c;
  }
}

function createColors(url) {
  const i = url.lastIndexOf("/");
  return url
    .slice(i + 1)
    .split("-")
    .map((c) => `#${c}`)
    .map((c) => color(c));
}
