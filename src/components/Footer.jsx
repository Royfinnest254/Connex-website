import { Link } from 'react-router-dom';

const Logo = () => (
  <svg viewBox="23 63 514 374" fill="none" aria-hidden="true" style={{ height: 24 }}>
    <path d="M 337.2 329.5 A 150 150 0 1 1 337.2 170.5" stroke="currentColor" strokeWidth="54" strokeLinecap="round"/>
    <path d="M 407 202 L 503 298 M 503 202 L 407 298" stroke="currentColor" strokeWidth="48" strokeLinecap="round"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="brand" to="/">
              <Logo />
              <span className="brand-name">Connex</span>
            </Link>
            <p>The neutral coordination layer for cross-institutional payments in Kenya. Certainty for everyone.</p>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link to="/product">How It Works</Link></li>
              <li><Link to="/product#process">The Process</Link></li>
              <li><Link to="/product#principles">Principles</Link></li>
              <li><Link to="/security">Security</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><Link to="/solutions/banks">For Banks</Link></li>
              <li><Link to="/solutions/fintechs">For Fintechs</Link></li>
              <li><Link to="/solutions/regulators">For Regulators</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/company/about">About</Link></li>
              <li><Link to="/company/team">Team</Link></li>
              <li><Link to="/company/careers">Careers</Link></li>
              <li><Link to="/resources/blog">Blog</Link></li>
              <li><Link to="/resources/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:info@connextechnologies.org">info@connextechnologies.org</a></li>
              <li><Link to="/contact">Request a briefing</Link></li>
              <li><Link to="/resources/whitepaper">Whitepaper</Link></li>
              <li><Link to="/legal/privacy">Privacy Policy</Link></li>
              <li><Link to="/legal/terms">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Connex Technologies &copy; <span data-year /></span>
          <span>Certainty for everyone.</span>
          <span>Kenya</span>
        </div>
      </div>
    </footer>
  );
}
