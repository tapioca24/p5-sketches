---
to: src/<%= name %>/sketch.js
---
/// <reference path="../../node_modules/@types/p5/global.d.ts" />

function setup() {
  createCanvas(800, 800);
  background(30);
}

function draw() {
  ellipse(mouseX, mouseY, 80, 80);
}

function keyReleased() {
  if (key === "s") {
    save("sketch");
  }
}
