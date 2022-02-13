---
to: src/<%= name %>/sketch.js
---
/// <reference path="../../node_modules/@types/p5/global.d.ts" />

const browser = bowser.getParser(window.navigator.userAgent).parsedResult;
const isMobile = browser.platform.type === "mobile";
const isTablet = browser.platform.type === "tablet";

function setup() {
  const canvasWidth = isMobile || isTablet ? windowWidth : 800;
  const canvasHeight = isMobile || isTablet ? windowHeight : 800;
  createCanvas(canvasWidth, canvasHeight);
  background(30);
}

function draw() {
  ellipse(mouseX, mouseY, 80, 80);
}

function keyReleased() {
  if (key === "s") {
    saveCanvas("sketch");
  }
}
