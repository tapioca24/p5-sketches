---
to: src/<%= name %>/sketch.js
---
/// <reference types="p5/global" />

function setup() {
  createCanvas(720, 720);
  frameRate(30);
  background(30);
}

function draw() {
  ellipse(mouseX, mouseY, 80, 80);
}
