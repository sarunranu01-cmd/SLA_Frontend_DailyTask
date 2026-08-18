/**
 * FutureWork - Minimal & Focused JavaScript
 * Only used in the most important interactive areas:
 * 1. Course Filter Tabs
 * 2. Fresher Career Roadmap Persona Switcher
 * 3. Interactive Skill Score Calculator
 * 4. Mobile Menu Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFresherRoadmap();
  initCourseFilters();
  initSkillCheck();
});

/* ==========================================================================
   1. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const links = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !mobileMenu) return;

  function toggle() {
    mobileMenu.classList.toggle('hidden');
  }

  toggleBtn.addEventListener('click', toggle);
  if (closeBtn) closeBtn.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  links.forEach(l => l.addEventListener('click', () => mobileMenu.classList.add('hidden')));
}

/* ==========================================================================
   2. FRESHER ROADMAP PERSONA SWITCHER (Key Career Area)
   ========================================================================== */
const roadmaps = {
  beginner: {
    title: "Complete Beginner",
    badge: "Zero Coding Background",
    desc: "Start with digital literacy, logical problem-solving, and basic Python before choosing a specialization.",
    steps: [
      { month: "Month 01", title: "Digital & AI Fundamentals", desc: "Learn computer fundamentals, cloud tools, prompting techniques, and practical AI productivity." },
      { month: "Month 02", title: "Programming Basics (Python)", desc: "Master variables, loops, functions, basic data structures, and Git/GitHub setup." },
      { month: "Month 03", title: "Specialization Track Selection", desc: "Choose Web Development, Data Analytics, or AI/ML. Learn SQL and database basics." },
      { month: "Month 04", title: "Guided Real-World Project", desc: "Build an automated tool or dashboard solving a daily problem with code." },
      { month: "Month 05", title: "Portfolio & GitHub Polish", desc: "Document projects with clean READMEs, screenshots, and live demo links." },
      { month: "Month 06", title: "Resume & Job Applications", desc: "Prepare portfolio resume, practice interview problem-solving, and apply consistently." }
    ]
  },
  nontech: {
    title: "Non-Technical Graduate",
    badge: "Business / Arts / Commerce",
    desc: "Leverage strong domain knowledge and communication skills combined with modern AI tools and data analytics.",
    steps: [
      { month: "Month 01", title: "AI Literacy & Workflow Automation", desc: "Learn generative AI for operations, writing, spreadsheet automation, and no-code tools." },
      { month: "Month 02", title: "Excel to SQL Data Mastery", desc: "Learn advanced spreadsheets, database querying with SQL, and structured data tables." },
      { month: "Month 03", title: "Business Intelligence & Visuals", desc: "Build interactive dashboards in Power BI or Tableau to communicate key business metrics." },
      { month: "Month 04", title: "No-Code Automation (Make / Zapier)", desc: "Connect CRM, emails, and AI classification webhooks into automated business flows." },
      { month: "Month 05", title: "3 Business Case Studies", desc: "Document business bottlenecks you solved using automated data and AI pipelines." },
      { month: "Month 06", title: "Target AI Operations / Analyst Roles", desc: "Apply for high-demand AI Operations, Product, and Business Analyst positions." }
    ]
  },
  csstudent: {
    title: "Computer Science / IT Student",
    badge: "Tech Background",
    desc: "Fast-track theoretical university concepts into production AI systems, APIs, and modern full-stack web applications.",
    steps: [
      { month: "Month 01", title: "Modern TypeScript & Python", desc: "Master modern web architectures (Next.js / FastAPI) and production Git workflows." },
      { month: "Month 02", title: "Applied AI, Vector DBs & RAG", desc: "Connect OpenAI/Anthropic APIs with vector stores (Pinecone/Chroma) for factual retrieval." },
      { month: "Month 03", title: "Cloud & Docker Containerization", desc: "Deploy containers with Docker, serverless backend APIs, and PostgreSQL databases." },
      { month: "Month 04", title: "Full-Stack AI Application", desc: "Build and deploy an end-to-end SaaS app with authentication, database, and AI agent tools." },
      { month: "Month 05", title: "Open Source Contributions", desc: "Contribute bug fixes and documentation to popular open-source AI tooling libraries." },
      { month: "Month 06", title: "Tech Interviews & Startup Outreach", desc: "Practice coding rounds, architecture defense, and reach out directly to tech founders." }
    ]
  },
  pro: {
    title: "Working Professional",
    badge: "Upskilling & Career Shift",
    desc: "Augment your domain expertise with AI tools to become 10x more productive and position yourself for promotion.",
    steps: [
      { month: "Month 01", title: "AI-Augmented Daily Workflow", desc: "Integrate AI copilots for drafting, research synthesis, code scripting, and presentation builds." },
      { month: "Month 02", title: "Internal Workflow Audit", desc: "Identify time-consuming, repetitive operational friction in your current company." },
      { month: "Month 03", title: "Build Internal AI Prototype", desc: "Create a functional pilot tool (e.g. internal knowledge base search or document extractor)." },
      { month: "Month 04", title: "Present Measurable Business ROI", desc: "Demonstrate hours saved to leadership with clear before-and-after metrics." },
      { month: "Month 05", title: "Lead Department AI Adoption", desc: "Establish company guidelines, prompt libraries, and train team members." },
      { month: "Month 06", title: "Promotion or AI Lead Role", desc: "Leverage validated project results to negotiate an AI Strategy Lead or Principal role." }
    ]
  }
};

