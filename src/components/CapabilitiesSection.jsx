'use client';

import { useState } from 'react';

const capabilities = [
  {
    id: 1,
    num: '01 / STRUCTURAL',
    category: 'superstructure',
    title: 'Structural Construction',
    desc: 'Reinforced concrete high-rise frameworks, seismic-rated post-tensioned slabs, and heavy commercial load-bearing superstructures.',
    metrics: 'CAPACITY: UNLIMITED GC-1 LICENSED HEIGHT',
  },
  {
    id: 2,
    num: '02 / ENCLOSURES',
    category: 'superstructure',
    title: 'Curtain Walls & Facades',
    desc: 'Unitized architectural glass curtain walls, thermally broken double glazing, vertical sunbreaker fins, and aluminum composite cladding.',
    metrics: 'FLAGSHIP: MEGENAGNA MEGA PROJECT',
  },
  {
    id: 3,
    num: '03 / INDUSTRIAL',
    category: 'industrial',
    title: 'Industrial & Logistics Parks',
    desc: 'Large-span pre-engineered steel warehouses, heavy manufacturing factory floorings, and automated distribution terminals.',
    metrics: 'CLEAR SPAN: UP TO 60 METERS',
  },
  {
    id: 4,
    num: '04 / CIVIL WORKS',
    category: 'infrastructure',
    title: 'Roads & Civil Infrastructure',
    desc: 'Asphalt highways, concrete arterial pavements, stormwater drainage culverts, bridges, and municipal transport hubs.',
    metrics: 'CLIENT: ADDIS ABABA CITY ADMIN',
  },
  {
    id: 5,
    num: '05 / SUBSTRUCTURE',
    category: 'infrastructure',
    title: 'Earthworks & Deep Foundations',
    desc: 'Mass site excavation, deep micropiling, sheet pile shoring, rock stabilization, and high-volume basement retention.',
    metrics: 'FLEET: OWNED HEAVY EXCAVATORS',
  },
  {
    id: 6,
    num: '06 / INTERIORS',
    category: 'superstructure',
    title: 'Turnkey Interiors & Fit-Out',
    desc: 'Class-A corporate executive suites, acoustic ceilings, high-traffic commercial flooring, and integrated electromechanical lighting.',
    metrics: 'STANDARD: LUXURY COMMERCIAL GRADE',
  },
];

const filters = [
  { key: 'all', label: 'All Disciplines', count: '06' },
  { key: 'superstructure', label: 'High-Rise & Facades', count: '03' },
  { key: 'industrial', label: 'Industrial & Warehousing', count: '01' },
  { key: 'infrastructure', label: 'Civil & Earthworks', count: '02' },
];

export default function CapabilitiesSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCapabilities =
    activeFilter === 'all'
      ? capabilities
      : capabilities.filter((c) => c.category === activeFilter);

  return (
    <section className="section-capabilities" id="capabilities">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag">
            <span className="pulse-dot"></span>
            <span>Comprehensive Civil & Commercial Disciplines</span>
          </div>
          <h2 className="section-title font-display">
            All Types of Construction. <br />
            <span className="text-red">One Standard.</span>
          </h2>
          <p className="section-desc">
            As a licensed Grade One (GC-1) General Contractor, AGC possesses unlimited statutory bidding ceiling in Ethiopia, handling multi-billion Birr public and private works.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="cap-filter-bar" role="tablist" aria-label="Capabilities filter tabs">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={activeFilter === f.key}
              className={`cap-filter-btn ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              <span>{f.label}</span>
              <span className="cap-filter-count">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="cap-grid">
          {filteredCapabilities.map((item) => (
            <div key={item.id} className="cap-card" data-category={item.category}>
              <div className="cap-top">
                <span className="cap-num">{item.num}</span>
                <svg
                  className="cap-arrow-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
              <h3 className="cap-title">{item.title}</h3>
              <p className="cap-desc">{item.desc}</p>
              <div className="cap-metrics-tag">{item.metrics}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
