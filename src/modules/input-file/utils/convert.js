/**
 * Utility to convert an image to JXL.
 * @module utils/convert
 */
import { exec } from "node:child_process";
import { promisify } from "node:util";
import log from "../../../services/logger/logger.js";

// Promisify exec function
const execAsync = promisify(exec);

/**
 * Converts input image to JXL using a quality setting of 75%.
 * @param {string} inFilePath - The path to the input image file.
 * @param {string} outFilePath - The path to the output image file.
 * @param {number} imageQuality - Quality for ImageMagick conversion.
 */
export default async (inFilePath, outFilePath, imageQuality) => {
  // Construct ImageMagick command to convert the image to JXL with a quality of 80%
  const command = `magick "${inFilePath}" -quality ${imageQuality} "${outFilePath}"`;
  log.debug(command);

  try {
    // Execute ImageMagick command to convert the image to JXL
    await execAsync(command);
    // Log success
    log.success(`SUCCESS!\nSaved JXL to ${outFilePath}`);
  } catch (err) {
    // If an error occurred, log the error message and throw the error
    if (err instanceof Error) {
      // Log error
      log.error(`Error executing ImageMagick: ${err.message}`);
      // Exit app
      process.exit(1);
    }
  }
};
