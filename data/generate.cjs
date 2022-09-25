const { writeFile, mkdir } = require("fs/promises");
const { dirname } = require("path");

const theme = {
  colors: require("./colors.json"),
  extend: {
    fontFamily: [
      "Inter var",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      '"Noto Sans"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ],
  },
};

async function ensureDir(file) {
  await mkdir(dirname(file), { recursive: true });
}

async function write(file, content) {
  await ensureDir(file);
  await writeFile(file, content);
}

async function run() {
  await write("./index.mjs", `export default ${JSON.stringify(theme)};`);
  await write("./mod.ts", `export default ${JSON.stringify(theme)} as const;`);
  await write("./index.cjs", `module.exports = ${JSON.stringify(theme)};`);
}

run().catch(console.error);
