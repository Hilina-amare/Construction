/**
 * ADVANCED GENERAL CONTRACTOR (AGC) - 10/10 INTERACTIVE LOGIC
 * Grade One (GC-1) General Contractor | Addis Ababa, Ethiopia
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initAnimatedCounters();
  initFeaturedProjectModal();
  initMethodologyStepper();
  initBeforeAfterSlider();
  initGuidedEstimator();
  initMobileMenu();
});

/* ============================================================
   01 — PREMIUM NAVBAR SCROLL & BLUR
   ============================================================ */
function initNavbarScroll() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ============================================================
   02 — ANIMATED STATISTIC COUNTERS (VIEWPORT TRIGGERED)
   Counts smoothly from 0 to target value
   ============================================================ */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('.animate-num');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.dataset.val);
        const isDecimal = el.dataset.decimal === 'true';
        const suffix = el.dataset.suffix || '';
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = easeProgress * targetVal;

          if (isDecimal) {
            el.textContent = currentVal.toFixed(1) + suffix;
          } else {
            el.textContent = Math.floor(currentVal) + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = (isDecimal ? targetVal.toFixed(1) : targetVal) + suffix;
          }
        }

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

/* ============================================================
   03 — FEATURED PROJECTS & CINEMATIC CASE STUDY MODAL
   ============================================================ */
