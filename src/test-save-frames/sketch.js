/// <reference path="../../node_modules/@types/p5/global.d.ts" />

const fps = 30;
const duration = 5;

function setup() {
  createCanvas(400, 400, WEBGL);
  frameRate(fps);
}

function draw() {
  background(0);
  normalMaterial();
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.03);
  torus(width * 0.2, width * 0.1, 64, 64);

  if (frameCount === 1) {
    // chrome では同時ダウンロード数制限により10ファイルしか保存されない
    // firefox では同時ダウンロード数制限により101ファイルしか保存されない
    saveFrames("sketch", "png", duration, fps);
  }
}
