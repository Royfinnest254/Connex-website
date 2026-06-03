import { useState } from 'react';
import { Link } from 'react-router-dom';
import NetBackground from '../components/NetBackground';

export default function Contact() {
  const [form, setForm] = useState({ name: '', org: '', role: '', email: '', type: '', message: '' });
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
      <title>Contact Connex Technologies | Request Access or a Briefing</title>

      <section className="page-hero" aria-labelledby="contact-hero-h">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Get in Touch</span>
          <h1 id="contact-hero-h">Start the<br />conversation.</h1>
          <p className="lead">We are establishing partnerships with founding partner institutions in Kenya. If you represent a bank, fintech, or regulatory body and want to understand how Connex works in your specific context, reach out here.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-form-h">
        <div className="wrap">
          <div className="contact-grid">

            {/* FORM */}
            <div>
              <h2 className="h3" id="contact-form-h" style={{ marginBottom: '2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Request Access or a Briefing</h2>

              {sent ? (
                <div className="form-success">
                  <span className="eyebrow">Message received</span>
                  <h3 style={{ marginTop: 18 }}>We will be in touch shortly.</h3>
                  <p>We typically respond within one business day. For urgent matters, email <a href="mailto:info@connextechnologies.org">info@connextechnologies.org</a> directly.</p>
                  <button className="btn" onClick={() => { setSent(false); setForm({ name: '', org: '', role: '', email: '', type: '', message: '' }); }}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate id="contact-form">
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="cf-name">Full Name</label>
                      <input id="cf-name" name="name" type="text" required autoComplete="name" value={form.name} onChange={handle} placeholder="Your name" />
                    </div>
                    <div className="field">
                      <label htmlFor="cf-org">Organisation</label>
                      <input id="cf-org" name="org" type="text" required autoComplete="organization" value={form.org} onChange={handle} placeholder="Bank, fintech, regulator..." />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="cf-role">Your Role</label>
                      <input id="cf-role" name="role" type="text" value={form.role} onChange={handle} placeholder="e.g. Head of IT, CTO, CEO" />
                    </div>
                    <div className="field">
                      <label htmlFor="cf-email">Work Email</label>
                      <input id="cf-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handle} placeholder="you@organisation.com" />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="cf-type">What are you interested in?</label>
                    <select id="cf-type" name="type" value={form.type} onChange={handle} style={{ background: 'var(--clay-bg)', border: 0, borderRadius: 'var(--r-md)', boxShadow: 'var(--clay-inset)', color: 'var(--ink)', padding: '14px 16px', fontSize: '1.05rem', fontFamily: 'var(--font-sans)', cursor: 'pointer' }}>
                      <option value="">Select an option</option>
                      <option value="founding">Founding Partner Access</option>
                      <option value="briefing">Technical Briefing</option>
                      <option value="demo">Product Demo</option>
                      <option value="integration">Integration Discussion</option>
                      <option value="press">Press or Research</option>
                      <option value="other">Something Else</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="cf-message">Message</label>
                    <textarea id="cf-message" name="message" rows={5} value={form.message} onChange={handle} placeholder="Tell us about your institution and what you are trying to solve..." />
                  </div>
                  <button className="btn" type="submit" disabled={sending} style={{ marginTop: 8 }}>
                    {sending ? 'Sending...' : <>Send Message <span className="arrow">→</span></>}
                  </button>
                </form>
              )}
            </div>

            {/* SIDEBAR */}
            <div>
              <div className="channel">
                <h4>Email</h4>
                <p><a href="mailto:info@connextechnologies.org">info@connextechnologies.org</a></p>
              </div>
              <div className="channel">
                <h4>Based in</h4>
                <p>Kenya</p>
              </div>
              <div className="channel">
                <h4>Founding Cohort</h4>
                <p>We are currently establishing partnerships with a select group of founding partner institutions. Founding members receive priority access, direct product input, and preferred partnership terms.</p>
              </div>
              <div className="channel">
                <h4>Technical Briefings</h4>
                <p>We offer private briefings for technical and executive teams. We walk through the full architecture, your specific integration scenario, and answer all questions in full.</p>
              </div>
              <div className="channel">
                <h4>Whitepaper</h4>
                <p>For the full technical and legal framework, <Link to="/resources/whitepaper">request our whitepaper</Link>.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