function initFeaturedProjectModal() {
  const modalOverlay = document.getElementById('projectCaseStudyModal');
  const openButtons = document.querySelectorAll('.open-case-study');
  const closeButton = document.getElementById('closeCaseStudyBtn');

  if (!modalOverlay) return;

  const caseStudiesData = {
    bole: {
      title: "Bole Mixed-Use Commercial Development",
      subtitle: "Bole Road Commercial Corridor, Addis Ababa",
      image: "assets/images/bole-mixed-use.jpg",
      scope: "Mixed-Use Commercial High-Rise, Luxury Retail Plaza, 2-Level Basement",
      valuation: "1.5 Billion ETB",
      turnaround: "120 Calendar Days",
      client: "Private Real Estate Syndicate",
      challenge: "Executing deep basement retention adjacent to active high-traffic Bole avenues without disturbing neighboring foundations, while maintaining an uncompromising 4-month fast-track delivery schedule.",
      approach: "AGC deployed contiguous sheet-piling and 24/7 rotating excavation teams. Floor slabs were post-tensioned to eliminate interior columns, creating ultra-prime retail and class-A executive office space.",
      engineering: "Seismic Grade-1 reinforced concrete frame, insulated low-E curtain wall glazing with acoustic laminates, and computerized building automation systems.",
      construction: "Triple-shift 24-hour operations powered by AGC-owned concrete batch plants and dual tower cranes.",
      timeline: "Delivered in exactly 120 days from substructure completion to final municipal occupancy permit.",
      results: "100% pre-leased prior to commissioning. Zero lost-time safety incidents recorded across 480,000 man-hours."
    },
    megenagna: {
      title: "Transport Sectoral Head Office Tower",
      subtitle: "Megenagna Hub, Addis Ababa",
      image: "assets/images/after-megenagna.jpg",
      scope: "Curtain Walls, Architectural Aluminum Fins, Corporate Offices",
      valuation: "1.5 Billion ETB",
      turnaround: "4 Months (Record Delivery)",
      client: "Addis Ababa City Administration Transport Bureau",
      challenge: "Transforming a stalled municipal high-rise skeleton into a premier governmental landmark within an aggressive national deadline.",
      approach: "Concurrently engineered the unitized curtain wall while executing mechanical and electrical rough-ins, bypassing standard sequential bottlenecks.",
      engineering: "High-spec thermal barrier aluminum profiles, bespoke vertical aerodynamic sunbreaker fins, and pressurized fire life-safety stairwells.",
      construction: "Mast-climbing work platforms allowed simultaneous facade installation across 14 levels.",
      timeline: "Four months flat from project re-activation to official state inauguration.",
      results: "Lauded by the City Administration as the benchmark for public infrastructure delivery velocity in Ethiopia."
    },
    industrial: {
      title: "Eastern Logistics & Heavy Industrial Park",
      subtitle: "Bole Lemi Industrial Zone",
      image: "assets/images/industrial-hub.jpg",
      scope: "Large-Span Pre-Engineered Steel, Heavy Logistics Apron, Automated Warehousing",
      valuation: "850 Million ETB",
      turnaround: "90 Calendar Days",
      client: "International Manufacturing Corporation",
      challenge: "Constructing 24,000 m² of unobstructed column-free warehousing with laser-flat industrial flooring for automated high-bay forklifts.",
      approach: "Engineered 60-meter clear-span pre-fabricated steel trusses off-site while simultaneously casting high-load laser-screed concrete slabs.",
      engineering: "Super-flat industrial floor tolerance (FF 50 / FL 35), insulated composite roof panels with high acoustic damping, and heavy storm-water drainage.",
      construction: "Heavy crane tandem-lifts erected the entire superstructure in just 28 working days.",
      timeline: "Full handover achieved in 90 calendar days.",
      results: "Commissioned ahead of manufacturer machinery delivery, avoiding costly supply-chain demurrage."
    }
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.dataset.project || 'bole';
      const data = caseStudiesData[projKey] || caseStudiesData.bole;

      // Populate Modal Content
      document.getElementById('csModalImg').src = data.image;
      document.getElementById('csModalTitle').textContent = data.title;
      document.getElementById('csModalSubtitle').textContent = data.subtitle;
      document.getElementById('csModalValuation').textContent = data.valuation;
      document.getElementById('csModalTimeline').textContent = data.turnaround;
      document.getElementById('csModalClient').textContent = data.client;
      document.getElementById('csModalChallenge').textContent = data.challenge;
      document.getElementById('csModalApproach').textContent = data.approach;
      document.getElementById('csModalEngineering').textContent = data.engineering;
      document.getElementById('csModalConstruction').textContent = data.construction;
      document.getElementById('csModalResults').textContent = data.results;

      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeButton) closeButton.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

/* ============================================================
   04 — CONSTRUCTION METHODOLOGY (4-MONTH ENGINE STEPPER)
   ============================================================ */
function initMethodologyStepper() {
  const stepBtns = document.querySelectorAll('.method-step-btn');
  if (!stepBtns.length) return;

  const methodologyData = [
    {
      title: "BIM Pre-Engineering & Supply Chain Lock",
      desc: "Before earth is displaced, AGC deploys 3D Building Information Modeling (BIM) to stress-test architectural conflicts. Crucially, critical path materials (high-spec structural steel, tempered curtain-wall glazing, specialized elevators) are procured and customs-cleared upfront.",
      checklist: [
        "Digital clash-detection between civil, MEP, and structural engineering",
        "Direct manufacturer allocation for facade glass & aluminum extrusions",
        "3D logistical simulation for continuous site material ingress in Addis Ababa",
        "Local regulatory and municipal building permit sign-offs"
      ],
      speedFact: "Eliminates the material import delays that stall 80% of local construction.",
      daysSpan: "Days 01 – 25",
      shiftModel: "Engineering & Procurement Taskforce"
    },
    {
      title: "24/7 Substructure & Structural Frame Acceleration",
      desc: "Our owned fleet of heavy excavators, concrete batch plants, and crane systems operates in continuous 3-shift 24-hour cycles. By eliminating third-party equipment rental delays, AGC advances structural slab pouring at triple the standard velocity.",
      checklist: [
        "In-house concrete batch plant with on-site QA laboratory slump testing",
        "Rotating shifts with dedicated safety marshals on every active deck",
        "Pre-fabricated rebar cages assembled off-site for rapid crane placement",
        "Continuous laser leveling ensuring flawless structural tolerances"
      ],
      speedFact: "Casts structural decks 3.2x faster than single-shift competitors.",
      daysSpan: "Days 26 – 65",
      shiftModel: "3-Shift Continuous (24 Hours)"
    },
    {
      title: "Unitized Curtain Wall & Building Enclosure",
      desc: "Enclosure cannot wait for structural completion. As lower levels cure, AGC’s specialized facade engineers immediately anchor unitized curtain walls, thermal-break double glazing, and aerodynamic sunbreaker fins to seal the envelope against weather.",
      checklist: [
        "Engineered thermal & acoustic insulated curtain wall installation",
        "CNC-milled vertical aluminum architectural fins and spandrel panels",
        "Watertight envelope pressure testing and wind deflection verification",
        "Structural mast-climbing work platforms ensuring high-altitude safety"
      ],
      speedFact: "Weather-tight envelope allows internal trades to start weeks earlier.",
      daysSpan: "Days 66 – 95",
      shiftModel: "Concurrent Exterior & Interior Crews"
    },
    {
      title: "Precision MEP, Smart Fit-Out & Zero-Snag Handover",
      desc: "Electromechanical, fire suppression, smart HVAC, and luxury commercial interiors are integrated concurrently. Prior to formal government inspection, an independent AGC QA team conducts rigorous multi-point snag resolution.",
      checklist: [
        "Integrated BMS (Building Management System) and fire life-safety testing",
        "Pressure testing on all hydraulic and electromechanical distribution lines",
        "Turnkey interior architectural fit-out and acoustic ceiling finishing",
        "Comprehensive As-Built engineering dossier and 1-Year GC-1 Warranty guarantee"
      ],
      speedFact: "Pre-inspection snag resolution guarantees immediate client occupancy.",
      daysSpan: "Days 96 – 120",
      shiftModel: "Full Commissioning Directorate"
    }
  ];

  stepBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      stepBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = methodologyData[index];
      if (!data) return;

      document.getElementById('methodTitle').textContent = data.title;
      document.getElementById('methodDesc').textContent = data.desc;
      document.getElementById('methodSpeedFact').textContent = data.speedFact;
      document.getElementById('methodDaysSpan').textContent = data.daysSpan;
      document.getElementById('methodShiftModel').textContent = data.shiftModel;

      const listContainer = document.getElementById('methodChecklist');
      listContainer.innerHTML = data.checklist.map(item => `
        <li>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${item}</span>
        </li>
      `).join('');
    });
  });
}

