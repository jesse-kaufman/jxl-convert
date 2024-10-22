export default {
  /**
   * Logs a success message to the console in green color.
   *
   * @param {string} msg The message to be logged.
   * @returns {void}
   */
  success: (msg) => console.log(`\x1b[1m\x1b[32m${msg}\x1b[0m`),

  /**
   * Logs an error message to the console in red color.
   *
   * @param {string} msg The message to be logged.
   * @returns {void}
   */
  error: (msg) => console.error(`\x1b[1m\x1b[31m${msg}\x1b[0m`),

  /**
   * Logs a warning message to the console in yellow color.
   *
   * @param {string} msg The message to be logged.
   * @returns {void}
   */
  warn: (msg) => console.warn(`\x1b[33m${msg}\x1b[0m`),

  /**
   * Logs a message to the console.
   *
   * @param {string} msg The message to be logged.
   * @returns {void}
   */
  info: (msg) => console.info(msg),

  /**
   * Logs a highlighted message to the console.
   *
   * @param {string} msg The message to be logged.
   * @returns {void}
   */
  notice: (msg) => console.info(`\x1b[34m${msg}\x1b[0m`),

  /**
   * Logs a debug message to the console if debugging is enabled.
   *
   * @param {string} msg The message to be logged.
   * @returns {void|null}
   */
  debug: (msg) => {
    if (process.env.DEBUG) console.debug(`[DEBUG] ${msg}`);
  },
};
