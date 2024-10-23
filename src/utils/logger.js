export default {
  /**
   * Logs a success message to the console in green color.
   *
   * @param {any} msgs The message(s) to be logged.
   * @returns {void}
   */
  success: (...msgs) =>
    console.log(`\x1b[1m\x1b[32m${msgs.shift()}\x1b[0m`, ...msgs),

  /**
   * Logs an error message to the console in red color.
   *
   * @param {any} msgs The message(s) to be logged.
   * @returns {void}
   */
  error: (...msgs) =>
    console.error(`\x1b[1m\x1b[31m${msgs.shift()}\x1b[0m`, ...msgs),

  /**
   * Logs a warning message to the console in yellow color.
   *
   * @param {any} msgs The message(s) to be logged.
   * @returns {void}
   */
  warn: (...msgs) => console.warn(`\x1b[33m${msgs.shift()}\x1b[0m`, ...msgs),

  /**
   * Logs a message to the console.
   *
   * @param {any} msgs The message(s) to be logged.
   * @returns {void}
   */
  info: (...msgs) => console.info(...msgs),

  /**
   * Logs a highlighted message to the console.
   *
   * @param {any} msgs The message(s) to be logged.
   * @returns {void}
   */
  notice: (...msgs) => console.info(`\x1b[34m${msgs.shift()}\x1b[0m`),

  /**
   * Logs a debug message to the console if debugging is enabled.
   *
   * @param {any} msgs The message(s) to be logged.
   * @returns {void|null}
   */
  debug: (...msgs) => {
    if (process.env.DEBUG) console.debug(`[DEBUG] ${msgs.shift()}`, ...msgs);
  },
};
