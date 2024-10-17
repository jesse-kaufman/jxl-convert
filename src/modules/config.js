import path from "path";

const baseDir = process.argv[2] || null;

export default {
  baseDir,
  jxlDir: baseDir ? path.join(baseDir, "jxl") : null,
  origDir: baseDir ? path.join(baseDir, "orig") : null,
};

