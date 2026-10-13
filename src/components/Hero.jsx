'use client';

import { useEffect, useRef } from 'react';

export default function Hero({ currency }) {
  const canvasRef = useRef(null);

  // Architectural blueprint particle/grid effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    // Particle nodes
    const particles = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle construction crosshairs & connecting vectors
      ctx.strokeStyle = 'rgba(255, 51, 31, 0.12)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw crosshair
        ctx.beginPath();
        ctx.moveTo(p.x - 4, p.y);
        ctx.lineTo(p.x + 4, p.y);
        ctx.moveTo(p.x, p.y - 4);
        ctx.lineTo(p.x, p.y + 4);
        ctx.stroke();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 51, 31, ${0.12 * (1 - dist / 110)})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const turnoverText = currency === 'ETB' ? '2.12B+' : '$17.7M+';
  const flagshipText = currency === 'ETB' ? '1.5B' : '$12.5M';

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="badge-tag">
            <span className="pulse-dot"></span>
            <span>Grade One (GC-1) General Contractor &bull; Addis Ababa</span>
          </div>

          <h1 className="hero-title font-display">
            Built to a <br />
            <span className="accent-block">New Standard.</span> <br />
            <span className="text-gradient">Delivered in Months.</span>
          </h1>

          <p className="hero-desc">
            Seven S ET Trading PLC, operating under the brand name <strong>Advanced General Contractor (AGC)</strong>.
            We engineer, construct, and hand over complex landmark mega-structures across Ethiopia. All types of construction. One uncompromised velocity standard.
          </p>

          <div className="hero-cta-group">
            <a href="#transformations" className="btn btn-primary" id="heroCtaExplore">
              <span>Explore Before & After</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a href="#process" className="btn btn-outline" id="heroCtaEngine">
              <span>How We Deliver in 4 Months</span>
            </a>

            <a href="tel:+251974091900" className="hero-direct-call" aria-label="Direct phone call">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                <path d="M5 3h4l2 5-3 2a13 13 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />
              </svg>
              <span>+251 97 409 1900</span>
            </a>
          </div>

          {/* Key Stat Ribbon */}
          <div className="hero-stat-ribbon">
            <div className="hero-stat-card">
              <span className="hero-stat-num">{turnoverText}</span>
              <span className="hero-stat-label">
                {currency === 'ETB' ? 'ETB' : 'USD'} Annual Turnover
              </span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-num">{flagshipText}</span>
              <span className="hero-stat-label">Megenagna Flagship Value</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-num">4 MOS</span>
              <span className="hero-stat-label">Record Turnaround Time</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <canvas
              ref={canvasRef}
              id="heroCanvas"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
            <img
              src="/assets/images/hero-tower.jpg"
              alt="AGC High-Rise Landmark Facade Engineering Addis Ababa"
              loading="eager"
            />
            <div className="hero-visual-badge">
              <div>
                <h4 className="hvb-title">Transport Sectoral Head Office</h4>
                <p className="hvb-subtitle">Megenagna, Addis Ababa &bull; Curtain Wall Facade</p>
              </div>
              <span className="hvb-tag">100% HANDED OVER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
