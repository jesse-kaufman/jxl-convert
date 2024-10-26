/**
 * Input file module.
 * @module input-file
 */
import path from "path";

import { validFileExts } from "../../config/config.js";
import log from "../../utils/logger.js";
import { getOrigDirPath, getOutDirPath } from "../../utils/path-utils.js";
import archiveOrigFile from "./utils/archive.js";
import convertImage from "./utils/convert.js";
import { syncMTimes } from "./utils/mtimes.js";

/**
 * Input file object.
 *
 * @typedef {Object} InputFile
 * @property {string} filePath - The input path.
 * @property {boolean} isValidFileType - Indicates whether the file type is valid.
 * @property {string} outFileName - The name of the output file.
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
  const outFilePath = path.join(outPath, outFileName);
  const origPath = getOrigDirPath(path.dirname(filePath));

  return {
    filePath,
    isValidFileType: isValidFileType(filePath),
    outFileName,
    outPath,
    outFilePath,
    origPath,
    /** Converts file to JXL */
    async convert() {
      log.debug(`Converting file: ${this.filePath}`);
      // Convert image to JXL
      convertImage(this.filePath, this.outFilePath);
      // Sync modification time of new file with old file
      await syncMTimes(this.filePath, this.outFilePath);
    },
    /** Archives original file in "orig" directory */
    archiveOrigFile() {
      log.debug(`Archiving file: ${this.filePath}`);
      archiveOrigFile(this.filePath, this.origPath);
    },
  };
};

/**
 * Gets output filename for a given input filename
 * @param {string} inFile - Input filename
 * @returns {string} - Output filename
 */
function getOutFileName(inFile) {
  const basename = path.basename(inFile, path.extname(inFile));
  return `${basename}.jxl`;
}

/**
 * Checks whether file extension is listed as a valid file type
 * @param {string} filePath - Path to file
 * @returns {boolean} - True if file type is valid, otherwise false
 */
function isValidFileType(filePath) {
  return validFileExts.includes(path.extname(filePath).toLowerCase());
}
