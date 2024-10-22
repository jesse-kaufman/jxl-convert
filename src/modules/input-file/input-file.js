import path from "path";

import { archiveOrigFile } from "../../utils/fs-utils.js";
import log from "../../utils/logger.js";
import { getOrigDirPath, getOutDirPath } from "../../utils/path-utils.js";
import convertImage from "./modules/convert.js";

/**
 * Input file object.
 *
 * @typedef {Object} InputFile
 * @property {string} inPath - The input path.
 * @property {boolean} isValidFileType - Indicates whether the file type is valid.
 * @property {string} outPath - The output directory path.
 * @property {string} outFilePath - Full path to the output file.
 * @property {string} origPath - Path to "orig" directory.
 * @property {function} convert - Converts the input file to JXL.
 * @property {function} archiveOrigFile - Archives the original file to the "orig" directory.
 */

/**
 * Sets up an input file object with properties and methods for processing.
 *
 * @param {string} filePath - The path to the input file.
 * @returns {InputFile} - An input file object
 */
export default (filePath) => {
  const outPath = getOutDirPath(path.dirname(filePath));
  const outFileName = getOutFileName(filePath);

  /**
   * @property {string} inPath - The path to the input file.
   * @property {boolean} isValidFileType - A boolean indicating whether the file type is valid.
   * @property {string} outFileName - The output file name based on the input file name.
   * @property {string} outPath - The output directory path.
   * @property {string} outFilePath - The full path to the output file.
   * @property {string} origPath - The original file directory path.
   */
  const inputFile = {
    inPath: filePath,
    isValidFileType: isValidFileType(filePath),
    outFileName,
    outPath,
    outFilePath: path.join(outPath, outFileName),
    origPath: getOrigDirPath(path.dirname(filePath)),
    /** Method to convert file to JXL */
    convert: function () {
      convertImage(this.inPath, this.outFilePath);
    },
    /** Method to archive original file in "orig" directory */
    archiveOrigFile: function () {
      log.debug(`Archiving file: ${this.inPath}`);
      archiveOrigFile(this.inPath, this.origPath);
    },
  };

  return inputFile;
};

/**
 * Gets output filename for a given input filename
 * @param {string} inFile Input filename
 * @returns {string} Output filename
 */
function getOutFileName(inFile) {
  const basename = path.basename(inFile, path.extname(inFile));
  return `${basename}.jxl`;
}

/**
 * Checks whether file extension is listed as a valid file type
 * @param {string} filePath Path to file
 * @returns {boolean} True if file type is valid, otherwise false
 */
function isValidFileType(filePath) {
  return [".jpg", ".jpeg", ".png", ".webp", ".heic"].includes(
    path.extname(filePath).toLowerCase()
  );
}
