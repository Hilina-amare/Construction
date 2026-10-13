export default function ProofStrip() {
  const partners = [
    'Addis Ababa City Administration',
    'Gift Real Estate',
    'Temer Properties',
    'Intel Motion',
    'African Leadership Excellence Academy',
  ];

  return (
    <section className="proof-strip" aria-label="Selected Clients and Institutional Partners">
      <div className="container proof-strip-inner">
        <span className="proof-strip-label">Institutional & Commercial Partners:</span>
        <div className="client-logo-list">
          {partners.map((partner, idx) => (
            <span key={partner} style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
              <span className="client-partner-name">{partner}</span>
              {idx < partners.length - 1 && <span className="client-partner-name">&bull;</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
