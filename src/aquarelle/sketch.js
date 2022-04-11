/// <reference types="p5/global" />

let g;

function setup() {
  createCanvas(720, 720);
  frameRate(30);
  noLoop();
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background("#efe");

  const n = 2;
  for (let i = 0; i < n; i++) {
    const angle = map(i, 0, n, 0, TWO_PI);
    const r = min(width, height) * 0.075;
    const x = cos(angle) * r;
    const y = sin(angle) * r;
    const h = random(360);

    g = createGraphics(width, height);
    drawAquarelle(g);

    push();
    {
      imageMode(CENTER);
      translate(width / 2 + x, height / 2 + y);
      tint(h, 100, 100, 40);
      image(g, x, y);
    }
    pop();
  }
}

function drawAquarelle(g) {
  const getColor = (generation) => {
    const minAlpha = 5;
    const a = constrain(map(generation, 0, 20, 100, minAlpha), minAlpha, 100);
    return color(0, 0, 100, a);
  };

  const getStrokeWeight = (generation) => {
    return constrain(0.675 ** generation, 0, 1);
  };

  const expandVec = (g, v1, v2, threshold, generation) => {
    const delta = p5.Vector.sub(v2, v1);

    const len = delta.mag();
    if (len < threshold) {
      return;
    }

    const props = {
      pos: randomGaussian(0.5, 0.3),
      exp: randomGaussian(0.3, 0.1),
    };

    const expansion = p5.Vector.rotate(delta, -HALF_PI);
    const a = p5.Vector.mult(delta, props.pos);
    const b = p5.Vector.mult(expansion, props.exp);

    const origin = createVector(0, 0);
    const v3 = p5.Vector.add(origin, v1).add(a).add(b);

    g.push();
    {
      const c = getColor(generation);
      const w = getStrokeWeight(generation);
      g.fill(c);
      g.stroke(c);
      g.strokeWeight(w);

      g.beginShape();
      g.vertex(v1.x, v1.y);
      g.vertex(v3.x, v3.y);
      g.vertex(v2.x, v2.y);
      g.endShape(CLOSE);
    }
    g.pop();

    expandVec(g, v1, v3, threshold, generation + 1);
    expandVec(g, v3, v2, threshold, generation + 1);
  };

  const edgeLength = min(width, height);

  const props = {
    vertexNum: 3,
    threshold: edgeLength * 0.01,
  };

  const radius = edgeLength * 0.15;

  let vecs = [];
  for (let i = 0; i < props.vertexNum; i++) {
    const angle = map(i, 0, props.vertexNum, 0, TWO_PI);
    const r = radius * randomGaussian(1, 0.1);
    const x = cos(angle) * r;
    const y = sin(angle) * r;
    vecs.push(createVector(x, y));
  }

  g.push();
  {
    g.colorMode(HSB, 360, 100, 100, 100);
    g.translate(width / 2, height / 2);
    g.rotate(random(TWO_PI));

    const c = getColor(0);
    const w = getStrokeWeight(0);
    g.fill(c);
    g.stroke(c);
    g.strokeWeight(w);

    g.beginShape();
    vecs.forEach((v) => g.vertex(v.x, v.y));
    g.endShape(CLOSE);

    expandVec(g, vecs[0], vecs[1], props.threshold, 0);
    expandVec(g, vecs[1], vecs[2], props.threshold, 0);
    expandVec(g, vecs[2], vecs[0], props.threshold, 0);
  }
  g.pop();
}

function keyPressed() {
  if (keyCode === ENTER) {
    clear();
    redraw();
  }
}
