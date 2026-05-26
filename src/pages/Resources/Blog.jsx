import React, { useEffect, useRef } from 'react';

const Blog = () => {
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
    <div className="blog-page">
      {/* Hero Section */}
      <section
        className="section structural-border-bottom"
        style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}
      >
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ RESOURCES ]</div>
            <h1 className="hero-headline mb-md">
              INSTITUTIONAL <br />
              <span className="inverted-box">INSIGHTS.</span>
            </h1>
            <p className="text-muted mb-lg" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '750px' }}>
              Notes on coordination, infrastructure, and systemic risk in the African payment ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Private Beta Status */}
      <section className="section">
        <div className="container">
          <div className="reveal text-center" ref={addToRefs}>
            <div className="glass bento-card mx-auto" style={{ maxWidth: '800px', padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)' }}>
              <div className="mono-label mb-md">[ STATUS: PRIVATE BETA ]</div>
              <h2 className="mb-md">CONTENT CURRENTLY RESTRICTED.</h2>
              <p className="text-muted mb-lg mx-auto" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
                We are currently scaling our private institutional beta in Kenya. During this phase, technical insights and network updates are shared directly with participating institutions and regulatory partners.
              </p>
              <div className="mono-label" style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}>
                PUBLIC INSIGHTS COMMENCING Q3 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vetted Technical Previews */}
      <section className="section structural-border-top">
        <div className="container">
          <div className="reveal mb-lg" ref={addToRefs}>
            <div className="mono-label">[ NDA-RESTRICTED TECHNICAL PAPERS ]</div>
          </div>
          <div className="grid-3">
            <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
              <div>
                <div className="mono-label mb-sm" style={{ color: 'var(--accent)' }}>[ PROTOCOL ]</div>
                <h3 className="mb-sm" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>VERIFICATION UNDER THE KENYA EVIDENCE ACT</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Analysis of Ed25519 signature quorum validity and cryptographic message chaining admissibility in Kenyan courts.
                </p>
              </div>
              <div className="mono-label" style={{ fontSize: '0.65rem', marginTop: '1.5rem', opacity: 0.5 }}>RESTRICTED ACCESS</div>
            </div>
            <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
              <div>
                <div className="mono-label mb-sm" style={{ color: 'var(--accent)' }}>[ INTEGRATION ]</div>
                <h3 className="mb-sm" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>ISO 20022 ENRICHMENT ON LEGACY SYSTEMS</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                  How the Connex gateway reconstructs and maps 35+ dropped settlement data fields from ISO 8583 banking rails asynchronously.
                </p>
              </div>
              <div className="mono-label" style={{ fontSize: '0.65rem', marginTop: '1.5rem', opacity: 0.5 }}>RESTRICTED ACCESS</div>
            </div>
            <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
              <div>
                <div className="mono-label mb-sm" style={{ color: 'var(--accent)' }}>[ CONSENSUS ]</div>
                <h3 className="mb-sm" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>2-OF-3 QUORUM LATENCY OPTIMIZATION</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Benchmarking signature collection and Merkle tree root commitments across AWS, Azure, and Google Cloud witness nodes.
                </p>
              </div>
              <div className="mono-label" style={{ fontSize: '0.65rem', marginTop: '1.5rem', opacity: 0.5 }}>RESTRICTED ACCESS</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