/* ============================================================
   05 — INTERACTIVE BEFORE / AFTER TRANSFORMATION STUDIO
   ============================================================ */
function initBeforeAfterSlider() {
  const canvasArea = document.getElementById('compCanvas');
  const layerAfter = document.getElementById('compLayerAfter');
  const divider = document.getElementById('compDivider');
  const scrubBtns = document.querySelectorAll('.scrub-btn');
  const tabs = document.querySelectorAll('.comp-tab');

  if (!canvasArea || !layerAfter || !divider) return;

  let isScrubbing = false;

  const projectComparisonData = {
    megenagna: {
      title: "Transport Sectoral Head Office Tower",
      location: "Megenagna, Addis Ababa",
      beforeTag: "Month 0: Stalled Skeletal Frame",
      afterTag: "Month 4: 100% Commissioned Tower",
      val: "1.5 Billion ETB",
      days: "120 Calendar Days",
      scope: "Curtain Wall & Sunbreakers",
      beforeImg: "assets/images/before-megenagna.jpg",
      afterImg: "assets/images/after-megenagna.jpg"
    },
    bole: {
      title: "Bole Commercial Center",
      location: "Bole Road, Addis Ababa",
      beforeTag: "Month 0: Raw Foundation Deck",
      afterTag: "Month 4: Class-A Commercial Plaza",
      val: "1.5 Billion ETB",
      days: "120 Calendar Days",
      scope: "Mixed-Use Structural Frame",
      beforeImg: "assets/images/before-megenagna.jpg",
      afterImg: "assets/images/bole-mixed-use.jpg"
    },
    industrial: {
      title: "Logistics Distribution Hub",
      location: "Bole Lemi Industrial Zone",
      beforeTag: "Month 0: Bare Ground Grading",
      afterTag: "Month 3: Pre-Engineered Steel Enclosure",
      val: "850 Million ETB",
      days: "90 Calendar Days",
      scope: "Heavy Industrial Clear-Span",
      beforeImg: "assets/images/before-megenagna.jpg",
      afterImg: "assets/images/industrial-hub.jpg"
    }
  };

  function setSliderPosition(percent) {
    const clamped = Math.max(0, Math.min(100, percent));
    layerAfter.style.width = `${clamped}%`;
    divider.style.left = `${clamped}%`;
  }

  function handlePointer(clientX) {
    const rect = canvasArea.getBoundingClientRect();
    const positionX = clientX - rect.left;
    const percent = (positionX / rect.width) * 100;
    setSliderPosition(percent);
  }

  canvasArea.addEventListener('mousedown', (e) => {
    isScrubbing = true;
    handlePointer(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isScrubbing) return;
    handlePointer(e.clientX);
  });

  window.addEventListener('mouseup', () => { isScrubbing = false; });

  canvasArea.addEventListener('touchstart', (e) => {
    isScrubbing = true;
    if (e.touches[0]) handlePointer(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isScrubbing || !e.touches[0]) return;
    handlePointer(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => { isScrubbing = false; });

  // Quick state buttons
  scrubBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      scrubBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const pos = parseInt(e.target.dataset.pos, 10);
      setSliderPosition(pos);
    });
  });

  // Switch comparison project
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.dataset.project;
      const data = projectComparisonData[key];
      if (!data) return;

      document.getElementById('compImgBefore').src = data.beforeImg;
      document.getElementById('compImgAfter').src = data.afterImg;
      document.getElementById('compTitle').textContent = data.title;
      document.getElementById('compLocation').textContent = data.location;
      document.getElementById('compTagBefore').textContent = data.beforeTag;
      document.getElementById('compTagAfter').textContent = data.afterTag;
      document.getElementById('compMetaVal').textContent = data.val;
      document.getElementById('compMetaDays').textContent = data.days;
      document.getElementById('compMetaScope').textContent = data.scope;

      setSliderPosition(50);
    });
  });
}

