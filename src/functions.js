/// <reference types="p5/global" />

/**
 * https://coolors.co の URL をパースして p5.Color の配列を返す
 * @param {String} url URL
 * @returns p5.Color[]
 */
function createPalette(url) {
  const i = url.lastIndexOf("/");
  return url
    .slice(i + 1)
    .split("-")
    .map((c) => `#${c}`)
    .map((c) => color(c));
}

/**
 * 複数のカラーパレットから連続的に変化する p5.Color を返す
 * @param {p5.Color[]} palette カラーパレット
 * @param {Number} amount 0 ~ 1 の範囲で指定
 * @return p5.Color
 */
function lerpColors(palette, amount) {
  if (palette.length < 2) {
    throw new Error("palette must have at least 2 colors");
  }

  if (amount <= 0) {
    const c = palette[0];
    return color(c.toString());
  }

  if (amount >= 1) {
    const c = palette[palette.length - 1];
    return color(c.toString());
  }

  const len = palette.length;
  const index = floor(amount * (len - 1));
  const range = 1 / (len - 1);
  const p = map(amount % range, 0, range, 0, 1);
  return lerpColor(palette[index], palette[index + 1], p);
}

/**
 * グラフィックスにペーパーライクなノイズを描画する
 * @param {p5.Graphics} graphics 対象の p5.Graphics
 * @param {Number} opacity 透明度 (0 ~ 1 の範囲で指定)
 * @param {Number} density 密度
 */
function drawPaperNoise(graphics, opacity = 0.1, density = 0.1) {
  const w = graphics.width;
  const h = graphics.height;
  graphics.push();
  {
    for (let i = 0; i < w * h * density; i++) {
      graphics.colorMode(RGB, 255, 255, 255, 1);
      graphics.noStroke();
      graphics.fill(random(255), opacity);
      graphics.circle(random(w), random(h), random(2));
    }
  }
  graphics.pop();
}

/**
 * 円内にランダムな点を生成して返す
 * @returns {Object} 生成した点の座標
 */
function randomInCircle() {
  const theta = random(TWO_PI);
  const r = sqrt(random());
  const x = r * cos(theta);
  const y = r * sin(theta);
  return { x, y };
}
