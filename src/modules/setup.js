import config from "./config.js";
import fs from "fs";
import log from "./logger.js";

export function createDir(dir) {
  //log.info(`Creating ${dir} directory...`);

  // Try to create the directory
  fs.mkdir(dir, (err) => {
    // Successfully created directory
    if (err == null) return log.success(`${dir} created successfully`);

    // Directory already existed
    if (err?.code === "EEXIST") return; //log.success(`${dir} already exists`);

    // An error occurred
    log.error("Create dir", err);
    process.exit(1);
  });
}

export const createOutputDirs = () => {
  const { jxlDir, origDir } = config;

  [jxlDir, origDir].map((dir) => createDir(dir));
};
