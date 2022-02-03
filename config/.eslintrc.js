module.exports = {
  env: {
    browser: true,
    es2017: true,
  },
  extends: [
    "eslint:recommended",
    "@fal-works/p5js",
    "@fal-works/p5js/sound",
    "prettier",
  ],
  rules: {
    "no-constant-condition": ["error", { checkLoops: false }],
  },
};
