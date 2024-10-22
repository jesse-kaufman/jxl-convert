import { jxlDir, origDir } from "../config/config.js";
import { createDir } from "./fs-utils.js";

/**
 * Creates base output dirs for JXL and original files
 */
const initOutputDirs = () => {
  console.log("Initializing output directories.");
  createDir(jxlDir);
  createDir(origDir);
};

export default function () {
  initOutputDirs();
}
