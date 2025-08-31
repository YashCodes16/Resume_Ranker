import puppeteer from "puppeteer";
import path from "path";

const generateHTML = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Resume Report</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; padding: 40px; background: #f9f9f9; }
    h1 { color: #4B0082; }
    .section { margin: 20px 0; }
    .score-box { background: #e6e6ff; padding: 10px; margin: 5px 0; border-left: 5px solid #4B0082; border-radius: 5px; }
    ul { padding-left: 20px; }
  </style>
</head>
<body>
  <h1>Resume Analysis Report</h1>

  <div class="section"><strong>File Name:</strong> ${data.fileName}</div>
  <div class="score-box"><strong>Spacy Score:</strong> ${data.spacyScore}%</div>
  <div class="score-box"><strong>Jaccard Score:</strong> ${
    data.jaccardScore
  }</div>
  <div class="score-box"><strong>Match Score:</strong> ${data.matchScore}%</div>
  <div class="score-box"><strong>ATS Compatible:</strong> ${
    data.atsCompatible ? "Yes" : "No"
  }</div>

  <div class="section"><strong>Matched Skills:</strong> ${
    data.matchedSkills?.join(", ") || "N/A"
  }</div>
  <div class="section"><strong>Missing Skills:</strong> ${
    data.missingSkills?.join(", ") || "N/A"
  }</div>
  <div class="section"><strong>Extracted Skills From JD:</strong> ${
    data.extractedSkillsFromJD?.join(", ") || "N/A"
  }</div>

  <div class="section">
    <strong>Top Keywords:</strong>
    <ul>
      ${(data.topKeywords || [])
        .map(([kw, count]) => `<li>${kw} (${count})</li>`)
        .join("")}
    </ul>
  </div>

  <div class="section">
    <strong>Section Scores:</strong>
    <ul>
      ${Object.entries(data.sectionScores || {})
        .map(([section, score]) => `<li>${section}: ${score}</li>`)
        .join("")}
    </ul>
  </div>

  <div class="section">
    <strong>Format Issues:</strong>
    <ul>
      ${(data.formatIssues || []).map((issue) => `<li>${issue}</li>`).join("")}
    </ul>
  </div>

  <div class="section">
    <strong>Recommendations:</strong>
    <ul>
      ${(data.recommendations || []).map((r) => `<li>${r}</li>`).join("")}
    </ul>
  </div>

  <div class="section"><strong>Word Count:</strong> ${data.wordCount}</div>

  <div class="section"><strong>Summary:</strong><br>${
    data.summaryText || "No summary available."
  }</div>
</body>
</html>
`;

async function generatePDF(analysis, fileName) {
  const html = generateHTML(analysis);
  const filePath = path.join(path.resolve(), "reports", `${fileName}.pdf`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,
    margin: { top: "40px", bottom: "40px", left: "40px", right: "40px" },
  });

  await browser.close();

  return filePath;
}

export default generatePDF;
