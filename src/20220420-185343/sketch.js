/// <reference types="p5/global" />

const URLS = [
  "https://coolors.co/E53E3E-9B2C2C",
  "https://coolors.co/DD6B20-9C4221",
  "https://coolors.co/D69E2E-975A16",
  "https://coolors.co/38A169-276749",
  "https://coolors.co/319795-285E61",
  "https://coolors.co/3182CE-2C5282",
  "https://coolors.co/00B5D8-0987A0",
  "https://coolors.co/805AD5-553C9A",
  "https://coolors.co/D53F8C-97266D",
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

  const strokeNum = 15;
  const rectSize = gr.width * 0.85;
  const r = rectSize / 4;

  for (let i = 0; i < 4; i++) {
    const palette = palettes[i];
    const brush = new Brush(palette, 20);
    push();
    {
      translate(width / 2, height / 2);
      rotate(i * HALF_PI + PI / 4);
      translate(-rectSize / 4, -rectSize / 2);
      for (let j = 0; j < strokeNum; j++) {
        const p = j / (strokeNum - 1);
        const x1 = p * rectSize * 0.5;
        const y1 = 0;
        const x2 = x1;
        const y2 = 2.3 * r - sqrt(pow(r, 2) - pow(x1 - r, 2));
        brush.line(x1, y1, x2, y2);
      }
    }
    pop();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    initialize();
    clear();
    redraw();
  }
}
