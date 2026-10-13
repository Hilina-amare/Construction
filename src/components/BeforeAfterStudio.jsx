'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const projectsData = {
  megenagna: {
    name: 'Megenagna Transport Tower',
    title: 'Transport Sectoral Head Office Tower',
    location: 'Megenagna, Addis Ababa',
    beforeTag: 'Month 0: Raw Foundation & Substructure',
    afterTag: 'Month 4: 100% Commissioned & Handed Over',
    budgetETB: '1.5 Billion ETB',
    budgetUSD: '$12.5 Million USD',
    turnaround: '120 Calendar Days',
    scope: 'Curtain Walls / Sunbreakers / Facade',
    safety: 'Zero Lost-Time Incidents',
    beforeImg: '/assets/images/before-megenagna.jpg',
    afterImg: '/assets/images/after-megenagna.jpg',
  },
  industrial: {
    name: 'Bole Lemi Logistics Park',
    title: 'Advanced Logistics & Industrial Park',
    location: 'Bole Lemi Industrial Zone',
    beforeTag: 'Month 0: Bare Groundworks & Grading',
    afterTag: 'Month 3: Pre-Engineered Steel Erection',
    budgetETB: '850 Million ETB',
    budgetUSD: '$7.1 Million USD',
    turnaround: '90 Calendar Days',
    scope: 'Heavy Structural Steel / Logistics Bays',
    safety: 'Certified ISO 45001 Compliance',
    beforeImg: '/assets/images/before-megenagna.jpg',
    afterImg: '/assets/images/hero-tower.jpg',
  },
  headquarters: {
    name: 'Kazanchis Corporate HQ',
    title: 'Commercial Financial Headquarters',
    location: 'Kazanchis Financial District',
    beforeTag: 'Month 0: Stalled Skeletal Concrete Frame',
    afterTag: 'Month 4: Class-A Acoustic Facade',
    budgetETB: '1.85 Billion ETB',
    budgetUSD: '$15.4 Million USD',
    turnaround: '115 Calendar Days',
    scope: 'Unitized Curtain Wall & High-End Fitout',
    safety: 'Exceeded QA Structural Standards',
    beforeImg: '/assets/images/before-megenagna.jpg',
    afterImg: '/assets/images/after-megenagna.jpg',
  },
};

export default function BeforeAfterStudio({ currency }) {
  const [selectedProject, setSelectedProject] = useState('megenagna');
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef(null);

  const currentProject = projectsData[selectedProject];

  const updatePosition = useCallback((clientX) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, Math.round(pos))));
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updatePosition(e.clientX || (e.touches && e.touches[0].clientX));
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
      if (clientX !== undefined) updatePosition(clientX);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <section className="section-before-after" id="transformations">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag">
            <span className="pulse-dot"></span>
            <span>Proof Through Velocity</span>
          </div>
          <h2 className="section-title font-display">
            The Transformation <span className="text-red">Studio</span>
          </h2>
          <p className="section-desc">
            Many contractors show architectural renderings. AGC presents verified site reality: taking complex, high-risk concrete superstructures and handing over completed landmark towers in record four-month cycles.
          </p>
        </div>

        {/* Comparison Studio Widget */}
        <div className="comparison-studio">
          {/* Project Switcher & Quick Scrub Bar */}
          <div className="comparison-tabs">
            <div className="tab-buttons">
              {Object.entries(projectsData).map(([key, data]) => (
                <button
                  key={key}
                  type="button"
                  className={`comp-tab-btn ${selectedProject === key ? 'active' : ''}`}
                  onClick={() => setSelectedProject(key)}
                >
                  {data.name}
                </button>
              ))}
            </div>

            <div className="comp-quick-toggles">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginRight: '4px' }}>
                VIEW STAGE:
              </span>
              <button
                type="button"
                className={`quick-toggle-btn ${sliderPos === 0 ? 'active' : ''}`}
                onClick={() => setSliderPos(0)}
              >
                Day 0 (Before)
              </button>
              <button
                type="button"
                className={`quick-toggle-btn ${sliderPos === 50 ? 'active' : ''}`}
                onClick={() => setSliderPos(50)}
              >
                Split View (50/50)
              </button>
              <button
                type="button"
                className={`quick-toggle-btn ${sliderPos === 100 ? 'active' : ''}`}
                onClick={() => setSliderPos(100)}
              >
                Day 120 (Handover)
              </button>
            </div>
          </div>

          {/* Split-Screen Viewport */}
          <div
            className="comparison-viewport"
            ref={viewportRef}
            id="compViewport"
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            style={{ cursor: isDragging ? 'ew-resize' : 'default' }}
          >
            {/* Layer 1: BEFORE (Background) */}
            <div className="comp-img-layer layer-before">
              <img
                src={currentProject.beforeImg}
                alt={`Initial site condition: ${currentProject.title}`}
                className="inner-img"
              />
            </div>

            {/* Layer 2: AFTER (Foreground with dynamic clip width) */}
            <div
              className="comp-img-layer layer-after"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={currentProject.afterImg}
                alt={`Completed high-rise commission: ${currentProject.title}`}
                className="inner-img"
              />
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="comparison-handle"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="handle-button" aria-label="Drag to compare before and after">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '-8px' }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>

            {/* Technical Stage Badges Overlay */}
            <div className="tag-overlay tag-overlay-left">
              <div className="tag-overlay-status">&bull; INITIAL SITE CONDITION</div>
              <div className="tag-overlay-desc">{currentProject.beforeTag}</div>
            </div>

            <div className="tag-overlay tag-overlay-right">
              <div className="tag-overlay-status">&bull; COMPLETED COMMISSION</div>
              <div className="tag-overlay-desc">{currentProject.afterTag}</div>
            </div>
          </div>

          {/* Comparison Metadata Bar */}
          <div className="comparison-meta-bar">
            <div className="meta-project-title">
              <h4>{currentProject.title}</h4>
              <p>{currentProject.location}</p>
            </div>

            <div className="meta-specs">
              <div className="meta-spec-item">
                <span className="meta-spec-label">Project Valuation</span>
                <span className="meta-spec-value text-red">
                  {currency === 'ETB' ? currentProject.budgetETB : currentProject.budgetUSD}
                </span>
              </div>
              <div className="meta-spec-item">
                <span className="meta-spec-label">Total Execution Speed</span>
                <span className="meta-spec-value">{currentProject.turnaround}</span>
              </div>
              <div className="meta-spec-item">
                <span className="meta-spec-label">Engineering Scope</span>
                <span className="meta-spec-value">{currentProject.scope}</span>
              </div>
              <div className="meta-spec-item">
                <span className="meta-spec-label">Safety Compliance</span>
                <span className="meta-spec-value">{currentProject.safety}</span>
              </div>
            </div>

            <div className="meta-cta-box">
              <a href="#process" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '9px 16px' }}>
                <span>View Timeline Breakdown</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
