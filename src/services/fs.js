import fsp from "node:fs/promises";
import log from "./logger/logger.js";

/**
 * Creates a directory if it doesn't exist already.
 * @param {string|null} dir - The directory to create.
 * @returns {Promise<void>} Promise.
 */
export const createDir = async (dir) => {
  // If directory is null, no need to create it
  if (!dir) return;

  log.debug(`Creating ${dir} directory...`);

  try {
    // Create the directory
    await fsp.mkdir(dir);
  } catch (err) {
    // Directory already existed
    // @ts-ignore
    if (err?.code === "EEXIST") return log.success(`${dir} already exists`);

    // An error occurred
    // @ts-ignore
    log.error(err.message);
    process.exit(1);
  }

  // Successfully created directory
  log.success(`${dir} created successfully`);
};
