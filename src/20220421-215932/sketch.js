/// <reference types="p5/global" />

const URLS = [
  "https://coolors.co/93b5c6-ddedaa-f0cf65-d7816a-bd4f6c",
  "https://coolors.co/ffac81-ff928b-fec3a6-efe9ae-cdeac0",
  "https://coolors.co/809bce-95b8d1-b8e0d2-d6eadf-eac4d5",
  "https://coolors.co/e27396-ea9ab2-efcfe3-eaf2d7-b3dee2",
  "https://coolors.co/bcf4de-cde5d7-ded6d1-eec6ca-ffb7c3",
  "https://coolors.co/f7edf0-f4cbc6-f4afab-f4eea9-f4f482",
  "https://coolors.co/a7bed3-c6e2e9-f1ffc4-ffcaaf-dab894",
  "https://coolors.co/d0e3cc-f7ffdd-fcfdaf-efd780-dba159",
  "https://coolors.co/ffc1cf-e8ffb7-e2a0ff-c4f5fc-b7ffd8",
  "https://coolors.co/eaf2e3-61e8e1-f25757-f2e863-f2cd60",
  "https://coolors.co/b6e2dd-c8ddbb-e9e5af-fbdf9d-fbc99d-fbb39d-fba09d",
  "https://coolors.co/ffc09f-ffee93-fcf5c7-a0ced9",
];

let gr, palette;

function setup() {
  createCanvas(720, 720);
  noLoop();
  initialize();

  const grSize = min(width, height) * 0.85;
  gr = createGraphics(grSize, grSize);
  gr.background("#4a5568");
  drawPaperNoise(gr, 0.2);
}

function initialize() {
  const url = random(URLS);
  palette = createPalette(url);
  palette = shuffle(palette);
}

function draw() {
  background("#edf2f7");

  push();
  {
    translate(width / 2, height / 2);
    imageMode(CENTER);
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(0, 150);
    image(gr, 0, 0);
  }
  pop();

  const strokeNum = 15;
  const rectSize = gr.width * 0.85;
  const r = rectSize / 4;

  for (let i = 0; i < 4; i++) {
    const brush = new Brush(palette[i], 20);
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
