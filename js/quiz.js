// ─────────────────────────────────────────────
//  CONFIGURATION — paste your Google Apps Script
//  Web App URL below before deploying.
//  See README.md for setup instructions.
// ─────────────────────────────────────────────
const CONFIG = {
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbz1vvBIaTjhXA2crDLZj_eNpNCNqrjBD-TORFtowSIH1b_mQMVVsIBqRLHon_dtFm8aoA/exec",
  QUIZ_DURATION_MINUTES: 30,
  QUIZ_TITLE: "English Proficiency Test — Teacher Candidate"
};

// ─────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────
let state = {
  candidateName: "",
  answers: {},
  timerInterval: null,
  secondsLeft: CONFIG.QUIZ_DURATION_MINUTES * 60,
  submitted: false,
  startTime: null
};

// ─────────────────────────────────────────────
//  DOM REFS
// ─────────────────────────────────────────────
const screens = {
  welcome: document.getElementById("screen-welcome"),
  quiz: document.getElementById("screen-quiz"),
  result: document.getElementById("screen-result")
};

const timerEl = document.getElementById("timer");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const answeredCountEl = document.getElementById("answered-count");
const totalQuestionsEl = document.getElementById("total-questions");

// ─────────────────────────────────────────────
//  ALL QUESTIONS (ordered sections)
// ─────────────────────────────────────────────
const ALL_QUESTIONS = [
  ...QUIZ_DATA.vocabulary,
  ...QUIZ_DATA.grammar,
  ...QUIZ_DATA.synonyms,
  ...QUIZ_DATA.reading
];

const TOTAL = ALL_QUESTIONS.length; // 50

// ─────────────────────────────────────────────
//  SCREEN MANAGEMENT
// ─────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ─────────────────────────────────────────────
//  WELCOME → START
// ─────────────────────────────────────────────
document.getElementById("btn-start").addEventListener("click", () => {
  const nameInput = document.getElementById("input-name");

  if (!nameInput.value.trim()) {
    nameInput.focus();
    nameInput.style.borderColor = "#dc2626";
    setTimeout(() => nameInput.style.borderColor = "", 2000);
    return;
  }

  state.candidateName = nameInput.value.trim();
  state.startTime = new Date();

  buildQuiz();
  showScreen("quiz");
  startTimer();
});

// ─────────────────────────────────────────────
//  BUILD QUIZ DOM
// ─────────────────────────────────────────────
function buildQuiz() {
  const container = document.getElementById("quiz-questions");
  container.innerHTML = "";
  totalQuestionsEl.textContent = TOTAL;

  const sections = [
    { key: "vocabulary", label: "Vocabulary", tag: "tag-vocab", color: "var(--vocab-color)", questions: QUIZ_DATA.vocabulary },
    { key: "grammar", label: "Grammar", tag: "tag-grammar", color: "var(--grammar-color)", questions: QUIZ_DATA.grammar },
    { key: "synonyms", label: "Synonyms", tag: "tag-synonym", color: "var(--synonym-color)", questions: QUIZ_DATA.synonyms },
    { key: "reading", label: "Reading Comprehension", tag: "tag-reading", color: "var(--reading-color)", questions: QUIZ_DATA.reading }
  ];

  let globalIndex = 1;
  let currentPassage = null;

  sections.forEach(section => {
    // Section header
    const header = document.createElement("div");
    header.className = "section-header";
    header.innerHTML = `
      <span class="section-label ${section.tag}" style="background:${section.tag === 'tag-vocab' ? 'var(--vocab-bg)' : section.tag === 'tag-grammar' ? 'var(--grammar-bg)' : section.tag === 'tag-synonym' ? 'var(--synonym-bg)' : 'var(--reading-bg)'}; color:${section.color};">
        ${section.label}
      </span>
      <span class="section-count">${section.questions.length} questions</span>
    `;
    container.appendChild(header);

    section.questions.forEach(q => {
      // If reading, show passage before first question of each passage
      if (q.type === "reading" && q.passage && q.passage !== currentPassage) {
        currentPassage = q.passage;
        const passageData = PASSAGES[q.passage];
        const passageBox = document.createElement("div");
        passageBox.className = "passage-box";

        // Format paragraphs
        const paragraphs = passageData.text.trim().split("\n\n").map(p => `<p>${p.trim()}</p>`).join("");
        passageBox.innerHTML = `
          <div class="passage-title">📖 ${passageData.title}</div>
          <div class="passage-text">${paragraphs}</div>
        `;
        container.appendChild(passageBox);
      }

      const card = buildQuestionCard(q, globalIndex, section);
      container.appendChild(card);
      globalIndex++;
    });
  });
}

