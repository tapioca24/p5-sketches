/// <reference types="p5/global" />

class Hair {
  constructor(pos, col) {
    this.pos = pos;
    this.color = col;
    const minLife = random(100, 200);
    const maxLife = minLife + random(200, 300);
    this.maxLife = random(minLife, maxLife);
    this.life = this.maxLife;
  }

  get lifeRatio() {
    return this.life / this.maxLife;
  }

  get alpha() {
    const v = easings.easeInOutQuad(this.lifeRatio);
    return map(v, 0, 1, 0, 255);
  }

  get strokeWeight() {
    const v = easings.easeOutQuart(this.lifeRatio);
    if (random() < v) {
      return 1;
    } else {
      return 0;
    }
  }

  update(length) {
    if (this.life > 0) {
      this.life -= length;
    }
  }
}

class Brush {
  constructor(x, y, palette, weight, density = 0.2) {
    this.center = createVector(x, y);
    this.nOffset = random(1000);
    this.palette = palette;

    const radius = weight / 2;
    const hairNum = floor(radius * radius * PI * density);
    this.hairs = [];
    for (let i = 0; i < hairNum; i++) {
      const { x, y } = this.randomInCircle();
      const pos = createVector(x, y * 0.5);
      const c = this.getColor(x, y);
      this.hairs.push(new Hair(pos, c));
    }
    this.baseRadius = radius;
    this.radius = this.getRadius(x, y);
  }

  getColor(x, y) {
    const nStep = 0.75;
    const amount = map(
      noise(this.nOffset, x * nStep, y * nStep),
      0.2,
      0.8,
      0,
      1
    );
    return lerpColor(this.palette[0], this.palette[1], amount);
  }

  update(x, y) {
    this.prevCenter = this.center.copy();
    this.prevRadius = this.radius;

    this.center = createVector(x, y);
    this.radius = this.getRadius(x, y);

    const length = dist(this.prevCenter.x, this.prevCenter.y, x, y);
    this.hairs.forEach((hair) => {
      const prevDiff = p5.Vector.mult(hair.pos, this.prevRadius);
      const diff = p5.Vector.mult(hair.pos, this.radius);

      const prevPos = p5.Vector.add(this.prevCenter, prevDiff);
      const pos = p5.Vector.add(this.center, diff);

      push();
      {
        const col = color(hair.color.levels);
        col.setAlpha(hair.alpha);
        strokeWeight(hair.strokeWeight);
        stroke(col);
        line(prevPos.x, prevPos.y, pos.x, pos.y);
      }
      pop();
      hair.update(length);
    });
  }

  getRadius(x, y) {
    const xStep = 1;
    const yStep = 0.01;
    const n = noise(x * xStep, y * yStep);
    const amp = 0.5;
    return this.baseRadius * (1 + map(n, 0, 1, -1, 1) * amp);
  }

  randomInCircle() {
    const theta = random(TWO_PI);
    const r = sqrt(random());
    const x = r * cos(theta);
    const y = r * sin(theta);
    return { x, y };
  }
}

function setup() {
  createCanvas(720, 720);
  frameRate(30);
  noLoop();
}

function draw() {
  background(255);

  const rectSize = min(width, height) * 0.9;
  push();
  {
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = color(0, 80);
    rectMode(CENTER);
    translate(width / 2, height / 2);
    noStroke();
    fill("#fefae0");
    rect(0, 0, rectSize, rectSize);
  }
  pop();

  const strokeNum = 32;
  const strokeRectSize = rectSize * 0.85;

  push();
  {
    translate((width + strokeRectSize) * 0.5, (height + strokeRectSize) * 0.5);
    rotate(PI);
    for (let i = 0; i < strokeNum; i++) {
      const x = (i / (strokeNum - 1)) * strokeRectSize;
      const col = color("#126782");
      col.setAlpha(100);
      const weight = 20;
      const brush = new Brush(
        x,
        0,
        [color("#073b4c"), color("#006d77")],
        weight,
        0.5
      );
      for (let y = 0; y < strokeRectSize; y += random(0.1, 0.3) * weight) {
        if (y !== 0) {
          brush.update(x, y);
        }
      }
    }
  }
  pop();

  push();
  {
    translate((width - strokeRectSize) * 0.5, (height - strokeRectSize) * 0.5);
    for (let i = 0; i < strokeNum; i++) {
      const x = (i / (strokeNum - 1)) * strokeRectSize;
      const weight = 20;
      const brush = new Brush(
        x,
        0,
        [color("#d62828"), color("#fca311")],
        weight,
        0.5
      );
      for (let y = 0; y < strokeRectSize; y += random(0.1, 0.3) * weight) {
        if (y !== 0) {
          brush.update(x, y);
        }
      }
    }
  }
  pop();
}
