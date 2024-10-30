/**
 * Utility to archive files.
 * @module utils/archive
 */
import fsp from "node:fs/promises";
import path from "node:path";
import log from "../../../utils/logger.js";

/**
 * Archives original files into the "orig" dir.
 * @param {string} src - Source path.
 * @param {string} dest - Destination path.
 */
export default async (src, dest) => {
  try {
    // Copy original file to the "orig" directory
    await fsp.rename(src, path.join(dest, path.basename(src)));
  } catch (err) {
    // Log error
    const errMsg = `Error moving ${src} to ${dest}`;
    const details = err instanceof Error ? err.message : null;
    log.error(`${errMsg}${details}`);

    // Exit app
    process.exit(1);
  }

  // Log success message if the file was successfully copied to the "orig" directory
  log.success(`Moved original file to ${dest}`);
};
