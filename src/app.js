import fsp from "node:fs/promises";
import { baseDir, jxlDir, origDir } from "./config/config.js";
import setupInputDir from "./modules/input-dir.js";
import setupInputFile from "./modules/input-file/input-file.js";
import printSummary from "./services/summary/summary.js";
import { createDir } from "./services/fs.js";
import logger from "./services/logger/logger.js";
import { getInFilePath } from "./utils/path-utils.js";
import { checkImageMagick } from "./services/imagemagick.js";

/**
 * Wrapper object for winston logging library.
 * @typedef {object} Logger
 * @property {Function} success - Log success message.
 * @property {Function} error - Log error message.
 * @property {Function} warning - Log warning message.
 * @property {Function} notice - Log notice message.
 * @property {Function} info - Log info message.
 * @property {Function} debug - Log debug message.
 */
export default class App {
  /**
   * Static property holding logger object for logging.
   * @type {Logger}
   */
  static log = logger;

  constructor() {
    // No op
    App.log.info("Starting");
  }

  /**
   * Runs the program.
   */
  async run() {
    if (baseDir === "") {
      App.log.error("Base directory not provided.");
      process.exit(1);
    }

    if (!(await checkImageMagick())) {
      App.log.error("ImageMagick not found. Please install it and try again.");
      process.exit(1);
    }

    // Create output directories if needed
    App.log.debug("Initializing");
    await initOutputDirs();

    // Recursively process the provided base directory
    App.log.debug("Starting processing");
    await processDir(baseDir);

    // Print summary of completed conversion process
    App.log.debug("Printing summary");
    printSummary(App.log);
  }
}

/**
 * Processes the given directory recursively.
 * @param {string} dir - Path to the directory.
 */
async function processDir(dir) {
  // Don't process base JXL or orig directories
  if (dir === jxlDir || dir === origDir) return;

  App.log.notice(`Processing directory: ${dir} ...`);

  // Setup input directory object
  const inputDir = await setupInputDir(dir);

  // Walk through list of files and sub-directories
  /*inputDir.contents.map((contentItem) => {
    log.info(`Directory item: ${contentItem}`);
    return processPathItem(inputDir.inPath, contentItem);
  });*/

  // Walk through list of files and sub-directories
  for (const item of inputDir.contents) {
    App.log.info(`Directory item: ${item}`);
    // eslint-disable-next-line no-await-in-loop
    await processPathItem(inputDir.inPath, item);
  }

  App.log.notice(`Finished processing directory: ${dir}`);
}

/**
 * Processes item (file or directory) inside dir.
 *
 * - Calls processFile() on files.
 * - Calls processDir() on directories.
 * @param {string} dir - Directory in which item to process exists.
 * @param {string} item - Name of item to process.
 */
async function processPathItem(dir, item) {
  const itemPath = getInFilePath(dir, item);

  try {
    // Get stats for the current path item
    const fileStat = await fsp.stat(itemPath);

    // If path is a directory, call processDir()
    if (fileStat.isDirectory()) await processDir(itemPath);

    // If process the file, call processFile()
    if (fileStat.isFile()) await processFile(itemPath);
  } catch (err) {
    // Return if an error occurred
    if (err) App.log.error(`Error reading file: ${itemPath}`);
  }
}

/**
 * Processes a file and converts it into JXL if a valid image type.
 * @param {string} filePath - The path to the file to be processed.
 */
async function processFile(filePath) {
  const inputFile = setupInputFile(filePath);

  // Only process valid file types
  if (!inputFile.isValidFileType) return;

  App.log.notice(`Processing file: ${filePath}`);

  // Convert to JXL
  await inputFile.convert();

  // Copy original file to the "orig" directory
  await inputFile.archive();
}

/**
 * Initializes the JXL and "orig" directories.
 */
async function initOutputDirs() {
  App.log.info("Initializing output directories.");
  await createDir(jxlDir);
  await createDir(origDir);
}
