/**
 * Utilities for getting/setting file modification times.
 * @module utils/mtime
 */
import fs from "fs";

import log from "../../../utils/logger.js";

/**
 * Gets the modification time for a given path
 * @param {string} filePath
 * @returns
 */
export const getMTime = (filePath) => {
  log.debug(`File: ${filePath}`);

  try {
    // Get the file stats and return the modification time
    const stats = fs.statSync(filePath);
    log.debug(`Last modified date: ${stats.mtime}`);
    return stats?.mtime;
  } catch (err) {
    // Log error
    const errMsg = `Error reading file: ${filePath}`;
    const details = err instanceof Error ? err.message : null;
    log.error(`${errMsg}${details}`);
    // Exit app
    process.exit(1);
  }
};

/**
 * Changes the modification time for a given path
 * @param {string} path
 * @param {Date} mtime
 */
export const changeMTime = (path, mtime) => {
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
};
