// Imports
/** @type {FullColorSpec} */
import amber from "./colors/amber";
/** @type {FullColorSpec} */
import blue from "./colors/blue";
/** @type {PartialColorSpec} */
import blueGray from "./colors/blueGray";
/** @type {PartialColorSpec} */
import brown from "./colors/brown";
/** @type {FullColorSpec} */
import cyan from "./colors/cyan";
/** @type {PartialColorSpec} */
import dark from "./colors/dark";
/** @type {FullColorSpec} */
import deepOrange from "./colors/deepOrange";
/** @type {FullColorSpec} */
import deepPurple from "./colors/deepPurple";
/** @type {FullColorSpec} */
import gray from "./colors/gray";
/** @type {FullColorSpec} */
import green from "./colors/green";
/** @type {FullColorSpec} */
import indigo from "./colors/indigo";
/** @type {PartialColorSpec} */
import light from "./colors/light";
/** @type {FullColorSpec} */
import lightBlue from "./colors/lightBlue";
/** @type {FullColorSpec} */
import lightGreen from "./colors/lightGreen";
/** @type {FullColorSpec} */
import lime from "./colors/lime";
/** @type {FullColorSpec} */
import orange from "./colors/orange";
/** @type {FullColorSpec} */
import pink from "./colors/pink";
/** @type {FullColorSpec} */
import purple from "./colors/purple";
/** @type {FullColorSpec} */
import red from "./colors/red";
/** @type {FullColorSpec} */
import teal from "./colors/teal";
/** @type {FullColorSpec} */
import yellow from "./colors/yellow";

export {
  amber,
  blue,
  blueGray,
  brown,
  cyan,
  dark,
  deepOrange,
  deepPurple,
  gray,
  green,
  indigo,
  light,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
};

export default {
  colors: {
    inherit: "inherit",
    transparent: "transparent",
    amber,
    blue,
    blueGray,
    brown,
    cyan,
    dark,
    deepOrange,
    deepPurple,
    gray,
    green,
    indigo,
    light,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow,
  },
  extend: {
    fontFamily: {
      sans: [
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
  },
};

/** @typedef {"amber" | "blue" | "blueGray" | "brown" | "cyan" | "dark" | "deepOrange" | "deepPurple" | "gray" | "green" | "indigo" | "light" | "lightBlue" | "lightGreen" | "lime" | "orange" | "pink" | "purple" | "red" | "teal" | "yellow"} ColorName */
/** @typedef {"50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"} PartialColorSpecProperty */
/** @typedef {PartialColorSpecProperty | "A100" | "A200" | "A400" | "A700"} FullColorSpecProperty */
/** @typedef {Record<FullColorSpecProperty, string>} FullColorSpec */
/** @typedef {Record<PartialColorSpecProperty, string> PartialColorSpec} */
