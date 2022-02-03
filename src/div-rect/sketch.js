/// <reference path="../..//node_modules/@types/p5/global.d.ts" />

const COOLORS_URLS = [
  "https://coolors.co/f4f1de-e07a5f-3d405b-81b29a-f2cc8f",
  "https://coolors.co/fdfcdc-fed9b7-f07167-d62246-4b1d3f",
  "https://coolors.co/faf0ca-f4d35e-ee964b-f95738-080707",
  "https://coolors.co/003049-8f2d56-f77f00-fcbf49-eae2b7",
  "https://coolors.co/ffffff-f79b50-934599-4f2852-0a0a0a",
  "https://coolors.co/0f0d18-101938-3e4b61-9b191c-ebdca5",
];

let g, colors, targetRatio, sizeLimit;

function setup() {
  createCanvas(800, 800);
  frameRate(1 / 2);

  // create noise graphics
  g = createGraphics(width, height);
  for (let i = 0; i < g.width * g.height * 0.1; i++) {
    const x = random(g.width);
    const y = random(g.height);
    g.stroke(255, 30);
    g.point(x, y);
  }
}

function draw() {
  // randomize variables
  while (true) {
    targetRatio = random(1, 5) / random(1, 5);
    if (targetRatio < 100 / 105 || 105 / 100 < targetRatio) break;
  }
  sizeLimit = random(15, 40);
  colors = createColors(random(COOLORS_URLS));

  // render
  background(0);
  divRect({ x: 0, y: 0, w: width, h: height });
  image(g, 0, 0);
}

function mouseClicked() {
  redraw();
}

function keyReleased() {
  if (key === "s") {
    save("sketch");
  }
}

function drawRect(x, y, w, h) {
  push();
  noStroke();
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(0, 80);
  fill(random(colors));
  rect(x, y, w, h);
  pop();
}

function divRect({ x, y, w, h }) {
  const isSquare = w === h;
  const ratio = isSquare ? targetRatio : 1;
  const dir = h / w < ratio ? "x" : "y";
  const short = min(w, h);
  const long = max(w, h);

  if (long < sizeLimit || short < 1) return;

  drawRect(x, y, w, h);

  const { dividedRects, restRect } = getDivRects(
    { x, y, w, h },
    short,
    ratio,
    dir
  );
  dividedRects.forEach((dividedRect) => divRect(dividedRect));
  divRect(restRect);
}

function getDivRects({ x, y, w, h }, short, ratio, dir) {
  if (dir === "x") {
    const inner = { x, y, w: short / ratio, h: short };
    const num = floor(w / inner.w);
    const rest = w % inner.w;
    const dividedRects = [...Array(num)].map((_, i) => ({
      x: x + i * inner.w,
      y,
      w: inner.w,
      h: inner.h,
    }));
    const restRect = { x: x + num * inner.w, y, w: rest, h: short };
    return { dividedRects, restRect };
  }
  const inner = { x, y, w: short, h: short * ratio };
  const num = floor(h / inner.h);
  const rest = h % inner.h;
  const dividedRects = [...Array(num)].map((_, i) => ({
    x,
    y: y + i * inner.h,
    w: inner.w,
    h: inner.h,
  }));
  const restRect = { x, y: y + num * inner.h, w: short, h: rest };
  return { dividedRects, restRect };
}

function createColors(url) {
  const i = url.lastIndexOf("/");
  return url
    .slice(i + 1)
    .split("-")
    .map((c) => `#${c}`);
}
