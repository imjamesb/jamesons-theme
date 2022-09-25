// Imports
const fs = require("fs/promises");
const path = require("path");
const colors = require("./colors.json");

const colorKeys = Object.keys(colors);

function colorFileCjs(color) {
  if (typeof color === "string") {
    return `/** @type {string} */ module.exports = ${JSON.stringify(color)};`;
  }
  let file = `
/** @type {Record<${
    Object.keys(color).map((color) => `"${color}"`).join(" | ")
  }, string>} */
module.exports = {};`;
  for (const [key, value] of Object.entries(color)) {
    file += `\n/** @type {string} */ exports[${JSON.stringify(key)}] = ${
      JSON.stringify(value)
    };`;
  }
  return file;
}

function colorFileMjs(color) {
  if (typeof color === "string") {
    return `/** @type {string} */ export default ${JSON.stringify(color)};`;
  }
  let file = ``;
  for (const [key, value] of Object.entries(color)) {
    file += `\n/** @type {string} */ const _${key} = ${JSON.stringify(value)};`;
  }
  file += `\nexport default {`;
  for (const key of Object.keys(color)) {
    file += `\n  ${key}: _${key},`;
  }
  file += `\n};`;
  return file;
}

function colorFileTs(color) {
  if (typeof color === "string") {
    return `export default ${JSON.stringify(color)};`;
  }
  let file = ``;
  for (const [key, value] of Object.entries(color)) {
    file += `\nconst _${key} = ${JSON.stringify(value)};`;
  }
  file += `\nexport default {`;
  for (const key of Object.keys(color)) {
    file += `\n  ${key}: _${key},`;
  }
  file += `\n};`;
  return file;
}

function colorFile(color) {
  return {
    js: colorFileCjs(color),
    mjs: colorFileMjs(color),
    ts: colorFileTs(color),
  };
}

function colorIndexCjs(names) {
  let data = "";
  for (const name of names) {
    data += `\nexports.${name} = require("./colors/${name}.js");`;
  }
  return data;
}

function colorIndexMjs(names) {
  let data = "";
  for (const name of names) {
    data += `\nexport { default as ${name} } from "./colors/${name}.mjs";`;
  }
  return data;
}

function colorIndexTs(names) {
  let data = "";
  for (const name of names) {
    data += `\nexport { default as ${name} } from "./colors/${name}.ts";`;
  }
  return data;
}

function colorIndexes(names) {
  return {
    "./colors/index.js": colorIndexCjs(names),
    "./colors/index.mjs": colorIndexMjs(names),
    "./colors/mod.ts": colorIndexTs(names),
  };
}

function colorFiles(colors) {
  const files = {};
  for (const [name, color] of Object.entries(colors)) {
    for (const [ext, data] of Object.entries(colorFile(color))) {
      files[`./colors/${name}.${ext}`] = data;
    }
  }
  for (
    const [path, data] of Object.entries(colorIndexes(Object.keys(colors)))
  ) {
    files[path] = data;
  }
  return files;
}

function mainCjs() {
  return `const colors = require("./colors/index.js");
module.exports = {
  colors,
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
    ]
  },
};`;
}

function mainMjs() {
  return `import * as colors from "./colors/index.mjs";
export default {
  colors,
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
    ]
  },
}
`;
}

function mainTs() {
  return `import * as colors from "./colors/mod.ts";
export default {
  colors,
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
    ]
  },
}
`;
}

function mainFiles() {
  return {
    "./index.js": mainCjs(),
    "./index.mjs": mainMjs(),
    "./mod.ts": mainTs(),
  };
}

function files() {
  const all = colorFiles(colors);
  for (const [path, data] of Object.entries(mainFiles())) {
    all[path] = data;
  }
  return all;
}

async function mkdirp(file) {
  fs.mkdir(path.dirname(file), { recursive: true });
}

async function writeFiles() {
  const data = files();
  for (const [path, content] of Object.entries(data)) {
    await mkdirp(path);
    await fs.writeFile(path, content);
  }
}

writeFiles().then(() => console.log("Done")).catch(console.error);
