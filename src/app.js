import { execSync } from "child_process";
import fs from "fs";
import { baseDir, jxlDir, origDir } from "./config/config.js";
import setupInputDir from "./modules/input-dir.js";
import setupInputFile from "./modules/input-file/input-file.js";
import printSummary from "./services/summary/summary.js";
import { createDir } from "./services/fs.js";
import log from "./services/logger/logger.js";
import { getInFilePath } from "./utils/path-utils.js";

export default class App {
  constructor() {
    // No op
    log.info("Starting");
  }

  /**
   * Runs the program.
   */
  async run() {
    if (baseDir === "") {
      log.error("Base directory not provided.");
      process.exit(1);
    }

    if (!imageMagickExists()) {
      log.error("ImageMagick not found. Please install it and try again.");
      process.exit(1);
    }

    // Create output directories if needed
    log.debug("Initializing");
    await initOutputDirs();

    // Recursively process the provided base directory
    log.debug("Starting processing");
    await processDir(baseDir);

    // Print summary of completed conversion process
    log.debug("Printing summary");
    printSummary();
  }
}

/**
 * Processes the given directory recursively.
 * @param {string} dir - Path to the directory.
 */
async function processDir(dir) {
  // Don't process base JXL or orig directories
  if (dir === jxlDir || dir === origDir) return;

  log.notice(`Processing directory: ${dir}...`);

  // Setup input directory object
  const inputDir = await setupInputDir(dir);

  // Walk through list of files and sub-directories
  inputDir.contents.map((contentItem) =>
    processPathItem(inputDir.inPath, contentItem)
  );
}

/**
 * Processes item (file or directory) inside dir.
 *
 * - Calls processFile() on files.
 * - Calls processDir() on directories.
 * @param {string} dir - Directory in which item to process exists.
 * @param {string} item - Name of item to process.
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
 * Processes a file and converts it into JXL if a valid image type.
 * @param {string} filePath - The path to the file to be processed.
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

/**
 * Initializes the JXL and "orig" directories.
 */
async function initOutputDirs() {
  log.info("Initializing output directories.");
  await createDir(jxlDir);
  await createDir(origDir);
}

/**
 * Check if ImageMagick is available.
 * @returns {boolean} - True if ImageMagick is available.
 */
function imageMagickExists() {
  try {
    execSync("magick -version", { stdio: "ignore" });
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return false;
  }

  return true;
}
