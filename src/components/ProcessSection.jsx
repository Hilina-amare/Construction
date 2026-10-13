'use client';

import { useState } from 'react';

const stageData = [
  {
    step: 1,
    num: 'PHASE 01',
    window: 'DAYS 01 – 25',
    title: 'BIM Pre-Engineering & Supply Chain Lock',
    desc: 'Before earth is displaced, AGC deploys 3D Building Information Modeling (BIM) to stress-test architectural conflicts. Crucially, critical path materials (high-spec structural steel, tempered curtain-wall glazing, specialized elevators) are procured and customs-cleared upfront.',
    deliverables: [
      'Digital clash-detection between civil, MEP, and structural engineering',
      'Direct manufacturer allocation for facade glass & aluminum extrusions',
      '3D logistical simulation for continuous site material ingress in Addis Ababa',
      'Local regulatory and municipal building permit sign-offs',
    ],
    speedAdvantage: 'Prevents supply shortages that delay 80% of standard local builds.',
  },
  {
    step: 2,
    num: 'PHASE 02',
    window: 'DAYS 26 – 65',
    title: '24/7 Substructure & Core Frame Velocity',
    desc: 'Our owned fleet of heavy excavators, concrete batch plants, and crane systems operates in continuous 3-shift 24-hour cycles. By eliminating third-party equipment rental delays, AGC advances structural slab pouring at triple the standard velocity.',
    deliverables: [
      'In-house concrete batch plant with on-site QA laboratory slump testing',
      'Rotating shifts with dedicated safety marshals on every floor',
      'Pre-fabricated rebar cages assembled off-site for rapid placement',
      'Precision laser leveling for high-rise foundation integrity',
    ],
    speedAdvantage: 'Pours concrete 3.2x faster than standard intermittent single shifts.',
  },
  {
    step: 3,
    num: 'PHASE 03',
    window: 'DAYS 66 – 95',
    title: 'Unitized Curtain Wall & Building Enclosure',
    desc: 'Enclosure cannot wait for structural perfection. As lower levels cure, AGC’s specialized facade engineers immediately anchor unitized curtain walls, thermal-break double glazing, and aerodynamic sunbreaker fins to seal the envelope against weather.',
    deliverables: [
      'Engineered thermal & acoustic insulated curtain wall installation',
      'CNC-milled vertical aluminum architectural fins and spandrel panels',
      'Watertight envelope pressure testing and wind deflection verification',
      'Structural mast-climbing work platforms ensuring high-altitude safety',
    ],
    speedAdvantage: 'Interior fit-out starts weeks earlier under a fully weather-tight roof.',
  },
  {
    step: 4,
    num: 'PHASE 04',
    window: 'DAYS 96 – 120',
    title: 'Precision MEP, Smart Fit-Out & Zero-Snag Handover',
    desc: 'Electromechanical, fire suppression, smart HVAC, and luxury commercial interiors are integrated concurrently. Prior to formal government inspection, an independent AGC QA team conducts rigorous multi-point snag resolution.',
    deliverables: [
      'Integrated BMS (Building Management System) and fire life-safety integration',
      'Pressure testing on all hydraulic and electromechanical distribution lines',
      'Turnkey interior architectural fit-out and acoustic ceiling finishing',
      'Comprehensive As-Built engineering dossier and 1-Year GC-1 Warranty guarantee',
    ],
    speedAdvantage: 'Zero-defect snag elimination yields instant client occupancy on Day 120.',
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  const currentStage = stageData.find((s) => s.step === activeStep) || stageData[0];

  return (
    <section className="section-process" id="process">
      <div className="container">
        <div className="process-header-box">
          <div>
            <div className="badge-tag">
              <span className="pulse-dot"></span>
              <span>Proprietary Fast-Track Methodology</span>
            </div>
            <h2 className="section-title font-display">
              The 4-Month <span className="text-red">Delivery Engine</span>
            </h2>
            <p className="section-desc" style={{ maxWidth: '560px' }}>
              How does AGC execute multi-billion ETB projects in 120 days when traditional contractors quote 2 to 3 years? Here is the exact phase-by-phase operational architecture.
            </p>
          </div>

          {/* Speed Benchmark Card */}
          <div className="process-speed-benchmark">
            <div className="benchmark-side">
              <span className="benchmark-label">Standard Industry Timeline</span>
              <span className="benchmark-val" style={{ color: 'var(--text-muted)' }}>
                24 – 36 Months
              </span>
            </div>
            <div className="benchmark-side agc">
              <span className="benchmark-label">AGC Fast-Track Standard</span>
              <span className="benchmark-val fast">4 Months (120 Days)</span>
            </div>
          </div>
        </div>

        {/* Interactive Phase Stepper Nav */}
        <div className="process-stepper-nav" role="tablist">
          {stageData.map((stage) => (
            <button
              key={stage.step}
              type="button"
              className={`step-nav-btn ${activeStep === stage.step ? 'active' : ''}`}
              role="tab"
              aria-selected={activeStep === stage.step}
              onClick={() => setActiveStep(stage.step)}
            >
              <span className="step-nav-days">{stage.num} &bull; {stage.window}</span>
              <span className="step-nav-title">{stage.title}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Content Card */}
        <div className="process-display-card">
          <div className="process-stage-info">
            <div className="stage-badge-row">
              <span className="stage-num-tag">{currentStage.num}</span>
              <span className="stage-window-tag">{currentStage.window}</span>
            </div>

            <h3>{currentStage.title}</h3>

            <p className="process-stage-desc">{currentStage.desc}</p>

            <ul className="stage-checklist">
              {currentStage.deliverables.map((item, idx) => (
                <li key={idx}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process Execution Capabilities Widget */}
          <div className="process-pillars-widget">
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                THE VELOCITY ADVANTAGE:
              </span>
              <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--red-core)', marginTop: '4px' }}>
                {currentStage.speedAdvantage}
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <div className="pillar-body">
                <h5>Owned Machinery Fleet</h5>
                <p>Self-owned concrete batch plants, boom pumps, and heavy cranes—zero reliance on equipment rental waitlists.</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="pillar-body">
                <h5>Three-Shift 24/7 Rotations</h5>
                <p>Triple work shifts with dedicated site supervision and illuminated night-shift engineering.</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="pillar-body">
                <h5>ISO & GC-1 Quality Gates</h5>
                <p>Daily compressive slump tests, ultrasonic weld checks, and certified structural safety standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
