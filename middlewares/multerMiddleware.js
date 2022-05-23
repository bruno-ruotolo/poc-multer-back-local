import multer from "multer";
import path from "path"
import { fileURLToPath } from 'url';
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const multerConfig = {
  dest: path.resolve(__dirname, "..", "tmp", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, "..", "tmp", "uploads"));
    },
    filename: (req, file, callback) => {
      const fileName = `${uuid()}-${file.originalname}`

      callback(null, fileName)
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    }
    else {
      callback(new Error("Invalid File Type"))
    }
  }
}
