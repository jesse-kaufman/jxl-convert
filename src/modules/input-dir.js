/**
 * Input directory module
 * @module input-dir
 */

import fsp from "node:fs/promises";

import { baseDir } from "../config/config.js";
import { createDir } from "../utils/fs-utils.js";
import log from "../utils/logger.js";
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
 * @returns {Promise<string[]>} The contents
 */
const getDirContents = async (dir) => {
  try {
    return await fsp.readdir(dir);
  } catch (err) {
    // Log error
    const errMsg = `Error reading directory: ${dir}`;
    const details = err instanceof Error ? err.message : null;
    log.error(`${errMsg}${details}`);

    // Return empty array
    return [];
  }
};

/**
 * Sets up an input directory object with properties and methods for processing.
 *
 * @param {string} dir - The path to the input directory.
 * @returns {Promise<InputDir>} - An input dir object
 */
export default async (dir) => {
  const outPath = getOutDirPath(dir);
  const origPath = getOrigDirPath(dir);
  const contents = await getDirContents(dir);

  // Setup input directory object with paths and contents
  const inputDir = {
    inPath: dir,
    outPath,
    origPath,
    contents,
  };

  if (dir !== baseDir) {
    // Create directories inside JXL and "orig" dirs to mirror heirarchy of input dir
    createDir(outPath);
    createDir(origPath);
  }
  return inputDir;
};
