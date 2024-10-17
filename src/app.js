import { baseDir, jxlDir, origDir } from "./config/config.js";
import {
  getInFilePath,
  getOrigPath,
  getOutFileName,
  getOutPath,
} from "./modules/path-utils.js";
import convertImage from "./modules/convert-image.js";
import createDir from "./modules/create-dir.js";
import fs from "fs";
import { isValidFileType } from "./modules/filename-utils.js";
import log from "./modules/logger.js";
import path from "path";
import printSummary from "./modules/summary.js";

function processDir(dir) {
  // Don't run on
  if (dir === jxlDir || dir === origDir) return;

  log.notice(`Processing directory: ${dir}...`);

  const outPath = getOutPath(dir);
  const origPath = getOrigPath(dir);

  // Mirror input directory structure in output and "orig" directories
  createDir(outPath);
  createDir(origPath);

  // Get list of files and sub-directories
  const dirContents = fs.readdirSync(dir);

  // Walk through list of files and sub-directories
  dirContents.map((file) => processPath(dir, file));

  // Then print the summary
  printSummary();
}

/**
 * Processes a file and converts it into JXL if valid
 *
 * @param {string} filePath The path to the file to be processed
 */
const processFile = (filePath) => {
  // Only process valid file types
  if (!isValidFileType(filePath)) return;

  log.notice(`Processing file: ${filePath}`);

  const outFileName = getOutFileName(filePath);
  const outPath = getOutPath(path.dirname(filePath));
  const origPath = getOrigPath(path.dirname(filePath));

  // Convert to JXL
  convertImage(filePath, path.join(outPath, outFileName));

  // Copy original file to the "orig" directory
  archiveOrigFile(filePath, origPath);
};

/**
 * Helper function to archive original files into the "orig" dir
 * @param {string} filePath
 * @param {string} origPath
 */
function archiveOrigFile(filePath, origPath) {
  // Copy original file to the "orig" directory
  fs.rename(filePath, path.join(origPath, path.basename(filePath)), (err) => {
    if (err) {
      log.error(err);
      process.exit(1);
    }
    log.success(`Copied original file to ${origPath}`);
  });
}

/**
 * Process a file/directory inside dir
 *
 * Calls processFile() on files or processDir() on directories
 *
 * @param {string} dir Directory in which item to process exists
 * @param {string} item Name of item to process
 */
function processPath(dir, item) {
  const itemPath = getInFilePath(dir, item);
  fs.stat(itemPath, (err, fileStat) => {
    // Return if an error occurred
    if (err) return log.error(`Error reading file: ${itemPath}`);

    // Path is a directory, call processDir()
    if (fileStat.isDirectory()) return processDir(itemPath);

    // Process the file, call processFile()
    if (fileStat.isFile()) return processFile(itemPath);
  });
}

export default () => {
  processDir(baseDir);
};
