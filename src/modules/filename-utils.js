import path from "path";

export const isValidFileType = (filePath) =>
  [".jpg", ".jpeg", ".png", ".webp", ".heic"].includes(
    path.extname(filePath).toLowerCase()
  );
