import path from "path";

import { baseDir, jxlDir, origDir } from "../config/config.js";

/**
 * Gets normalized file path for a given directory and file.
 * @param {string} dir - The directory.
 * @param {string} file - The file.
 * @returns {string} Normalized file path.
 */
export const getInFilePath = (dir, file) =>
  path.normalize(path.join(dir, file));

/**
 * Gets JXL output path for a given input path ([baseDir]/[jxlDir]/...).
 * @param {string} inFilePath - The input path.
 * @returns {string} JXL output path.
 */
export const getOutDirPath = (inFilePath) => {
  // If we're on the base directory, return jxlDir
  if (`${inFilePath}/` === baseDir) return jxlDir;

  // Otherwise, return jxlDir relative to the input path
  return path.normalize(inFilePath.replace(baseDir, `${jxlDir}/`));
};

/**
 * Gets original file output path for a given input path ([baseDir]/[origDir]/...).
 * @param {string} inFilePath - The input file path.
 * @returns {string} JXL output path.
 */
export const getOrigDirPath = (inFilePath) => {
  // If we're on the base directory, return origDir
  if (`${inFilePath}/` === baseDir) return origDir;

  // Otherwise, return jxlDir relative to the input path
  return path.normalize(inFilePath.replace(baseDir, `${origDir}/`));
};
