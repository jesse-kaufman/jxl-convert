import getFolderSize from "get-folder-size";

import config from "../config/config.js";
import { GB, MB } from "../config/constants.js";
import log from "../utils/logger.js";

const { baseDir, jxlDir, origDir, padding, places } = config;

/**
 * Prints a summary of information about the completed conversion process
 */
export default async () => {
  const origDirSize = origDir ? await getFolderSize.loose(origDir) : 0;
  const jxlDirSize = jxlDir ? await getFolderSize.loose(jxlDir) : 0;
  const totalSaved = origDirSize - jxlDirSize;

  log.info("\n\n");
  log.info("================================================================");
  log.notice(` JXL optimization results for ${baseDir}:`);
  log.info("================================================================");
  log.info(` Original...${formatSize(origDirSize)}`);
  log.info(` Optimized..${formatSize(jxlDirSize)}`);
  log.info(` Saved......${formatSize(totalSaved)}`);
  log.info("================================================================");
};

/**
 * Converts bytes to human-readable format, optionally with padding.
 * @param {number} bytes Number of bytes to convert.
 * @returns {string} Human-readable format of the size.
 */
function formatSize(bytes, pad = false) {
  // Default to size in MB and set label to "MB"
  let size = bytes / MB;
  let label = "MB";

  // If size is greater than GB, convert to GB and update label
  if (bytes > GB) {
    size = bytes / GB;
    label = "GB";
  }

  // Round to specified number of decimal places and format as string
  const fsize = size.toFixed(places);

  // Add padding to size if specified
  const formattedSize = pad ? fsize.padStart(padding, ".") : fsize;

  // Return the formatted size with label (MB or GB)
  return `${formattedSize} ${label}`;
}
