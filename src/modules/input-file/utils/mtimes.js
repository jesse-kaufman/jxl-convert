/**
 * Utilities for getting/setting file modification times.
 * @module utils/mtime
 */
import fs from "fs";

import log from "../../../utils/logger.js";

/**
 * Syncs the modification times of two files
 * @param {string} srcPath - Path to the modification time source.
 * @param {string} destPath - Path to the file to modify.
 * @returns
 */
export const syncMTimes = (srcPath, destPath) => {
  // Get the modification times of the two files
  const srcMTime = getMTime(srcPath);
  const destMTime = getMTime(destPath);

  // If the modification times differ, update the out file modification
  if (srcMTime.getTime() !== destMTime.getTime()) {
    log.info("File modification times differ.");
    // Set mtime on destination to the source mtime
    setMTime(destPath, srcMTime);
    return;
  }

  // If the modification times are the same, log a debug message
  log.debug("File modification times are the same.");
};

/**
 * Gets the modification time for a given path
 * @param {string} path - Path to get the modification time for
 * @returns {Date} - The modification time
 */
function getMTime(path) {
  log.debug(`File: ${path}`);

  try {
    // Get the file stats and return the modification time
    const stats = fs.statSync(path);
    log.debug(`Last modified date: ${stats.mtime}`);
    return stats?.mtime;
  } catch (err) {
    // Log error
    const errMsg = `Error reading file: ${path}`;
    const details = err instanceof Error ? err.message : null;
    log.error(`${errMsg}${details}`);
    // Exit app
    process.exit(1);
  }
}

/**
 * Sets the modification time for a given path
 * @param {string} path
 * @param {Date} mtime
 */
function setMTime(path, mtime) {
  log.debug(`Changing modification time for ${path}...`);

  try {
    // Open the file in read-write mode
    const fd = fs.openSync(path, "r+");
    // Set the new modification time for the file
    fs.utimesSync(path, mtime, mtime);
    // Close the file
    fs.closeSync(fd);
  } catch (err) {
    // Log error
    const errMsg = `Error opening file: ${path}`;
    const details = err instanceof Error ? ` - ${err.message}` : "";
    log.error(`${errMsg}${details}`);
    // Exit app
    process.exit(1);
  }

  log.debug(`Modification time changed successfully.`);
}
