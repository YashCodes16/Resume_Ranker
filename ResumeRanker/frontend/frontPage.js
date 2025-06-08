let uploadedFiles = [];
let totalFileSize = 0;

// DOM Elements
const resumeForm = document.getElementById("resumeAnalysisForm");
const jobTextarea = document.getElementById("jobDescription");
const fileInput = document.getElementById("fileInput");
const uploadArea = document.getElementById("uploadArea");
const fileList = document.getElementById("fileList");
const analyzeBtn = document.getElementById("analyzeBtn");
const jobWordCount = document.getElementById("jobWordCount");
const resumeCount = document.getElementById("resumeCount");
const totalSizeDisplay = document.getElementById("totalSize");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const btnText = document.getElementById("btnText");
const loadingSpinner = document.getElementById("loadingSpinner");

// Event Listeners
jobTextarea.addEventListener("input", updateJobWordCount);
fileInput.addEventListener("change", handleFileSelect);

// Drag and Drop functionality
uploadArea.addEventListener("dragover", handleDragOver);
uploadArea.addEventListener("dragleave", handleDragLeave);
uploadArea.addEventListener("drop", handleDrop);

function updateJobWordCount() {
  const text = jobTextarea.value.trim();
  const wordCount = text ? text.split(/\s+/).length : 0;
  jobWordCount.textContent = wordCount;
  updateAnalyzeButton();
}

function handleDragOver(e) {
  e.preventDefault();
  uploadArea.classList.add("dragover");
}

function handleDragLeave(e) {
  e.preventDefault();
  uploadArea.classList.remove("dragover");
}

function handleDrop(e) {
  e.preventDefault();
  uploadArea.classList.remove("dragover");
  const files = Array.from(e.dataTransfer.files);
  processFiles(files);
}

function handleFileSelect(e) {
  const files = Array.from(e.target.files);
  processFiles(files);
  // Don't reset input value to maintain form state
}

function processFiles(files) {
  files.forEach((file) => {
    if (isValidFile(file)) {
      addFile(file);
    } else {
      alert(
        `Invalid file: ${file.name}. Please upload PDF, DOC, or DOCX files under 10MB.`
      );
    }
  });
}

function isValidFile(file) {
  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxSize = 10 * 1024 * 1024;

  return validTypes.includes(file.type) && file.size <= maxSize;
}

function addFile(file) {
  if (uploadedFiles.some((f) => f.name === file.name && f.size === file.size)) {
    alert(`File "${file.name}" is already uploaded.`);
    return;
  }

  uploadedFiles.push(file);
  totalFileSize += file.size;

  updateFileInput();
  renderFileList();
  updateStats();
  updateAnalyzeButton();
}

function removeFile(index) {
  const file = uploadedFiles[index];
  totalFileSize -= file.size;
  uploadedFiles.splice(index, 1);

  updateFileInput();
  renderFileList();
  updateStats();
  updateAnalyzeButton();
}

function updateFileInput() {
  // Create a new DataTransfer object to update the file input
  const dt = new DataTransfer();
  uploadedFiles.forEach((file) => {
    dt.items.add(file);
  });
  fileInput.files = dt.files;
}

function renderFileList() {
  fileList.innerHTML = "";

  uploadedFiles.forEach((file, index) => {
    const fileItem = document.createElement("div");
    fileItem.className = "file-item";
    fileItem.innerHTML = `
                    <div class="file-info">
                        <div class="file-icon">${getFileIcon(file.type)}</div>
                        <div class="file-details">
                            <div class="file-name">${file.name}</div>
                            <div class="file-size">${formatFileSize(
                              file.size
                            )}</div>
                        </div>
                    </div>
                    <button type="button" class="remove-btn" onclick="removeFile(${index})" title="Remove file">×</button>
                `;
    fileList.appendChild(fileItem);
  });
}

function getFileIcon(fileType) {
  switch (fileType) {
    case "application/pdf":
      return "📄";
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "📝";
    default:
      return "📄";
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function updateStats() {
  resumeCount.textContent = uploadedFiles.length;
  totalSizeDisplay.textContent = formatFileSize(totalFileSize);
}

function updateAnalyzeButton() {
  const hasJobDescription = jobTextarea.value.trim().length > 0;
  const hasResumes = uploadedFiles.length > 0;

  analyzeBtn.disabled = !(hasJobDescription && hasResumes);
}

async function handleFormSubmit(e) {
  e.preventDefault();

  if (uploadedFiles.length === 0 || !jobTextarea.value.trim()) {
    alert("Please provide a job description and upload at least one resume.");
    return;
  }

  try {
    btnText.textContent = "Processing...";
    loadingSpinner.style.display = "block";
    analyzeBtn.disabled = true;
    progressBar.style.display = "block";

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) progress = 90;
      progressFill.style.width = progress + "%";
    }, 200);

    // Create FormData from the form
    // const formData = new FormData(resumeForm);
    const formData = new FormData();
    formData.append(
      "jobDescription",
      document.getElementById("jobDescription").value.trim()
    );

    const fileInput = document.getElementById("fileInput");
    for (const file of fileInput.files) {
      formData.append("resumeUpload", file); // match `name` on multer
    }
    for (let [key, val] of formData.entries()) {
      console.log(key, val);
    }

    let response = await fetch("http://localhost:8000/api/resumes", {
      method: "POST",
      body: formData,
    });

    let result = await response.json();

    localStorage.setItem("resumeAnalysis", JSON.stringify(result));

    clearInterval(progressInterval);
    progressFill.style.width = "100%";

    btnText.textContent = "Analysis Complete!";
    loadingSpinner.style.display = "none";

    if (response.ok) {
      window.location.href = "/analysis.html";
    } else {
      alert("Analysis failed. Please try again.");
    }

    setTimeout(() => {
      btnText.textContent = "Analyze Resumes";
      progressBar.style.display = "none";
      progressFill.style.width = "0%";
      analyzeBtn.disabled = false;
    }, 2000);
  } catch (err) {
    prompt(err);
    console.error("Error during analysis:", err);
    alert("An error occurred during analysis. Please try again.");

    // Reset UI on error
    btnText.textContent = "Analyze Resumes";
    loadingSpinner.style.display = "none";
    progressBar.style.display = "none";
    progressFill.style.width = "0%";
    analyzeBtn.disabled = false;
  }
}

// Initialize
updateStats();
updateAnalyzeButton();
