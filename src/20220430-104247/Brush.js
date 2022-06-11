class Brush {
  constructor(col, weight, opacity = 1, density = 0.2) {
    this._palette = this._createPalette(col);
    this._weight = weight;
    this._opacity = opacity;
    this._density = density;
  }

  set color(value) {
    this._palette = this._createPalette(value);
  }

  line(x1, y1, x2, y2) {
    const vec = createVector(x2 - x1, y2 - y1);
    const normalizedVec = p5.Vector.normalize(vec);
    this.magnitude = vec.mag();
    this.angle = vec.heading();
    this.noiseOffset = random(10000);

    const radius = this._weight / 2;
    const dotNum = floor(radius * radius * PI * this._density);
    let dots = this._createDots(dotNum);

    let c2 = createVector(x1, y1);
    let r2 = this._calcRadius(c2.x, c2.y);

    push();
    {
      while (dots.length > 0) {
        const length = random(0.1, 0.3) * this._weight;

        const c1 = c2.copy();
        const r1 = r2;
        c2 = p5.Vector.add(c1, p5.Vector.mult(normalizedVec, length));
        r2 = this._calcRadius(c2.x, c2.y);

        dots.forEach((dot) => {
          const v1 = p5.Vector.add(c1, p5.Vector.mult(dot.pos, r1));
          const v2 = p5.Vector.add(c2, p5.Vector.mult(dot.pos, r2));
          const col = this._calcDotColor(dot);
          const weight = this._calcDotWeight(dot);
          stroke(col);
          strokeWeight(weight);
          line(v1.x, v1.y, v2.x, v2.y);
          dot.consume(length);
        });

        dots = dots.filter((dot) => !dot.isDead);
      }
    }
    pop();
  }

  _createPalette(col) {
    let c1, c2;
    push();
    {
      colorMode(HSB, 360, 100, 100, 100);
      const tmp = color(col.toString());

      const h = hue(tmp);
      const s = saturation(tmp);
      const b = brightness(tmp);

      const dh = 15;
      const ds = 0.1;
      const db = 0.1;

      const h1 = (h + 360 - dh) % 360;
      const h2 = (h + dh) % 360;
      const s1 = constrain(s * (1 - ds), 0, 100);
      const s2 = constrain(s * (1 + ds), 0, 100);
      const b1 = constrain(b * (1 - db), 0, 100);
      const b2 = constrain(b * (1 + db), 0, 100);

      c1 = color(h1, s1, b1, 100);
      c2 = color(h2, s2, b2, 100);
    }
    pop();
    return [c1, c2];
  }

  _calcDotColor(dot) {
    const col = dot.color;
    const a = 255 * this._opacity;
    col.setAlpha(a);
    return col;
  }

  _calcDotWeight(dot) {
    const v = 0.95;
    return random() < v ? 1 : 0;
  }

  _calcRadius(x, y) {
    const amp = 0.25;
    const noiseStep = 0.01;
    const n = noise(this.noiseOffset, x * noiseStep, y * noiseStep);
    return (this._weight / 2) * (1 + map(n, 0, 1, -1, 1) * amp);
  }

  _createDots(num) {
    return [...Array(num)].map(() => {
      const { x, y } = randomInCircle();
      const pos = createVector(x * 0.5, y);
      pos.rotate(this.angle);
      const col = this._createDotColor(pos.x, pos.y);
      const maxLife = this._createDotMaxLife();
      return new Dot(pos, col, maxLife);
    });
  }

  _createDotColor(x, y) {
    const noiseStep = 0.75;
    const amount = map(
      noise(this.noiseOffset, x * noiseStep, y * noiseStep),
      0.2,
      0.8,
      0,
      1
    );
    return lerpColors(this._palette, amount);
  }

  _createDotMaxLife() {
    return this.magnitude;
  }
}

class Dot {
  constructor(pos, col, maxLife) {
    this._pos = pos;
    this._color = col;
    this._maxLife = maxLife;
    this._life = maxLife;
  }

  get pos() {
    return this._pos.copy();
  }

  get color() {
    return color(this._color.toString());
  }

  get lifePercent() {
    return this._life / this._maxLife;
  }

  get isDead() {
    return this._life <= 0;
  }

  consume(length) {
    this._life -= length;
  }
}
