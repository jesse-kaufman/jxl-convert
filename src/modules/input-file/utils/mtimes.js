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
 * @returns {Promise<void>}
 */
export const syncMTimes = async (srcPath, destPath) => {
  // Get modification times of the source file
  const srcMTime = await getMTime(srcPath);
  // Get modification time of the destination file
  const destMTime = await getMTime(destPath);

  log.debug(`${srcPath} modification time:\n  ${srcMTime.toString()}`);
  log.debug(`${destPath} modification time:\n  ${destMTime.toString()}`);

  // If the modification times differ, update the out file modification
  if (srcMTime.getTime() !== destMTime.getTime()) {
    log.info("File modification times differ. Modifying...");
    // Set mtime on destination to the source mtime
    return setMTime(destPath, srcMTime);
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
    // Get the file stats
    const stats = await fsp.stat(path);
    // Return modification time
    return stats.mtime;
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
    // Log success message
    log.debug(`Modification time changed successfully.`);
  } catch (err) {
    // Log error message
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
}
