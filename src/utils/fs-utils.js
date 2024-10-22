import fs from "fs";

import log from "./logger.js";

/**
 * Creates a directory if it doesn't exist already.
 * @param {string|null} dir The directory to create
 */
export const createDir = (dir) => {
  if (!dir) return;

  // Try to create the directory
  log.debug(`Creating ${dir} directory...`);
  fs.mkdir(dir, (err) => {
    // Successfully created directory
    if (err == null) return log.success(`${dir} created successfully`);

    // Directory already existed
    if (err?.code === "EEXIST") return log.success(`${dir} already exists`);

    // An error occurred
    log.error(err.message);
    process.exit(1);
  });
};

/**
 * Helper function to get directory contents without needing to import fs in app
 * @param {string} dir The directory
 * @returns {Array<string>} The contents
 */
export const getDirContents = (dir) => fs.readdirSync(dir);
