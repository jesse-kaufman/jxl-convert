import { baseDir, jxlDir, origDir } from "../config/config.js";
import path from "path";

/**
 * Gets normalized file path for a given directory and file
 * @param {string} dir
 * @param {string} file
 * @returns
 */
export const getInFilePath = (dir, file) =>
  path.normalize(path.join(dir, file));

/**
 * Gets output filename for a given input filename
 * @param {string} inFile
 * @returns
 */
export const getOutFileName = (inFile) => {
  const basename = path.basename(inFile, path.extname(inFile));
  return `${basename}.jxl`;
};

/**
 * Gets JXL output path for a given input path ([baseDir]/[jxlDir]/...)
 * @param {string} inFilePath
 * @returns
 */
export const getOutPath = (inFilePath) =>
  inFilePath.replace(baseDir, `${jxlDir}/`);

/**
 * Gets original file output path for a given input path ([baseDir]/[origDir]/...)
 * @param {string} inFilePath
 * @returns
 */
export const getOrigPath = (inFilePath) =>
  inFilePath.replace(baseDir, `${origDir}/`);
