/// <reference path="../../node_modules/@types/p5/global.d.ts" />

const fps = 30;
const duration = fps * 5;
const capture = new CCapture({ format: "webm", framerate: fps, verbose: true });

function setup() {
  createCanvas(400, 400, WEBGL);
  frameRate(fps);
}

function draw() {
  if (frameCount === 1) {
    capture.start();
  }

  background(0);
  normalMaterial();
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.03);
  torus(width * 0.2, width * 0.1, 64, 64);

  if (frameCount < duration) {
    capture.capture(canvas);
  }
  if (frameCount === duration) {
    capture.stop();
    capture.save();
  }
}
