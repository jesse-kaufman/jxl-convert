import fs from "fs";

import { baseDir, jxlDir, origDir } from "./config/config.js";
import setupInputDir from "./modules/input-dir.js";
import setupInputFile from "./modules/input-file/input-file.js";
import printSummary from "./modules/summary.js";
import { createDir } from "./utils/fs-utils.js";
import log from "./utils/logger.js";
import { getInFilePath } from "./utils/path-utils.js";

/**
 * Runs the program
 */
export default () => {
  if (baseDir == null) {
    console.error("Base directory not provided.");
    process.exit(1);
  }

  log.debug("Running");

  // Create output directories if needed
  initOutputDirs();

  // Recursively process the provided base directory
  processDir(baseDir);

  // Print summary of completed conversion process
  printSummary();
};

/**
 * Processes the given directory recursively.
 *
 * @param {string} dir Path to the directory
 * @returns {Object|void} Input directory object
 */
function processDir(dir) {
  // Don't process base JXL or orig directories
  if (dir === jxlDir || dir === origDir) return;

  log.notice(`Processing directory: ${dir}...`);

  // Setup input directory object
  const inputDir = setupInputDir(dir);

  // Walk through list of files and sub-directories
  inputDir.contents.map((contentItem) =>
    processPathItem(inputDir.inPath, contentItem)
  );
}

/**
 * Process item (file or directory) inside dir
 *
 * - Calls processFile() on files
 * - Calls processDir() on directories
 *
 * @param {string} dir Directory in which item to process exists
 * @param {string} item Name of item to process
 */
function processPathItem(dir, item) {
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

/**
 * Processes a file and converts it into JXL if a valid image type
 *
 * @param {string} filePath The path to the file to be processed
 */
function processFile(filePath) {
  const inputFile = setupInputFile(filePath);

  // Only process valid file types
  if (!inputFile.isValidFileType) return;

  log.notice(`Processing file: ${filePath}`);

  // Convert to JXL
  inputFile.convert();

  // Copy original file to the "orig" directory
  inputFile.archiveOrigFile();
}

function initOutputDirs() {
  if (baseDir === "") {
    console.error("Base directory not provided.");
    process.exit(1);
  }

  console.log("Initializing output directories.");
  createDir(jxlDir);
  createDir(origDir);
}
