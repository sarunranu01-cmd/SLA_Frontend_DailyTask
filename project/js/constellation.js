(function () {
  const NODES = [
    {
      id: "ai",
      label: "AI / Generative AI",
      x: "50%",
      y: "48%",
      today: "Large models generate text, code, images, and speech from prompts. They pattern-match; they do not automatically understand consequences.",
      direction: "TREND — capability and product integration are expanding quickly, with uneven reliability and high compute cost.",
      horizon: "By 2030, generative tools could be ordinary infrastructure in knowledge work—if energy, evaluation, and legal constraints allow.",
      human: "People may spend more time specifying, checking, and taking responsibility for outputs they did not type line by line.",
      business: "Firms could ship faster drafts and face new costs: licenses, inference, incidents, and brand risk from errors.",
      uncertainty: "LIKELY that assistance spreads; UNCERTAIN how far autonomy goes."
    },
    {
      id: "agents",
      label: "AI agents / automation",
      x: "78%",
      y: "28%",
      today: "Agent demos chain tools (browse, code, ticket). Production use is narrower because errors compound across steps.",
      direction: "TREND — vendors are packaging 'do the task' workflows. Evaluation benchmarks for agents remain immature.",
      horizon: "Possible 2030: reliable agents in bounded workflows (support, ETL, test loops). Open-ended office agents remain a scenario, not a fact.",
      human: "Supervisors may become exception-handlers. Skill atrophy is a risk if people stop practicing the underlying craft.",
      business: "Could cut cycle time in standardized processes; could also create silent failures at scale.",
      uncertainty: "POSSIBLE in bounded domains; UNCERTAIN in open-ended work."
    },
    {
      id: "cloud",
      label: "Cloud computing",
      x: "22%",
      y: "30%",
      today: "Most internet software already runs on rented compute, storage, and identity. AI training/inference intensifies that dependence.",
      direction: "TREND — GPUs, regions, and power availability shape who can train frontier systems.",
      horizon: "Cloud could remain the default delivery layer in 2030, with more hybrid and sovereign variants—not a single inevitable vendor.",
      human: "Engineers may need cost, energy, and reliability literacy, not only feature delivery.",
      business: "Inference bills could rival payroll in some products. Architecture choices become financial choices.",
      uncertainty: "LIKELY that cloud stays central; UNCERTAIN which mix of providers and regions."
    },
    {
      id: "cyber",
      label: "Cybersecurity",
      x: "18%",
      y: "68%",
      today: "Identity, ransomware, and software supply chains are already first-order risks. Generated code can hide defects at speed.",
      direction: "TREND — both attackers and defenders experiment with automation.",
      horizon: "If software volume rises, verification and monitoring work could grow even as some scanning is automated.",
      human: "Judgment in incident response, threat modeling, and disclosure remains hard to fully automate.",
      business: "A single generated vulnerability can erase productivity gains. Security may become a product constraint, not a department.",
      uncertainty: "LIKELY that cyber demand stays high; POSSIBLE that AI changes attacker economics."
    },
    {
      id: "robotics",
      label: "Robotics",
      x: "82%",
      y: "70%",
      today: "Industrial and logistics robots succeed in structured spaces. General-purpose humanoids are research and limited pilots.",
      direction: "TREND — better perception models may reduce some integration cost. Physical safety regulation still binds.",
      horizon: "Possible expansion in factories, warehouses, inspection. Household labor replacement by 2030 is UNCERTAIN.",
      human: "Technicians, safety engineers, and human-robot workflow designers could matter more than speculative 'robot CEOs'.",
      business: "Capex, maintenance, and liability could dominate over model quality alone.",
      uncertainty: "POSSIBLE in structured settings; UNCERTAIN in the open world."
    },
    {
      id: "spatial",
      label: "AR / VR / spatial",
      x: "70%",
      y: "50%",
      today: "Headsets and spatial maps exist; daily use is still niche outside design, training, and some industrial overlays.",
      direction: "TREND — lighter hardware and better pass-through. Social adoption is not automatic.",
      horizon: "Could become a professional layer for design, medicine, and field work by 2030. Mass consumer replacement of phones is UNCERTAIN.",
      human: "Spatial UX, accessibility, and attention ethics become design problems.",
      business: "Enterprise training and remote expert support are nearer-term bets than a full 'metaverse economy'.",
      uncertainty: "POSSIBLE professionally; UNCERTAIN as a universal interface."
    },
    {
      id: "quantum",
      label: "Quantum computing",
      x: "40%",
      y: "18%",
      today: "Noisy intermediate-scale machines exist. Practical, error-corrected advantage is limited to specialized experiments.",
      direction: "TREND — research and national programs continue. Cryptography migration planning is already a security topic.",
      horizon: "Possible niche advantage in chemistry/materials. Everyday quantum laptops by 2030 are not a reasonable baseline.",
      human: "Most IT workers will meet quantum first as a crypto-migration and risk topic, not as a daily IDE.",
      business: "Firms may need quantum-safe roadmaps even if they never buy a quantum computer.",
      uncertainty: "UNCERTAIN for broad compute; POSSIBLE for crypto-risk planning."
    },
    {
      id: "chips",
      label: "Chips / semiconductors",
      x: "58%",
      y: "78%",
      today: "AI progress is gated by accelerators, memory, and fabrication capacity. Design and fabs are geographically concentrated.",
      direction: "FACT/TREND — industrial policy and capex are already reshaping supply. This is not a 2030 guess; it is visible now.",
      horizon: "Chip access could remain a strategic constraint on who can train and serve large models.",
      human: "Hardware-aware software skills and supply-chain literacy may rise in value.",
      business: "Model strategy could follow silicon strategy. No single firm is guaranteed to 'own 2030'.",
      uncertainty: "LIKELY that silicon remains a bottleneck; UNCERTAIN which vendors lead which niches."
    },
    {
      id: "edge",
      label: "Edge computing",
      x: "34%",
      y: "82%",
      today: "Phones, vehicles, factories, and sensors already run local inference for latency, privacy, or bandwidth reasons.",
      direction: "TREND — smaller models and NPUs on devices. Not a replacement for data centers.",
      horizon: "Possible 2030 split: tiny on-device models plus cloud for heavy tasks.",
      human: "Privacy-sensitive work (health, field ops) may prefer local processing.",
      business: "Product design could mix edge and cloud rather than choosing one religion.",
      uncertainty: "LIKELY as a complement; UNCERTAIN as a full alternative to cloud AI."
    }
  ];

  const field = document.getElementById("starfield");
  const panel = document.getElementById("star-briefing");
  if (!field || !panel) return;

  function paint(node) {
    panel.innerHTML =
      "<p class=\"micro\">FUTURE SIGNAL</p><h3>" +
      node.label +
      "</h3><dl>" +
      "<dt>What it is today</dt><dd>" +
      node.today +
      "</dd>" +
      "<dt>Current direction</dt><dd>" +
      node.direction +
      "</dd>" +
      "<dt>What could happen by 2030</dt><dd>" +
      node.horizon +
      "</dd>" +
      "<dt>Human impact</dt><dd>" +
      node.human +
      "</dd>" +
      "<dt>Business impact</dt><dd>" +
      node.business +
      "</dd></dl><p class=\"uncertainty stamp\">" +
      node.uncertainty +
      "</p>";
  }

  NODES.forEach(function (node, i) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "star";
    b.style.left = node.x;
    b.style.top = node.y;
    b.textContent = node.label;
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", function () {
      field.querySelectorAll(".star").forEach(function (s) {
        s.setAttribute("aria-pressed", s === b ? "true" : "false");
      });
      paint(node);
      const live = document.getElementById("constellation-live");
      if (live) live.textContent = "Selected " + node.label;
    });
    field.appendChild(b);
  });

  paint(NODES[0]);
})();
