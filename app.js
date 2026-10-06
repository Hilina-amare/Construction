/**
 * Advanced General Contractor (AGC) - Interactive Logic
 * Grade One (GC-1) General Contractor | Addis Ababa, Ethiopia
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initBeforeAfterSlider();
  initProcessStepper();
  initProjectEstimator();
  initModals();
  initMobileMenu();
  initElevationCanvas();
});

/* ============================================================
   1. STICKY HEADER & SCROLL BEHAVIOR
   ============================================================ */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ============================================================
   2. INTERACTIVE BEFORE & AFTER TRANSFORMATION STUDIO
   ============================================================ */
function initBeforeAfterSlider() {
  const viewport = document.getElementById('compViewport');
  const layerAfter = document.getElementById('layerAfter');
  const handle = document.getElementById('compHandle');
  const tabBtns = document.querySelectorAll('.comp-tab-btn');
  const quickToggles = document.querySelectorAll('.quick-toggle-btn');
  
  if (!viewport || !layerAfter || !handle) return;

  let isDragging = false;

  // Project data models for Before / After
  const projectsData = {
    megenagna: {
      title: "Transport Sectoral Head Office Tower",
      location: "Megenagna, Addis Ababa",
      beforeTag: "Month 0: Raw Foundation & Substructure",
      afterTag: "Month 4: 100% Commissioned & Handed Over",
      budget: "1.5 Billion ETB",
      turnaround: "120 Calendar Days",
      scope: "Curtain Walls / Sunbreakers / Facade",
      safety: "Zero Lost-Time Incidents",
      beforeImg: "assets/images/before-megenagna.jpg",
      afterImg: "assets/images/after-megenagna.jpg"
    },
    industrial: {
      title: "Advanced Logistics & Industrial Park",
      location: "Bole Lemi Industrial Zone",
      beforeTag: "Month 0: Bare Groundworks & Grading",
      afterTag: "Month 3: Pre-Engineered Steel Erection",
      budget: "850 Million ETB",
      turnaround: "90 Calendar Days",
      scope: "Heavy Structural Steel / Logistics Bays",
      safety: "Certified ISO 45001 Compliance",
      beforeImg: "assets/images/before-megenagna.jpg",
      afterImg: "assets/images/hero-tower.jpg"
    },
    headquarters: {
      title: "Commercial Financial Headquarters",
      location: "Kazanchis Financial District",
      beforeTag: "Month 0: Stalled Skeletal Concrete Frame",
      afterTag: "Month 4: Class-A Acoustic Facade",
      budget: "1.85 Billion ETB",
      turnaround: "115 Calendar Days",
      scope: "Unitized Curtain Wall & High-End Fitout",
      safety: "Exceeded QA Structural Standards",
      beforeImg: "assets/images/before-megenagna.jpg",
      afterImg: "assets/images/after-megenagna.jpg"
    }
  };

  function updateSliderPosition(percent) {
    const clamped = Math.max(0, Math.min(100, percent));
    layerAfter.style.width = `${clamped}%`;
    handle.style.left = `${clamped}%`;
  }

  function handleMove(clientX) {
    const rect = viewport.getBoundingClientRect();
    const positionX = clientX - rect.left;
    const percent = (positionX / rect.width) * 100;
    updateSliderPosition(percent);
  }

  // Mouse & Touch Events
  viewport.addEventListener('mousedown', (e) => {
    isDragging = true;
    handleMove(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  viewport.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    handleMove(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Quick state toggles (Before 0%, Split 50%, After 100%)
  quickToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      quickToggles.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const val = parseInt(e.target.dataset.pos, 10);
      updateSliderPosition(val);
    });
  });

  // Tab project switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const projKey = btn.dataset.project;
      const data = projectsData[projKey];
      if (!data) return;

      // Update images
      const imgBefore = document.getElementById('compImgBefore');
      const imgAfter = document.getElementById('compImgAfter');
      if (imgBefore) imgBefore.src = data.beforeImg;
      if (imgAfter) imgAfter.src = data.afterImg;

      // Update text details
      const titleElem = document.getElementById('compMetaTitle');
      const locElem = document.getElementById('compMetaLocation');
      const tagBefore = document.getElementById('compTagBefore');
      const tagAfter = document.getElementById('compTagAfter');
      const budgetElem = document.getElementById('compMetaBudget');
      const daysElem = document.getElementById('compMetaDays');
      const scopeElem = document.getElementById('compMetaScope');
      const safetyElem = document.getElementById('compMetaSafety');

      if (titleElem) titleElem.textContent = data.title;
      if (locElem) locElem.textContent = data.location;
      if (tagBefore) tagBefore.textContent = data.beforeTag;
      if (tagAfter) tagAfter.textContent = data.afterTag;
      if (budgetElem) budgetElem.textContent = data.budget;
      if (daysElem) daysElem.textContent = data.turnaround;
      if (scopeElem) scopeElem.textContent = data.scope;
      if (safetyElem) safetyElem.textContent = data.safety;

      // Reset to 50%
      updateSliderPosition(50);
    });
  });
}

