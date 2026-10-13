'use client';

export default function CredentialsSection({ onOpenTenderModal }) {
  const testimonials = [
    {
      id: 1,
      quote:
        '"Seven S ET Trading PLC has consistently demonstrated exemplary engineering professionalism, technical competence, and an unwavering commitment to safety and rapid milestone fulfillment on high-stakes projects."',
      author: 'Mrs. Demitu Feyisa',
      role: 'General Manager, Intel Motion',
      badge: 'IM',
    },
    {
      id: 2,
      quote:
        '"The contractor verified full adherence to strict Ethiopian municipal building standards, exhibiting superior structural execution and an agile turnaround schedule on our central transport infrastructure."',
      author: 'Design & Construction Works Bureau',
      role: 'Addis Ababa City Administration',
      badge: 'AA',
    },
    {
      id: 3,
      quote:
        '"AGC\'s owned machinery capacity and round-the-clock site mobilization eliminated the customary scheduling bottlenecks typical in large-scale residential and mixed-use commercial construction."',
      author: 'Executive Project Directorate',
      role: 'Gift Real Estate Development',
      badge: 'GR',
    },
  ];

  return (
    <section className="section-credentials" id="credentials">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag">
            <span className="pulse-dot"></span>
            <span>Verified Public & Commercial Records</span>
          </div>
          <h2 className="section-title font-display">
            On Record. <span className="text-red">Proven by Delivery.</span>
          </h2>
          <p className="section-desc">
            Direct commendations from municipal city authorities, international joint ventures, and leading private real estate developers in Ethiopia.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <blockquote className="testimonial-quote">{t.quote}</blockquote>
              <div className="testimonial-author-box">
                <div className="author-badge-icon">{t.badge}</div>
                <div className="author-meta">
                  <h5>{t.author}</h5>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tender Vault Callout Bar */}
        <div className="tender-vault-bar">
          <div className="vault-text">
            <h4>Verified GC-1 Tender Documentation & Reference Pack</h4>
            <p>Access our certified Grade-1 license registration, tax compliance, bank references, and 7 official client letters.</p>
          </div>
          <button
            type="button"
            className="btn btn-primary open-tender-modal"
            id="openVaultBtn"
            onClick={onOpenTenderModal}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Review Tender Credentials</span>
          </button>
        </div>
      </div>
    </section>
  );
}
