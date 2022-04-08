/// <reference types="p5/global" />
// refer to https://timrodenbroeker.de/processing-tutorial-kinetic-typography-1/

const fps = 30;
const bg = "#223843";
const fontColor = "#ffd500";
let pg, myFont;

function preload() {
  myFont = loadFont("/assets/Oswald-Regular.ttf");
}

function setup() {
  createCanvas(1000, 300);
  frameRate(fps);

  pg = createGraphics(width, height);
  pg.background(bg);
  pg.fill(fontColor);
  pg.textFont(myFont);
  pg.textSize(128);
  pg.push();
  pg.translate(width / 2, height / 2 - pg.textSize() * 0.3);
  pg.textAlign(CENTER, CENTER);
  pg.text("p5.capture", 0, 0);
  pg.pop();
}

function draw() {
  background(bg);

  const m = 0.04;
  const tilesX = width * m;
  const tilesY = height * m;
  const tileW = width / tilesX;
  const tileH = height / tilesY;
  const pd = pg.pixelDensity();

  const t = fps * 2;
  const ratio = (frameCount % t) / t;
  const amp = pg.textSize() * 0.05;
  const angle = TWO_PI * ratio;

  for (let j = 0; j < tilesY; j++) {
    for (let i = 0; i < tilesX; i++) {
      const phase = TWO_PI * ((i * j) / (tilesX * tilesY)) * 10;
      const wave = amp * sin(angle + phase);

      // source
      const sx = i * tileW + wave;
      const sy = j * tileH;
      const sw = tileW;
      const sh = tileH;

      // destination
      const dx = i * tileW;
      const dy = j * tileH;
      const dw = tileW;
      const dh = tileH;

      drawingContext.drawImage(
        pg.canvas,
        pd * sx,
        pd * sy,
        pd * sw,
        pd * sh,
        dx,
        dy,
        dw,
        dh
      );
    }
  }
}
