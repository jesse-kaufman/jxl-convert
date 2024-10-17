import { baseDir, jxlDir, origDir } from "../config/config.js";
import formatSize from "./format-size.js";
import getFolderSize from "get-folder-size";
import log from "./logger.js";

/**
 * Prints a summary of information about the completed conversion process
 */
const printSummary = async () => {
  const origDirSize = formatSize(await getFolderSize.loose(origDir));
  const jxlDirSize = formatSize(await getFolderSize.loose(jxlDir));
  const totalSaved = formatSize(origDirSize - jxlDirSize);

  log.info("\n\n");
  log.info("================================================================");
  log.notice(` JXL optimization results for ${baseDir}:`);
  log.info("================================================================");
  log.info(` Original.${origDirSize}`);
  log.info(` Optimized${jxlDirSize}`);
  log.info(` Saved....${totalSaved}`);
  log.info("================================================================");
};

export default printSummary;
