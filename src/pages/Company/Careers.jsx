import React, { useEffect, useRef } from 'react';

const Careers = () => {
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
    <div className="careers-page">
      {/* Hero Section */}
      <section
        className="section structural-border-bottom"
        style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}
      >
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ CAREERS ]</div>
            <h1 className="hero-headline mb-md">
              BUILD THE TRUST LAYER <br />
              <span className="inverted-box">FOR AFRICAN PAYMENTS.</span>
            </h1>
            <p className="text-muted mb-lg" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '750px' }}>
              Small team. Hard problems. Real infrastructure that real institutions use.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Why Connex */}
      <section className="section structural-border-bottom">
        <div className="container">
          <div className="reveal mb-xl" ref={addToRefs}>
            <h2 className="mb-md">WHY CONNEX.</h2>
          </div>

          <div className="grid-2">
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">REAL DEPENDENCY</h3>
              <p className="text-muted">You'll build something that financial institutions depend on daily. Reliability isn't a metric here; it's the product.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">COMPLEX SYSTEMS</h3>
              <p className="text-muted">You'll work on real distributed systems, real cryptography, and real regulatory constraints in a fast-paced environment.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">MARKET GROWTH</h3>
              <p className="text-muted">You'll ship to production in one of the fastest-growing payment ecosystems in the world. Africa is the frontier.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">DIRECT IMPACT</h3>
              <p className="text-muted">At this stage, every person shapes the product, the culture, and the future of institutional coordination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Open Roles */}
      <section className="section structural-border-bottom" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal mb-xl" ref={addToRefs}>
            <div className="mono-label mb-xs">[ OPPORTUNITIES ]</div>
            <h2 className="mb-md">OPEN ROLES.</h2>
          </div>

          <div className="bento-card reveal" ref={addToRefs}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}
          >
            <div>
              <h3 className="mb-xs">BACKEND ENGINEER — DISTRIBUTED SYSTEMS</h3>
              <p className="text-muted" style={{ maxWidth: '600px', marginTop: '0.5rem' }}>
                You'll build the core coordination infrastructure. This is the hardest engineering problem in the company and the one that matters most.
              </p>
            </div>
            <a href="mailto:info@connextechnologies.org" className="btn btn-primary" style={{ padding: '14px 32px', flexShrink: 0 }}>
              APPLY NOW
            </a>
          </div>
        </div>
      </section>

      {/* No Role Fits */}
      <section className="section">
        <div className="container text-center">
          <div className="reveal" ref={addToRefs}>
            <h2 className="mb-md">NO OPEN ROLE THAT FITS?</h2>
            <p className="text-muted mb-lg mx-auto" style={{ maxWidth: '700px' }}>
              If you're exceptional and think you should be here, reach out anyway. We're always looking for world-class talent to help us build the future of payments.
            </p>
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>info@connextechnologies.org</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
