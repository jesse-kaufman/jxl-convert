import path from "path";

import { baseDir, jxlDir, origDir } from "../config/config.js";

/**
 * Gets normalized file path for a given directory and file
 * @param {string} dir
 * @param {string} file
 * @returns
 */
export const getInFilePath = (dir, file) =>
  path.normalize(path.join(dir, file));

/**
 * Gets JXL output path for a given input path ([baseDir]/[jxlDir]/...)
 * @param {string} inFilePath
 * @returns {string}
 */
export const getOutDirPath = (inFilePath) =>
  inFilePath.replace(baseDir, `${jxlDir}/`);

/**
 * Gets original file output path for a given input path ([baseDir]/[origDir]/...)
 * @param {string} inFilePath
 * @returns
 */
export const getOrigDirPath = (inFilePath) =>
  inFilePath.replace(baseDir, `${origDir}/`);