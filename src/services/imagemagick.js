/**
 * ImageMagick service.
 * @module services/imagemagick
 */
import { exec } from "node:child_process";
import { promisify } from "node:util";
import log from "./logger/logger.js";

// Promisify exec
const execAsync = promisify(exec);

/**
 * Check if ImageMagick is available.
 * @returns {Promise<boolean>} - True if ImageMagick is available.
 */
export const checkImageMagick = async () => {
  try {
    await execAsync("magick -version");
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return false;
  }

  return true;
};

/**
 * Runs ImageMagick conversion on a file.
 * @param {string} srcFile - Source file to convert.
 * @param {string} destFile - Destination file.
 * @param {number} quality - Quality of conversion.
 * @returns {Promise<boolean>} - True if conversion is successful, otherwise false.
 */
export const convert = async (srcFile, destFile, quality) => {
  const command = `magick "${srcFile}" -quality ${quality} "${destFile}"`;
  log.debug(command);

  try {
    // Execute ImageMagick command to convert the image to JXL
    await execAsync(command);
    return true;
  } catch (err) {
    // If an error occurred, log the error message and throw the error
    if (err instanceof Error) {
      // Log error
      log.error(`Error executing ImageMagick: ${err.message}`);
      // Exit app
      process.exit(1);
    }
  }

  return false;
};
