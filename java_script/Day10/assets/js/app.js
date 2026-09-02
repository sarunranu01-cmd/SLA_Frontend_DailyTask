/**
 * JavaScript Learning & Interview Platform - Application Controller
 * Handles UI rendering, Line-by-Line visualizer stepper, In-browser safe code runner,
 * Search & Tag filtering, Quiz & Flashcard engine, Progress tracking, and Theme toggle.
 */

// Application State
const AppState = {
  activeCategory: "logic", // "logic" | "interview" | "mustknow" | "playground" | "quiz"
  searchTerm: "",
  activeTag: "all",
  activeDifficulty: "all",
  bookmarkedIds: JSON.parse(localStorage.getItem("js_mastery_bookmarks") || "[]"),
  completedIds: JSON.parse(localStorage.getItem("js_mastery_completed") || "[]"),
  theme: localStorage.getItem("js_mastery_theme") || "dark",
  
  // Line-by-line stepper state
  stepper: {
    questionId: null,
    currentLineIndex: 0,
    isPlaying: false,
    timerId: null,
    lines: []
  },

  // Quiz mode state
  quiz: {
    currentIndex: 0,
    isRevealed: false,
    scoreCorrect: 0,
    scoreTotal: 0
  }
};

// Preset Playground Code Templates
const PLAYGROUND_PRESETS = {
  custom: `// Welcome to the Live JavaScript Playground!
// Write any JavaScript code below and click "Run Code" ▶️

function testMyLogic() {
  const skills = ["JavaScript", "React", "Node.js"];
  const formatted = skills.map((s, idx) => \`\${idx + 1}. \${s}\`).join(", ");
  console.log("My Skills:", formatted);
}

testMyLogic();`,

  closure: `// Preset: Closure & Private Counter
function makeCounter(start = 0) {
  let count = start;
  return {
    inc: () => ++count,
    dec: () => --count,
    val: () => count
  };
}

const c = makeCounter(10);
console.log("Inc:", c.inc()); // 11
console.log("Inc:", c.inc()); // 12
console.log("Dec:", c.dec()); // 11
console.log("Final:", c.val()); // 11`,

  eventloop: `// Preset: Microtasks (Promises) vs Macrotasks (Timers)
console.log("1. Synchronous Start");

setTimeout(() => {
  console.log("4. setTimeout (Macrotask Queue)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise.then (Microtask Queue)");
});

console.log("2. Synchronous End");`,

  debounce: `// Preset: Custom Debounce
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => console.log("Searched for:", query), 150);

search("j");
search("jav");
search("javascript"); // Only this fires after 150ms!`,

  flatten: `// Preset: Recursive Array Flatten
function deepFlatten(arr) {
  return arr.reduce((acc, val) => 
    acc.concat(Array.isArray(val) ? deepFlatten(val) : val), []);
}

const nested = [1, [2, [3, [4, 5]], 6], 7];
console.log("Flattened Result:", deepFlatten(nested));`
};

// DOM Content Loaded Initialization
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupEventListeners();
  renderApp();
});

// Initialize Theme
function initTheme() {
  document.documentElement.setAttribute("data-theme", AppState.theme);
  updateThemeButtonUI();
}

function toggleTheme() {
  AppState.theme = AppState.theme === "dark" ? "light" : "dark";
  localStorage.setItem("js_mastery_theme", AppState.theme);
  document.documentElement.setAttribute("data-theme", AppState.theme);
  updateThemeButtonUI();
  showToast(`Switched to ${AppState.theme === "dark" ? "Dark 🌙" : "Light ☀️"} mode`);
}

function updateThemeButtonUI() {
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.innerHTML = AppState.theme === "dark" ? "<span>☀️</span> Light" : "<span>🌙</span> Dark";
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Theme button
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // Search input
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchTerm = e.target.value.toLowerCase().trim();
      renderApp();
    });
  }

  // Category Tab buttons
  const categoryTabs = document.querySelectorAll(".category-tab-btn");
  categoryTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryTabs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.activeCategory = btn.dataset.category;
      AppState.activeTag = "all";
      AppState.activeDifficulty = "all";
      renderApp();
    });
  });

  // Modal overlay click outside to close
  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // ESC key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// Master Render Function
function renderApp() {
  updateProgressStats();

  const mainContainer = document.getElementById("mainContentArea");
  if (!mainContainer) return;

  if (AppState.activeCategory === "playground") {
    renderPlaygroundView(mainContainer);
    return;
  }

  if (AppState.activeCategory === "quiz") {
    renderQuizView(mainContainer);
    return;
  }

  // Standard Questions View (Logic, Interview, Must-Know)
  renderQuestionsView(mainContainer);
}

