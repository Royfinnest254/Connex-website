import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Regulators = () => {
  const navigate = useNavigate();
  const revealRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((ref) => observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="solutions-page">
      {/* Hero Section */}
      <section
        className="section structural-border-bottom"
        style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}
      >
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ FOR REGULATORS ]</div>
            <h1 className="hero-headline mb-md">
              INDEPENDENT VERIFICATION. <br />
              <span className="inverted-box">NOT SELF-REPORTED DATA.</span>
            </h1>
            <p className="text-muted mb-lg" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '750px' }}>
              Oversight that doesn't depend on the institutions being overseen.
            </p>
          </div>
        </div>
      </section>

      {/* Section: The Blind Spot */}
      <section className="section structural-border-bottom">
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ THE BLIND SPOT ]</div>
            <h2 className="mb-md">YOU'RE RELYING ON EACH INSTITUTION'S OWN RECORDS.</h2>
            <div className="grid-2">
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                When a systemic payment issue occurs, the current process is to request logs from each institution separately. Those logs often conflict. There is no independent, neutral layer that recorded what actually happened between institutions.
              </p>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                Regulators are left to arbitrate between competing versions of events with no shared evidence. This lack of a neutral coordination layer creates systemic risk and delays the resolution of network-wide issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: What Connex Enables */}
      <section className="section structural-border-bottom" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal mb-xl" ref={addToRefs}>
            <div className="mono-label mb-sm">[ OVERSIGHT ]</div>
            <h2 className="mb-md">A NEUTRAL COORDINATION LAYER FOR OVERSIGHT.</h2>
          </div>

          <div className="grid-3">
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">INDEPENDENT VERIFICATION</h3>
              <p className="text-muted">Verify any cross-institutional handoff event without relying on either institution's self-reported data.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">CROSS-NETWORK VISIBILITY</h3>
              <p className="text-muted">Gain insight into payment coordination patterns that no single institution can see alone.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">VERIFIABLE RECORD</h3>
              <p className="text-muted">A record designed within the framework of the Kenya Evidence Act and the National Payments System Act.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <div className="reveal" ref={addToRefs}>
            <h2 className="mb-md">WANT TO LEARN MORE ABOUT REGULATORY ENABLING?</h2>
            <p className="text-muted mb-lg mx-auto" style={{ maxWidth: '700px' }}>
              We brief regulatory and oversight bodies on request.
            </p>
            <button onClick={() => navigate('/contact')} className="btn btn-primary" style={{ padding: '18px 48px' }}>
              CONTACT US
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Regulators;
