import { GB, MB } from "modules/constants.js";
import { padding, places } from "../config/config.js";

/**
 * Converts bytes to human-readable format, optionally with padding.
 * @param {number} bytes Number of bytes to convert.
 * @returns {string} Human-readable format of the size.
 */
const formatSize = (bytes, pad = false) => {
  let size = (bytes / MB).toFixed;
  let label = "MB";

  if (bytes > GB) {
    size = bytes / GB;
    label = "GB";
  }

  size = size.toFixed(places);

  const formattedSize = pad ? size.padStart(padding, ".") : size;

  return `${formattedSize} ${label}`;
};

export default formatSize;
