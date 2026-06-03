import { useState } from 'react';
import NetBackground from '../../components/NetBackground';

export default function Whitepaper() {
  const [form, setForm] = useState({ name: '', org: '', email: '', role: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
    setSending(false);
  };

  return (
    <>
      <title>Whitepaper | Connex Technologies | Payment Coordination Layer Technical Documentation</title>

      <section className="page-hero" aria-labelledby="wp-hero-h">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Resources / Whitepaper</span>
          <h1 id="wp-hero-h">The full<br />technical case.</h1>
          <p className="lead">The Connex whitepaper covers the coordination gap in full: the technical architecture, the data enrichment methodology, the cryptographic proof framework, and the legal admissibility design. Available to qualified institutions and researchers.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="wp-form-h">
        <div className="wrap">
          <div className="nda-card">
            {sent ? (
              <div>
                <span className="eyebrow" style={{ justifyContent: 'center' }}>Request received</span>
                <h2 className="h3" style={{ marginTop: 22, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>We will be in touch.</h2>
                <p className="muted" style={{ marginTop: 12, maxWidth: '48ch', margin: '12px auto 0' }}>We review whitepaper requests and follow up with a short conversation before sending the document. Expect a response within two business days.</p>
              </div>
            ) : (
              <>
                <span className="eyebrow" style={{ justifyContent: 'center' }}>Request Access</span>
                <h2 id="wp-form-h" className="h3" style={{ marginTop: 22, marginBottom: 8, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Request the Whitepaper</h2>
                <p className="muted" style={{ maxWidth: '48ch', margin: '0 auto 2rem' }}>The whitepaper is available to financial institutions, regulators, investors, and researchers. Complete the form below and we will follow up directly.</p>
                <form onSubmit={submit} style={{ textAlign: 'left' }}>
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="wp-name">Full Name</label>
                      <input id="wp-name" name="name" type="text" required value={form.name} onChange={handle} placeholder="Your name" />
                    </div>
                    <div className="field">
                      <label htmlFor="wp-org">Organisation</label>
                      <input id="wp-org" name="org" type="text" required value={form.org} onChange={handle} placeholder="Institution or organisation" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="wp-role">Role</label>
                      <input id="wp-role" name="role" type="text" value={form.role} onChange={handle} placeholder="Your position" />
                    </div>
                    <div className="field">
                      <label htmlFor="wp-email">Work Email</label>
                      <input id="wp-email" name="email" type="email" required value={form.email} onChange={handle} placeholder="you@organisation.com" />
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: 8 }}>
                    <button className="btn" type="submit" disabled={sending}>
                      {sending ? 'Sending...' : <>Request Whitepaper <span className="arrow">→</span></>}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          <div style={{ maxWidth: 700, margin: 'clamp(48px,8vh,80px) auto 0' }}>
            <div className="sec-head reveal">
              <span className="eyebrow">What Is Covered</span>
              <h2 className="h2 display" id="wp-contents-h">What the whitepaper covers.</h2>
            </div>
            <div className="steps">
              <div className="step reveal">
                <div className="step-num">01</div>
                <div>
                  <span className="step-tag">The Problem</span>
                  <h3>The Coordination Gap in Kenya</h3>
                  <p>A detailed analysis of the data loss and evidence gaps in Kenya's cross-institutional payment system, with specific reference to how legacy formats, ISO 20022 migration, and institutional incentives create the current situation.</p>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-num">02</div>
                <div>
                  <span className="step-tag">The Architecture</span>
                  <h3>How Connex Works</h3>
                  <p>The full technical architecture of the Connex coordination layer: the enrichment engine, the witness node network, the proof bundle format, and the API design that allows non-invasive integration with existing core banking systems.</p>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-num">03</div>
                <div>
                  <span className="step-tag">The Legal Framework</span>
                  <h3>Admissibility and Regulation</h3>
                  <p>How Connex proof records are designed to meet the requirements of the Kenyan Evidence Act for electronic records, and how the architecture relates to the CBK's regulatory framework for payment service providers.</p>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-num">04</div>
                <div>
                  <span className="step-tag">The Roadmap</span>
                  <h3>What Comes Next</h3>
                  <p>The founding cohort integration plan, the product development roadmap, and the path from Kenya to broader African market expansion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
