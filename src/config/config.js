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
 * Configuration file options.
 * @typedef {object} ConfigFileOpts
 * @property {number} [padding] - Number of spaces to pad file sizes in summary (default: 12).
 * @property {number} [places] - Number of places to round numbers in summary (default: 2).
 * @property {boolean} [debug] - Whether or not to print debug messages to stdout.
 * @property {boolean} [logFileDebug] - Whether or not to log debug messages to to log file.
 * @property {Array<string>} [validFileExts] - Array of valid file extensions.
 */

/**
 * Gets configuration options from config file.
 * @returns {Promise<ConfigFileOpts>} - Configuration file options.
 */
async function getConfigOptions() {
  const configFile = await readConfigFile();

  if (configFile === "") return {};

  try {
    // Parse the YAML content into an object
    return YAML.parse(configFile);
  } catch (err) {
    // Syntax error in config file
    if (err instanceof Error) {
      console.error("Unable to parse config file:", err.message, err.stack);
      // Exit early
      process.exit(1);
    }
  }

  return {};
}

/**
 * Reads configuration options from config file.
 * @returns {Promise<string>} - Contents of the config file.
 */
async function readConfigFile() {
  const configFile = "./jxl-convert.config.yaml";

  try {
    // Read the config file content
    log.info("Reading config file:", configFile);
    const file = await fsp.readFile(configFile, "utf8");
    return file;
  } catch (err) {
    // All other errors
    if (err instanceof Error) {
      // Skip non-ENOENT errors (file not found)
      // @ts-ignore
      if (err?.code === "ENOENT") {
        log.info("No config file found. Using default options.");
      } else {
        log.error("Unable to read config file:", err.message, err.stack);
      }
    } else {
      log.error("Error reading config file:", err);
    }
  }

  return "";
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
 * @property {Array<string>} validFileExts - Array of valid file extensions.
 */
