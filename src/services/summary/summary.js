import getFolderSize from "get-folder-size";
import {
  baseDir,
  jxlDir,
  origDir,
  places,
  padding,
} from "../../config/config.js";
import formatSize from "./utils/format-size.js";

/**
 * @typedef {object} Logger
 * @property {Function} success - Log success message.
 * @property {Function} error - Log error message.
 * @property {Function} warning - Log warning message.
 * @property {Function} notice - Log notice message.
 * @property {Function} info - Log info message.
 * @property {Function} debug - Log debug message.
 */

/**
 * Prints a summary of information about the completed conversion process.
 * @param {Logger} log - Logging object
 */
export default async (log) => {
  const origDirSize = origDir ? await getFolderSize.loose(origDir) : 0;
  const jxlDirSize = jxlDir ? await getFolderSize.loose(jxlDir) : 0;
  const totalSaved = origDirSize - jxlDirSize;

  log.info("");
  log.info("================================================================");
  log.notice(` JXL optimization results for ${baseDir}:`);
  log.info("================================================================");
  log.info(` Original...${formatSize(origDirSize, places, padding)}`);
  log.info(` Optimized..${formatSize(jxlDirSize, places, padding)}`);
  log.info(` Saved......${formatSize(totalSaved, places, padding)}`);
  log.info("================================================================");
};
