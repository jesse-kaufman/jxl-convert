/* eslint-disable no-magic-numbers */
/**
 * Configuration.
 */
import fsp from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import log from "../services/logger/logger.js";

// Get configuration options from config file
const configFileOpts = await getConfigOptions();

/**
 * Base dir to be processed (sent via CLI arguments).
 * @type {string}
 */
export const baseDir = process.argv[2] || "";

/**
 * Output directory for JXL files.
 * @type {string}
 */
export const jxlDir = path.join(baseDir, "jxl");

/**
 * Destination directory for original files.
 * @type {string}
 */
export const origDir = path.join(baseDir, "orig");

/**
 * Number of spaces to pad file sizes in summary.
 * @type {number}
 */
export const padding = configFileOpts.padding || 12;

/**
 * Number of places to show on file sizes in summary.
 * @type {number}
 */
export const places = configFileOpts.places || 1;

/**
 * Valid file extensions for input files.
 * @type {Array<string>}
 */
export const validFileExts = configFileOpts.validFileExts || [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
];

/**
 * Whether or not to print debug messages to stdout.
 */
export const debug = process.env.DEBUG || configFileOpts.debug || false;

/**
 * Whether or not to log debug messages to log file.
 */
export const logFileDebug = configFileOpts.logFileDebug || true;

/**
 * Image quality to use when converting to JXL.
 * @type {number}
 */
export const imageQuality = configFileOpts.imageQuality || 80;

/**
 * Configuration file options.
 * @typedef {object} ConfigFileOpts
 * @property {number} [padding] - Number of spaces to pad file sizes in summary (default: 12).
 * @property {number} [places] - Number of places to round numbers in summary (default: 2).
 * @property {boolean} [debug] - Whether or not to print debug messages to stdout.
 * @property {boolean} [logFileDebug] - Whether or not to log debug messages to to log file.
 * @property {Array<string>} [validFileExts] - Array of valid file extensions.
 * @property {number} [imageQuality] - Image quality to use when converting to JXL.
 */

/**
 * Gets configuration options from config file.
 * @returns {Promise<ConfigFileOpts>} - Configuration file options.
 */
async function getConfigOptions() {
  // Read the config file content into a string
  const configFile = await readConfigFile();

  // If config file doesn't exist or is empty, return empty object
  if (configFile == null) return {};

  try {
    // Parse the YAML content into an object and return
    return YAML.parse(configFile);
  } catch (err) {
    // Syntax error in config file
    if (err instanceof Error) {
      console.error("Unable to parse config file:", err.message, err.stack);
      // Exit early
      process.exit(1);
    }
  }

  // Return empty object by default
  return {};
}

/**
 * Reads configuration options from config file.
 * @returns {Promise<string|void>} - Contents of the config file.
 */
async function readConfigFile() {
  const configFile = "./jxl-convert.config.yaml";

  log.info(`Reading config file: ${configFile}`);

  try {
    // Return the file content if it exists
    return await fsp.readFile(configFile, "utf8");
  } catch (err) {
    // All other errors
    if (err instanceof Error) {
      // Log message and return immediately if config file does not exist
      // @ts-ignore
      if (err?.code === "ENOENT") {
        return log.info("No config file found. Using default options.");
      }

      // Log other errors and exit the app
      log.error("Unable to read config file:", err.message, err.stack);
      process.exit(1);
    }
    log.error("Error reading config file:", err);
  }
}

/**
 * Configuration options.
 * @typedef {object} Config
 * @property {string|null} baseDir - Base directory to be processed (sent via CLI arguments).
 * @property {string|null} jxlDir - Output directory for JXL files.
 * @property {string|null} origDir - Destination directory for original files.
 * @property {number} padding - Number of spaces to pad file sizes in summary (default: 12).
 * @property {number} places - Number of places to round numbers in summary (default: 2).
 * @property {boolean} debug - Whether or not to print debug messages to stdout.
 * @property {boolean} logFileDebug - Whether or not to log debug messages to to log file.
 * @property {number} imageQuality - Image quality for conversion.
 * @property {Array<string>} validFileExts - Array of valid file extensions.
 */
