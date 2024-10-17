/**
 * Configuration
 */
import path from "path";

// Base dir to be processed (sent via CLI arguments)
export const baseDir = process.argv[2] || null;
// Output directory for JXL files
export const jxlDir = baseDir ? path.join(baseDir, "jxl") : null;
// Destination directory for original files
export const origDir = baseDir ? path.join(baseDir, "orig") : null;

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
