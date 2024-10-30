/**
 * Utilities for getting/setting file modification times.
 * @module utils/mtime
 */
import fsp from "node:fs/promises";
import log from "../../../services/logger/logger.js";

/**
 * Syncs the modification times of two files.
 * @param {string} srcPath - Path to the modification time source.
 * @param {string} destPath - Path to the file to modify.
 * @returns {Promise<undefined>}
 */
export const syncMTimes = async (srcPath, destPath) => {
  // Get the modification times of the two files
  const srcMTime = await getMTime(srcPath);
  log.debug(`${srcPath} modification time:\n\t${srcMTime.toString()}`);
  const destMTime = await getMTime(destPath);
  log.debug(`${destPath} modification time:\n\t${destMTime.toString()}`);

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
 * Gets the modification time for a given path.
 * @param {string} path - Path to get the modification time for.
 * @returns {Promise<Date>} - The modification time.
 */
async function getMTime(path) {
  try {
    // Get the file stats and return the modification time
    const stats = await fsp.stat(path);
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
 * Sets the modification time for a given path.
 * @param {string} path - The path to set the modification time on.
 * @param {Date} mtime - The modification time.
 */
async function setMTime(path, mtime) {
  let fd = null;

  log.debug(`Changing modification time for ${path}...`);

  try {
    // Open the file in read-write mode
    fd = await fsp.open(path, "r+");
    // Set the new modification time for the file
    await fsp.utimes(path, mtime, mtime);
  } catch (err) {
    // Log error
    const errMsg = `Error opening file: ${path}`;
    const details = err instanceof Error ? ` - ${err.message}` : "";
    log.error(`${errMsg}${details}`);
    // Exit app
    process.exit(1);
  } finally {
    // Close the file
    if (fd) fd.close();
    log.debug(`Closed file: ${path}`);
  }

  log.debug(`Modification time changed successfully.`);
}
