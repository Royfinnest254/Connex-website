import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Security = () => {
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
    <div className="security-page">
      {/* Hero Section */}
      <section
        className="section structural-border-bottom"
        style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}
      >
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ SECURITY ]</div>
            <h1 className="hero-headline mb-md">
              SYSTEMIC TRUST <br />
              <span className="inverted-box">&amp; SECURITY.</span>
            </h1>
            <p className="text-muted mb-lg" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '750px' }}>
              Verification, Transparency, and Compliance. Trust through mathematics, not promises.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Core Security Principles */}
      <section className="section structural-border-bottom">
        <div className="container">
          <div className="reveal mb-xl" ref={addToRefs}>
            <h2 className="mb-md">OUR SECURITY POSTURE.</h2>
          </div>

          <div className="grid-2">
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">CRYPTOGRAPHIC PROOF</h3>
              <p className="text-muted">
                Every coordination event witnessed by Connex is secured with industry-standard cryptographic proofs. We don't ask you to believe our logs; we provide the evidence for you to verify them yourself.
              </p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">DATA SOVEREIGNTY</h3>
              <p className="text-muted">
                Zero-knowledge by design. We store only the cryptographic metadata required to prove the event. No account numbers, no transaction amounts, and no customer identities ever touch our permanent record.
              </p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">LEGAL ADMISSIBILITY</h3>
              <p className="text-muted">
                The protocol is designed from the ground up to produce records that align with the Kenya Evidence Act. We bridge the gap between cryptographic certainty and legal requirement.
              </p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-md">NETWORK RESILIENCE</h3>
              <p className="text-muted">
                Witness nodes are distributed across multiple independent environments. Even if Connex infrastructure is compromised, existing records remain verifiable and tamper-evident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Infrastructure */}
      <section className="section structural-border-bottom" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ INFRASTRUCTURE ]</div>
            <h2 className="mb-md">HARDENED, ISOLATED, OBSERVED.</h2>

            {/* Fixed: button was awkwardly in a 2-col grid with text. Now laid out properly. */}
            <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
              <button
                onClick={() => navigate('/contact')}
                className="btn btn-primary"
                style={{ padding: '16px 40px' }}
              >
                REQUEST ACCESS
              </button>
            </div>

            <div className="grid-2">
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                Our infrastructure is built for institutional-grade reliability. We treat security not as a feature, but as the core value proposition of a neutral witness. Every layer of the stack is monitored, and every action is logged into a tamper-evident audit trail.
              </p>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                We work with third-party security firms to conduct regular penetration tests and architecture reviews. Our goal is to maintain the highest level of trust with the institutions that depend on our coordination layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section">
        <div className="container text-center">
          <div className="reveal" ref={addToRefs}>
            <h2 className="mb-md">SECURITY INQUIRIES.</h2>
            <p className="text-muted mb-lg mx-auto" style={{ maxWidth: '600px' }}>
              For institutional security reviews, pentest reports, or to report a vulnerability:
            </p>
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>info@connextechnologies.org</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;
