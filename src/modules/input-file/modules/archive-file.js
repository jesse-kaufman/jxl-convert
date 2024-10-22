/**
 * Helper function to archive original files into the "orig" dir
 * @param {string} filePath
 * @param {string} origPath
 */
export function archiveOrigFile(filePath, origPath) {
  // Copy original file to the "orig" directory
  fs.rename(filePath, path.join(origPath, path.basename(filePath)), (err) => {
    if (err) {
      log.error(err);
      process.exit(1);
    }
    log.success(`Copied original file to ${origPath}`);
  });
}