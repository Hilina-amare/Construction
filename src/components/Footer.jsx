export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src="/assets/brand/logo-group.svg"
            alt="Advanced General Contractor Group Logo"
            style={{ height: '44px', width: 'auto', display: 'block' }}
          />
          <p>
            Seven S ET Trading PLC, trading as Advanced General Contractor (AGC). A Grade One (GC-1) licensed general contractor delivering landmark infrastructure and high-rise projects across Ethiopia.
          </p>
        </div>

        <div className="footer-col">
          <h5>Quick Navigation</h5>
          <ul className="footer-links">
            <li><a href="#transformations">Before & After Studio</a></li>
            <li><a href="#process">The 4-Month Engine</a></li>
            <li><a href="#capabilities">Capabilities Matrix</a></li>
            <li><a href="#credentials">Tender Credentials</a></li>
            <li><a href="#estimator">Project Estimator</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Capabilities</h5>
          <ul className="footer-links">
            <li><a href="#capabilities">Curtain Walls & Facades</a></li>
            <li><a href="#capabilities">Structural Construction</a></li>
            <li><a href="#capabilities">Industrial Logistics Parks</a></li>
            <li><a href="#capabilities">Roads & Civil Works</a></li>
            <li><a href="#capabilities">Earthworks & Deep Foundations</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Headquarters</h5>
          <address className="footer-address">
            Bole Matemiya, City View Addis Building<br />
            2nd Floor, Addis Ababa, Ethiopia<br /><br />
            <a href="tel:+251974091900" style={{ color: '#fff', fontWeight: 600 }}>
              +251 97 409 1900
            </a>
            <br />
            <a href="mailto:info@advancedgeneralcontractor.com" style={{ color: 'var(--text-muted)' }}>
              info@advancedgeneralcontractor.com
            </a>
          </address>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} Seven S ET Trading PLC &bull; Advanced General Contractor (AGC)</span>
        <span>Grade One (GC-1) General Contractor License &bull; Held Continuously Since 2018</span>
      </div>
    </footer>
  );
}
