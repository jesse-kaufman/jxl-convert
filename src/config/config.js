/**
 * Configuration
 */
import path from "path";

/** Base dir to be processed (sent via CLI arguments) @const {string|null} */
export const baseDir = process.argv[2] || "";

// Output directory for JXL files
export const jxlDir = path.join(baseDir, "jxl");

// Destination directory for original files
export const origDir = path.join(baseDir, "orig");

// Number of spaces to pad file sizes in summary
export const padding = 12;

// Number of places to show on file sizes in summary
export const places = 1;

export const validExts = [".jpg", ".jpeg", ".png", ".webp", ".heic"];

export default {
  baseDir,
  padding,
  places,
  jxlDir,
  origDir,
  validExts,
};