/* ============================================================
   3. THE 4-MONTH VELOCITY ENGINE (PROCESS STEPPER)
   ============================================================ */
function initProcessStepper() {
  const stepButtons = document.querySelectorAll('.step-nav-btn');
  if (!stepButtons.length) return;

  const stageData = [
    {
      step: 1,
      num: "PHASE 01",
      window: "DAYS 01 – 25",
      title: "BIM Pre-Engineering & Supply Chain Lock",
      desc: "Before earth is displaced, AGC deploys 3D Building Information Modeling (BIM) to stress-test architectural conflicts. Crucially, critical path materials (high-spec structural steel, tempered curtain-wall glazing, specialized elevators) are procured and customs-cleared upfront.",
      deliverables: [
        "Digital clash-detection between civil, MEP, and structural engineering",
        "Direct manufacturer allocation for facade glass & aluminum extrusions",
        "3D logistical simulation for continuous site material ingress in Addis Ababa",
        "Local regulatory and municipal building permit sign-offs"
      ],
      speedAdvantage: "Prevents supply shortages that delay 80% of standard local builds."
    },
    {
      step: 2,
      num: "PHASE 02",
      window: "DAYS 26 – 65",
      title: "24/7 Substructure & Core Frame Velocity",
      desc: "Our owned fleet of heavy excavators, concrete batch plants, and crane systems operates in continuous 3-shift 24-hour cycles. By eliminating third-party equipment rental delays, AGC advances structural slab pouring at triple the standard velocity.",
      deliverables: [
        "In-house concrete batch plant with on-site QA laboratory slump testing",
        "Rotating shifts with dedicated safety marshals on every floor",
        "Pre-fabricated rebar cages assembled off-site for rapid placement",
        "Precision laser leveling for high-rise foundation integrity"
      ],
      speedAdvantage: "Pours concrete 3.2x faster than standard intermittent single shifts."
    },
    {
      step: 3,
      num: "PHASE 03",
      window: "DAYS 66 – 95",
      title: "Unitized Curtain Wall & Building Enclosure",
      desc: "Enclosure cannot wait for structural perfection. As lower levels cure, AGC’s specialized facade engineers immediately anchor unitized curtain walls, thermal-break double glazing, and aerodynamic sunbreaker fins to seal the envelope against weather.",
      deliverables: [
        "Engineered thermal & acoustic insulated curtain wall installation",
        "CNC-milled vertical aluminum architectural fins and spandrel panels",
        "Watertight envelope pressure testing and wind deflection verification",
        "Structural mast-climbing work platforms ensuring high-altitude safety"
      ],
      speedAdvantage: "Interior fit-out starts weeks earlier under a fully weather-tight roof."
    },
    {
      step: 4,
      num: "PHASE 04",
      window: "DAYS 96 – 120",
      title: "Precision MEP, Smart Fit-Out & Zero-Snag Handover",
      desc: "Electromechanical, fire suppression, smart HVAC, and luxury commercial interiors are integrated concurrently. Prior to formal government inspection, an independent AGC QA team conducts rigorous multi-point snag resolution.",
      deliverables: [
        "Integrated BMS (Building Management System) and fire life-safety integration",
        "Pressure testing on all hydraulic and electromechanical distribution lines",
        "Turnkey interior architectural fit-out and acoustic ceiling finishing",
        "Comprehensive As-Built engineering dossier and 1-Year GC-1 Warranty guarantee"
      ],
      speedAdvantage: "Zero-defect snag elimination yields instant client occupancy on Day 120."
    }
  ];

  stepButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      stepButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = stageData[index];
      if (!data) return;

      const numElem = document.getElementById('stageNumTag');
      const windowElem = document.getElementById('stageWindowTag');
      const titleElem = document.getElementById('stageTitle');
      const descElem = document.getElementById('stageDesc');
      const checklistElem = document.getElementById('stageChecklist');
      const speedAdvElem = document.getElementById('stageSpeedAdv');

      if (numElem) numElem.textContent = data.num;
      if (windowElem) windowElem.textContent = data.window;
      if (titleElem) titleElem.textContent = data.title;
      if (descElem) descElem.textContent = data.desc;
      if (speedAdvElem) speedAdvElem.textContent = data.speedAdvantage;

      if (checklistElem) {
        checklistElem.innerHTML = data.deliverables.map(item => `
          <li>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span>${item}</span>
          </li>
        `).join('');
      }
    });
  });
}

/* ============================================================
   4. INTERACTIVE PROJECT ESTIMATOR & TENDER RFP CALCULATOR
   ============================================================ */
