/**
 * Utility to convert an image to JXL.
 * @module utils/convert
 */
import { execSync } from "node:child_process";
import log from "../../../services/logger/logger.js";

/**
 * Converts input image to JXL using a quality setting of 75%.
 * @param {string} inFilePath - The path to the input image file.
 * @param {string} outFilePath - The path to the output image file.
 * @throws Will throw an error if the conversion process encounters any issues.
 */
export default (inFilePath, outFilePath) => {
  const command = `magick "${inFilePath}" -quality 80 "${outFilePath}"`;
  log.debug(command);

  try {
    // Execute ImageMagick command to convert the image to JXL
    execSync(command);
  } catch (err) {
    // If an error occurred, log the error message and throw the error
    if (err instanceof Error) {
      log.error(`Error executing ImageMagick: ${err.message}`);
    }
    throw err;
  }

  log.debug(`SUCCESS! Saved JXL to ${outFilePath}`);
};
