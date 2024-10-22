/**
 * Input directory module
 * @module input-dir
 */

import { createDir, getDirContents } from "../utils/fs-utils.js";
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
 * Sets up an input directory object with properties and methods for processing.
 *
 * @param {string} dir - The path to the input directory.
 * @returns {InputDir} - An input dir object
 */
export default (dir) => {
  // Setup input directory object with paths and contents

  const inputDir = {
    inPath: dir,
    outPath: getOutDirPath(dir),
    origPath: getOrigDirPath(dir),
    contents: getDirContents(dir),
  };

  // Create directories inside JXL and "orig" dirs to mirror heirarchy of input dir
  createDestDirs(inputDir);

  return inputDir;
};

/**
 * Creates the necessary directories in the output and "orig" paths to mirror the input directory structure.
 *
 * @param {Object} inputDir - An object containing paths for the output and "orig" directories.
 * @param {string} inputDir.outPath - The path to the output directory.
 * @param {string} inputDir.origPath - The path to the original directory.
 */
function createDestDirs({ outPath, origPath }) {
  // Mirror input directory structure in output and "orig" directories
  createDir(outPath);
  createDir(origPath);
}
