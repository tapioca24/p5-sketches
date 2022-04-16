/// <reference types="p5/global" />

let palette;

function setup() {
  createCanvas(720, 720);
  frameRate(30);
  noLoop();
  colorMode(HSB, 360, 100, 100, 100);
  blendMode(EXCLUSION);
}

function draw() {
  palette = getPalette(10);
  background(255);

  for (let i = 0; i < 10000; i++) {
    const x = random(width);
    const y = random(height);
    const w = random(0.03, 0.08) * width;
    const h = random(0.3, 0.5) * height;
    const c = color(getColor(x, y));
    const a = random(3);
    const b = random([BLEND, HARD_LIGHT]);
    c.setAlpha(a);
    push();
    {
      blendMode(b);
      rectMode(CENTER);
      noStroke();
      fill(c);
      rect(x, y, w, h);
    }
    pop();
  }
}

function getColor(x, y) {
  const i = constrain(floor(x / (width / 5)), 0, 4);
  const j = constrain(floor(y / (height / 2)), 0, 1);

  return palette[5 * j + i];
}

function getPalette(n) {
  return [...Array(n)].map(() => {
    const h = random(40);
    const s = 100;
    const b = 100;
    const a = 100;
    return color(h, s, b, a);
  });
}

function keyPressed() {
  if (keyCode === ENTER) {
    clear();
    redraw();
  }
}
