import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Banks = () => {
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
            <div className="mono-label mb-sm">[ FOR BANKS ]</div>
            <h1 className="hero-headline mb-md">
              DISPUTES RESOLVED <br />
              <span className="inverted-box">IN MINUTES, NOT WEEKS.</span>
            </h1>
            <p className="text-muted mb-lg" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '750px' }}>
              Your reconciliation teams shouldn't spend weeks matching transaction logs with counterparties. There's a better way.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Status Quo vs With Connex */}
      <section className="section structural-border-bottom">
        <div className="container">
          <div className="grid-2">
            <div className="reveal" ref={addToRefs}>
              <h2 className="mb-md">WHAT HAPPENS TODAY.</h2>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                A customer calls. They say their transfer never arrived. Your team pulls the internal logs. The counterparty pulls theirs. The records don't match. Now it's phone calls, emails, escalations, and spreadsheets. Both sides are working from their own data. Neither trusts the other's. The customer waits. Your team burns hours. The counterparty's team burns hours. And there's still no guarantee of resolution.
              </p>
            </div>
            <div className="reveal" ref={addToRefs}>
              <h2 className="mb-md">WHAT CHANGES WITH CONNEX.</h2>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                When a dispute arises, you pull the verification record. It shows exactly what happened during the handoff, confirmed by independent parties. No more he-said-she-said. No more weeks of manual investigation. The evidence is verifiable, tamper-evident, and designed to be admissible under Kenyan law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Integration & Compliance */}
      <section className="section structural-border-bottom" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-2">
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">NOTHING CHANGES ABOUT YOUR PAYMENT FLOW.</h3>
              <p className="text-muted">
                Connex integrates alongside your existing infrastructure. No modifications to your core banking system. No changes to your payment processing. No downtime. No migration. Your systems continue operating exactly as they do today. Connex adds a verification layer without introducing any new risk to your operations.
              </p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">BUILT FOR THE WAY KENYA'S INSTITUTIONS OPERATE.</h3>
              <p className="text-muted">
                Designed within the framework of the Kenya Evidence Act, the Data Protection Act 2019, and the National Payments System Act. We store only what is necessary and nothing more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <div className="reveal" ref={addToRefs}>
            <h2 className="mb-lg">READY TO STREAMLINE YOUR RECONCILIATION?</h2>
            <button onClick={() => navigate('/contact')} className="btn btn-primary" style={{ padding: '18px 48px' }}>
              CONTACT US
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banks;
