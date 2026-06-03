import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onScroll = () => {
      const span = hero.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      document.documentElement.style.setProperty('--sit', p.toFixed(3));
      if (innerRef.current) {
        innerRef.current.style.opacity = Math.max(0, 1 - p * 2.2);
        innerRef.current.style.transform = `translateY(${p * -40}px)`;
      }
      if (window.ConnexAvatar && typeof window.ConnexAvatar.setScroll === 'function') {
        window.ConnexAvatar.setScroll(p);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let active = true;

    const startAvatar = () => {
      if (!active) return;
      if (typeof window.initConnexAvatar === 'function') {
        window.initConnexAvatar(canvasRef.current);
        const span = hero.offsetHeight - window.innerHeight;
        const p = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
        if (window.ConnexAvatar && typeof window.ConnexAvatar.setScroll === 'function') {
          window.ConnexAvatar.setScroll(p);
        }
      }
    };

    const loadAvatarScript = () => {
      if (!active) return;
      if (window.initConnexAvatar) {
        startAvatar();
      } else {
        const existing = document.querySelector('script[src*="avatar.js"]');
        if (existing) {
          const oldOnload = existing.onload;
          existing.onload = (e) => {
            if (typeof oldOnload === 'function') oldOnload(e);
            startAvatar();
          };
        } else {
          const avatarScript = document.createElement('script');
          avatarScript.src = '/avatar.js?v=9';
          avatarScript.async = true;
          avatarScript.onload = startAvatar;
          document.body.appendChild(avatarScript);
        }
      }
    };

    if (window.THREE) {
      loadAvatarScript();
    } else {
      const existing = document.querySelector('script[src*="three.min.js"]');
      if (existing) {
        const oldOnload = existing.onload;
        existing.onload = (e) => {
          if (typeof oldOnload === 'function') oldOnload(e);
          loadAvatarScript();
        };
      } else {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        threeScript.async = true;
        threeScript.onload = loadAvatarScript;
        document.body.appendChild(threeScript);
      }
    }

    return () => {
      active = false;
      window.removeEventListener('scroll', onScroll);
      if (window.ConnexAvatar && typeof window.ConnexAvatar.destroy === 'function') {
        window.ConnexAvatar.destroy();
      }
    };
  }, []);

  return (
    <>
      <title>Connex Technologies | Payment Coordination Layer for Kenya</title>

      {/* ========== HERO ========== */}
      <section className="hero" id="hero" ref={heroRef} aria-label="Hero">
        <div className="hero-sticky">
          <canvas ref={canvasRef} id="hero-canvas" className="hero-canvas-bg" aria-hidden="true" />
          <div className="hero-overlay">
            <div className="wrap">
              <div className="hero-inner" ref={innerRef}>

                <h1 className="hero-title">
                  One system.<br />
                  Complete data.<br />
                  <span className="accent">Provable handoffs.</span>
                </h1>
                <p className="hero-lead">
                  When money moves between banks and financial institutions, coordination gaps often arise: critical data can be lost, and there is no neutral record of the handoff. Connex resolves both issues in a single coordination layer that sits alongside existing payment systems.
                </p>
                <div className="hero-cta">
                  <Link className="btn" to="/contact">Request Access <span className="arrow">→</span></Link>
                  <Link className="btn btn--ghost" to="/product">Learn How It Works</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true">
            <span>Scroll</span>
            <span className="bar" />
          </div>
          <p className="hero-caption">Founded and built in Kenya - by Roy Chumba.</p>
        </div>
      </section>

      {/* ========== THE PROBLEM ========== */}
      <section className="section" id="gap" aria-labelledby="gap-heading">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">The Coordination Gap</span>
            <h2 className="h2 display" id="gap-heading">When money moves, coordination gaps arise.</h2>
          </div>
          <div className="two-col">
            <div className="problem reveal">
              <span className="num">Problem 01 - The Data Gap</span>
              <h3>Vital information disappears at the border.</h3>
              <p>Every time money crosses from one bank to another, payment messages pass through different systems that speak different formats. In that translation, dozens of important data fields are omitted. The receiving institution receives an incomplete picture, requiring manual reconciliation.</p>
            </div>
            <div className="problem reveal" data-delay="1">
              <span className="num">Problem 02 - The Evidence Gap</span>
              <h3>Nobody keeps the neutral record.</h3>
              <p>When Institution A sends money and Institution B receives it, both maintain independent logs. Discrepancies between these logs require manual cross-referencing, which can delay dispute resolution. Without a shared, independent coordination layer, resolving transaction discrepancies takes unnecessary time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SOLUTION ========== */}
      <section className="section section--tight" id="solution" aria-labelledby="solution-heading">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">What Connex Does</span>
            <h2 className="h2 display" id="solution-heading">A complete coordination layer.</h2>
            <p className="lead">Connex sits alongside existing payment systems without touching the payment flow. In one seamless step, we make sure outgoing transaction data arrives complete and compliant, while generating a tamper-proof record of the handoff that any party can independently check.</p>
          </div>
          <div className="bento reveal">
            <article className="bento-card">
              <div className="bc-top">
                <span className="bc-num">/ 01</span>
                <svg className="bc-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="6" width="36" height="36"/><path d="M6 18h36M18 6v36"/></svg>
              </div>
              <div className="bc-body">
                <p className="bc-label">Enrich · Data Completeness</p>
                <h3>Enrich</h3>
                <p>Automatically fills in missing payment data fields so every transaction arrives complete and ready for compliance, removing the need for manual work.</p>
              </div>
            </article>
            <article className="bento-card">
              <div className="bc-top">
                <span className="bc-num">/ 02</span>
                <svg className="bc-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="6" fill="currentColor"/></svg>
              </div>
              <div className="bc-body">
                <p className="bc-label">Prove · Independent Witness</p>
                <h3>Prove</h3>
                <p>Generates a tamper-evident, cryptographically secured proof of every cross-institutional handoff, witnessed by independent nodes that no single party controls.</p>
              </div>
            </article>
            <article className="bento-card">
              <div className="bc-top">
                <span className="bc-num">/ 03</span>
                <svg className="bc-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 24l10 10 22-22"/></svg>
              </div>
              <div className="bc-body">
                <p className="bc-label">Resolve · Instant Settlement</p>
                <h3>Resolve</h3>
                <p>What used to take weeks of manual log-matching now resolves in minutes. Any authorised party can retrieve the proof and settle the dispute with absolute certainty.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========== NEUTRAL BY DESIGN ========== */}
      <section className="section" id="neutral" aria-labelledby="neutral-heading">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Neutral By Design</span>
            <h2 className="h2 display" id="neutral-heading">The witness must have zero stake.</h2>
          </div>
          <div className="neutral-list">
            <div className="neutral-line reveal"><span className="nl-idx">01</span><span className="nl-text">We don't move money.</span></div>
            <div className="neutral-line reveal" data-delay="1"><span className="nl-idx">02</span><span className="nl-text">We don't process payments.</span></div>
            <div className="neutral-line reveal" data-delay="2"><span className="nl-idx">03</span><span className="nl-text">We don't store customer data.</span></div>
            <div className="neutral-line reveal" data-delay="3"><span className="nl-idx">04</span><span className="nl-text">We have no stake in any outcome.</span></div>
          </div>
          <p className="statement-sub reveal" style={{ marginTop: 24 }}>This is not a feature. It is the entire point. A witness with a financial interest in the result is not a witness. That independence is what makes Connex trustworthy to every party in the network.</p>
        </div>
      </section>

      {/* ========== LEGAL ========== */}
      <section className="section section--tight" id="legal-admissibility" aria-labelledby="legal-heading">
        <div className="wrap two-col">
          <div className="reveal">
            <span className="eyebrow">Legal Admissibility</span>
            <p className="statement" style={{ marginTop: 22 }}>Evidence that holds up in court.</p>
          </div>
          <div className="reveal" data-delay="1" style={{ alignSelf: 'end' }}>
            <p className="lead">Connex proof records are designed to satisfy the admissibility requirements of the Kenyan Evidence Act. When a payment dispute reaches a regulator or a courtroom, the Connex proof bundle serves as verifiable evidence, reducing the need for manual reconstruction or resolving conflicting logs.</p>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="section" id="cta" aria-labelledby="cta-heading">
        <div className="wrap cta-final">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>Founding Cohort</span>
          <h2 className="h1 display reveal" id="cta-heading" style={{ marginTop: 22 }}>Be among the first institutions on the network.</h2>
          <p className="lead reveal" data-delay="1">We are establishing a founding cohort of institutions in Kenya. Founding members receive priority access, direct input into product direction, and preferred partnership terms as we build the coordination layer for African payments.</p>
          <div className="row reveal" data-delay="2">
            <Link className="btn" to="/contact">Request Access <span className="arrow">→</span></Link>
            <Link className="btn btn--ghost" to="/product">How It Works</Link>
          </div>
        </div>
      </section>
    </>
  );
}
