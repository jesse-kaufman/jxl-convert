/**
 * Input directory module
 * @module input-dir
 */

import fs from "fs";

import { createDir } from "../utils/fs-utils.js";
import { getOrigDirPath, getOutDirPath } from "../utils/path-utils.js";

/**
 * Input dir object.
 *
 * @typedef {Object} InputDir
 * @property {string} inPath - The input path.
 * @property {string} outPath - The output path.
 * @property {string} origPath - Path to "orig" directory.
 * @property {Array<string>} contents - The contents of the directory.
 */

/**
 * Gets directory contents
 * @param {string} dir The directory
 * @returns {Array<string>} The contents
 */
const getDirContents = (dir) => fs.readdirSync(dir);

/**
 * Sets up an input directory object with properties and methods for processing.
 *
 * @param {string} dir - The path to the input directory.
 * @returns {InputDir} - An input dir object
 */
export default (dir) => {
  const outPath = getOutDirPath(dir);
  const origPath = getOrigDirPath(dir);
  const contents = getDirContents(dir);

  // Setup input directory object with paths and contents
  const inputDir = {
    inPath: dir,
    outPath,
    origPath,
    contents,
  };

  // Create directories inside JXL and "orig" dirs to mirror heirarchy of input dir
  createDir(outPath);
  createDir(origPath);

  return inputDir;
};
