import fs from "fs";
import path from "path";

import log from "./logger.js";

/**
 * Creates a directory if it doesn't exist already.
 * @param {string|null} dir The directory to create
 */
export const createDir = (dir) => {
  if (!dir) return;

  // Try to create the directory
  log.debug(`Creating ${dir} directory...`);
  fs.mkdir(dir, (err) => {
    // Successfully created directory
    if (err == null) return log.success(`${dir} created successfully`);

    // Directory already existed
    if (err?.code === "EEXIST") return log.success(`${dir} already exists`);

    // An error occurred
    log.error(err.message);
    process.exit(1);
  });
};

/**
 * Helper function to get directory contents without needing to import fs in app
 * @param {string} dir The directory
 * @returns {Array<string>} The contents
 */
export const getDirContents = (dir) => fs.readdirSync(dir);

/**
 * Helper function to archive original files into the "orig" dir
 * @param {string} filePath
 * @param {string} origPath
 */
export const archiveOrigFile = (filePath, origPath) => {
  // Copy original file to the "orig" directory
  fs.rename(filePath, path.join(origPath, path.basename(filePath)), (err) => {
    if (err) {
      log.error(err.message);
      process.exit(1);
    }
    log.success(`Copied original file to ${origPath}`);
  });
};
