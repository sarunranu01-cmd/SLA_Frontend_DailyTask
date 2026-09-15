(function () {
  const DATA = {
    years: ["2026", "2028", "2030"],
    rows: [
      {
        cat: "AI",
        "2026": {
          tag: "TREND",
          title: "Assistive generation is already in the workflow",
          text: "Models draft code, text, and images. Quality still depends on human review, evaluation data, and domain context."
        },
        "2028": {
          tag: "PROJECTION",
          title: "Possible agent loops",
          text: "Multi-step tools may chain planning, coding, and testing. Reliability and cost could remain the binding constraints."
        },
        "2030": {
          tag: "PROJECTION",
          title: "Possible mature assistance",
          text: "Organizations could treat AI as default infrastructure—if governance, energy, and error costs are managed. Not guaranteed."
        }
      },
      {
        cat: "Software development",
        "2026": {
          tag: "FACT",
          title: "Humans still own the ship decision",
          text: "IDEs, CI, and code review remain human-gated. Generated code is a starting point, not an automatic production artifact."
        },
        "2028": {
          tag: "PROJECTION",
          title: "More generation, more review load",
          text: "Teams may write less boilerplate and spend more time specifying, integrating, and verifying. Junior task mix could shift."
        },
        "2030": {
          tag: "PROJECTION",
          title: "Directing systems may matter more than typing them",
          text: "Architecture, evaluation, and accountability could become the scarce skills—if tools keep improving. Trajectory, not destiny."
        }
      },
      {
        cat: "Cloud",
        "2026": {
          tag: "FACT",
          title: "Compute is already a strategic input",
          text: "Training and inference concentrate demand on specialized chips, regions, and power. Cost and latency shape product design."
        },
        "2028": {
          tag: "PROJECTION",
          title: "Possible tighter coupling of AI and cloud bills",
          text: "Firms may optimize for token/watt economics as much as for features. Multi-cloud and sovereign constraints could intensify."
        },
        "2030": {
          tag: "PROJECTION",
          title: "Possible default for AI workloads",
          text: "Cloud could remain the delivery layer for most software and models, with edge as a complement—not a replacement."
        }
      },
      {
        cat: "Cybersecurity",
        "2026": {
          tag: "TREND",
          title: "Attack surface grows with software speed",
          text: "Generated code, supply chains, and identity systems already expand the places failures can hide."
        },
        "2028": {
          tag: "PROJECTION",
          title: "Possible AI-on-AI defense and offense",
          text: "Both defenders and attackers may use models. Human judgment in incident response could become more, not less, important."
        },
        "2030": {
          tag: "PROJECTION",
          title: "Trust work may scale with automation",
          text: "If more software is generated, verification, identity, and monitoring could be core IT work—not optional add-ons."
        }
      },
      {
        cat: "Robotics",
        "2026": {
          tag: "TREND",
          title: "Narrow robots, not general labor replacement",
          text: "Warehouses, factories, and labs use specialized machines. Household general robots remain limited and expensive."
        },
        "2028": {
          tag: "PROJECTION",
          title: "Possible faster perception-control loops",
          text: "Better models may improve picking, inspection, and teleoperation. Safety certification could lag capability."
        },
        "2030": {
          tag: "PROJECTION",
          title: "Possible expansion in structured environments",
          text: "Industrial and logistics robotics could widen. Open-world humanoid labor remains highly uncertain."
        }
      },
      {
        cat: "Workplace automation",
        "2026": {
          tag: "TREND",
          title: "Routine digital tasks are already being assisted",
          text: "Support macros, document drafts, and analytics pipelines show where repetition meets language and pattern tools."
        },
        "2028": {
          tag: "PROJECTION",
          title: "Possible compression of some process roles",
          text: "Firms may automate slices of work before they redesign jobs. Headcount effects, if any, would be organizational choices."
        },
        "2030": {
          tag: "SCENARIO",
          title: "Job outcomes remain a scenario space",
          text: "Productivity could rise without equal wage or hiring gains. Labor effects depend on law, firms, and who captures surplus."
        }
      },
      {
        cat: "Education",
        "2026": {
          tag: "FACT",
          title: "Assessment is already under pressure",
          text: "Take-home writing and coding tasks can be generated. Institutions are experimenting with oral exams, studios, and process evidence."
        },
        "2028": {
          tag: "PROJECTION",
          title: "Possible shift toward verification skills",
          text: "Curricula may reward specifying problems, critiquing model output, and documenting decisions—not only producing answers."
        },
        "2030": {
          tag: "PROJECTION",
          title: "Possible studio-style computing education",
          text: "If tools keep generating drafts, education could look more like directed practice plus ethics and systems thinking."
        }
      },
      {
        cat: "Digital life",
        "2026": {
          tag: "TREND",
          title: "Synthetic media is already cheap",
          text: "Images, voices, and video can be fabricated at consumer cost. Trust in what we see is already a public problem."
        },
        "2028": {
          tag: "PROJECTION",
          title: "Possible identity and provenance tools",
          text: "Watermarking and credentials may spread. They will not automatically restore trust without institutions behind them."
        },
        "2030": {
          tag: "PROJECTION",
          title: "Everyday software may feel conversational",
          text: "Interfaces could mix search, agents, and apps. Privacy, addiction, and misinformation risks would travel with convenience."
        }
      }
    ]
  };

  const grid = document.getElementById("horizon-grid");
  const buttons = document.querySelectorAll("[data-year]");
  if (!grid || !buttons.length) return;

  function render(year) {
    grid.innerHTML = "";
    DATA.rows.forEach(function (row) {
      const cat = document.createElement("div");
      cat.className = "cat";
      cat.textContent = row.cat;
      const cell = document.createElement("div");
      cell.className = "cell";
      const item = row[year];
      cell.innerHTML =
        "<span class=\"evidence evidence-" +
        item.tag.toLowerCase() +
        "\">" +
        item.tag +
        "</span><strong>" +
        item.title +
        "</strong>" +
        item.text;
      grid.appendChild(cat);
      grid.appendChild(cell);
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      render(btn.getAttribute("data-year"));
      const live = document.getElementById("horizon-live");
      if (live) live.textContent = "Horizon set to " + btn.getAttribute("data-year");
    });
  });

  render("2026");
})();
