import express from "express";
import ResumeController from "../controller/resume.controller.js";
import { validateResumeUpload } from "../../../middleware/validator.middleware.js";
import { upload } from "../../../middleware/fileUpload.middleware.js";
let router = express.Router();
let analyzer = new ResumeController();
router.post("/", validateResumeUpload, (req, res, next) => {
  analyzer.rateTheResume(req, res, next);
});
router.post("/generate-pdf", (req, res, next) => {
  analyzer.generatePDFReport(req, res, next);
});

export default router;
