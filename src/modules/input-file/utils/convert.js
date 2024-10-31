/**
 * Utility to convert an image to JXL.
 * @module utils/convert
 */
import { exec } from "node:child_process";
import { promisify } from "node:util";
import log from "../../../services/logger/logger.js";
import { convert } from "../../../services/imagemagick.js";

// Promisify exec function
const execAsync = promisify(exec);

/**
 * Converts input image to JXL using a quality setting of 75%.
 * @param {string} inFilePath - The path to the input image file.
 * @param {string} outFilePath - The path to the output image file.
 * @param {number} imageQuality - Quality for ImageMagick conversion.
 */
export default async (inFilePath, outFilePath, imageQuality) => {
  // Run conversion on file
  const success = await convert(inFilePath, outFilePath, imageQuality);

  if (success) {
    log.success(`SUCCESS!\nSaved JXL to ${outFilePath}`);
  }
};

/**
 * Check if ImageMagick is available.
 * @returns {Promise<boolean>} - True if ImageMagick is available.
 */
export const imageMagickExists = async () => {
  try {
    await execAsync("magick -version");
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return false;
  }

  return true;
};
