/* Page 2 interactions. Numeric values are exhibition fiction; canonical copy: data/scenario-illustrative.json */
(function () {
  const DATA = {
    label: "ILLUSTRATIVE SCENARIO DATA",
    severity: {
      low: { traditionalCoding: 78, entryLevel: 70, humanHours: 74, aiAssisted: 42, automation: 28 },
      medium: { traditionalCoding: 48, entryLevel: 40, humanHours: 51, aiAssisted: 68, automation: 58 },
      high: { traditionalCoding: 18, entryLevel: 16, humanHours: 29, aiAssisted: 88, automation: 82 }
    },
    funnel: {
      low: [400, 180, 90, 42],
      medium: [400, 140, 48, 18],
      high: [400, 110, 22, 6]
    },
    funnelLabels: ["Students", "Applicants", "Interviews", "Entry-level seats"],
    survey: {
      title: "ILLUSTRATIVE SCENARIO SURVEY",
      caption: "Fictional exhibition sample. Not a real-world survey. Do not cite as research.",
      nNote: "Scenario sample size (invented): 400 students, 280 developers, 120 hiring managers.",
      questions: [
        {
          id: "worry",
          text: "How worried are you about AI replacing traditional IT work?",
          options: ["Low", "Moderate", "High"],
          groups: { students: [22, 41, 37], developers: [28, 46, 26], managers: [18, 49, 33] }
        },
        {
          id: "daily",
          text: "Would you use AI every day at work?",
          options: ["No", "Sometimes", "Yes"],
          groups: { students: [8, 27, 65], developers: [11, 24, 65], managers: [6, 31, 63] }
        },
        {
          id: "trust",
          text: "Would you trust AI-written production code without extra review?",
          options: ["No", "With review only", "Yes"],
          groups: { students: [48, 46, 6], developers: [61, 35, 4], managers: [54, 41, 5] }
        },
        {
          id: "pay",
          text: "Who should pay for reskilling?",
          options: ["Workers", "Companies", "Shared / public"],
          groups: { students: [12, 39, 49], developers: [9, 47, 44], managers: [21, 34, 45] }
        },
        {
          id: "oversight",
          text: "How much human oversight should AI systems require?",
          options: ["Minimal", "Task-dependent", "High / always"],
          groups: { students: [7, 58, 35], developers: [5, 52, 43], managers: [9, 55, 36] }
        }
      ]
    }
  };

  const METRIC_LABELS = {
    traditionalCoding: "Traditional coding work",
    entryLevel: "Entry-level opportunities",
    humanHours: "Human coding hours",
    aiAssisted: "AI-assisted development",
    automation: "Automation level"
  };

  const ORG = {
    before: [
      ["Product", "Product manager"],
      ["Design", "Designers"],
      ["Build", "Developers"],
      ["Quality", "QA"],
      ["Ops", "DevOps"],
      ["Support", "Support"]
    ],
    after: [
      ["Direction", "Product strategy"],
      ["Systems", "AI systems"],
      ["Build", "Smaller engineering team"],
      ["Eval", "AI evaluation"],
      ["Trust", "Security"],
      ["Oversight", "Human oversight"],
      ["Domain", "Domain experts"]
    ]
  };

  function levelFromSlider(v) {
    const n = Number(v);
    if (n <= 1) return "low";
    if (n === 2) return "medium";
    return "high";
  }

  function renderMetrics(level) {
    const root = document.getElementById("severity-metrics");
    if (!root) return;
    const row = DATA.severity[level];
    root.innerHTML = "";
    Object.keys(METRIC_LABELS).forEach(function (key) {
      const wrap = document.createElement("div");
      wrap.className = "metric";
      wrap.innerHTML =
        "<p class=\"stamp\">" +
        DATA.label +
        "</p><div class=\"label\"><span>" +
        METRIC_LABELS[key] +
        "</span><span>" +
        row[key] +
        " <span class=\"micro\">index</span></span></div><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:" +
        row[key] +
        "%\"></div></div>";
      root.appendChild(wrap);
    });
  }

  function renderFunnel(level) {
    const root = document.getElementById("funnel");
    if (!root) return;
    const vals = DATA.funnel[level];
    const max = vals[0];
    root.innerHTML = "";
    vals.forEach(function (n, i) {
      const stage = document.createElement("div");
      stage.className = "funnel-stage";
      const w = Math.max(12, Math.round((n / max) * 100));
      stage.innerHTML =
        "<div class=\"top\"><span>" +
        DATA.funnelLabels[i] +
        "</span><span>" +
        n +
        "</span></div><p class=\"stamp\">ILLUSTRATIVE SCENARIO</p><div class=\"funnel-bar\" style=\"width:" +
        w +
        "%\"></div>";
      root.appendChild(stage);
    });
  }

  function renderOrg(mode) {
    const root = document.getElementById("org-grid");
    if (!root) return;
    root.innerHTML = "";
    ORG[mode].forEach(function (pair) {
      const card = document.createElement("div");
      card.className = "org-card";
      card.innerHTML = "<span>" + pair[0] + "</span><strong>" + pair[1] + "</strong>";
      root.appendChild(card);
    });
  }

  function renderSurvey() {
    const qSel = document.getElementById("survey-q");
    const gSel = document.getElementById("survey-g");
    const chart = document.getElementById("survey-chart");
    const cap = document.getElementById("survey-caption");
    if (!qSel || !gSel || !chart) return;
    const q = DATA.survey.questions.find(function (item) {
      return item.id === qSel.value;
    });
    const group = gSel.value;
    const vals = q.groups[group];
    chart.innerHTML = "";
    q.options.forEach(function (opt, i) {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML =
        "<span>" +
        opt +
        "</span><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:" +
        vals[i] +
        "%\"></div></div><span>" +
        vals[i] +
        "%</span>";
      chart.appendChild(row);
    });
    if (cap) {
      cap.textContent = DATA.survey.caption + " " + DATA.survey.nNote + " Question: " + q.text;
    }
  }

  const slider = document.getElementById("severity");
  const severityLive = document.getElementById("severity-live");
  const funnelLive = document.getElementById("funnel-live");

  function applySeverity() {
    if (!slider) return;
    const level = levelFromSlider(slider.value);
    const names = { low: "LOW", medium: "MEDIUM", high: "HIGH" };
    renderMetrics(level);
    renderFunnel(level);
    const msg = "Scenario severity " + names[level] + ". All figures are illustrative scenario data, not forecasts.";
    if (severityLive) severityLive.textContent = msg;
    if (funnelLive) funnelLive.textContent = msg;
    const readout = document.getElementById("severity-readout");
    if (readout) readout.textContent = names[level];
  }

  if (slider) {
    slider.addEventListener("input", applySeverity);
    applySeverity();
  }

  document.querySelectorAll("[data-org]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-org]").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      renderOrg(btn.getAttribute("data-org"));
    });
  });
  if (document.getElementById("org-grid")) renderOrg("before");

  document.querySelectorAll("[data-dst]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-dst]").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      document.querySelectorAll("[data-dst-panel]").forEach(function (p) {
        p.hidden = p.getAttribute("data-dst-panel") !== btn.getAttribute("data-dst");
      });
    });
  });

  document.querySelectorAll("[data-matrix-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const f = btn.getAttribute("data-matrix-filter");
      document.querySelectorAll("[data-matrix-filter]").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      document.querySelectorAll("[data-own]").forEach(function (row) {
        row.hidden = f !== "all" && row.getAttribute("data-own") !== f;
      });
    });
  });

  document.querySelectorAll("[data-own-focus]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = btn.getAttribute("data-own-focus");
      document.querySelectorAll("#own-table tbody tr").forEach(function (row) {
        row.style.outline = row.getAttribute("data-task") === id ? "1px solid var(--amber)" : "";
      });
    });
  });

  const qSel = document.getElementById("survey-q");
  const gSel = document.getElementById("survey-g");
  if (qSel && gSel) {
    qSel.addEventListener("change", renderSurvey);
    gSel.addEventListener("change", renderSurvey);
    renderSurvey();
  }
})();
