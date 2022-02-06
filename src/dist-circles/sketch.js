/// <reference path="../../node_modules/@types/p5/global.d.ts" />

// Sutra copying from https://twitter.com/ryotakob/status/1489802209684459522

function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(1, 90, 170);
  noStroke();

  for (let i = 0; i < 5000; i++) {
    const x = random(width);
    const y = random(height);
    const r = getRadius(x, y);
    fill(255, 8 * exp(-r / 70));
    circle(x, y, 2 * r);
  }
}

function keyReleased() {
  if (key === "s") {
    save("sketch");
  }
}

function mouseClicked() {
  redraw();
}

function getRadius(x, y) {
  const size = max(width, height);
  let r = size / 2 - max(abs(x - width / 2), abs(y - height / 2));
  for (let j = 0; j < 12; j++) {
    const angle = (j / 12) * TAU;
    const radius = min(width, height) * 0.35;
    const p = createVector(width / 2, height / 2).add(
      radius * cos(angle),
      radius * sin(-angle)
    );
    const distance = dist(x, y, p.x, p.y);
    r = min(r, distance - j * 5 - 2);
  }
  return r;
}