function buildQuestionCard(q, index, section) {
  const card = document.createElement("div");
  card.className = "question-card";
  card.id = `card-${q.id}`;

  const letters = ["A", "B", "C", "D"];
  const typeColors = {
    vocabulary: "tag-vocab",
    grammar: "tag-grammar",
    synonyms: "tag-synonym",
    reading: "tag-reading"
  };

  const typeBg = {
    vocabulary: "var(--vocab-bg)",
    grammar: "var(--grammar-bg)",
    synonyms: "var(--synonym-bg)",
    reading: "var(--reading-bg)"
  };

  const typeColor = {
    vocabulary: "var(--vocab-color)",
    grammar: "var(--grammar-color)",
    synonyms: "var(--synonym-color)",
    reading: "var(--reading-color)"
  };

  card.innerHTML = `
    <div class="question-meta">
      <span class="q-number">Q${index}</span>
      <span class="q-type-tag" style="background:${typeBg[q.type]};color:${typeColor[q.type]}">${q.type.charAt(0).toUpperCase() + q.type.slice(1)}</span>
    </div>
    <div class="question-text">${q.question}</div>
    <div class="options-grid">
      ${q.options.map((opt, i) => `
        <button class="option-btn" data-qid="${q.id}" data-value="${opt}" onclick="selectOption(this, '${q.id}', '${opt.replace(/'/g, "\\'")}')">
          <span class="option-letter">${letters[i]}</span>
          <span class="option-text">${opt}</span>
        </button>
      `).join("")}
    </div>
  `;

  return card;
}

// ─────────────────────────────────────────────
//  ANSWER SELECTION
// ─────────────────────────────────────────────
function selectOption(btn, qId, value) {
  // Deselect siblings
  const card = document.getElementById(`card-${qId}`);
  card.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));

  // Select this
  btn.classList.add("selected");
  state.answers[qId] = value;
  card.classList.add("answered");

  updateProgress();
}

function updateProgress() {
  const answered = Object.keys(state.answers).length;
  const pct = Math.round((answered / TOTAL) * 100);

  progressFill.style.width = pct + "%";
  progressText.textContent = `${answered}/${TOTAL}`;
  answeredCountEl.innerHTML = `<strong>${answered}</strong> of ${TOTAL} answered`;
}

// ─────────────────────────────────────────────
//  TIMER
// ─────────────────────────────────────────────
function startTimer() {
  state.secondsLeft = CONFIG.QUIZ_DURATION_MINUTES * 60;
  renderTimer();

  state.timerInterval = setInterval(() => {
    state.secondsLeft--;
    renderTimer();

    if (state.secondsLeft <= 0) {
      clearInterval(state.timerInterval);
      autoSubmit();
    }
  }, 1000);
}

function renderTimer() {
  const m = Math.floor(state.secondsLeft / 60);
  const s = state.secondsLeft % 60;
  const display = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  timerEl.textContent = display;

  timerEl.parentElement.classList.remove("warning", "danger");
  if (state.secondsLeft <= 60) {
    timerEl.parentElement.classList.add("danger");
  } else if (state.secondsLeft <= 300) {
    timerEl.parentElement.classList.add("warning");
  }
}

// ─────────────────────────────────────────────
//  SUBMIT
// ─────────────────────────────────────────────
document.getElementById("btn-submit").addEventListener("click", () => {
  const answered = Object.keys(state.answers).length;
  const unanswered = TOTAL - answered;

  if (unanswered > 0) {
    document.getElementById("modal-unanswered-count").textContent = unanswered;
    document.getElementById("modal-confirm").classList.add("active");
  } else {
    finishQuiz();
  }
});

document.getElementById("modal-cancel").addEventListener("click", () => {
  document.getElementById("modal-confirm").classList.remove("active");
});

document.getElementById("modal-submit").addEventListener("click", () => {
  document.getElementById("modal-confirm").classList.remove("active");
  finishQuiz();
});

function autoSubmit() {
  document.getElementById("modal-confirm").classList.remove("active");
  finishQuiz();
}

function finishQuiz() {
  if (state.submitted) return;
  state.submitted = true;
  clearInterval(state.timerInterval);

  const results = calculateResults();
  showResults(results);
  sendToGoogleSheets(results);
}

// ─────────────────────────────────────────────
//  SCORING
// ─────────────────────────────────────────────
function calculateResults() {
  const sections = {
    vocabulary: { correct: 0, total: QUIZ_DATA.vocabulary.length },
    grammar: { correct: 0, total: QUIZ_DATA.grammar.length },
    synonyms: { correct: 0, total: QUIZ_DATA.synonyms.length },
    reading: { correct: 0, total: QUIZ_DATA.reading.length }
  };

  ALL_QUESTIONS.forEach(q => {
    const userAnswer = state.answers[q.id];
    if (userAnswer && userAnswer === q.answer) {
      sections[q.type].correct++;
    }
  });

  const totalCorrect = Object.values(sections).reduce((sum, s) => sum + s.correct, 0);
  const percentage = Math.round((totalCorrect / TOTAL) * 100);
  const timeTaken = Math.round((new Date() - state.startTime) / 1000);

  return {
    name: state.candidateName,
    sections,
    totalCorrect,
    total: TOTAL,
    percentage,
    timeTaken,
    answered: Object.keys(state.answers).length,
    timestamp: new Date().toISOString()
  };
}

