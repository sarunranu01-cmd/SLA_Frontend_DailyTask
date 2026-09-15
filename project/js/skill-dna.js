(function () {
  const DNA = {
    technical: {
      title: "Technical",
      intro: "Craft that lets a person specify, build, and inspect systems—including systems that contain models.",
      skills: [
        { name: "AI literacy", why: "Knowing what models can and cannot do reduces magical thinking and unsafe shipping." },
        { name: "Programming", why: "Reading and shaping code remains useful even when much of it is generated." },
        { name: "Systems thinking", why: "Failures hide in integrations, incentives, and data—not only in a single function." },
        { name: "Data", why: "Outputs follow training, labels, and evaluation sets. Garbage in still means garbage out." },
        { name: "Cybersecurity", why: "Faster software can mean faster defects. Defense stays a human-owned practice." }
      ]
    },
    human: {
      title: "Human",
      intro: "Work that requires other people: persuasion, care, coordination, and original framing.",
      skills: [
        { name: "Communication", why: "Directing AI is mostly specifying intent to other humans as well as to machines." },
        { name: "Creativity", why: "Choosing a problem worth solving is not the same as completing a prompt." },
        { name: "Leadership", why: "Teams still need someone to set constraints, stop unsafe work, and take blame." },
        { name: "Problem solving", why: "Ill-posed real problems do not arrive as clean tickets." },
        { name: "Collaboration", why: "Software is still made with users, lawyers, operators, and domain experts." }
      ]
    },
    trust: {
      title: "Trust",
      intro: "Skills that keep automated work from becoming unaccountable work.",
      skills: [
        { name: "Ethics", why: "Who is harmed, who consents, and who decides cannot be outsourced to a model." },
        { name: "Security", why: "Generated systems inherit supply-chain and prompt-injection risk." },
        { name: "Verification", why: "If generation is cheap, checking becomes the scarce step." },
        { name: "Governance", why: "Policies, logs, and role design turn principles into operations." },
        { name: "Risk management", why: "Not every speed-up is worth the tail risk." }
      ]
    },
    build: {
      title: "Build",
      intro: "Turning capability into something someone will use, pay for, or rely on.",
      skills: [
        { name: "Product thinking", why: "A working demo is not a service with users and liability." },
        { name: "Entrepreneurship", why: "Small teams may ship more; they still need customers and constraints." },
        { name: "Experimentation", why: "Treat tools as hypotheses. Measure. Drop what fails." },
        { name: "Domain expertise", why: "Healthcare, energy, finance, and education errors are not generic." },
        { name: "Execution", why: "Shipping, maintaining, and supporting remain the difference between a slide and a system." }
      ]
    }
  };

  const nav = document.getElementById("dna-nav");
  const panel = document.getElementById("dna-panel");
  if (!nav || !panel) return;

  function show(key, skillIndex) {
    const dim = DNA[key];
    const skill = dim.skills[skillIndex || 0];
    panel.innerHTML =
      "<p class=\"micro\">FUTURE SKILL DNA</p><h3>" +
      dim.title +
      "</h3><p>" +
      dim.intro +
      "</p><div class=\"skill-list\"></div><div class=\"panel\" id=\"dna-why\"><p class=\"micro\">Why it could matter in 2030</p><h3>" +
      skill.name +
      "</h3><p>" +
      skill.why +
      "</p></div>";
    const list = panel.querySelector(".skill-list");
    dim.skills.forEach(function (s, i) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.textContent = s.name;
      b.setAttribute("aria-pressed", i === (skillIndex || 0) ? "true" : "false");
      b.addEventListener("click", function () {
        show(key, i);
        const live = document.getElementById("dna-live");
        if (live) live.textContent = s.name + ": " + s.why;
      });
      list.appendChild(b);
    });
  }

  Object.keys(DNA).forEach(function (key, i) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "choice";
    b.textContent = DNA[key].title;
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", function () {
      nav.querySelectorAll("button").forEach(function (el) {
        el.setAttribute("aria-pressed", el === b ? "true" : "false");
      });
      show(key, 0);
    });
    nav.appendChild(b);
  });

  show("technical", 0);
})();
