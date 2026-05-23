import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

const Header = () => {
  const { openWaitlistModal, waitlistCount } = useModal();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'PRODUCT',   path: '/product' },
    { name: 'SOLUTIONS', path: '/solutions/banks' },
    { name: 'COMPANY',   path: '/company/about' },
    { name: 'RESOURCES', path: '/resources/faq' },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu  = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container header-inner">

        {/* Branding */}
        <Link
          to="/"
          onClick={closeMenu}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        >
          <img src="/logo.svg" alt="Connex Logo" style={{ width: '28px', height: '28px' }} />
          <span className="mono-label" style={{ fontWeight: 'bold', color: 'white', fontSize: '1rem', letterSpacing: '0.15em' }}>
            CONNEX
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links desktop-only">
          {navItems.map((item, idx) => (
            <Link key={idx} to={item.path} className="nav-link">{item.name}</Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="nav-links desktop-only" style={{ alignItems: 'center' }}>
          <Link to="/company/careers" className="nav-link" style={{ fontSize: '0.7rem' }}>CAREERS</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', padding: '6px 12px', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}>
            <span className="mono-label" style={{ fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', fontWeight: 'bold' }}>{waitlistCount} ENROLLED</span>
          </div>
          <button onClick={openWaitlistModal} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.75rem' }}>
            JOIN WAITLIST
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? 'CLOSE ✕' : 'MENU ☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <nav className="mobile-nav-links">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                {item.name}
                <span style={{ opacity: 0.3, fontSize: '0.8rem' }}>→</span>
              </Link>
            ))}
            <Link to="/company/careers" className="mobile-nav-link" onClick={closeMenu}>
              CAREERS
              <span style={{ opacity: 0.3, fontSize: '0.8rem' }}>→</span>
            </Link>
          </nav>

          <div className="mobile-nav-actions">
            <button
              onClick={() => { openWaitlistModal(); closeMenu(); }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '0.85rem' }}
            >
              JOIN WAITLIST
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
