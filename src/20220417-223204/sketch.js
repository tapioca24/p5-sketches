/// <reference types="p5/global" />

const URLS = [
  "https://coolors.co/d62828-fca311",
  "https://coolors.co/073b4c-006d77",
];

let gr, palettes;

function setup() {
  createCanvas(720, 720);
  noLoop();
  initialize();

  const grSize = min(width, height) * 0.85;
  gr = createGraphics(grSize, grSize);
  gr.background("#fefcec");
  drawPaperNoise(gr);
}

function initialize() {
  palettes = shuffle(URLS).map((url) => createPalette(url));
}

function draw() {
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

  const strokeNum = 30;
  const rectSize = gr.width * 0.85;

  for (let i = 0; i < 2; i++) {
    const palette = palettes[i];
    const brush = new Brush(palette, 20);
    push();
    {
      translate(width / 2, height / 2);
      rotate(i * PI);
      translate(-rectSize / 2, -rectSize / 2);
      for (let j = 0; j < strokeNum; j++) {
        const p = j / (strokeNum - 1);
        const x1 = p * rectSize;
        const y1 = 0;
        const x2 = x1;
        const y2 = map(noise(p * 2), 0, 1, 0, rectSize);
        brush.line(x1, y1, x2, y2);
      }
    }
    pop();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    initialize();
    noiseSeed(random(1000));
    clear();
    redraw();
  }
}
