'use client';

import { useState, useEffect } from 'react';

export default function Header({ currency, onToggleCurrency, onOpenTenderModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy active nav highlighting
  useEffect(() => {
    const sectionIds = ['transformations', 'process', 'capabilities', 'credentials', 'estimator'];
    const handleScrollSpy = () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.35;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMid) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { href: '#transformations', label: 'Before & After', id: 'transformations' },
    { href: '#process', label: 'The 4-Month Engine', id: 'process' },
    { href: '#capabilities', label: 'Capabilities', id: 'capabilities' },
    { href: '#credentials', label: 'Tender Credentials', id: 'credentials' },
    { href: '#estimator', label: 'Estimator', id: 'estimator' },
  ];

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
        <div className="nav-frame">
          <div className="nav-container">
            <a href="#" className="brand-wrap" aria-label="Advanced General Contractor Homepage">
              <img
                src="/assets/brand/logo-header.svg"
                alt="Advanced General Contractor (AGC) Logo"
                className="brand-logo-img"
              />
              <span className="brand-tier-badge">GC-1 GRADE ONE</span>
            </a>

            <nav aria-label="Main Navigation" className="desktop-nav">
              <ul className="nav-links">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="nav-actions">
              <button
                type="button"
                className="currency-toggle"
                id="currencyToggle"
                onClick={onToggleCurrency}
                aria-label={`Switch currency. Current: ${currency}`}
                title="Toggle ETB / USD"
              >
                <span>{currency === 'ETB' ? 'ETB 🇪🇹' : 'USD 🇺🇸'}</span>
              </button>

              <a href="#estimator" className="btn btn-primary" id="navStartProjectBtn">
                <span className="btn-text">Start Project</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>

              <button
                className="mobile-menu-btn"
                id="mobileMenuBtn"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`modal-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        id="mobileNavOverlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        onClick={(e) => {
          if (e.target.id === 'mobileNavOverlay') setMobileMenuOpen(false);
        }}
      >
        <div className="modal-content mobile-drawer-content">
          <button
            className="modal-close-btn"
            id="mobileNavClose"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="drawer-inner">
            <span className="badge-tag">GC-1 Certified Contractor</span>

            <nav className="mobile-links-list">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <button
                type="button"
                className="mobile-nav-link text-left"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTenderModal();
                }}
              >
                Tender Credentials Dossier
              </button>
            </nav>

            <div className="drawer-footer">
              <div className="drawer-currency-row">
                <span className="drawer-currency-label">CURRENCY:</span>
                <button
                  type="button"
                  className="currency-toggle active"
                  onClick={onToggleCurrency}
                >
                  {currency === 'ETB' ? 'ETB 🇪🇹' : 'USD 🇺🇸'}
                </button>
              </div>

              <hr className="drawer-divider" />

              <a href="tel:+251974091900" className="drawer-phone-link">
                ✆ +251 97 409 1900
              </a>

              <a
                href="https://t.me/advancedgeneralcontractor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-telegram drawer-tg-btn"
              >
                Chat on Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
