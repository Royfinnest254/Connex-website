import React from 'react';

const Terms = () => {
  return (
    <div className="legal-page">
      <section className="section structural-border-bottom" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
        <div className="container">
          <div className="mono-label mb-sm">[ LEGAL ]</div>
          <h1 className="hero-headline mb-md" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}>
            FOUNDING <br />
            <span className="inverted-box">INSTITUTIONAL AGREEMENT.</span>
          </h1>
          <p className="lead text-primary" style={{ maxWidth: '750px' }}>
            Last updated: October 24, 2023. These terms govern the use of the Connex institutional interface and public resources.
          </p>
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="bento-card" style={{ padding: '3rem' }}>
            <h2 className="mb-lg">SERVICE UNDERSTANDING</h2>
            <p className="text-muted mb-xl" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              By accessing the Connex institutional portal or utilizing our public coordination resources, you agree to these terms. Institutional integration with the Connex protocol is governed by separate, private Master Service Agreements (MSA) and Service Level Agreements (SLA).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
              <div>
                <h3 className="mb-sm">01. LIMITED USE</h3>
                <p className="text-muted">
                  The information and tools provided on this website are for the exclusive use of verified financial institutions, payment processors, and regulatory bodies. Any unauthorized use of the coordination interface is strictly prohibited.
                </p>
              </div>

              <div>
                <h3 className="mb-sm">02. COORDINATION RESPONSIBILITY</h3>
                <p className="text-muted">
                  Connex acts as a neutral witness layer. While we provide cryptographic certainty of coordination events, the underlying payment obligations and fund movements remain the sole responsibility of the participating institutions.
                </p>
              </div>

              <div>
                <h3 className="mb-sm">03. INTELLECTUAL PROPERTY</h3>
                <p className="text-muted">
                  The Connex protocol architecture, witness node design, and coordination algorithms are the proprietary property of Connex. Access to this website does not grant any license to the underlying technology beyond the scope of a signed institutional agreement.
                </p>
              </div>

              <div>
                <h3 className="mb-sm">04. SYSTEMIC NEUTRALITY</h3>
                <p className="text-muted">
                  Connex maintains a position of absolute neutrality. We do not participate in the commercial disputes of bridged institutions beyond providing the independent, verifiable record of coordination events as requested by the protocol.
                </p>
              </div>
            </div>

            <div className="mt-xl" style={{ paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
              <p className="text-muted">
                To request a copy of the Standard Institutional MSA for founding partners:
              </p>
              <p className="lead mt-md" style={{ fontWeight: 'bold' }}>info@connextechnologies.org</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
