(function () {
  const ROLES = {
    "student|technical|ai": {
      role: "AI-augmented software builder (student pathway)",
      gaps: "Evaluation design, security basics, a public project that shows review—not only generation.",
      path: "Ship one small product. Document prompts, tests, and what you refused to ship.",
      project: "A study planner that generates drafts you must edit, with a visible verification checklist."
    },
    "student|creative|education": {
      role: "AI learning designer (example)",
      gaps: "Assessment design, academic integrity, studio pedagogy.",
      path: "Pair education coursework with a portfolio of critiques of generated lessons.",
      project: "Redesign one assignment so process evidence matters more than the final generated file."
    },
    "developer|technical|cybersecurity": {
      role: "AI security specialist (example)",
      gaps: "Threat modeling for generated code, supply chain, prompt injection.",
      path: "Add security reviews to every AI-assisted pull request you make this term.",
      project: "A linter-plus-human checklist for common generated-code defects."
    },
    "developer|business|ai": {
      role: "AI systems supervisor (example)",
      gaps: "Vendor literacy, cost, incident ownership.",
      path: "Practice writing specs and evals, not only functions.",
      project: "An internal 'can we automate this?' decision memo with rollback rules."
    },
    "designer|creative|ai": {
      role: "Human–AI experience designer (example)",
      gaps: "Error states, provenance UI, consent.",
      path: "Prototype interfaces that show uncertainty instead of fake confidence.",
      project: "A review screen where generated UI cannot ship until a human names the risk."
    },
    "nonit|communication|healthcare": {
      role: "Healthcare + AI specialist (example)",
      gaps: "Clinical workflow, privacy, verification of suggestions.",
      path: "Domain depth first; tools second. Never skip accountability.",
      project: "A checklist that nurses or clerks could use to reject a bad generated note."
    },
    "nonit|business|finance": {
      role: "AI risk / compliance specialist (example)",
      gaps: "Controls, audit trails, model change management.",
      path: "Learn how today's control frameworks map onto automated decisions.",
      project: "A one-page control map: generate → test → approve → monitor."
    },
    "designer|human|education": {
      role: "Studio learning experience designer (example)",
      gaps: "Facilitation, critique culture, accessible materials.",
      path: "Run a small workshop where AI is allowed only after a human brief.",
      project: "A critique protocol for AI-assisted student work."
    }
  };

  const fallback = {
    role: "Hybrid practitioner (illustrative combination)",
    gaps: "A second skill besides your current strength—usually verification, domain, or communication.",
    path: "LEARN a concept deeply → ADAPT one workflow → COLLABORATE with a model on a bounded task → BUILD a small artifact → CREATE an opportunity for someone else (docs, workshop, tool).",
    project: "Pick a real problem in your interest area. Generate a draft. Publish the review notes, not only the output."
  };

  const form = document.getElementById("career-form");
  const out = document.getElementById("career-out");
  if (!form || !out) return;

  function key() {
    const bg = form.querySelector("[name='background']:checked");
    const st = form.querySelector("[name='strength']:checked");
    const interest = form.querySelector("[name='interest']:checked");
    if (!bg || !st || !interest) return "";
    return bg.value + "|" + st.value + "|" + interest.value;
  }

  function render() {
    const k = key();
    const card = ROLES[k] || fallback;
    out.innerHTML =
      "<p class=\"stamp\">Career Brainstorming — Illustrative, Not a Prediction.</p>" +
      "<h3>" +
      card.role +
      "</h3><dl class=\"briefing\">" +
      "<dt>Possible future role</dt><dd>" +
      card.role +
      "</dd>" +
      "<dt>Skill gaps</dt><dd>" +
      card.gaps +
      "</dd>" +
      "<dt>Learning path</dt><dd>" +
      card.path +
      "</dd>" +
      "<dt>First project idea</dt><dd>" +
      card.project +
      "</dd></dl>";
    const live = document.getElementById("career-live");
    if (live) live.textContent = "Illustrative role: " + card.role;
  }

  form.addEventListener("change", render);
  render();

  const steps = document.querySelectorAll("[data-road]");
  const roadPanel = document.getElementById("road-panel");
  const COPY = {
    learn: {
      title: "LEARN",
      personal: "Build literacy: how models fail, how to read diffs, how to test.",
      institution: "Teach verification and studios, not only answer production."
    },
    adapt: {
      title: "ADAPT",
      personal: "Change one workflow this month. Keep a log of what you still insist on doing by hand.",
      institution: "Redesign junior work so learning is not only leftover chores models already finished."
    },
    collab: {
      title: "COLLABORATE WITH AI",
      personal: "Use generate/review pairs. Never ship what you cannot explain.",
      institution: "Name owners. Logs. Eval sets. Stop treating tools as unnamed ghosts."
    },
    build: {
      title: "BUILD",
      personal: "Make a small, real artifact with users—even three users.",
      institution: "Fund apprenticeships and internal mobility, not only licenses."
    },
    create: {
      title: "CREATE NEW OPPORTUNITIES",
      personal: "Document a method others can reuse. Teach. Start a service in a domain you know.",
      institution: "Open entry ramps: internships, public eval work, safety and audit roles."
    }
  };

  function showRoad(id) {
    const c = COPY[id];
    if (!roadPanel || !c) return;
    roadPanel.innerHTML =
      "<p class=\"micro\">REBUILD 03</p><h3>" +
      c.title +
      "</h3><p><strong>Personal.</strong> " +
      c.personal +
      "</p><p><strong>Institutional.</strong> " +
      c.institution +
      "</p>";
  }

  steps.forEach(function (btn) {
    btn.addEventListener("click", function () {
      steps.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      showRoad(btn.getAttribute("data-road"));
    });
  });
  showRoad("learn");

  const pipeBtns = document.querySelectorAll("[data-pipe]");
  const pipePanel = document.getElementById("pipe-panel");
  const PIPE = {
    generate: "Generation is cheap. Treat the output as a draft with unknown defects.",
    test: "Automated tests catch regressions. They do not prove the product was the right thing to build.",
    verify: "A person checks fitness for the real user, the real law, and the real risk.",
    audit: "Independent review looks for bias, security, logs, and whether the eval set is being gamed.",
    approve: "A named human (or accountable role) accepts consequences of shipping.",
    monitor: "After release, watch drift, incidents, and cost. Automation does not end at deploy."
  };

  pipeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      pipeBtns.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      const id = btn.getAttribute("data-pipe");
      if (pipePanel) {
        pipePanel.innerHTML = "<p class=\"micro\">TRUST LAYER</p><h3>" + btn.textContent + "</h3><p>" + PIPE[id] + "</p>";
      }
    });
  });
})();
