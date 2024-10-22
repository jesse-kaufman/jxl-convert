import fs from "fs";
import path from "path";

import log from "../../../utils/logger.js";

/**
 * Helper function to archive original files into the "orig" dir
 * @param {string} filePath
 * @param {string} origPath
 */
export default (filePath, origPath) => {
  // Copy original file to the "orig" directory
  fs.rename(filePath, path.join(origPath, path.basename(filePath)), (err) => {
    if (err) {
      log.error(err.message);
      process.exit(1);
    }

    // Log success message if the file was successfully copied to the "orig" directory
    log.success(`Copied original file to ${origPath}`);
  });
};