// Update Header Progress & Stats
function updateProgressStats() {
  const total = JS_QUESTIONS.length;
  const completed = AppState.completedIds.length;
  const percentage = Math.round((completed / total) * 100);

  const headerPill = document.getElementById("headerProgressPill");
  if (headerPill) {
    headerPill.innerHTML = `<span>🏆</span> ${completed} / ${total} Mastered (${percentage}%)`;
  }

  const barFill = document.getElementById("heroProgressFill");
  if (barFill) {
    barFill.style.width = `${percentage}%`;
  }

  const progressTextSpan = document.getElementById("progressPercentageText");
  if (progressTextSpan) {
    progressTextSpan.textContent = `${completed}/${total} Completed (${percentage}%)`;
  }

  const heroCompletedStat = document.getElementById("heroStatCompleted");
  if (heroCompletedStat) {
    heroCompletedStat.textContent = completed;
  }
}

// Render Questions List View
function renderQuestionsView(container) {
  const categoryMeta = CATEGORIES[AppState.activeCategory];
  
  // Filter questions by Category
  let questions = JS_QUESTIONS.filter(q => q.category === AppState.activeCategory);

  // Collect all unique tags for filter bar
  const allTags = new Set();
  questions.forEach(q => q.tags.forEach(t => allTags.add(t)));

  // Filter by Search Query
  if (AppState.searchTerm) {
    questions = questions.filter(q => 
      q.title.toLowerCase().includes(AppState.searchTerm) ||
      q.shortSummary.toLowerCase().includes(AppState.searchTerm) ||
      q.tags.some(t => t.toLowerCase().includes(AppState.searchTerm)) ||
      (q.code && q.code.toLowerCase().includes(AppState.searchTerm))
    );
  }

  // Filter by Tag
  if (AppState.activeTag !== "all") {
    questions = questions.filter(q => q.tags.includes(AppState.activeTag));
  }

  // Filter by Difficulty
  if (AppState.activeDifficulty !== "all") {
    questions = questions.filter(q => q.difficulty === AppState.activeDifficulty);
  }

  // Build HTML
  let html = `
    <div class="section-header-box">
      <div class="section-info">
        <h2>${categoryMeta.icon} ${categoryMeta.title}</h2>
        <p>${categoryMeta.description}</p>
      </div>
      <div class="filter-bar">
        <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Tags:</span>
        <button class="filter-chip ${AppState.activeTag === "all" ? "active" : ""}" onclick="setTagFilter('all')">All (${questions.length})</button>
        ${Array.from(allTags).map(tag => `
          <button class="filter-chip ${AppState.activeTag === tag ? "active" : ""}" onclick="setTagFilter('${tag}')">${tag}</button>
        `).join("")}
      </div>
    </div>
  `;

  if (questions.length === 0) {
    html += `
      <div style="text-align:center; padding: 3rem 1rem; background-color: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <p style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 0.5rem;">🔍 No questions found matching your filter.</p>
        <button class="btn-secondary" onclick="resetFilters()">Reset Search & Filters</button>
      </div>
    `;
  } else {
    html += `<div class="questions-grid">`;
    questions.forEach(q => {
      const isCompleted = AppState.completedIds.includes(q.id);
      const isBookmarked = AppState.bookmarkedIds.includes(q.id);

      html += `
        <div class="question-card ${isCompleted ? "completed" : ""} ${isBookmarked ? "bookmarked" : ""}" id="card-${q.id}">
          <div>
            <div class="card-top-meta">
              <span class="difficulty-badge difficulty-${q.difficulty}">${q.difficulty}</span>
              <div class="card-actions-quick">
                <button class="icon-btn ${isBookmarked ? "active" : ""}" title="Bookmark Question" onclick="toggleBookmark('${q.id}')">
                  ${isBookmarked ? "⭐" : "☆"}
                </button>
                <button class="icon-btn" title="Mark as Mastered / Completed" onclick="toggleCompleted('${q.id}')">
                  ${isCompleted ? "✅" : "⭕"}
                </button>
              </div>
            </div>

            <h3 class="card-title">${q.title}</h3>
            <p class="card-summary">${q.shortSummary}</p>

            <div class="card-tags">
              ${q.tags.map(t => `<span class="tag-item">#${t}</span>`).join("")}
            </div>
          </div>

          <div class="card-footer-actions">
            ${AppState.activeCategory === "logic" ? `
              <button class="btn-primary" onclick="openVisualizerModal('${q.id}')">
                <span>🔍</span> Line-by-Line Breakdown
              </button>
              <button class="btn-accent" onclick="runQuickCardCode('${q.id}')">
                <span>▶️</span> Run Code
              </button>
            ` : AppState.activeCategory === "interview" ? `
              <button class="btn-primary" onclick="openInterviewModal('${q.id}')">
                <span>📖</span> Full Deep Dive & Analogy
              </button>
              <button class="btn-accent" onclick="copyInterviewScript('${q.id}')">
                <span>🎙️</span> Copy Interview Script
              </button>
            ` : `
              <button class="btn-primary" onclick="openMustKnowModal('${q.id}')">
                <span>⚡</span> 30-Sec Pitch & Code
              </button>
              <button class="btn-accent" onclick="copyInterviewScript('${q.id}')">
                <span>🎙️</span> Copy Pitch
              </button>
            `}
            <button class="btn-secondary" title="Copy Code Snippet" onclick="copyCodeSnippet('${q.id}')">
              <span>📋</span> Copy Code
            </button>
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }

  container.innerHTML = html;
}

// Filter Actions
function setTagFilter(tag) {
  AppState.activeTag = tag;
  renderApp();
}

function resetFilters() {
  AppState.searchTerm = "";
  AppState.activeTag = "all";
  AppState.activeDifficulty = "all";
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) searchInput.value = "";
  renderApp();
}

// Bookmark & Complete Actions
function toggleBookmark(id) {
  const idx = AppState.bookmarkedIds.indexOf(id);
  if (idx === -1) {
    AppState.bookmarkedIds.push(id);
    showToast("⭐ Added to Bookmarks");
  } else {
    AppState.bookmarkedIds.splice(idx, 1);
    showToast("Removed from Bookmarks");
  }
  localStorage.setItem("js_mastery_bookmarks", JSON.stringify(AppState.bookmarkedIds));
  renderApp();
}

function toggleCompleted(id) {
  const idx = AppState.completedIds.indexOf(id);
  if (idx === -1) {
    AppState.completedIds.push(id);
    showToast("🎉 Question marked as Mastered!");
  } else {
    AppState.completedIds.splice(idx, 1);
    showToast("Marked as incomplete");
  }
  localStorage.setItem("js_mastery_completed", JSON.stringify(AppState.completedIds));
  renderApp();
}

// =========================================================================
// INTERACTIVE LINE-BY-LINE VISUALIZER ENGINE
// =========================================================================
function openVisualizerModal(questionId) {
  const q = JS_QUESTIONS.find(item => item.id === questionId);
  if (!q || !q.lineByLine) return;

  AppState.stepper.questionId = questionId;
  AppState.stepper.currentLineIndex = 0;
  AppState.stepper.isPlaying = false;
  if (AppState.stepper.timerId) clearInterval(AppState.stepper.timerId);
  AppState.stepper.lines = q.lineByLine;

  const modalContainer = document.getElementById("modalDynamicContent");
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="visualizer-modal">
      <div class="modal-header">
        <div class="modal-header-title">
          <span style="font-size:1.4rem;">🧩</span>
          <div>
            <h3>${q.title}</h3>
            <span style="font-size:0.8rem; color:var(--text-secondary);">${q.shortSummary}</span>
          </div>
        </div>
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
      </div>

      <div class="visualizer-body">
        <!-- LEFT: Code View & Controls -->
        <div class="code-stepper-container">
          <div class="stepper-toolbar">
            <div class="stepper-controls">
              <button class="stepper-btn" onclick="stepFirst()" title="Go to First Line">⏮️ First</button>
              <button class="stepper-btn" onclick="stepPrev()" title="Previous Line">◀️ Prev</button>
              <button class="stepper-btn" id="playPauseBtn" onclick="toggleStepperPlay()" title="Auto Play">▶️ Auto Play</button>
              <button class="stepper-btn" onclick="stepNext()" title="Next Line">Next ▶️</button>
              <button class="stepper-btn" onclick="stepLast()" title="Go to Last Line">⏭️ Last</button>
            </div>
            <span class="stepper-status-badge" id="stepperStatusBadge">Step 1 of ${q.lineByLine.length}</span>
          </div>

          <div class="code-editor-view" id="stepperCodeBlock">
            ${q.lineByLine.map((item, idx) => `
              <div class="code-line-row ${idx === 0 ? "active-step" : ""}" id="step-row-${idx}" onclick="jumpToStep(${idx})">
                <span class="line-num">${item.line}</span>
                <span class="line-content">${escapeHtml(item.code || " ")}</span>
              </div>
            `).join("")}
          </div>

          <!-- Virtual Live Console Runner -->
          <div class="virtual-console-box">
            <div class="console-header">
              <span>🖥️ LIVE VIRTUAL CONSOLE</span>
              <div style="display:flex; gap:0.4rem;">
                <button class="btn-accent" style="padding:0.2rem 0.6rem; font-size:0.75rem;" onclick="runVisualizerCode('${q.id}')">▶️ Run Code</button>
                <button class="btn-secondary" style="padding:0.2rem 0.6rem; font-size:0.75rem;" onclick="clearVisualizerConsole()">Clear</button>
              </div>
            </div>
            <div class="console-output-area" id="visualizerConsoleOutput">Click "Run Code" above to execute and see real-time console logs...</div>
          </div>
        </div>

        <!-- RIGHT: Interactive Explanation & State Inspector -->
        <div class="explanation-panel">
          <div class="step-info-card">
            <h4>💡 Line <span id="currentLineNumberText">${q.lineByLine[0].line}</span> Breakdown</h4>
            <p class="step-explanation-text" id="stepExplanationText">${q.lineByLine[0].explanation}</p>
          </div>

          <div class="state-inspector-card">
            <h4>🧠 Memory & Variable Inspector</h4>
            <div class="variable-state-badge" id="variableStateBadge">${escapeHtml(q.lineByLine[0].variables || "None")}</div>
          </div>

          <div class="step-info-card" style="border-left: 3px solid var(--accent-blue);">
            <h4>🎯 Interview Takeaway</h4>
            <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">${q.interviewTip || q.deepExplanation}</p>
          </div>

          <div class="interview-script-box">
            <h4>
              <span>🎙️ How to say it in an Interview</span>
              <button class="icon-btn" title="Copy Script" onclick="copyText('${escapeQuotes(q.interviewScript)}')">📋</button>
            </h4>
            <p class="interview-script-content">${q.interviewScript}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("modalOverlay").classList.add("active");
  updateActiveStepUI();
}

function updateActiveStepUI() {
  const lines = AppState.stepper.lines;
  const currentIdx = AppState.stepper.currentLineIndex;
  const activeStep = lines[currentIdx];
  if (!activeStep) return;

  // Update line row highlight
  lines.forEach((_, idx) => {
    const row = document.getElementById(`step-row-${idx}`);
    if (row) {
      if (idx === currentIdx) {
        row.classList.add("active-step");
        row.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        row.classList.remove("active-step");
      }
    }
  });

  // Update status badge
  const badge = document.getElementById("stepperStatusBadge");
  if (badge) badge.textContent = `Step ${currentIdx + 1} of ${lines.length}`;

  // Update line number & explanation
  const lineNumText = document.getElementById("currentLineNumberText");
  if (lineNumText) lineNumText.textContent = activeStep.line;

  const explanationText = document.getElementById("stepExplanationText");
  if (explanationText) explanationText.textContent = activeStep.explanation;

  const varBadge = document.getElementById("variableStateBadge");
  if (varBadge) varBadge.textContent = activeStep.variables || "None";
}

function stepNext() {
  if (AppState.stepper.currentLineIndex < AppState.stepper.lines.length - 1) {
    AppState.stepper.currentLineIndex++;
    updateActiveStepUI();
  } else if (AppState.stepper.isPlaying) {
    toggleStepperPlay(); // Stop when reaching the end
  }
}

function stepPrev() {
  if (AppState.stepper.currentLineIndex > 0) {
    AppState.stepper.currentLineIndex--;
    updateActiveStepUI();
  }
}

function stepFirst() {
  AppState.stepper.currentLineIndex = 0;
  updateActiveStepUI();
}

function stepLast() {
  AppState.stepper.currentLineIndex = AppState.stepper.lines.length - 1;
  updateActiveStepUI();
}

function jumpToStep(index) {
  AppState.stepper.currentLineIndex = index;
  updateActiveStepUI();
}

function toggleStepperPlay() {
  const btn = document.getElementById("playPauseBtn");
  if (AppState.stepper.isPlaying) {
    clearInterval(AppState.stepper.timerId);
    AppState.stepper.isPlaying = false;
    if (btn) btn.innerHTML = "▶️ Auto Play";
  } else {
    AppState.stepper.isPlaying = true;
    if (btn) btn.innerHTML = "⏸️ Pause";
    AppState.stepper.timerId = setInterval(() => {
      if (AppState.stepper.currentLineIndex >= AppState.stepper.lines.length - 1) {
        AppState.stepper.currentLineIndex = 0; // Loop back
      } else {
        AppState.stepper.currentLineIndex++;
      }
      updateActiveStepUI();
    }, 2200);
  }
}

// Execute Code in Modal Virtual Console
function runVisualizerCode(questionId) {
  const q = JS_QUESTIONS.find(item => item.id === questionId);
  const consoleEl = document.getElementById("visualizerConsoleOutput");
  if (!q || !consoleEl) return;

  executeCodeInSandbox(q.code, consoleEl);
}

function clearVisualizerConsole() {
  const consoleEl = document.getElementById("visualizerConsoleOutput");
  if (consoleEl) consoleEl.innerHTML = `Console cleared. Click "Run Code" to execute.`;
}

// Quick Card Code Execution (Shows Toast Output)
function runQuickCardCode(questionId) {
  const q = JS_QUESTIONS.find(item => item.id === questionId);
  if (!q) return;
  openVisualizerModal(questionId);
  setTimeout(() => runVisualizerCode(questionId), 200);
}

// =========================================================================
// INTERVIEW DEEP DIVE & MUST KNOW MODALS
// =========================================================================
function openInterviewModal(questionId) {
  const q = JS_QUESTIONS.find(item => item.id === questionId);
  if (!q) return;

  const modalContainer = document.getElementById("modalDynamicContent");
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="visualizer-modal">
      <div class="modal-header">
        <div class="modal-header-title">
          <span style="font-size:1.4rem;">🚀</span>
          <div>
            <h3>${q.title}</h3>
            <span style="font-size:0.8rem; color:var(--text-secondary);">${q.shortSummary}</span>
          </div>
        </div>
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
      </div>

      <div class="interview-modal-body">
        <!-- Analogy Box -->
        ${q.analogy ? `
          <div class="analogy-banner">
            <h4>💡 Real-World Analogy (Easy to Remember)</h4>
            <p class="analogy-text">"${q.analogy}"</p>
          </div>
        ` : ""}

        <!-- Verbatim Interview Script -->
        <div class="interview-script-box">
          <h4>
            <span>🎙️ How to Answer Confidently in an Interview:</span>
            <button class="btn-primary" style="font-size:0.75rem; padding:0.25rem 0.6rem;" onclick="copyInterviewScript('${q.id}')">📋 Copy Script</button>
          </h4>
          <p class="interview-script-content">${q.interviewScript}</p>
        </div>

        <!-- Deep Markdown Explanation -->
        <div class="step-info-card">
          <h4>📖 Conceptual Deep-Dive & Architecture</h4>
          <div class="markdown-body-custom">${formatMarkdown(q.deepExplanation)}</div>
        </div>

        <!-- Code Demonstration -->
        ${q.code ? `
          <div class="step-info-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <h4>💻 Code Demonstration</h4>
              <button class="btn-accent" style="font-size:0.75rem; padding:0.2rem 0.6rem;" onclick="runModalCodeSnippet('${q.id}')">▶️ Run Snippet</button>
            </div>
            <pre class="code-editor-view" style="padding:1rem; border-radius:var(--radius-md);">${escapeHtml(q.code)}</pre>
            <div class="virtual-console-box" style="margin-top:0.75rem;">
              <div class="console-header"><span>CONSOLE OUTPUT</span></div>
              <div class="console-output-area" id="modalSnippetConsole">${escapeHtml(q.expectedOutput || "Click 'Run Snippet' to execute...")}</div>
            </div>
          </div>
        ` : ""}

        <!-- Gotchas & Traps -->
        ${q.gotchas ? `
          <div class="gotcha-card">
            <strong>⚠️ Interview Trap / Gotcha:</strong> ${q.gotchas}
          </div>
        ` : ""}
      </div>
    </div>
  `;

  document.getElementById("modalOverlay").classList.add("active");
}

function openMustKnowModal(questionId) {
  const q = JS_QUESTIONS.find(item => item.id === questionId);
  if (!q) return;

  const modalContainer = document.getElementById("modalDynamicContent");
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="visualizer-modal">
      <div class="modal-header">
        <div class="modal-header-title">
          <span style="font-size:1.4rem;">⚡</span>
          <div>
            <h3>${q.title}</h3>
            <span style="font-size:0.8rem; color:var(--text-secondary);">30-Second Essential Pitch</span>
          </div>
        </div>
        <button class="modal-close-btn" onclick="closeModal()">✕</button>
      </div>

      <div class="interview-modal-body">
        <!-- 30-Sec Pitch Card -->
        <div class="interview-script-box">
          <h4>
            <span>🎙️ 30-Second Interview Pitch:</span>
            <button class="btn-primary" style="font-size:0.75rem; padding:0.25rem 0.6rem;" onclick="copyInterviewScript('${q.id}')">📋 Copy Pitch</button>
          </h4>
          <p class="interview-script-content">${q.interviewScript}</p>
        </div>

        <!-- Simple Breakdown -->
        <div class="step-info-card">
          <h4>✨ High-Yield Key Points</h4>
          <div class="markdown-body-custom">${formatMarkdown(q.simplePitch)}</div>
        </div>

        <!-- Code Snippet -->
        ${q.code ? `
          <div class="step-info-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <h4>💻 Practical Snippet</h4>
              <button class="btn-accent" style="font-size:0.75rem; padding:0.2rem 0.6rem;" onclick="runModalCodeSnippet('${q.id}')">▶️ Run Snippet</button>
            </div>
            <pre class="code-editor-view" style="padding:1rem; border-radius:var(--radius-md);">${escapeHtml(q.code)}</pre>
            <div class="virtual-console-box" style="margin-top:0.75rem;">
              <div class="console-header"><span>CONSOLE OUTPUT</span></div>
              <div class="console-output-area" id="modalSnippetConsole">${escapeHtml(q.expectedOutput || "Click 'Run Snippet' to execute...")}</div>
            </div>
          </div>
        ` : ""}
      </div>
    </div>
  `;

  document.getElementById("modalOverlay").classList.add("active");
}

function runModalCodeSnippet(questionId) {
  const q = JS_QUESTIONS.find(item => item.id === questionId);
  const consoleEl = document.getElementById("modalSnippetConsole");
  if (!q || !consoleEl) return;
  executeCodeInSandbox(q.code, consoleEl);
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  if (overlay) overlay.classList.remove("active");
  if (AppState.stepper.timerId) {
    clearInterval(AppState.stepper.timerId);
    AppState.stepper.isPlaying = false;
  }
}

// =========================================================================
// SANDBOXED IN-BROWSER CODE RUNNER
// =========================================================================
function executeCodeInSandbox(codeString, outputElement) {
  outputElement.classList.remove("error");
  outputElement.innerHTML = `<span style="color:var(--text-muted);">Executing...</span>`;

  const logs = [];
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  // Intercept console calls
  console.log = (...args) => {
    logs.push(args.map(formatConsoleArg).join(" "));
  };
  console.warn = (...args) => {
    logs.push("⚠️ " + args.map(formatConsoleArg).join(" "));
  };
  console.error = (...args) => {
    logs.push("❌ " + args.map(formatConsoleArg).join(" "));
  };
  console.info = (...args) => {
    logs.push("ℹ️ " + args.map(formatConsoleArg).join(" "));
  };

  const startTime = performance.now();

  try {
    // Execute safely via Function constructor
    const runner = new Function(codeString);
    runner();

    const elapsed = (performance.now() - startTime).toFixed(2);

    setTimeout(() => {
      // Restore original console
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      console.info = originalInfo;

      if (logs.length === 0) {
        outputElement.innerHTML = `> Code executed cleanly in ${elapsed}ms (No console.log calls).`;
      } else {
        outputElement.innerHTML = logs.map(line => `> ${escapeHtml(line)}`).join("\n") + 
          `\n\n<span style="color:var(--text-muted); font-size:0.75rem;">[Execution Completed in ${elapsed}ms]</span>`;
      }
    }, 200); // 200ms grace period for quick timers

  } catch (err) {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
    console.info = originalInfo;

    outputElement.classList.add("error");
    outputElement.innerHTML = `❌ Runtime Error: ${escapeHtml(err.name)}: ${escapeHtml(err.message)}\n\n${escapeHtml(err.stack || "")}`;
  }
}

function formatConsoleArg(arg) {
  if (typeof arg === "undefined") return "undefined";
  if (arg === null) return "null";
  if (typeof arg === "object") {
    try {
      return JSON.stringify(arg, null, 2);
    } catch (e) {
      return String(arg);
    }
  }
  return String(arg);
}

// =========================================================================
// LIVE PLAYGROUND / SANDBOX VIEW
// =========================================================================
function renderPlaygroundView(container) {
  container.innerHTML = `
    <div class="playground-container">
      <div class="playground-header">
        <div>
          <h2>🛠️ Live JavaScript Interactive Playground</h2>
          <p style="color:var(--text-secondary); font-size:0.9rem;">Write, test, and experiment with JavaScript logic in real-time.</p>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <label style="font-size:0.85rem; font-weight:600; color:var(--text-muted);">Load Preset:</label>
          <select class="preset-select" id="playgroundPresetSelect" onchange="loadPlaygroundPreset(this.value)">
            <option value="custom">-- Choose a Preset --</option>
            <option value="closure">Closure & Counter</option>
            <option value="eventloop">Event Loop (Microtasks vs Macrotasks)</option>
            <option value="debounce">Custom Debounce</option>
            <option value="flatten">Recursive Array Flatten</option>
          </select>
          <button class="btn-accent" onclick="runPlaygroundCode()">▶️ Run Code</button>
          <button class="btn-secondary" onclick="clearPlaygroundConsole()">Clear Console</button>
        </div>
      </div>

      <div class="playground-editor-wrapper">
        <textarea class="code-textarea" id="playgroundCodeEditor" placeholder="// Type JavaScript code here...">${PLAYGROUND_PRESETS.custom}</textarea>
        
        <div class="playground-console">
          <div class="console-header">
            <span>🖥️ EXECUTION CONSOLE</span>
            <span style="font-size:0.75rem; color:var(--accent-green);">Ready</span>
          </div>
          <div class="playground-output-body" id="playgroundConsoleOutput">Click "Run Code" ▶️ above to see output results here.</div>
        </div>
      </div>
    </div>
  `;
}

function loadPlaygroundPreset(presetKey) {
  const editor = document.getElementById("playgroundCodeEditor");
  if (editor && PLAYGROUND_PRESETS[presetKey]) {
    editor.value = PLAYGROUND_PRESETS[presetKey];
    showToast(`Loaded ${presetKey} preset`);
  }
}

function runPlaygroundCode() {
  const editor = document.getElementById("playgroundCodeEditor");
  const consoleEl = document.getElementById("playgroundConsoleOutput");
  if (!editor || !consoleEl) return;

  executeCodeInSandbox(editor.value, consoleEl);
}

function clearPlaygroundConsole() {
  const consoleEl = document.getElementById("playgroundConsoleOutput");
  if (consoleEl) {
    consoleEl.innerHTML = "Console cleared. Ready for next run.";
  }
}

// =========================================================================
// QUIZ & FLASHCARD SELF-TEST ENGINE
// =========================================================================
function renderQuizView(container) {
  const currentQ = JS_QUESTIONS[AppState.quiz.currentIndex];

  container.innerHTML = `
    <div class="quiz-wrapper">
      <div class="section-header-box">
        <div class="section-info">
          <h2>🎯 JavaScript Flashcard & Self-Test Quiz</h2>
          <p>Test your knowledge across all 30 interview questions. Try answering in your head or on paper, then reveal the answer!</p>
        </div>
        <div class="progress-pill">
          Score: ${AppState.quiz.scoreCorrect} / ${AppState.quiz.scoreTotal} (${AppState.quiz.scoreTotal > 0 ? Math.round((AppState.quiz.scoreCorrect / AppState.quiz.scoreTotal) * 100) : 0}%)
        </div>
      </div>

      <div class="quiz-card">
        <div class="quiz-header">
          <span class="difficulty-badge difficulty-${currentQ.difficulty}">${currentQ.difficulty}</span>
          <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Question ${AppState.quiz.currentIndex + 1} of ${JS_QUESTIONS.length}</span>
        </div>

        <h3 class="quiz-question-title">${currentQ.title}</h3>
        <p style="color:var(--text-secondary); margin-bottom:1rem;">${currentQ.shortSummary}</p>

        ${currentQ.code ? `
          <div class="quiz-code-snippet">${escapeHtml(currentQ.code)}</div>
        ` : ""}

        <!-- Hidden State -->
        <div class="quiz-answer-hidden-box" id="quizHiddenBox" style="${AppState.quiz.isRevealed ? "display:none;" : "display:block;"}">
          <p style="font-size:1.1rem; font-weight:600; margin-bottom:0.75rem;">🤔 Ready to check your answer?</p>
          <button class="btn-primary" onclick="revealQuizAnswer()">👁️ Reveal Answer & Breakdown</button>
        </div>

        <!-- Revealed State -->
        <div class="quiz-revealed-answer ${AppState.quiz.isRevealed ? "active" : ""}" id="quizRevealedBox">
          <h4 style="color:var(--accent-green); margin-bottom:0.5rem;">✅ Complete Explanation & Interview Answer:</h4>
          <p style="margin-bottom:1rem; font-size:0.95rem; line-height:1.5;">${currentQ.interviewScript}</p>
          
          ${currentQ.expectedOutput ? `
            <div style="font-family:var(--font-code); font-size:0.85rem; background:var(--bg-code); padding:0.6rem; border-radius:var(--radius-sm); color:#7ee787; margin-bottom:1rem;">
              <strong>Expected Output:</strong>\n${escapeHtml(currentQ.expectedOutput)}
            </div>
          ` : ""}

          <div style="display:flex; gap:0.5rem; justify-content:center; align-items:center; margin-top:1.25rem;">
            <span style="font-size:0.85rem; font-weight:600; color:var(--text-muted);">Self Grade:</span>
            <button class="btn-primary" style="background-color:var(--accent-green);" onclick="gradeQuiz(true)">✅ I Knew It!</button>
            <button class="btn-secondary" onclick="gradeQuiz(false)">🔁 Need Practice</button>
          </div>
        </div>

        <!-- Quiz Navigation Controls -->
        <div class="quiz-nav-row" style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-color);">
          <button class="btn-secondary" onclick="quizPrev()" ${AppState.quiz.currentIndex === 0 ? "disabled" : ""}>◀️ Previous</button>
          <button class="btn-secondary" onclick="quizNext()" ${AppState.quiz.currentIndex === JS_QUESTIONS.length - 1 ? "disabled" : ""}>Next ▶️</button>
        </div>
      </div>
    </div>
  `;
}

function revealQuizAnswer() {
  AppState.quiz.isRevealed = true;
  const hiddenBox = document.getElementById("quizHiddenBox");
  const revealedBox = document.getElementById("quizRevealedBox");
  if (hiddenBox) hiddenBox.style.display = "none";
  if (revealedBox) revealedBox.classList.add("active");
}

function gradeQuiz(isCorrect) {
  AppState.quiz.scoreTotal++;
  if (isCorrect) {
    AppState.quiz.scoreCorrect++;
    showToast("🎉 Great job! Point recorded.");
  } else {
    showToast("Keep practicing! You'll master this soon.");
  }
  quizNext();
}

function quizNext() {
  if (AppState.quiz.currentIndex < JS_QUESTIONS.length - 1) {
    AppState.quiz.currentIndex++;
    AppState.quiz.isRevealed = false;
    renderApp();
  }
}

function quizPrev() {
  if (AppState.quiz.currentIndex > 0) {
    AppState.quiz.currentIndex--;
    AppState.quiz.isRevealed = false;
    renderApp();
  }
}

// =========================================================================
// UTILITY FUNCTIONS & HELPERS
// =========================================================================
function copyCodeSnippet(questionId) {
  const q = JS_QUESTIONS.find(item => item.id === questionId);
  if (q && q.code) {
    copyToClipboard(q.code, "📋 Code copied to clipboard!");
  }
}

function copyInterviewScript(questionId) {
  const q = JS_QUESTIONS.find(item => item.id === questionId);
  if (q && q.interviewScript) {
    copyToClipboard(q.interviewScript, "🎙️ Interview script copied to clipboard!");
  }
}

function copyText(text) {
  copyToClipboard(text, "Copied to clipboard!");
}

function copyToClipboard(text, successMsg = "Copied to clipboard!") {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg);
  }).catch(() => {
    showToast("Failed to copy automatically. Please copy manually.");
  });
}

function showToast(message) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>⚡</span> ${escapeHtml(message)}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeQuotes(str) {
  if (!str) return "";
  return str.replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

function formatMarkdown(md) {
  if (!md) return "";
  let html = md;

  // Convert markdown tables
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split("|").filter((c, i, a) => i > 0 && i < a.length - 1);
    return `<tr>${cells.map(c => `<td>${c.trim()}</td>`).join("")}</tr>`;
  });

  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
  // Convert inline code
  html = html.replace(/`([^`]+)`/g, "<code style='background:var(--bg-code); padding:0.15rem 0.35rem; border-radius:4px; color:var(--accent-blue); font-family:var(--font-code); font-size:0.85em;'>$1</code>");
  
  // Convert lists
  html = html.replace(/^\s*-\s+(.*)$/gm, "<li style='margin-left:1.25rem; margin-bottom:0.35rem;'>$1</li>");
  
  // Convert headings
  html = html.replace(/^### (.*$)/gm, "<h4 style='color:var(--accent-blue); margin-top:1rem; margin-bottom:0.5rem;'>$1</h4>");

  // Wrap in paragraphs
  html = html.replace(/\n\n/g, "<br><br>");

  return html;
}
