/// <reference path="../../node_modules/@types/p5/global.d.ts" />

let points = [];
let m;
let r1, r2, g1, g2, b1, b2;
let palette;

function setup() {
  createCanvas(800, 800);
  noiseDetail(1);
  initialize();
}

function draw() {
  noStroke();

  points.forEach((p) => {
    const n = noise(p.x * m, p.y * m);
    const angle = map(n, 0, 1, 0, 2 * TAU);
    const v = p5.Vector.fromAngle(angle);
    p.add(v);

    fill(getColor(p.x, p.y));
    ellipse(p.x, p.y, 1);
  });
}

function keyReleased() {
  if (key === "s") {
    save("sketch");
  }
}

function mouseClicked() {
  clear();
  initialize();
}

function initialize() {
  background(30);
  noiseSeed(random(10000));

  // create palette
  palette = createPalette();

  // create points
  const margin = 100;
  const pds = new PoissonDiskSampling({
    shape: [width + margin * 2, height + margin * 2],
    minDistance: 15,
  });
  points = pds.fill().map((p) => createVector(p[0] - margin, p[1] - margin));

  // randomize
  m = random(0.001, 0.005);
}

function createPalette() {
  return [...Array(2)].map(() => color(random(255), random(255), random(255)));
}

function getColor(x, y) {
  const r = map(x, 0, width, red(palette[0]), red(palette[1]), true);
  const g = map(y, 0, height, green(palette[0]), green(palette[1]), true);
  const b = map(x, 0, width, blue(palette[0]), blue(palette[1]), true);
  const a = 120;
  return color(r, g, b, a);
}
