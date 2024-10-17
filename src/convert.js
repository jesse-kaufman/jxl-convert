import { baseDir, jxlDir, origDir } from "./config/config.js";
import createOutputDirs from "./modules/outputDirs.js";
import formatSize from "./modules/formatSize.js";
import getFolderSize from "get-folder-size";
import log from "./modules/logger.js";
import processSrcDir from "./modules/filePath.js";

if (baseDir == null) {
  console.error("Base directory not provided.");
  process.exit(1);
}

// First, create the output directories
createOutputDirs();

// Then, process the directory
processSrcDir(baseDir);

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
