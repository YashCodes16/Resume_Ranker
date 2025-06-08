import multer from "multer";
import { customError } from "./errorHandler.middleware.js";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadDir = "./uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename =
      new Date().toISOString().replace(/[:.]/g, "-") + "-" + file.originalname;

    // Attach filenames to request for later access
    if (!req.uploadedFilenames) {
      req.uploadedFilenames = [];
    }
    req.uploadedFilenames.push(filename);

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new customError("Only PDF, DOC, and DOCX files are allowed.",400), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: 5MB max per file
});
