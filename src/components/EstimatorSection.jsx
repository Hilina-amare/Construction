'use client';

import { useState } from 'react';

const USD_RATE = 125.0;

const defaultState = {
  projectType: 'highrise',
  scale: 12500,
  location: 'Addis Ababa (Bole / Kazanchis Corridor)',
  notes: '',
  contactName: '',
  contactPhone: '',
};

const projectTypes = [
  { value: 'highrise', label: 'Commercial High-Rise / Mixed-Use Tower' },
  { value: 'facade', label: 'Curtain Wall & Facade Modernization' },
  { value: 'industrial', label: 'Heavy Industrial & Logistics Park' },
  { value: 'infrastructure', label: 'Road, Earthworks & Civil Infrastructure' },
];

export default function EstimatorSection({ currency }) {
  const [projectType, setProjectType] = useState(defaultState.projectType);
  const [scale, setScale] = useState(defaultState.scale);
  const [location, setLocation] = useState(defaultState.location);
  const [notes, setNotes] = useState(defaultState.notes);
  const [contactName, setContactName] = useState(defaultState.contactName);
  const [contactPhone, setContactPhone] = useState(defaultState.contactPhone);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Reset all parameters to initial baseline
  const handleReset = () => {
    setProjectType(defaultState.projectType);
    setScale(defaultState.scale);
    setLocation(defaultState.location);
    setNotes(defaultState.notes);
    setContactName(defaultState.contactName);
    setContactPhone(defaultState.contactPhone);
    setSubmissionResult(null);
  };

  // Calculation parameters
  let baseRatePerSqm = 38000;
  let months = 4;
  let shiftModel = '3-Shift 24/7 Continuous';
  let teamSize = 140;

  if (projectType === 'highrise') {
    baseRatePerSqm = 42000;
    months = scale > 15000 ? 5 : 4;
    teamSize = Math.round(scale * 0.018);
  } else if (projectType === 'industrial') {
    baseRatePerSqm = 29000;
    months = scale > 20000 ? 4 : 3;
    teamSize = Math.round(scale * 0.012);
  } else if (projectType === 'facade') {
    baseRatePerSqm = 24000;
    months = 3;
    teamSize = Math.round(scale * 0.01);
  } else if (projectType === 'infrastructure') {
    baseRatePerSqm = 34000;
    months = 6;
    teamSize = Math.round(scale * 0.022);
  }

  const totalETB = scale * baseRatePerSqm;
  const days = months * 30;

  let formattedBudget = '';
  if (currency === 'ETB') {
    const inBillions = (totalETB / 1_000_000_000).toFixed(2);
    formattedBudget = `${inBillions} Billion ETB`;
  } else {
    const inMillionsUSD = ((totalETB / USD_RATE) / 1_000_000).toFixed(2);
    formattedBudget = `$${inMillionsUSD} Million USD`;
  }

  const selectedTypeName =
    projectTypes.find((t) => t.value === projectType)?.label || projectType;

  const rfpMessage = `Hello AGC Engineering Team, I am requesting a preliminary GC-1 feasibility assessment for:
- Type: ${selectedTypeName}
- Scale: ${scale.toLocaleString()} m²
- Estimated Budget Target: ${formattedBudget}
- Required Delivery Window: ${days} Calendar Days (${months} Months)
- Location: ${location}`;

  const encodedMsg = encodeURIComponent(rfpMessage);
  const telegramHref = `https://t.me/advancedgeneralcontractor?text=${encodedMsg}`;
  const whatsappHref = `https://wa.me/251974091900?text=${encodedMsg}`;

  const handleSubmitRFP = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType: selectedTypeName,
          gfa: scale,
          location,
          notes,
          currency,
          estimatedBudget: formattedBudget,
          duration: `${days} Days (${months} Months)`,
          contactName: contactName || 'Project Directorate',
          contactPhone: contactPhone || 'Direct Line',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmissionResult({
          success: true,
          message: data.message,
          refCode: data.referenceCode,
        });
      } else {
        setSubmissionResult({
          success: false,
          message: data.error || 'Failed to submit proposal.',
        });
      }
    } catch {
      setSubmissionResult({
        success: false,
        message: 'Network error communicating with the tender server.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-estimator" id="estimator">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag">
            <span className="pulse-dot"></span>
            <span>Direct Project Feasibility Calculator</span>
          </div>
          <div className="estimator-title-row">
            <h2 className="section-title font-display">
              Plan Your Build. <span className="text-red">Get Instant Specs.</span>
            </h2>
            <button
              type="button"
              className="estimator-reset-btn"
              onClick={handleReset}
              title="Reset all inputs and calculations to defaults"
              aria-label="Reset all inputs"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
              <span>Reset Data</span>
            </button>
          </div>
          <p className="section-desc">
            Specify your project scale and engineering requirements below to calculate indicative timelines, team allocation, and initiate priority review with AGC engineering leadership.
          </p>
        </div>

        <div className="estimator-box">
          {/* Left Column: Form & Inputs */}
          <form className="estimator-form" onSubmit={handleSubmitRFP}>
            <div className="form-group">
              <label htmlFor="estimatorType" className="form-label">
                Project Classification
              </label>
              <div className="select-wrap">
                <select
                  id="estimatorType"
                  className="form-control form-select"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  {projectTypes.map((pt) => (
                    <option key={pt.value} value={pt.value}>
                      {pt.label}
                    </option>
                  ))}
                </select>
                <svg className="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <div className="form-group">
              <div className="form-range-wrap">
                <div className="range-display-row">
                  <label htmlFor="estimatorScale" className="form-label">
                    Gross Floor Area (GFA)
                  </label>
                  <span className="range-display-val" id="scaleValDisplay">
                    {scale.toLocaleString()} m² GFA
                  </span>
                </div>
                <div className="slider-track-wrap">
                  <input
                    type="range"
                    id="estimatorScale"
                    className="custom-range-slider"
                    min="2000"
                    max="40000"
                    step="500"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, var(--red-core) 0%, var(--red-core) ${((scale - 2000) / (40000 - 2000)) * 100}%, rgba(255,255,255,0.1) ${((scale - 2000) / (40000 - 2000)) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                </div>
                <div className="range-legend">
                  <span>2,000 m² (Mid-Rise)</span>
                  <span>40,000 m² (Mega-Complex)</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="estimatorLocation" className="form-label">
                Project Site Location
              </label>
              <input
                type="text"
                id="estimatorLocation"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="E.g., Addis Ababa (Bole / Kazanchis Corridor)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="estimatorNotes" className="form-label">
                Specific Velocity & Engineering Requirement
              </label>
              <textarea
                id="estimatorNotes"
                className="form-control"
                rows="2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., Stalled skeletal frame requiring 120-day recovery and unitized curtain-wall fitout..."
              />
            </div>

            <div className="contact-row-grid">
              <div className="form-group">
                <label className="form-label">Inquirer Name / Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Eng. Dawit / Project Owner"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Direct Phone Line</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+251 9... / Office Line"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-actions-row">
              <button
                type="submit"
                className="btn btn-primary btn-submit-rfp"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Transmitting to Tender Desk...' : 'Transmit RFP to AGC Tender Desk'}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {submissionResult && (
              <div className={`submission-alert ${submissionResult.success ? 'success' : 'error'}`}>
                {submissionResult.success ? (
                  <div>
                    <strong className="alert-title">
                      ✓ {submissionResult.message}
                    </strong>
                    <div className="alert-ref">
                      Official Dossier Reference: <code>{submissionResult.refCode}</code>
                    </div>
                  </div>
                ) : (
                  <span className="alert-error-text">{submissionResult.message}</span>
                )}
              </div>
            )}
          </form>

          {/* Right Column: Calculated Specs & Instant Channels */}
          <div className="estimator-result-card">
            <div className="result-header">
              <div className="result-header-top">
                <h4>Engineered Execution Specs</h4>
                <span className="badge-tag">GC-1 ACCELERATED</span>
              </div>
              <p>Benchmarked on 3-shift 24/7 continuous casting and unitized curtain wall erection.</p>
            </div>

            <div className="result-stat-grid">
              <div className="stat-module">
                <div className="stat-module-header">
                  <span className="stat-label">Projected Turnaround</span>
                  <span className="stat-pill-speed">FAST-TRACK</span>
                </div>
                <div className="stat-module-val text-red">
                  {days} <span className="stat-sub">Calendar Days</span>
                </div>
                <div className="stat-module-note">({months} Months Continuous Execution)</div>
              </div>

              <div className="stat-module">
                <div className="stat-module-header">
                  <span className="stat-label">Estimated Budget Scale</span>
                  <span className="stat-pill-curr">{currency}</span>
                </div>
                <div className="stat-module-val text-glow">
                  {formattedBudget}
                </div>
                <div className="stat-module-note">Grade-1 standard civil & structural pricing</div>
              </div>

              <div className="stat-module">
                <div className="stat-module-header">
                  <span className="stat-label">Shift Architecture</span>
                  <span className="stat-pill-work">24/7 ACTIVE</span>
                </div>
                <div className="stat-module-val">
                  {shiftModel}
                </div>
                <div className="stat-module-note">Zero machinery rental dependencies</div>
              </div>

              <div className="stat-module">
                <div className="stat-module-header">
                  <span className="stat-label">Engineering Allocation</span>
                  <span className="stat-pill-team">ON-SITE</span>
                </div>
                <div className="stat-module-val">
                  ~{teamSize} <span className="stat-sub">Engineers & Crew</span>
                </div>
                <div className="stat-module-note">Dedicated structural & safety marshals</div>
              </div>
            </div>

            <div className="direct-channel-btns">
              <span className="direct-channel-label">INSTANT TENDER REVIEW CHANNELS:</span>
              <a
                href={telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-telegram"
                id="btnTenderTelegram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.56 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06-.01.19-.03.38z" />
                </svg>
                <span>Transmit Specs via Telegram</span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                id="btnTenderWhatsapp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.49 0-2.94-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c0 4.54-3.7 8.24-8.23 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.3z" />
                </svg>
                <span>Direct WhatsApp Engineering Line</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
