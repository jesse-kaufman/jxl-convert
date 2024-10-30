import getFolderSize from "get-folder-size";
import {
  baseDir,
  jxlDir,
  origDir,
  places,
  padding,
} from "../../config/config.js";
import log from "../../utils/logger.js";
import formatSize from "./utils/format-size.js";

/**
 * Prints a summary of information about the completed conversion process.
 */
export default async () => {
  const origDirSize = origDir ? await getFolderSize.loose(origDir) : 0;
  const jxlDirSize = jxlDir ? await getFolderSize.loose(jxlDir) : 0;
  const totalSaved = origDirSize - jxlDirSize;

  log.info("\n\n");
  log.info("================================================================");
  log.notice(` JXL optimization results for ${baseDir}:`);
  log.info("================================================================");
  log.info(` Original...${formatSize(origDirSize, places, padding)}`);
  log.info(` Optimized..${formatSize(jxlDirSize, places, padding)}`);
  log.info(` Saved......${formatSize(totalSaved, places, padding)}`);
  log.info("================================================================");
};
