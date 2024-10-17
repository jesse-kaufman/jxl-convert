import { execSync } from "node:child_process";
import log from "./logger.js";

/**
 * This function uses ImageMagick to convert an input image file to another format.//+
 * It applies a quality setting of 75% to the output image.//+
 *
 * @param {string} inFile - The path to the input image file.//+
 * @param {string} outFile - The path to the output image file.//+
 * @returns {Promise<void>} - A promise that resolves when the conversion is complete.//+
 *
 * @throws Will throw an error if the conversion process encounters any issues.//+
 * @throws Will log the features of the converted image to the console.//+
 */
export default (inFile, outFile) => {
  const command = `magick "${inFile}" -quality 80 "${outFile}"`;

  try {
    execSync(command);
  } catch (error) {
    log.error(`Error executing command: ${error.message}`);
    throw error;
  }

  log.success("Finished successfully!");
};
