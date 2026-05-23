import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Product = () => {
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
    <div className="product-page">
      {/* Hero Section */}
      <section
        className="section structural-border-bottom"
        style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}
      >
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ ARCHITECTURE ]</div>
            <h1 className="hero-headline mb-md">
              ALONGSIDE, <span className="inverted-box">NOT IN-LINE.</span>
            </h1>
            <p className="text-muted mb-lg" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '700px' }}>
              Your existing payment rails stay exactly as they are. Connex adds a layer of verification without touching a single transaction.
            </p>
          </div>
        </div>
      </section>

      {/* Section: The Gap */}
      <section className="section structural-border-bottom">
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ WHY THIS EXISTS ]</div>
            <h2 className="mb-md">THE SPACE BETWEEN INSTITUTIONS.</h2>
            <div className="grid-2" style={{ marginBottom: '3rem' }}>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                When Institution A sends money and Institution B receives it, both maintain their own records. When those records disagree, there is no shared log. No neutral third party who saw what happened. Every institution has its own version of events, and every institution has a financial interest in the outcome.
              </p>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                That's the coordination gap. It exists in every market where multiple institutions move money between each other. It cannot be solved by any participant in the payment network because participants have a stake in the outcome.
              </p>
            </div>

            <div className="table-wrapper">
              <table className="corporate-table">
                <thead>
                  <tr>
                    <th>Data Field / Compliance Standard</th>
                    <th>Legacy ISO 8583 Rail</th>
                    <th>Connex Enriched ISO 20022 Gateway</th>
                    <th>Resolution Evidence Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Structured Ultimate Creditor Address</td>
                    <td className="status-failed">FAILED (DROPPED ON HANDOFF)</td>
                    <td>ENRICHED (CBK CODEBOOK PARSING)</td>
                    <td className="status-verified">VERIFIED</td>
                  </tr>
                  <tr>
                    <td>Purpose of Transaction Codes</td>
                    <td className="status-failed">FAILED (ABSENT IN LEGACY PAYMENTS)</td>
                    <td>ENRICHED (AI TRANSFORMATION CLASSIFIER)</td>
                    <td className="status-verified">VERIFIED</td>
                  </tr>
                  <tr>
                    <td>Original End-to-End Reference ID</td>
                    <td className="status-failed">FAILED (TRUNCATED TO 12 CHARS)</td>
                    <td>PRESERVED (36-CHAR SHA-256 HASH)</td>
                    <td className="status-verified">VERIFIED</td>
                  </tr>
                  <tr>
                    <td>Multi-Party Cryptographic Consensus Proof</td>
                    <td className="status-failed">FAILED (NONE)</td>
                    <td>WITNESSED (2-OF-3 QUORUM CONSENSUS)</td>
                    <td className="status-verified">VERIFIED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section: How Connex Works */}
      <section className="section structural-border-bottom" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal mb-xl" ref={addToRefs}>
            <div className="mono-label mb-sm">[ THE PROCESS ]</div>
            <h2 className="mb-md">FOUR STEPS. COMPLETE COORDINATION.</h2>
          </div>

          <div className="grid-4">
            <div className="bento-card reveal" ref={addToRefs}>
              <div className="mono-label mb-xs">01</div>
              <h3 className="mb-sm">CAPTURE</h3>
              <p className="text-muted">Institutions connect via a simple, non-invasive API. Connex captures legacy transaction events in real time as money moves across network boundaries.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <div className="mono-label mb-xs">02</div>
              <h3 className="mb-sm">ENRICH</h3>
              <p className="text-muted">Our enrichment engine intelligently fills in missing compliance fields, purpose codes, and structured data to assemble a fully compliant ISO 20022 message.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <div className="mono-label mb-xs">03</div>
              <h3 className="mb-sm">PROVE</h3>
              <p className="text-muted">Independent witness nodes observe the handoff and generate tamper-evident proof bundles. No single institution controls the record.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <div className="mono-label mb-xs">04</div>
              <h3 className="mb-sm">RESOLVE</h3>
              <p className="text-muted">When a discrepancy occurs, any authorized party can retrieve the proof bundle for instant verification. Disputes resolve in minutes rather than weeks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Design Principles */}
      <section className="section structural-border-bottom">
        <div className="container">
          <div className="reveal mb-xl" ref={addToRefs}>
            <h2 className="mb-md">WHAT WE BELIEVE.</h2>
          </div>

          <div className="grid-2">
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">ZERO COUPLING</h3>
              <p className="text-muted">If Connex goes offline, every payment continues. We add a layer. We never become a dependency.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">ZERO KNOWLEDGE</h3>
              <p className="text-muted">We don't store what we don't need. No transaction amounts. No account numbers. No customer names.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">ZERO STAKE</h3>
              <p className="text-muted">We have no financial interest in any payment outcome. The witness must be neutral or the evidence means nothing.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">ZERO TRUST REQUIRED</h3>
              <p className="text-muted">You don't have to trust Connex. You verify the proof yourself using standard methods. Trust through mathematics, not promises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <div className="reveal" ref={addToRefs}>
            <h2 className="mb-md">WANT TO SEE IT IN DETAIL?</h2>
            <button onClick={() => navigate('/contact')} className="btn btn-primary" style={{ padding: '18px 48px' }}>
              CONTACT US
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
