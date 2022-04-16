/// <reference types="p5/global" />
// refer to https://jp.deconbatch.com/2021/07/perlin-noise.html

const COOLORS_URLS = [
  "https://coolors.co/353535-284b63-ffffff-d9d9d9",
  "https://coolors.co/1e212b-4d8b31-ffc800-ff8427",
  "https://coolors.co/003049-d62828-fcbf49-eae2b7",
];

let palette;
const fps = 30;
const interval = 4; // in seconds

function setup() {
  createCanvas(720, 720);
  frameRate(fps);
  palette = createColors(random(COOLORS_URLS));
}

function draw() {
  const cellSize = 12;
  background(30);
  noStroke();

  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      const c = getColor(x, y);
      fill(c);
      rect(x, y, cellSize, cellSize);
    }
  }
}

function getColor(x, y) {
  const nStep = 0.005;
  const nX = x * nStep;
  const nY = y * nStep;
  const intervalFrames = fps * interval;

  let distance;
  const pattern = floor((frameCount % (intervalFrames * 3)) / intervalFrames);
  switch (pattern) {
    case 0:
      distance = abs(x - width * 0.5) + abs(y - height * 0.5);
      break;
    case 1:
      distance = abs(x - width * 0.5) - abs(y - height * 0.5);
      break;
    default:
      const p = 4;
      distance = pow(
        pow(abs(x - width * 0.5), p) + pow(abs(y - height * 0.5), p),
        1 / p
      );
  }

  let ratio = cos(PI + (TWO_PI / intervalFrames) * frameCount);
  ratio = map(ratio, -1, 1, 0, 1);
  let nP = noise(20 + distance * nStep * 5 * ratio, nX, nY) * 5;
  nP += frameCount * nStep * 10;

  let amount = map(noise(nP, nX, nY), 0.2, 0.8, 0, 1);
  amount = constrain(amount, 0, 0.999999);

  const len = palette.length;
  const index = floor(amount * (len - 1));
  const j = map(amount % (1 / (len - 1)), 0, 1 / (len - 1), 0, 1);

  const c1 = palette[index];
  const c2 = palette[index + 1];
  return lerpColor(c1, c2, j);
}

function keyPressed() {
  if (keyCode === ENTER) {
    palette = createColors(random(COOLORS_URLS));
    clear();
    redraw();
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