/* ============================================================
   06 — GUIDED PROJECT ESTIMATOR EXPERIENCE (ITEM 9)
   01 Type -> 02 Size -> 03 Location -> 04 Target -> Snapshot
   ============================================================ */
function initGuidedEstimator() {
  const typeChips = document.querySelectorAll('.chip-type');
  const sizeSlider = document.getElementById('estSizeSlider');
  const sizeValDisplay = document.getElementById('estSizeDisplay');
  const locChips = document.querySelectorAll('.chip-loc');
  const targetChips = document.querySelectorAll('.chip-target');

  const snapshotInvest = document.getElementById('snapInvestment');
  const snapshotTimeline = document.getElementById('snapTimeline');
  const snapshotExecution = document.getElementById('snapExecution');
  const directProposalBtn = document.getElementById('snapProposalBtn');
  const directTelegramBtn = document.getElementById('snapTelegramBtn');

  let selectedType = 'commercial';
  let selectedSize = 10000;
  let selectedLoc = 'Addis Ababa';
  let selectedTarget = '120days';

  function updateSnapshot() {
    let ratePerSqm = 42000; // Base ETB per sqm
    let days = 120;
    let shiftMode = "3 Shifts / 24 Hours";

    if (selectedType === 'commercial') {
      ratePerSqm = 42000;
      days = selectedSize > 15000 ? 150 : 120;
    } else if (selectedType === 'residential') {
      ratePerSqm = 36000;
      days = selectedSize > 15000 ? 180 : 120;
    } else if (selectedType === 'industrial') {
      ratePerSqm = 28000;
      days = selectedSize > 20000 ? 120 : 90;
    } else if (selectedType === 'infrastructure') {
      ratePerSqm = 34000;
      days = 150;
      shiftMode = "Dual Shift Accelerated";
    }

    if (selectedTarget === 'standard') {
      days = Math.round(days * 1.8);
      shiftMode = "Single Day Shift (Standard)";
    }

    const totalETB = selectedSize * ratePerSqm;
    const inMillions = Math.round(totalETB / 1_000_000);

    // Update displays
    if (sizeValDisplay) sizeValDisplay.textContent = `${selectedSize.toLocaleString()} m²`;
    if (snapshotInvest) snapshotInvest.textContent = `${inMillions}M ETB`;
    if (snapshotTimeline) snapshotTimeline.textContent = `${days} Days`;
    if (snapshotExecution) snapshotExecution.textContent = shiftMode;

    const rfpText = `Hello AGC Project Directorate, I am requesting a detailed fast-track construction proposal:
- Classification: ${selectedType.toUpperCase()}
- Gross Floor Area: ${selectedSize.toLocaleString()} m²
- Site Location: ${selectedLoc}
- Estimated Target: ${inMillions}M ETB in ${days} Days (${shiftMode})`;

    const encoded = encodeURIComponent(rfpText);

    if (directProposalBtn) {
      directProposalBtn.href = `https://wa.me/251974091900?text=${encoded}`;
    }

    if (directTelegramBtn) {
      directTelegramBtn.href = `https://t.me/advancedgeneralcontractor?text=${encoded}`;
    }
  }

  // Type chips
  typeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      typeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedType = chip.dataset.type;
      updateSnapshot();
    });
  });

  // Size slider
  if (sizeSlider) {
    sizeSlider.addEventListener('input', (e) => {
      selectedSize = parseInt(e.target.value, 10);
      updateSnapshot();
    });
  }

  // Location chips
  locChips.forEach(chip => {
    chip.addEventListener('click', () => {
      locChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedLoc = chip.dataset.loc;
      updateSnapshot();
    });
  });

  // Target chips
  targetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      targetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedTarget = chip.dataset.target;
      updateSnapshot();
    });
  });

  updateSnapshot();
}

/* ============================================================
   07 — MOBILE NAVIGATION
   ============================================================ */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('closeMobileDrawer');
  const links = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  links.forEach(l => l.addEventListener('click', closeDrawer));
}
