import "./env.js";
import express from "express";
import cors from "cors";
import resumeRouter from "./src/features/resumeRanker/router/resume.router.js";
import path from "path";
import {
  customError,
  errorHandler,
} from "./src/middleware/errorHandler.middleware.js";
import { logger } from "./src/middleware/logger.middleware.js";
import { upload } from "./src/middleware/fileUpload.middleware.js";

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/reports", express.static(path.join(path.resolve(), "reports")));
app.use(cors());
app.use(upload.array("resumeUpload", 100));
app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${JSON.stringify(req.body)}`, {
    url: req.url,
  });
  next();
});
app.get("/", (req, res, next) => {
  return res.send(
    "Welcome to Restful API's application server of Resume Ranker"
  );
});

app.use("/api/resumes", resumeRouter);

app.use((req, res) => {
  throw new customError(
    "API not found. Please refer to our documentation page /api-docs",
    404
  );
});
app.use(errorHandler);

export default app;
