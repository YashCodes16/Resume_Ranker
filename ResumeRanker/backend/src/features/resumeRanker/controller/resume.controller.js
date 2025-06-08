import axios from "axios";
import generatePDF from "../service/generatePDF.service.js";
import { extractFileContent } from "../service/fileupload.service.js";

import fs from "fs";

export default class ResumeController {
  async rateTheResume(req, res, next) {
    try {
      let id = 1;
      let responses = [];
      for (let i = 0; i < req.files.length; i++) {
        let data = await extractFileContent(req.files[i]);
        const analyze = await axios.post("http://localhost:5000/analyze", {
          resumeText: data.resumeText,
          jobDescription: req.body.jobDescription,
        });
        let response = {
          id: id,
          fileName: data.fileName,
          spacyScore: analyze.data.spacyScore,
          jaccardScore: analyze.data.jaccardScore,
          matchScore: analyze.data.matchScore,
          matchedKeywords: analyze.data.matchedKeywords || [],
          matchedSkills: analyze.data.matchedSkills || [],
          missingSkills: analyze.data.missingSkills || [],
          extractedSkillsFromJD: analyze.data.extractedSkillsFromJD || [],
          topKeywords: analyze.data.topKeywords || [],
          recommendations: analyze.data.recommendations || [],
          wordCount: analyze.data.wordCount || 0,
          sectionScores: analyze.data.sectionScores || {},
          atsCompatible: analyze.data.atsCompatible,
          formatIssues: analyze.data.formatIssues || [],
          summaryText: analyze.data.summaryText || "",
        };

        responses.push(response);
        id++;
      }
      res.status(200).json(responses);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to analyze resume." });
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
