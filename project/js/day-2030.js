(function () {
  const DAYS = {
    student: {
      title: "Student — a possible day",
      tag: "SCENARIO",
      morning: "A studio brief arrives: specify a problem, not paste an essay. The learning record captures process, not only the final file.",
      work: "Studio time mixes human critique with model drafts. Oral defense still tests whether the student owns the idea.",
      ai: "The model proposes three architectures. The assignment is to reject two with reasons.",
      human: "Choosing constraints, citing sources, and explaining failure modes stay human.",
      auto: "Boilerplate scaffolding and first-pass tests may be generated. Grading of judgment may not be.",
      challenge: "If take-home tasks are easy to generate, the scarce skill becomes verification and original framing.",
      skills: "Problem specification, critique, AI literacy, communication, academic integrity."
    },
    developer: {
      title: "Developer — a possible day",
      tag: "SCENARIO",
      morning: "The backlog is smaller in ticket count, denser in integration risk. Overnight agents opened draft pull requests.",
      work: "The developer spends the day reviewing diffs, running evals, and deciding what is allowed to ship.",
      ai: "Generation covers boilerplate and tests. Ambiguous product rules still need a person.",
      human: "Architecture, security exceptions, and incident ownership remain named humans.",
      auto: "CI may auto-patch lint-level issues. Production rollback policy stays a team decision.",
      challenge: "Review load can exceed writing load. Skill atrophy is possible if juniors never see the internals.",
      skills: "Systems thinking, evaluation, security, communication with product, accountable sign-off."
    },
    owner: {
      title: "Business owner — a possible day",
      tag: "SCENARIO",
      morning: "A smaller team ships a customer-facing change. The invoice for inference is visible next to payroll.",
      work: "The owner chooses which workflows to automate and which require a person the customer can blame.",
      ai: "Draft contracts, support replies, and dashboard commentary are generated; legal review is scheduled.",
      human: "Pricing, liability, and brand voice stay executive decisions.",
      auto: "Routine bookkeeping and L1 replies may be assisted. Exceptions escalate.",
      challenge: "Speed without oversight can create silent customer harm. Cheap software is not free of accountability.",
      skills: "Product judgment, vendor literacy, risk, hiring for hybrid human+AI work."
    },
    nonit: {
      title: "Non-IT worker — a possible day",
      tag: "SCENARIO",
      morning: "Scheduling, translation, and form-filling arrive pre-drafted. The job still happens in a clinic, classroom, depot, or office.",
      work: "The worker checks whether the draft matches the real case in front of them.",
      ai: "Suggestions appear inside the same tools they already use—not a separate 'AI job'.",
      human: "Care, negotiation, physical skill, and local knowledge remain the service.",
      auto: "Paperwork compression is possible. Emotional labor and exception handling are not automatically gone.",
      challenge: "Unequal access to tools could widen gaps between workplaces. Training quality matters.",
      skills: "Domain expertise, verification, communication, comfort refusing a bad suggestion."
    }
  };

  const keys = {
    morning: "Morning",
    work: "Work / study",
    ai: "AI interaction",
    human: "Human decisions",
    auto: "Automation",
    challenge: "Challenges",
    skills: "Skills needed"
  };

  const board = document.getElementById("day-board");
  const btns = document.querySelectorAll("[data-day]");
  if (!board || !btns.length) return;

  function show(id) {
    const d = DAYS[id];
    let html =
      "<p class=\"micro\">POSSIBLE SCENARIO — NOT A PREDICTION</p><h3>" +
      d.title +
      "</h3><p><span class=\"evidence evidence-scenario\">" +
      d.tag +
      "</span></p><dl class=\"briefing\">";
    Object.keys(keys).forEach(function (k) {
      html += "<dt>" + keys[k] + "</dt><dd>" + d[k] + "</dd>";
    });
    html += "</dl>";
    board.innerHTML = html;
  }

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btns.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      show(btn.getAttribute("data-day"));
      const live = document.getElementById("day-live");
      if (live) live.textContent = "Showing " + btn.textContent + " scenario";
    });
  });

  show("student");
})();
