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

<button class="btn btn-primary" id="downloadBtn-${
    report.id
  }" onclick="downloadReport('${report.id}')">
  <i class="fas fa-download" id="icon-${report.id}"></i>
  <span id="text-${report.id}">Download</span>
  <span
    class="spinner-border spinner-border-sm ms-2"
    role="status"
    aria-hidden="true"
    id="spinner-${report.id}"
    style="display: none;"
  ></span>
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

async function downloadReport(reportId) {
  const btn = document.getElementById(`downloadBtn-${reportId}`);
  const icon = document.getElementById(`icon-${reportId}`);
  const text = document.getElementById(`text-${reportId}`);
  const spinner = document.getElementById(`spinner-${reportId}`);

  // Show loading state
  btn.disabled = true;
  icon.style.display = "none";
  spinner.style.display = "inline-block";
  text.textContent = "Downloading...";

  try {
    const reportsData = getResumeAnalysis();
    const report = reportsData.find((r) => r.id == reportId);

    if (report) {
      const response = await fetch("http://localhost:8000/api/resumes/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      let fileName = report.fileName.split(".")[0].split(" ").join("");
      link.href = url;
      link.download = `${fileName}_report.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download report.");
  } finally {
    // Reset button
    btn.disabled = false;
    icon.style.display = "inline";
    spinner.style.display = "none";
    text.textContent = "Download";
  }
}


document.addEventListener("DOMContentLoaded", function () {
  loadReports();
});
