import fs from "fs";
const { resolve, join } = require("path");
const { defineConfig } = require("vite");

const readdirRecursively = async (dir) => {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });
  const result = [];
  for (const file of files) {
    const path = join(dir, file.name);
    if (file.isDirectory()) {
      result.push(...(await readdirRecursively(path)));
    } else {
      result.push(path);
    }
  }
  return result;
};

const sketchInputs = async () => {
  const files = await readdirRecursively("sketches");
  const sketches = files
    .filter((path) => path.endsWith("index.html"))
    .map((path) => ({
      path,
      parent: path.split("/").slice(0, -1).join("/"),
    }));

  const inputs = {};
  sketches.forEach(({ path, parent }) => {
    inputs[parent] = resolve(__dirname, path);
  });
  return inputs;
};

module.exports = defineConfig(async () => {
  return {
    build: {
      rollupOptions: {
        input: {
          ...(await sketchInputs()),
        },
      },
    },
  };
});