function initFresherRoadmap() {
  const buttons = document.querySelectorAll('.persona-tab');
  const titleEl = document.getElementById('persona-title');
  const badgeEl = document.getElementById('persona-badge');
  const descEl = document.getElementById('persona-desc');
  const listEl = document.getElementById('persona-steps');

  if (!buttons.length || !listEl) return;

  function render(key) {
    const data = roadmaps[key] || roadmaps.beginner;

    buttons.forEach(btn => {
      const active = btn.getAttribute('data-target') === key;
      btn.classList.toggle('active', active);
      btn.classList.toggle('bg-blue-600', active);
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('bg-slate-100', !active);
      btn.classList.toggle('text-slate-700', !active);
    });

    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (descEl) descEl.textContent = data.desc;

    listEl.innerHTML = data.steps.map(step => `
      <div class="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
        <div class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs font-mono shrink-0">
          ${step.month}
        </div>
        <div>
          <h4 class="text-sm font-bold text-slate-900 mb-1">${step.title}</h4>
          <p class="text-xs text-slate-600 leading-relaxed">${step.desc}</p>
        </div>
      </div>
    `).join('');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      render(target);
    });
  });

  render('beginner');
}

/* ==========================================================================
   3. COURSE FILTER TABS (Make Course View Easy & Visible)
   ========================================================================== */
function initCourseFilters() {
  const filterBtns = document.querySelectorAll('.course-filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  if (!filterBtns.length || !courseCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('bg-blue-600', isActive);
        b.classList.toggle('text-white', isActive);
        b.classList.toggle('bg-slate-100', !isActive);
        b.classList.toggle('text-slate-700', !isActive);
      });

      courseCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE SKILL CHECK ASSESSMENT (Simple & Direct)
   ========================================================================== */
function initSkillCheck() {
  const form = document.getElementById('skill-form');
  const resultBox = document.getElementById('skill-result');
  const scoreNum = document.getElementById('skill-score-num');
  const badgeEl = document.getElementById('skill-tier-badge');
  const msgEl = document.getElementById('skill-message');

  if (!form || !resultBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let total = 0;
    let count = 0;

    for (let i = 1; i <= 6; i++) {
      const val = data.get(`q${i}`);
      if (val !== null) {
        total += parseFloat(val);
        count++;
      }
    }

    if (count < 6) {
      alert("Please answer all 6 questions to view your readiness score.");
      return;
    }

    const score = Math.round(total);
    form.classList.add('hidden');
    resultBox.classList.remove('hidden');

    if (scoreNum) scoreNum.textContent = `${score}/100`;

    let tier = "Beginner Explorer";
    let badgeClass = "bg-amber-100 text-amber-800";
    let message = "You're at the beginning of your journey! Start with Digital & AI Fundamentals to build strong confidence.";

    if (score >= 80) {
      tier = "Future-Ready Professional";
      badgeClass = "bg-emerald-100 text-emerald-800";
      message = "Outstanding! You have a solid grasp of AI tools, code, and project creation. Keep building live capstones.";
    } else if (score >= 50) {
      tier = "Active Learner";
      badgeClass = "bg-blue-100 text-blue-800";
      message = "Good progress! Focus on building 2 live GitHub projects and publishing your portfolio.";
    }

    if (badgeEl) {
      badgeEl.className = `inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeClass}`;
      badgeEl.textContent = tier;
    }
    if (msgEl) msgEl.textContent = message;
  });

  const resetBtn = document.getElementById('skill-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      resultBox.classList.add('hidden');
      form.classList.remove('hidden');
    });
  }
}
