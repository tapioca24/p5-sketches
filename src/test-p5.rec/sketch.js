/// <reference types="p5/global" />

function setup() {
  createCanvas(400, 400, WEBGL);
  frameRate(30);
}

function draw() {
  background(0);
  normalMaterial();
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.03);
  torus(width * 0.2, width * 0.1, 64, 64);
}

function keyReleased() {
  if (key === "w") {
    startRecording();
  } else if (key === "q") {
    // Uncaught ReferenceError: SharedArrayBuffer is not defined
    stopRecording();
  }
}