// ─────────────────────────────────────────────
//  SHOW RESULTS
// ─────────────────────────────────────────────
function showResults(r) {
  showScreen("result");

  document.getElementById("result-name").textContent = r.name;
  document.getElementById("result-score-pct").textContent = r.percentage + "%";
  document.getElementById("result-correct").textContent = r.totalCorrect;
  document.getElementById("result-total").textContent = r.total;
  document.getElementById("result-answered").textContent = r.answered;

  // Section breakdown
  document.getElementById("bd-vocab").textContent = `${r.sections.vocabulary.correct}/${r.sections.vocabulary.total}`;
  document.getElementById("bd-grammar").textContent = `${r.sections.grammar.correct}/${r.sections.grammar.total}`;
  document.getElementById("bd-synonym").textContent = `${r.sections.synonyms.correct}/${r.sections.synonyms.total}`;
  document.getElementById("bd-reading").textContent = `${r.sections.reading.correct}/${r.sections.reading.total}`;

  // Time taken
  const m = Math.floor(r.timeTaken / 60);
  const s = r.timeTaken % 60;
  document.getElementById("result-time").textContent = `${m}m ${s}s`;

  // SVG ring
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (r.percentage / 100) * circumference;
  document.getElementById("ring-progress").style.strokeDasharray = circumference;
  document.getElementById("ring-progress").style.strokeDashoffset = offset;

  // Ring color
  let ringColor = "#1d4ed8";
  if (r.percentage >= 80) ringColor = "#16a34a";
  else if (r.percentage >= 60) ringColor = "#1d4ed8";
  else if (r.percentage >= 40) ringColor = "#d97706";
  else ringColor = "#dc2626";
  document.getElementById("ring-progress").style.stroke = ringColor;

  // Verdict
  const verdictEl = document.getElementById("result-verdict");
  let icon, label, cls;
  if (r.percentage >= 80) {
    icon = "🏆"; label = "Excellent — Highly Recommended"; cls = "verdict-excellent";
  } else if (r.percentage >= 65) {
    icon = "✅"; label = "Good — Recommended"; cls = "verdict-good";
  } else if (r.percentage >= 50) {
    icon = "📋"; label = "Average — May Require Review"; cls = "verdict-average";
  } else {
    icon = "⚠️"; label = "Needs Improvement"; cls = "verdict-needs-work";
  }
  verdictEl.innerHTML = `${icon} ${label}`;
  verdictEl.className = `verdict-badge ${cls}`;

  // Icon
  document.getElementById("result-icon").textContent = r.percentage >= 80 ? "🎉" : r.percentage >= 50 ? "📝" : "📊";
}

// ─────────────────────────────────────────────
//  GOOGLE SHEETS SUBMISSION
// ─────────────────────────────────────────────
async function sendToGoogleSheets(r) {
  const statusEl = document.getElementById("submit-status");

  if (!CONFIG.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
    statusEl.textContent = "⚠️ Google Sheets URL not configured. See README.md.";
    statusEl.className = "submit-status error";
    return;
  }

  statusEl.innerHTML = `<span class="spinner"></span> Submitting to Google Sheets...`;
  statusEl.className = "submit-status";

  const payload = {
    name: r.name,
    score: r.totalCorrect,
    total: r.total,
    percentage: r.percentage,
    vocabScore: `${r.sections.vocabulary.correct}/${r.sections.vocabulary.total}`,
    grammarScore: `${r.sections.grammar.correct}/${r.sections.grammar.total}`,
    synonymScore: `${r.sections.synonyms.correct}/${r.sections.synonyms.total}`,
    readingScore: `${r.sections.reading.correct}/${r.sections.reading.total}`,
    answeredQuestions: r.answered,
    timeTaken: `${Math.floor(r.timeTaken/60)}m ${r.timeTaken%60}s`,
    timestamp: r.timestamp
  };

  try {
    await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    statusEl.textContent = "✓ Results saved to Google Sheets";
    statusEl.className = "submit-status success";
  } catch (err) {
    statusEl.textContent = "⚠️ Could not save to Sheets. Please record score manually.";
    statusEl.className = "submit-status error";
  }
}

// ─────────────────────────────────────────────
//  RETAKE
// ─────────────────────────────────────────────
document.getElementById("btn-retake").addEventListener("click", () => {
  // Reset state
  state = {
    candidateName: "",
    answers: {},
    timerInterval: null,
    secondsLeft: CONFIG.QUIZ_DURATION_MINUTES * 60,
    submitted: false,
    startTime: null
  };
  document.getElementById("input-name").value = "";
  document.getElementById("submit-status").textContent = "";
  showScreen("welcome");
});

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
updateProgress();
