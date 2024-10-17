import config from "./modules/config.js";
import { createOutputDirs } from "./modules/setup.js";
import getFolderSize from "get-folder-size";
import log from "./modules/logger.js";

const KB = 1024;
// eslint-disable-next-line no-magic-numbers
const MB = KB * 1024;
// eslint-disable-next-line no-magic-numbers
const GB = MB * 1024;

const { baseDir, jxlDir, origDir } = config;

if (baseDir == null) {
  console.error("Base directory not provided.");
  process.exit(1);
}

// First, create the output directories
createOutputDirs();

// Then, process the directory
processSrcDir(baseDir);

const formatSize = (bytes) => {
  let size = bytes / MB;
  let label = "MB";
  const padding = 12;
  const places = 1;

  if (bytes > GB) {
    size = bytes / GB;
    label = "GB";
  }

  return `${size.toFixed(places).padStart(padding, ".")} ${label}`;
};

const origDirSize = await getFolderSize.loose(origDir);
const jxlDirSize = await getFolderSize.loose(jxlDir);
const totalSaved = origDirSize - jxlDirSize;

log.info("\n\n");
log.info("================================================================");
log.notice(` JXL optimization results for ${baseDir}:`);
log.info("================================================================");
log.info(` Original.${formatSize(origDirSize)}`);
log.info(` Optimized${formatSize(jxlDirSize)}`);
log.info(` Saved....${formatSize(totalSaved)}`);
log.info("================================================================");
