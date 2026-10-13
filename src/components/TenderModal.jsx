'use client';

import { useEffect } from 'react';

export default function TenderModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop open"
      id="tenderModal"
      role="dialog"
      aria-modal="true"
      aria-label="Tender Credentials Dossier"
      onClick={(e) => {
        if (e.target.id === 'tenderModal') onClose();
      }}
    >
      <div className="modal-content">
        <button
          className="modal-close-btn"
          id="closeModalBtn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <span className="badge-tag">OFFICIAL CORPORATE DOSSIER</span>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
          AGC Tender & License <span className="text-red">Verification</span>
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
          Registered corporate credentials for Seven S ET Trading PLC, trading under the brand Advanced General Contractor (AGC).
        </p>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', display: 'block' }}>LICENSE CLASSIFICATION:</span>
              <strong style={{ color: '#fff', fontSize: '1rem' }}>GC-1 (Grade One General Contractor)</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', display: 'block' }}>ISSUING AUTHORITY:</span>
              <strong style={{ color: '#fff' }}>Ministry of Urban Dev & Infrastructure</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', display: 'block' }}>GRADE ONE STATUS HELD:</span>
              <strong style={{ color: 'var(--green-accent)' }}>Since 2018 (Continuous Renewal)</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', display: 'block' }}>STATUTORY BIDDING CEILING:</span>
              <strong style={{ color: '#fff' }}>Unlimited Bidding Tier</strong>
            </div>
          </div>
        </div>

        <h4 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>Verified Reference Letters on Record:</h4>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--green-accent)' }}>✓</span>
            <strong>Addis Ababa City Administration</strong> — Transport Sectoral Mega Project Completion Certificate
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--green-accent)' }}>✓</span>
            <strong>Intel Motion PLC</strong> — Commercial Engineering & Site Execution Commendation
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--green-accent)' }}>✓</span>
            <strong>Gift Real Estate</strong> — High-Volume Structural Works & Timeline Compliance Letter
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--green-accent)' }}>✓</span>
            <strong>Temer Properties</strong> — Turnkey Commercial Structural Handover
          </li>
        </ul>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <a
            href="mailto:info@advancedgeneralcontractor.com?subject=Tender%20Credentials%20Request"
            className="btn btn-primary"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            Request Stamped Reference PDF
          </a>
          <a href="tel:+251974091900" className="btn btn-outline" style={{ justifyContent: 'center' }}>
            Call Legal/Tender Desk
          </a>
        </div>
      </div>
    </div>
  );
}