function initProjectEstimator() {
  const projectType = document.getElementById('estimatorType');
  const projectScale = document.getElementById('estimatorScale');
  const scaleDisplay = document.getElementById('scaleValDisplay');
  const currencyToggle = document.getElementById('currencyToggle');

  const estDuration = document.getElementById('estDuration');
  const estBudget = document.getElementById('estBudget');
  const estShift = document.getElementById('estShift');
  const estTeam = document.getElementById('estTeam');

  const telegramBtn = document.getElementById('btnTenderTelegram');
  const whatsappBtn = document.getElementById('btnTenderWhatsapp');

  let currentCurrency = 'ETB'; // 'ETB' or 'USD'
  const USD_RATE = 125.0; // Current indicative commercial baseline

  function calculateEstimates() {
    if (!projectScale || !projectType) return;

    const scale = parseInt(projectScale.value, 10);
    const type = projectType.value;

    let baseRatePerSqm = 38000; // ETB per sqm for Grade-1 commercial
    let months = 4;
    let shiftModel = "3-Shift 24/7";
    let teamSize = 140;

    if (type === 'highrise') {
      baseRatePerSqm = 42000;
      months = scale > 15000 ? 5 : 4;
      teamSize = Math.round(scale * 0.018);
    } else if (type === 'industrial') {
      baseRatePerSqm = 29000;
      months = scale > 20000 ? 4 : 3;
      teamSize = Math.round(scale * 0.012);
    } else if (type === 'facade') {
      baseRatePerSqm = 24000;
      months = 3;
      teamSize = Math.round(scale * 0.01);
    } else if (type === 'infrastructure') {
      baseRatePerSqm = 34000;
      months = 6;
      teamSize = Math.round(scale * 0.022);
    }

    const totalETB = scale * baseRatePerSqm;
    const days = months * 30;

    // Update displays
    if (scaleDisplay) {
      scaleDisplay.textContent = `${scale.toLocaleString()} m² GFA`;
    }

    if (estDuration) {
      estDuration.textContent = `${days} Days (${months} Months)`;
    }

    if (estBudget) {
      if (currentCurrency === 'ETB') {
        const inBillions = (totalETB / 1_000_000_000).toFixed(2);
        estBudget.textContent = `${inBillions} Billion ETB`;
      } else {
        const inMillionsUSD = ((totalETB / USD_RATE) / 1_000_000).toFixed(2);
        estBudget.textContent = `$${inMillionsUSD} Million USD`;
      }
    }

    if (estShift) estShift.textContent = shiftModel;
    if (estTeam) estTeam.textContent = `~${teamSize} Dedicated Engineers & Crews`;

    // Dynamic messaging link parameters
    const rfpMessage = `Hello AGC Engineering Team, I am requesting a preliminary GC-1 feasibility assessment for:
- Type: ${projectType.options[projectType.selectedIndex].text}
- Scale: ${scale.toLocaleString()} m²
- Estimated Budget Target: ${estBudget.textContent}
- Required Delivery Window: ${days} Calendar Days`;

    const encodedMsg = encodeURIComponent(rfpMessage);

    if (telegramBtn) {
      telegramBtn.href = `https://t.me/advancedgeneralcontractor?text=${encodedMsg}`;
    }

    if (whatsappBtn) {
      whatsappBtn.href = `https://wa.me/251974091900?text=${encodedMsg}`;
    }
  }

  if (projectScale) {
    projectScale.addEventListener('input', calculateEstimates);
  }

  if (projectType) {
    projectType.addEventListener('change', calculateEstimates);
  }

  if (currencyToggle) {
    currencyToggle.addEventListener('click', () => {
      currentCurrency = currentCurrency === 'ETB' ? 'USD' : 'ETB';
      currencyToggle.textContent = currentCurrency === 'ETB' ? 'CURRENCY: ETB 🇪🇹' : 'CURRENCY: USD 🇺🇸';
      calculateEstimates();
    });
  }

  calculateEstimates();
}

/* ============================================================
   5. VERIFICATION MODAL & TENDER LETTERS
   ============================================================ */
function initModals() {
  const modalBackdrop = document.getElementById('tenderModal');
  const openBtns = document.querySelectorAll('.open-tender-modal');
  const closeBtn = document.getElementById('closeModalBtn');

  if (!modalBackdrop) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   6. MOBILE NAVIGATION OVERLAY
   ============================================================ */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNavOverlay');
  const closeBtn = document.getElementById('mobileNavClose');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  links.forEach(l => {
    l.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   7. TECHNICAL ELEVATION CANVAS (LIGHTWEIGHT ARCHITECTURAL GRID)
   ============================================================ */
function initElevationCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  let offset = 0;

  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 51, 31, 0.08)';
    ctx.lineWidth = 1;

    // Technical elevation coordinate lines
    const step = 40;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Moving horizontal laser alignment line
    offset = (offset + 0.4) % height;
    ctx.strokeStyle = 'rgba(255, 51, 31, 0.25)';
    ctx.beginPath();
    ctx.moveTo(0, offset);
    ctx.lineTo(width, offset);
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  draw();
}
