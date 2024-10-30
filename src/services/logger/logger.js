/**
 * Wrapper for winston logging library.
 * @module services/logging
 */

import { debug } from "../../config/config.js";
import logger from "./utils/winston.js";

/**
 * Wrapper object for winston logging library.
 * @property {Function} success - Log success message.
 * @property {Function} error - Log error message.
 * @property {Function} warning - Log warning message.
 * @property {Function} notice - Log notice message.
 * @property {Function} info - Log info message.
 * @property {Function} debug - Log debug message.
 */
export default {
  /**
   * Logs a success message to the console in green color.
   * @param {string} msg - The message.
   */
  success(msg) {
    logger.log("success", msg);
  },

  /**
   * Logs an error message to the console in red color.
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   * @returns {void}
   */
  error(msg, ...args) {
    logger.error(msg, ...args);
  },

  /**
   * Logs a warning message to the console in yellow color.
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   * @returns {void}
   */
  warn(msg, ...args) {
    logger.warn(msg, ...args);
  },

  /**
   * Logs a message to the console.
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   * @returns {void}
   */
  info(msg, ...args) {
    logger.info(msg, ...args);
  },

  /**
   * Logs a highlighted message to the console.
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   * @returns {void}
   */
  notice(msg, ...args) {
    logger.notice(msg, ...args);
  },

  /**
   * Logs a debug message to the console if debugging is enabled.
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   */
  debug(msg, ...args) {
    if (debug) logger.debug(`${msg}`, ...args);
  },
};
