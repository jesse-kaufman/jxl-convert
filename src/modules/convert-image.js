import { execSync } from "node:child_process";
import log from "./logger.js";

/**
 * This function uses ImageMagick to convert an input image file to another format.//+
 * It applies a quality setting of 75% to the output image.//+
 *
 * @param {string} inFilePath - The path to the input image file.//+
 * @param {string} outFilePath - The path to the output image file.//+
 * @returns {Promise<void>} - A promise that resolves when the conversion is complete.//+
 *
 * @throws Will throw an error if the conversion process encounters any issues.//+
 * @throws Will log the features of the converted image to the console.//+
 */
export default (inFilePath, outFilePath) => {
  const command = `magick "${inFilePath}" -quality 80 "${outFilePath}"`;

  try {
    execSync(command);
  } catch (error) {
    log.error(`Error executing command: ${error.message}`);
    throw error;
  }

  log.success("Finished successfully!");
  log.debug(`Saved JXL to ${outFilePath}`);
};
