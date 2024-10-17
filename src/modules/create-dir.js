import fs from "fs";
import log from "./logger.js";

/**
 * Creates a directory if it doesn't exist already.
 * @param {string} dir The directory to create
 */
const createDir = (dir) => {
  log.debug(`Creating ${dir} directory...`);

  // Try to create the directory

  fs.mkdir(dir, (err) => {
    // Successfully created directory
    if (err == null) return log.success(`${dir} created successfully`);

    // Directory already existed
    if (err?.code === "EEXIST") return log.success(`${dir} already exists`);

    // An error occurred
    log.error("Create dir", err);
    process.exit(1);
  });
};

export default createDir;
