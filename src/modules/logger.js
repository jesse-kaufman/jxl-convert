export default {
  success: (msg) => {
    console.log(`\x1b[1m\x1b[32m${msg}\x1b[0m`);
  },
  error: (msg) => {
    console.error(`\x1b[1m\x1b[31m${msg}\x1b[0m`);
  },
  warn: (msg) => {
    console.warn(`\x1b[33m${msg}\x1b[0m`);
  },
  info: (msg) => {
    console.info(msg);
  },
  notice: (msg) => {
    console.info(`\x1b[34m${msg}\x1b[0m`);
  },
};
