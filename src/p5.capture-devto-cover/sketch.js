/// <reference types="p5/global" />

const BG_COLOR = "#000";
const MAIN_FONT_COLOR = "#fff";
const SUB_FONT_COLOR = "#ccc";

const TITLE = "I wrote a new library\nfor recording p5.js sketches";
const DESCRIPTION = "";

const BG_IMAGE_PATH =
  "https://images.unsplash.com/photo-1558470598-a5dda9640f68";
const ICON_IMAGE_PATH = "/assets/icon.png";
const SERVICE_IMAGE_PATH =
  "https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png";

let myFont, bgImg, iconImg, serviceImg;

function preload() {
  myFont = loadFont("/assets/Oswald-Regular.ttf");
  bgImg = loadImage(BG_IMAGE_PATH);
  iconImg = loadImage(ICON_IMAGE_PATH);
  serviceImg = loadImage(SERVICE_IMAGE_PATH);
}

function setup() {
  pixelDensity(2);
  createCanvas(1000, 420);
  noLoop();
}

function draw() {
  background(BG_COLOR);
  drawBackgroundImage(bgImg, 0.7);
  drawServiceIcon(serviceImg, 25, 60);
  drawUser(iconImg, "@tapioca24", 25, 60);
  drawTitle(TITLE, 70, 120);
  drawDescription(DESCRIPTION, 70, 240);
}

function keyReleased() {
  if (key === "s") {
    saveCanvas("sketch");
  }
}

function drawBackgroundImage(img, opacity = 1) {
  const ratio = max(width / img.width, height / img.height);
  push();
  const w = img.width * ratio;
  const h = img.height * ratio;
  translate((width - w) / 2, (height - h) / 2);
  scale(ratio);
  tint(255, 255 * opacity);
  image(img, 0, 0);
  pop();
}

function drawImage(img, x, y, scaleFactor) {
  push();
  translate(x, y);
  scale(scaleFactor);
  imageMode(CENTER);
  image(img, 0, 0);
  pop();
}

function drawServiceIcon(img, offset, size) {
  const ratio = min(size / img.width, size / img.height);
  push();
  translate(width - (size + offset), height - (size + offset));
  scale(ratio);
  image(img, 0, 0);
  pop();
}

function drawUser(img, username, offset, size) {
  const ratio = min(size / img.width, size / img.height);

  const g = createGraphics(img.width, img.height);
  g.background(0, 0);
  g.circle(g.width / 2, g.height / 2, min(g.width, g.height));
  img.mask(g);

  push();
  translate(offset, height - (size + offset));

  push();
  scale(ratio);
  image(img, 0, 0);
  pop();

  push();
  const fontSize = size * 0.4;
  translate(size * 1.2, size * 0.5 - fontSize * 0.2);
  textFont(myFont);
  fill(SUB_FONT_COLOR);
  textSize(fontSize);
  textAlign(LEFT, CENTER);
  text(username, 0, 0);
  pop();

  pop();
}

function drawTitle(title, x, y) {
  push();
  translate(x, y);
  textFont(myFont);
  fill(MAIN_FONT_COLOR);
  textSize(52);
  text(title, 0, 0);
  pop();
}

function drawDescription(message, x, y) {
  push();
  translate(x, y);
  textFont(myFont);
  fill(SUB_FONT_COLOR);
  textSize(24);
  text(message, 0, 0);
  pop();
}
