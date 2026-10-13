import './globals.css';

export const viewport = {
  themeColor: '#09090c',
};

export const metadata = {
  title: 'Advanced General Contractor (AGC) | Grade One (GC-1) Construction, Ethiopia',
  description: 'Seven S ET Trading PLC (AGC) — Grade One (GC-1) Ethiopian General Contractor. Multi-billion ETB turnover, landmark projects, and record-breaking 4-month fast-track delivery.',
  icons: {
    icon: '/assets/brand/logo-header.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="bg-grid-overlay" aria-hidden="true"></div>
        <div className="ambient-glow-1" aria-hidden="true"></div>
        <div className="ambient-glow-2" aria-hidden="true"></div>
        {children}
      </body>
    </html>
  );
}
