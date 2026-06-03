import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Logo = () => (
  <svg viewBox="23 63 514 374" fill="none" aria-hidden="true" style={{ height: 22, width: 30, flexShrink: 0 }}>
    <path d="M 337.2 329.5 A 150 150 0 1 1 337.2 170.5" stroke="currentColor" strokeWidth="54" strokeLinecap="round"/>
    <path d="M 407 202 L 503 298 M 503 202 L 407 298" stroke="currentColor" strokeWidth="48" strokeLinecap="round"/>
  </svg>
);

const NAV = [
  { label: 'Product', to: '/product' },
  {
    label: 'Solutions',
    children: [
      { label: 'For Banks', to: '/solutions/banks' },
      { label: 'For Fintechs', to: '/solutions/fintechs' },
      { label: 'For Regulators', to: '/solutions/regulators' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'About', to: '/company/about' },
      { label: 'Team', to: '/company/team' },
      { label: 'Careers', to: '/company/careers' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Whitepaper', to: '/resources/whitepaper' },
      { label: 'Blog', to: '/resources/blog' },
      { label: 'FAQ', to: '/resources/faq' },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => { setMenuOpen(false); setOpenDrop(null); }, [pathname]);
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; }, [menuOpen]);

  return (
    <>
      <header className="site-header" role="banner">
        <div className="wrap nav">
          <Link className="brand" to="/" aria-label="Connex Technologies home">
            <Logo />
            <span className="brand-name">Connex</span>
          </Link>

          <nav className="nav-links nav-desktop" aria-label="Primary navigation">
            {NAV.map(item =>
              item.children ? (
                <div key={item.label} style={{ position: 'relative' }}
                  onMouseEnter={() => setOpenDrop(item.label)}
                  onMouseLeave={() => setOpenDrop(null)}>
                  <button style={{ font: 'inherit', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-dim)', padding: '6px 0', transition: 'color .3s var(--ease)' }}
                    aria-expanded={openDrop === item.label}>{item.label}</button>
                  {openDrop === item.label && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, background: 'var(--clay-bg)', borderRadius: '16px', boxShadow: 'var(--clay)', padding: '8px', minWidth: '180px', zIndex: 100 }}>
                      {item.children.map(c => (
                        <NavLink key={c.to} to={c.to} style={{ display: 'block', padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-dim)', borderRadius: '10px', transition: 'background .2s, color .2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--clay-bg2)'; e.currentTarget.style.color = 'var(--ink)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--ink-dim)'; }}>{c.label}</NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>
              )
            )}
            <Link className="btn nav-cta" to="/contact">Contact Us</Link>
          </nav>

          <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)}>
            <span className="hamburger-bar" style={menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}} />
            <span className="hamburger-bar" style={menuOpen ? { opacity: 0 } : {}} />
            <span className="hamburger-bar" style={menuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}} />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' is-open' : ''}`} id="mobileMenu" aria-hidden={!menuOpen}>
        {NAV.map((item, i) => {
          const target = item.children ? item.children[0].to : item.to;
          return (
            <Link key={item.label} to={target} onClick={() => setMenuOpen(false)}>
              <span>{item.label}</span>
              <span className="idx">0{i + 1}</span>
            </Link>
          );
        })}
        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          <span>Contact</span>
          <span className="idx">05</span>
        </Link>
      </div>
    </>
  );
}
