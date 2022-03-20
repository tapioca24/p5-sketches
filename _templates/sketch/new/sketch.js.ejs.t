---
to: src/<%= name %>/sketch.js
---
/// <reference types="p5/global" />

const browser = bowser.getParser(window.navigator.userAgent).parsedResult;
const isMobile = browser.platform.type === "mobile";
const isTablet = browser.platform.type === "tablet";

function setup() {
  const canvasWidth = isMobile || isTablet ? windowWidth : 720;
  const canvasHeight = isMobile || isTablet ? windowHeight : 720;
  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);
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
