import { body, validationResult, check } from "express-validator";

import path from "path";

const allowedExtensions = [".pdf", ".doc", ".docx"];

export const validateResumeUpload = [
  body("jobDescription")
    .notEmpty()
    .withMessage("Job description is required.")
    .isLength({ min: 10 })
    .withMessage("Job description should be at least 10 characters."),

  check("resumeUpload").custom((value, { req }) => {
    const files = req.files;
    if (!files || (Array.isArray(files) && files.length === 0)) {
      throw new Error("At least one resume file must be uploaded.");
    }

    const fileList = Array.isArray(files) ? files : [files];

    let totalSize = 0;

    for (const file of fileList) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        throw new Error(`Invalid file type: ${file.originalname}`);
      }
      totalSize += file.size;
    }

    if (totalSize > 100 * 1024 * 1024) {
      throw new Error("Total file size must be less than 10MB.");
    }

    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((err) => err.msg) });
    }
    next();
  },
];
