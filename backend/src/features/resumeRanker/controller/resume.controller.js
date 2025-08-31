import generatePDF from "../service/generatePDF.service.js";
import extractFileContent from "../service/fileToText.service.js";
import loadBalancer from "../service/loadBalancer.service.js";
import pLimit from 'p-limit';

import fs from "fs";

export default class ResumeController {
  async rateTheResume(req, res, next) {
    try {
      const jobDescription = req.body.jobDescription;
      const files = req.files;
      const limit = pLimit(20);
      const analysisPromises = files.map((file, index) =>
        limit(async () => {
          const start = performance.now();
          const data = await extractFileContent(file);
          const end = performance.now();
          console.log(
            `${file.originalname} processed in ${(end - start) / 1000}s`
          );
          const reqData = {
            resumeText: data.resumeText,
            jobDescription,
          };
          const analyze = await loadBalancer(reqData, file.originalname);

          return {
            id: index + 1,
            fileName: file.originalname,
            spacyScore: analyze.spacyScore,
            jaccardScore: analyze.jaccardScore,
            matchScore: analyze.matchScore,
            matchedKeywords: analyze.matchedKeywords || [],
            matchedSkills: analyze.matchedSkills || [],
            missingSkills: analyze.missingSkills || [],
            extractedSkillsFromJD: analyze.extractedSkillsFromJD || [],
            topKeywords: analyze.topKeywords || [],
            recommendations: analyze.recommendations || [],
            wordCount: analyze.wordCount || 0,
            sectionScores: analyze.sectionScores || {},
            atsCompatible: analyze.atsCompatible,
            formatIssues: analyze.formatIssues || [],
            summaryText: analyze.summaryText || "",
          };
        })
      );

      console.time("Total resume processing");
      const responses = await Promise.all(analysisPromises);
      console.timeEnd("Total resume processing");

      res.status(200).json(responses);

    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async generatePDFReport(req, res, next) {
    try {
      let fileName = req.body.fileName.split(".")[0];
      fileName = fileName.split(" ").join("");
      const filePath = await generatePDF(req.body, fileName);

      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error("File read error:", err);
          return res.status(500).send("Error reading file");
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fileName}.pdf"`
        );
        res.status(201).send(data);
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({ error: "Failed to generate PDF" });
    }
  }
}
