/// <reference types="p5/global" />

const URLS = ["https://coolors.co/palette/f83c81-f6e934-42b3f0"];

let gr, palette;

function setup() {
  createCanvas(720, 720);
  initialize();

  const grSize = min(width, height) * 0.85;
  gr = createGraphics(grSize, grSize);
  gr.background("#fefcec");
  drawPaperNoise(gr);

  background("#edf2f7");

  push();
  {
    translate(width / 2, height / 2);
    imageMode(CENTER);
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(0, 50);
    image(gr, 0, 0);
  }
  pop();
}

function initialize() {
  const url = random(URLS);
  palette = createPalette(url);
  palette = shuffle(palette);
}

function draw() {
  const rectSize = gr.width * 0.8;
  const length = 30;

  for (let i = 0; i < 10; i++) {
    const x = random(rectSize) - rectSize / 2;
    const y = random(rectSize) - rectSize / 2;
    const v = createVector(x, y);
    const c = getColor(v.x + width, v.y + height);
    const brush = new Brush(c, 20, 0.5);
    push();
    {
      translate(width / 2, height / 2);
      rotate(randomGaussian(0, TWO_PI * 0.01));
      brush.line(v.x - length / 2, v.y, v.x + length / 2, v.y);
    }
    pop();
  }
}

function getColor(x, y) {
  const nStep = 0.001;
  const nX = x * nStep;
  const nY = y * nStep;
  const nP = noise(20, nX, nY) * 5;
  const amount = constrain(map(noise(nP, nX, nY), 0.2, 0.8, 0, 1), 0, 1);
  return lerpColors(palette, amount);
}

function keyPressed() {
  if (keyCode === ENTER) {
    initialize();
    clear();
    redraw();
  }
}
