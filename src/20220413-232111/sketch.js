/// <reference types="p5/global" />

let baseHue;

function setup() {
  createCanvas(720, 720);
  frameRate(30);
  noLoop();
  colorMode(HSB, 360, 100, 100, 100);
  noiseSeed(10);
  randomSeed(100);
  baseHue = random(360);
}

function draw() {
  const cellSize = 2;
  background(30);
  noStroke();
  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      const c = getColor(x, y, baseHue);
      fill(c);
      rect(x, y, cellSize, cellSize);
    }
  }
}

function getColor(x, y, baseHue) {
  const nStep = 0.005;
  const nX = x * nStep;
  const nY = y * nStep;

  const p = pow(2, map(sin(frameCount * 0.05), -1, 1, -0.5, 1.5));
  const d = minkowski(x, y, width * 0.5, height * 0.5, p);
  const nP = noise(d * nStep * 5, nX, nY) * 5 + frameCount * 0.05;

  const h = (noise(nP + 10, nX, nY) * 240 + baseHue) % 360;
  const s = map(noise(nP + 20, nX, nY), 0, 1, 60, 100);
  const b = map(noise(nP + 30, nX, nY), 0, 1, 80, 100);
  return color(h, s, b);
}

function minkowski(x1, y1, x2, y2, p = 2) {
  return pow(pow(abs(x1 - x2), p) + pow(abs(y1 - y2), p), 1 / p);
}

function keyPressed() {
  if (keyCode === ENTER) {
    noiseSeed(random(100000));
    randomSeed(random(100000));
    clear();
    redraw();
  }
}
