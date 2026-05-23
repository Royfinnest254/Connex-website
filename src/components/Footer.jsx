import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: 'var(--spacing-xl) 0 4rem 0' }}>
      <div className="container">

        <div className="footer-grid">
          <div>
            <p className="mono-label mb-md">Product</p>
            <ul style={{ listStyle: 'none' }}>
              <li className="mb-sm"><Link to="/product" className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>How It Works</Link></li>
            </ul>
          </div>

          <div>
            <p className="mono-label mb-md">Solutions</p>
            <ul style={{ listStyle: 'none' }}>
              <li className="mb-sm"><Link to="/solutions/banks"      className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>For Banks</Link></li>
              <li className="mb-sm"><Link to="/solutions/fintechs"   className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>For Fintechs</Link></li>
              <li className="mb-sm"><Link to="/solutions/regulators" className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>For Regulators</Link></li>
            </ul>
          </div>

          <div>
            <p className="mono-label mb-md">Company</p>
            <ul style={{ listStyle: 'none' }}>
              <li className="mb-sm"><Link to="/company/about"   className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>About</Link></li>
              <li className="mb-sm"><Link to="/company/team"    className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>Team</Link></li>
              <li className="mb-sm"><Link to="/company/careers" className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>Careers</Link></li>
            </ul>
          </div>

          <div>
            <p className="mono-label mb-md">Resources</p>
            <ul style={{ listStyle: 'none' }}>
              <li className="mb-sm"><Link to="/resources/whitepaper" className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>Whitepaper</Link></li>
              <li className="mb-sm"><Link to="/resources/blog"       className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>Blog</Link></li>
              <li className="mb-sm"><Link to="/resources/faq"        className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>FAQ</Link></li>
              <li className="mb-sm"><Link to="/security"             className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>Security</Link></li>
            </ul>
          </div>

          <div>
            <p className="mono-label mb-md">Legal</p>
            <ul style={{ listStyle: 'none' }}>
              <li className="mb-sm"><Link to="/legal/privacy" className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>Privacy Policy</Link></li>
              <li className="mb-sm"><Link to="/legal/terms"   className="nav-link" style={{ textTransform: 'none', opacity: 0.6 }}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/logo.svg" alt="Connex Logo" style={{ width: '18px', height: '18px', opacity: 0.8 }} />
            <span className="mono-label" style={{ fontSize: '0.8rem', color: 'white', opacity: 0.8 }}>
              CONNEX Technologies © {currentYear}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a
              href="https://www.linkedin.com/company/112496389/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8rem' }}
              title="Connex LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.91h2.79v8.37H6.46v-8.37M7.86 5.5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z"/></svg>
              <span>LinkedIn</span>
            </a>
            <p className="text-muted" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Certainty for everyone.</p>
            <p className="text-muted" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Iten, Kenya</p>
            <p className="text-muted" style={{ fontSize: '0.8rem', opacity: 0.6 }}>info@connextechnologies.org</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
