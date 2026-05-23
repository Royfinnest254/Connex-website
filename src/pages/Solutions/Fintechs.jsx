import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Fintechs = () => {
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
            <div className="mono-label mb-sm">[ FOR FINTECHS ]</div>
            <h1 className="hero-headline mb-md">
              NEUTRAL GROUND <br />
              <span className="inverted-box">WITH EVERY INSTITUTION.</span>
            </h1>
            <p className="text-muted mb-lg" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '750px' }}>
              You're the newer player at the table. When a dispute arises with a Tier 1 bank, whose logs does the regulator trust?
            </p>
          </div>
        </div>
      </section>

      {/* Section: The Fintech Problem */}
      <section className="section structural-border-bottom">
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ THE FINTECH PROBLEM ]</div>
            <h2 className="mb-md">YOUR LOGS CARRY LESS WEIGHT.</h2>
            <div className="grid-2">
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                You built a great product. You process thousands of transactions. But when something goes wrong between your platform and a legacy bank, the playing field isn't level. They have decades of institutional credibility. You have a two-year track record. In a dispute, that gap matters.
              </p>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                Connex removes it. The verification record doesn't care who generated it. It treats every institution the same. By joining the network, you gain immediate, neutral credibility with every other participant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Speed & Network Value */}
      <section className="section structural-border-bottom" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-2">
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">BUILT FOR SPEED. INTEGRATE WITHOUT SLOWING DOWN.</h3>
              <p className="text-muted">
                Simple integration alongside your existing stack. Asynchronous by design. Your engineering team can add Connex without touching your core payment flow or slowing your release cycle. No complex legacy protocols — just clean, modern architecture.
              </p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">NETWORK VALUE. SCALE YOUR TRUST.</h3>
              <p className="text-muted">
                The moment you join Connex, you gain verification coverage with every other participant on the network. The more institutions that join, the more valuable your membership becomes. This is infrastructure that gets better as it grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <div className="reveal" ref={addToRefs}>
            <h2 className="mb-lg">READY TO LEVEL THE PLAYING FIELD?</h2>
            <button onClick={() => navigate('/contact')} className="btn btn-primary" style={{ padding: '18px 48px' }}>
              CONTACT US
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fintechs;
