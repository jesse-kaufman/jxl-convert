import { baseDir, jxlDir, origDir } from "../config/config.js";
import createDir from "./create-dir.js";

/**
 * Creates base output dirs for JXL and original files
 */
const initOutputDirs = () => {
  if (baseDir == null) {
    console.error("Base directory not provided.");
    process.exit(1);
  }

  console.log("Initializing output directories.");
  createDir(jxlDir);
  createDir(origDir);
};

export default function () {
  initOutputDirs();
}
