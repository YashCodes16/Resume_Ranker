// Function to create a report item

// var responseData = [
//   {
//     id: 1,
//     fileName: "Copy of Student Athlete Resume.docx",
//     spacyScore: 77.62,
//     jaccardScore: 0.01,
//     matchScore: 50,
//     matchedKeywords: [],
//     matchedSkills: ["experience"],
//     missingSkills: ["nlp", "python", "engineer", "sakjd", "look"],
//     extractedSkillsFromJD: [
//       "nlp",
//       "python",
//       "experience",
//       "engineer",
//       "sakjd",
//       "look",
//     ],
//     topKeywords: [
//       ["student", 5],
//       ["southeastern", 4],
//       ["university", 4],
//       ["la", 4],
//       ["august", 4],
//       ["athlete", 4],
//       ["team", 4],
//       ["louisiana", 3],
//       ["hammond", 3],
//       ["work", 3],
//     ],
//     recommendations: [
//       "Add missing skills: Nlp, Python, Engineer",
//       "Add a professional summary section",
//       "Ensure sections like Education, Experience, and Skills are clearly labeled",
//       "Add a professional summary section",
//       "Ensure sections like Education, Experience, and Skills are clearly labeled",
//       "Address mixed font formatting issues",
//       "Include more quantifiable achievements and action verbs",
//       "Highlight technical experience or tools more prominently",
//     ],
//     wordCount: 276,
//     sectionScores: {
//       content: 55,
//       format: 70,
//       sections: 100,
//       style: 50,
//       tailoring: 93,
//     },
//     atsCompatible: true,
//     formatIssues: ["Mixed fonts detected", "Missing summary section"],
//     summaryText:
//       "Your resume is well-structured but lacks 2-3 key skills from the JD. Add more quantifiable achievements.",
//   },
//   {
//     id: 2,
//     fileName: "Basic_Resume.docx.pdf",
//     spacyScore: 77.68,
//     jaccardScore: 0.01,
//     matchScore: 39,
//     matchedKeywords: [],
//     matchedSkills: ["experience"],
//     missingSkills: ["nlp", "python", "engineer", "sakjd", "look"],
//     extractedSkillsFromJD: [
//       "nlp",
//       "python",
//       "experience",
//       "engineer",
//       "sakjd",
//       "look",
//     ],
//     topKeywords: [
//       ["skill", 14],
//       ["year", 9],
//       ["state", 8],
//       ["bullet", 7],
//       ["point", 7],
//       ["project", 6],
//       ["experience", 4],
//       ["month", 4],
//       ["action", 4],
//       ["verb", 4],
//     ],
//     recommendations: [
//       "Add missing skills: Nlp, Python, Engineer",
//       "Add a professional summary section",
//       "Ensure sections like Education, Experience, and Skills are clearly labeled",
//       "Add a professional summary section",
//       "Ensure sections like Education, Experience, and Skills are clearly labeled",
//       "Address mixed font formatting issues",
//       "Include more quantifiable achievements and action verbs",
//       "Highlight technical experience or tools more prominently",
//     ],
//     wordCount: 396,
//     sectionScores: {
//       content: 55,
//       format: 70,
//       sections: 100,
//       style: 50,
//       tailoring: 93,
//     },
//     atsCompatible: true,
//     formatIssues: ["Mixed fonts detected", "Missing summary section"],
//     summaryText:
//       "Your resume is well-structured but lacks 2-3 key skills from the JD. Add more quantifiable achievements.",
//   },
//   {
//     id: 3,
//     fileName: "Copy of Student Athlete Resume.docx",
//     spacyScore: 77.62,
//     jaccardScore: 0.01,
//     matchScore: 39,
//     matchedKeywords: [],
//     matchedSkills: ["experience"],
//     missingSkills: ["nlp", "python", "engineer", "sakjd", "look"],
//     extractedSkillsFromJD: [
//       "nlp",
//       "python",
//       "experience",
//       "engineer",
//       "sakjd",
//       "look",
//     ],
//     topKeywords: [
//       ["student", 5],
//       ["southeastern", 4],
//       ["university", 4],
//       ["la", 4],
//       ["august", 4],
//       ["athlete", 4],
//       ["team", 4],
//       ["louisiana", 3],
//       ["hammond", 3],
//       ["work", 3],
//     ],
//     recommendations: [
//       "Add missing skills: Nlp, Python, Engineer",
//       "Add a professional summary section",
//       "Ensure sections like Education, Experience, and Skills are clearly labeled",
//       "Add a professional summary section",
//       "Ensure sections like Education, Experience, and Skills are clearly labeled",
//       "Address mixed font formatting issues",
//       "Include more quantifiable achievements and action verbs",
//       "Highlight technical experience or tools more prominently",
//     ],
//     wordCount: 276,
//     sectionScores: {
//       content: 55,
//       format: 70,
//       sections: 100,
//       style: 50,
//       tailoring: 93,
//     },
//     atsCompatible: true,
//     formatIssues: ["Mixed fonts detected", "Missing summary section"],
//     summaryText:
//       "Your resume is well-structured but lacks 2-3 key skills from the JD. Add more quantifiable achievements.",
//   },
//   {
//     id: 4,
//     fileName: "Basic_Resume.pdf",
//     spacyScore: 77.68,
//     jaccardScore: 0.01,
//     matchScore: 39,
//     matchedKeywords: [],
//     matchedSkills: ["experience"],
//     missingSkills: ["nlp", "python", "engineer", "sakjd", "look"],
//     extractedSkillsFromJD: [
//       "nlp",
//       "python",
//       "experience",
//       "engineer",
//       "sakjd",
//       "look",
//     ],
//     topKeywords: [
//       ["skill", 14],
//       ["year", 9],
//       ["state", 8],
//       ["bullet", 7],
//       ["point", 7],
//       ["project", 6],
//       ["experience", 4],
//       ["month", 4],
//       ["action", 4],
//       ["verb", 4],
//     ],
//     recommendations: [
//       "Add missing skills: Nlp, Python, Engineer",
//       "Add a professional summary section",
//       "Ensure sections like Education, Experience, and Skills are clearly labeled",
//       "Add a professional summary section",
//       "Ensure sections like Education, Experience, and Skills are clearly labeled",
//       "Address mixed font formatting issues",
//       "Include more quantifiable achievements and action verbs",
//       "Highlight technical experience or tools more prominently",
//     ],
//     wordCount: 396,
//     sectionScores: {
//       content: 55,
//       format: 70,
//       sections: 100,
//       style: 50,
//       tailoring: 93,
//     },
//     atsCompatible: true,
//     formatIssues: ["Mixed fonts detected", "Missing summary section"],
//     summaryText:
//       "Your resume is well-structured but lacks 2-3 key skills from the JD. Add more quantifiable achievements.",
//   },
// ];
// localStorage.setItem("resumeAnalysis", JSON.stringify(responseData));
function getResumeAnalysis() {
  const data = localStorage.getItem("resumeAnalysis");
  if (!data) return null;
  return JSON.parse(data); // Convert back to object
}
function createReportItem(report) {
  const reportItem = document.createElement("div");
  reportItem.className = "report-item";

  reportItem.innerHTML = `
                <div class="report-info">
                    <div class="report-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="report-details">
                        <h3 class="report-title">${report.fileName}</h3>
                        <p class="report-description">${report.summaryText}</p>
                        <div class="report-meta">
                            <span class="report-date">
                                <i class="fas fa-calendar"></i>
                                ${report.date}
                            </span>
                            <span class="report-size">
                                <i class="fas fa-file"></i>
                                ${report.matchScore}
                            </span>
                            <span class="report-status status-${report.status.toLowerCase()}">
                                ${report.status}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="report-actions">
                    <button class="btn btn-secondary" onclick="viewReport('${
                      report.id
                    }')">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                    <button class="btn btn-primary" onclick="downloadReport('${
                      report.id
                    }')">
                        <i class="fas fa-download"></i>
                        Download
                    </button>
                </div>
            `;

  return reportItem;
}

