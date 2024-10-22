import { createDir, getDirContents } from "../utils/fs-utils.js";
import { getOrigDirPath, getOutDirPath } from "../utils/path-utils.js";

/**
 * Sets up input dir object with paths and contents
 *
 * @function
 * @name setupInputDir
 * @kind function
 * @param {string} dir
 * @returns {{ inPath: string; outPath: string; origPath: string; contents: string[]; }}
 * @exports
 */
export default function setupInputDir(dir) {
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
}

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
