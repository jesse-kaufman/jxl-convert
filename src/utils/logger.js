/**
 * Utilities for logging.
 * @module utils/logging
 */
export default {
  /**
   * Logs a success message to the console in green color.
   *
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   */
  success: (msg, ...args) =>
    console.log(`\x1b[1m\x1b[32m${msg}\x1b[0m`, ...args),

  /**
   * Logs an error message to the console in red color.
   *
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   */
  error: (msg, ...args) =>
    console.error(`\x1b[1m\x1b[31m${msg}\x1b[0m`, ...args),

  /**
   * Logs a warning message to the console in yellow color.
   *
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   */
  warn: (msg, ...args) => console.warn(`\x1b[33m${msg}\x1b[0m`, ...args),

  /**
   * Logs a message to the console.
   *
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   */
  info: (msg, ...args) => console.info(msg, ...args),

  /**
   * Logs a highlighted message to the console.
   *
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   */
  notice: (msg, ...args) => console.info(`\x1b[34m${msg}\x1b[0m`, ...args),

  /**
   * Logs a debug message to the console if debugging is enabled.
   *
   * @param {string} msg - The message.
   * @param {any} args - Additional arguments.
   */
  debug: (msg, ...args) => {
    if (process.env.DEBUG) console.debug(`[DEBUG] ${msg}`, ...args);
  },
};