// Function to load reports
function loadReports() {
  // Reports data from API
  const reportsData = getResumeAnalysis();

  const reportsContainer = document.getElementById("reportsContainer");
  const emptyState = document.getElementById("emptyState");

  // Clear container
  reportsContainer.innerHTML = "";

  if (reportsData.length === 0) {
    emptyState.style.display = "flex";
    reportsContainer.appendChild(emptyState);
  } else {
    emptyState.style.display = "none";
    const now = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = now.toLocaleDateString("en-US", options);

    reportsData.forEach((report) => {
      report.status = "Completed";
      report.date = formattedDate;
      const reportElement = createReportItem(report);
      reportsContainer.appendChild(reportElement);
    });
  }
}

// Function to view a report
function viewReport(reportId) {
  // Find the report data
  const reportsData = getResumeAnalysis();

  const report = reportsData.find((r) => r.id == reportId);

  if (report) {
    showReportDetails(report);
  }
}

// Function to show detailed report view
function showReportDetails(report) {
  const detailsHtml = `
                <div id="reportModal" class="modal-overlay" onclick="closeModal()">
                    <div class="modal-content" onclick="event.stopPropagation()">
                        <div class="modal-header">
                            <h2>${report.fileName}</h2>
                            <button class="close-btn" onclick="closeModal()">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="score-grid">
                                <div class="score-item">
                                    <span class="score-label">SpaCy Score</span>
                                    <span class="score-value">${
                                      report.spacyScore
                                    }%</span>
                                </div>
                                <div class="score-item">
                                    <span class="score-label">Match Score</span>
                                    <span class="score-value">${
                                      report.matchScore
                                    }%</span>
                                </div>
                                <div class="score-item">
                                    <span class="score-label">Word Count</span>
                                    <span class="score-value">${
                                      report.wordCount
                                    }</span>
                                </div>
                                <div class="score-item">
                                    <span class="score-label">ATS Compatible</span>
                                    <span class="score-value ${
                                      report.atsCompatible
                                        ? "compatible"
                                        : "not-compatible"
                                    }">
                                        ${report.atsCompatible ? "Yes" : "No"}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="section">
                                <h3>Section Scores</h3>
                                <div class="section-scores">
                                    <div class="score-bar">
                                        <span>Content: ${
                                          report.sectionScores.content
                                        }%</span>
                                        <div class="bar"><div class="fill" style="width: ${
                                          report.sectionScores.content
                                        }%"></div></div>
                                    </div>
                                    <div class="score-bar">
                                        <span>Format: ${
                                          report.sectionScores.format
                                        }%</span>
                                        <div class="bar"><div class="fill" style="width: ${
                                          report.sectionScores.format
                                        }%"></div></div>
                                    </div>
                                    <div class="score-bar">
                                        <span>Sections: ${
                                          report.sectionScores.sections
                                        }%</span>
                                        <div class="bar"><div class="fill" style="width: ${
                                          report.sectionScores.sections
                                        }%"></div></div>
                                    </div>
                                    <div class="score-bar">
                                        <span>Style: ${
                                          report.sectionScores.style
                                        }%</span>
                                        <div class="bar"><div class="fill" style="width: ${
                                          report.sectionScores.style
                                        }%"></div></div>
                                    </div>
                                    <div class="score-bar">
                                        <span>Tailoring: ${
                                          report.sectionScores.tailoring
                                        }%</span>
                                        <div class="bar"><div class="fill" style="width: ${
                                          report.sectionScores.tailoring
                                        }%"></div></div>
                                    </div>
                                </div>
                            </div>

                            <div class="section">
                                <h3>Summary</h3>
                                <p class="summary-text">${
                                  report.summaryText
                                }</p>
                            </div>

                            <div class="section">
                                <h3>Recommendations</h3>
                                <ul class="recommendations-list">
                                    ${report.recommendations
                                      .map((rec) => `<li>${rec}</li>`)
                                      .join("")}
                                </ul>
                            </div>

                            <div class="section">
                                <h3>Skills Analysis</h3>
                                <div class="skills-grid">
                                    <div class="skills-column">
                                        <h4>Matched Skills</h4>
                                        <div class="skills-tags">
                                            ${report.matchedSkills
                                              .map(
                                                (skill) =>
                                                  `<span class="skill-tag matched">
                                                  ${skill}
                                                </span>`
                                              )
                                              .join("")}
                                        </div>
                                    </div>
                                    <div class="skills-column">
                                        <h4>Missing Skills</h4>
                                        <div class="skills-tags">
                                            ${report.missingSkills
                                              .map(
                                                (skill) =>
                                                  `<span class="skill-tag missing">
                                                  ${skill}
                                                </span>`
                                              )
                                              .join("")}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="section">
                                <h3>Top Keywords</h3>
                                <div class="keywords-list">
                                    ${report.topKeywords
                                      .map(
                                        ([keyword, count]) =>
                                          `<span class="keyword-item">
                                          ${keyword} (${count})
                                        </span>`
                                      )
                                      .join("")}
                                </div>
                            </div>

                            ${
                              report.formatIssues.length > 0
                                ? `
                            <div class="section">
                                <h3>Format Issues</h3>
                                <ul class="issues-list">
                                    ${report.formatIssues
                                      .map((issue) => `<li>${issue}</li>`)
                                      .join("")}
                                </ul>
                            </div>
                            `
                                : ""
                            }
                        </div>
                    </div>
                </div>
            `;

  document.body.insertAdjacentHTML("beforeend", detailsHtml);
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById("reportModal");
  if (modal) {
    modal.remove();
  }
}

// Function to download a report
async function downloadReport(reportId) {
  // Find the report data - same dataset as viewReport function
  const reportsData = getResumeAnalysis();

  const report = reportsData.find((r) => r.id == reportId);
  console.log(report);
  if (report) {
    // Create downloadable JSON file
    const response = await fetch(
      "http://localhost:8000/api/resumes/generate-pdf",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      }
    );
    const blob = await response.blob(); // ⬅️ Get the binary blob from response
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    let fileName = report.fileName.split(".")[0];
    fileName = fileName.split(" ").join("");
    link.download = `${fileName}_report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadReports();
});
