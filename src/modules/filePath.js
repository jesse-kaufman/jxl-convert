import { baseDir, jxlDir, origDir } from "../config/config.js";
import convert from "./imageConvert.js";
import { createDir } from "./setup.js";
import fs from "fs";
import log from "./logger.js";
import path from "path";

const getOutPath = (inFilePath) => inFilePath.replace(baseDir, `${jxlDir}/`);

const getOutFileName = (inFile) => path.basename(inFile, path.extname(inFile));

const getInFilePath = (dir, file) => path.normalize(`${dir}/${file}`);

const getOrigPath = (inFilePath) => inFilePath.replace(baseDir, `${origDir}/`);

const process = (dir) => {
  if (dir === jxlDir || dir === origDir) return;

  log.notice(`Processing directory: ${dir}...`);

  console.log(`Creating directory ${getOutPath(dir)}`);
  createDir(getOutPath(dir));
  createDir(getOrigPath(dir));

  const files = fs.readdirSync(dir);
  files.map((file) => processPath(dir, file));
};

const doProcessFile = (filePath) =>
  [".jpg", ".jpeg", ".png", ".webp", ".heic"].includes(
    path.extname(filePath).toLowerCase()
  );

const processFile = (filePath) => {
  if (doProcessFile(filePath)) {
    const outFileName = getOutFileName(filePath);
    const outPath = path.dirname(getOutPath(filePath));
    const origPath = path.dirname(getOrigPath(filePath));

    log.notice(`Processing file: ${filePath}`);

    // Convert to JXL
    convert(filePath, path.join(outPath, `${outFileName}.jxl`));
    log.success(`Saved JXL to ${outPath}`);

    // Copy original file to the "orig" directory
    fs.rename(filePath, path.join(origPath, path.basename(filePath)), (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      log.success(`Copied original file to ${origPath}`);
    });
  }
};

function processPath(dir, file) {
  const filePath = getInFilePath(dir, file);
  fs.stat(filePath, (err, fileStat) => {
    if (err) {
      log.error(`Error reading file: ${filePath}`);
      return;
    }

    // Path is a directory
    if (fileStat.isDirectory()) return process(filePath);

    // Process the file
    if (fileStat.isFile()) return processFile(filePath);
  });
}

export default process;
