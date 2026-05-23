import React from 'react';

const Privacy = () => {
  return (
    <div className="legal-page">
      <section className="section structural-border-bottom" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
        <div className="container">
          <div className="mono-label mb-sm">[ LEGAL ]</div>
          <h1 className="hero-headline mb-md" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}>
            INSTITUTIONAL <br />
            <span className="inverted-box">PRIVACY POLICY.</span>
          </h1>
          <p className="lead text-primary" style={{ maxWidth: '700px' }}>
            Effective date: October 24, 2023. At Connex, we move metadata, not identity.
          </p>
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="bento-card" style={{ padding: '3rem' }}>
            <h2 className="mb-lg">OVERVIEW</h2>
            <p className="text-muted mb-xl" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              Our witness-based coordination protocol is designed following "Privacy by Design" principles to minimize data collection and emphasize institutional sovereignty. We do not store sensitive customer transaction data, account numbers, or personal identifying information (PII).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
              <div>
                <h3 className="mb-sm">01. MINIMAL DATA COLLECTION (ZERO KNOWLEDGE)</h3>
                <p className="text-muted">
                  We only process the minimal cryptographic metadata required to generate a verifiable record of institutional coordination. This data is insufficient to identify individual persons or specific transaction values.
                </p>
              </div>

              <div>
                <h3 className="mb-sm">02. ZERO-KNOWLEDGE ARCHITECTURE</h3>
                <p className="text-muted">
                  The Connex protocol uses zero-knowledge proofs to verify that a coordination event occurred without requiring the institutions to share the underlying private transaction data with the witness layer.
                </p>
              </div>

              <div>
                <h3 className="mb-sm">03. INSTITUTIONAL SOVEREIGNTY</h3>
                <p className="text-muted">
                  Institutions maintain full control over their own transaction logs. Connex adds a layer of verification alongside those logs, but never becomes the primary repository for institutional data.
                </p>
              </div>

              <div>
                <h3 className="mb-sm">04. COMPLIANCE</h3>
                <p className="text-muted">
                  We are built for compliance with the Kenya Data Protection Act 2019 and other relevant regional and international data protection regulations. We conduct regular privacy impact assessments to ensure our protocol remains the most private coordination layer in the market.
                </p>
              </div>
            </div>

            <div className="mt-xl" style={{ paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
              <p className="text-muted">
                For inquiries regarding our privacy posture or to request our Data Protection Impact Assessment (DPIA) summary:
              </p>
              <p className="lead mt-md" style={{ fontWeight: 'bold' }}>info@connextechnologies.org</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
