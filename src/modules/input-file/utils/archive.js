/**
 * Utility to archive files.
 * @module utils/archive
 */
import fs from "fs";
import path from "path";

import log from "../../../utils/logger.js";

/**
 * Archives original files into the "orig" dir.
 * @param {string} src - Source path.
 * @param {string} dest - Destination path.
 */
export default (src, dest) => {
  // Copy original file to the "orig" directory
  fs.rename(src, path.join(dest, path.basename(src)), (err) => {
    if (err) {
      log.error(err.message);
      process.exit(1);
    }

    // Log success message if the file was successfully copied to the "orig" directory
    log.success(`Copied original file to ${dest}`);
  });
};
