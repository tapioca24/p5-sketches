/// <reference types="p5/global" />

const points = [];
const resolution = 12;
let img;

function preload() {
  img = loadImage("./zebra.jpg");
}

function setup() {
  createCanvas(720, 720);
  background(30);
  noLoop();

  const numX = floor((width + resolution * 2) / resolution);
  const numY = floor((height + resolution * 2) / resolution);
  for (let j = 0; j < numY; j++) {
    for (let i = 0; i < numX; i++) {
      const x = i * resolution - (numX * resolution) / 2 + width / 2;
      const y = j * resolution - (numY * resolution) / 2 + height / 2;
      points.push({ x, y });
    }
  }

  img.loadPixels();
}

function draw() {
  noStroke();
  points.forEach(({ x, y }) => {
    drawDots(x, y, resolution);
  });
}

function drawDots(x, y, size) {
  const gap = size * 0.1;
  const dotWidth = (size - gap * 3) / 3;
  const dotHeight = size - gap;

  const ratioX = x / width;
  const ratioY = y / height;
  const c = getPixel(ratioX, ratioY);
  const colors = [
    color(red(c), 0, 0),
    color(0, green(c), 0),
    color(0, 0, blue(c)),
  ];

  push();
  translate(x, y);
  for (let i = 0; i < 3; i++) {
    const dotX = gap / 2 + i * (dotWidth + gap) - size / 2;
    const dotY = gap / 2 - size / 2;
    fill(colors[i]);
    rect(dotX, dotY, dotWidth, dotHeight);
  }
  pop();
}

function getPixel(ratioX, ratioY) {
  if (ratioX < 0 || ratioX > 1 || ratioY < 0 || ratioY > 1) {
    return color(0);
  }
  const x = floor((img.width - 1) * ratioX);
  const y = floor((img.height - 1) * ratioY);
  const index = (x + y * img.width) * 4;
  const r = img.pixels[index];
  const g = img.pixels[index + 1];
  const b = img.pixels[index + 2];
  return color(r, g, b);
}
