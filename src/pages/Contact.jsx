import React, { useEffect, useRef, useState } from 'react';

const Contact = () => {
  const revealRefs = useRef([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [form, setForm] = useState({
    name: '',
    institution: '',
    role: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await fetch("/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          institution: form.institution,
          role: form.role,
          email: form.email,
          message: form.message
        })
      });
    } catch (err) {
      console.error(err);
    }

    setStatus('success');
  };

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
    <div className="contact-page">
      {/* Hero Section */}
      <section
        className="section structural-border-bottom"
        style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}
      >
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ CONTACT ]</div>
            <h1 className="hero-headline mb-md">
              REQUEST A <br />
              <span className="inverted-box">BRIEFING.</span>
            </h1>
            <p className="text-muted mb-lg" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '750px' }}>
              We're currently onboarding a select group of founding institutions. Our technical team is available for deep-dive briefings on the Connex protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="section">
        <div className="container">
          <div className="grid-contact">
            {/* Contact Form */}
            <div className="reveal" ref={addToRefs}>
              <div className="glass bento-card">
                {status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#00ff88', textShadow: '0 0 15px #00ff88' }}>✓</div>
                    <h3 className="mb-sm">INQUIRY RECEIVED.</h3>
                    <p className="text-muted mb-lg" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                      Thanks {form.name || "for reaching out"}! We have received your inquiry for {form.institution || "your institution"}. Thank you for supporting Connex Technologies.
                    </p>

                    <button
                      onClick={() => { setStatus('idle'); setForm({ name: '', institution: '', role: '', email: '', message: '' }); }}
                      className="btn"
                      style={{ padding: '12px 36px', background: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--white)' }}
                    >
                      SEND ANOTHER REQUEST
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid-form-2">
                      <div>
                        <label className="mono-label mb-xs" style={{ display: 'block' }}>FULL NAME</label>
                        <input
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '3px' }}
                        />
                      </div>
                      <div>
                        <label className="mono-label mb-xs" style={{ display: 'block' }}>INSTITUTION</label>
                        <input
                          name="institution"
                          type="text"
                          value={form.institution}
                          onChange={handleChange}
                          required
                          className="form-control"
                          style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '3px' }}
                        />
                      </div>
                    </div>

                    <div className="mb-md">
                      <label className="mono-label mb-xs" style={{ display: 'block' }}>YOUR ROLE</label>
                      <input
                        name="role"
                        type="text"
                        value={form.role}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '3px' }}
                      />
                    </div>

                    <div className="mb-md">
                      <label className="mono-label mb-xs" style={{ display: 'block' }}>INSTITUTIONAL EMAIL</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '3px' }}
                      />
                    </div>

                    <div className="mb-lg">
                      <label className="mono-label mb-xs" style={{ display: 'block' }}>REQUEST DETAILS (OPTIONAL)</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', minHeight: '120px', resize: 'vertical', borderRadius: '3px' }}
                        placeholder="Tell us about your institution's interest in Connex..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '18px', opacity: status === 'loading' ? 0.8 : 1 }}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'SUBMITTING REQUEST...' : 'SUBMIT REQUEST'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Side Info */}
            <div className="reveal" ref={addToRefs} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div>
                <div className="mono-label mb-sm">[ DIRECT CHANNELS ]</div>
                <h3 className="mb-sm">INSTITUTIONAL SUPPORT</h3>
                <p className="text-muted" style={{ fontSize: '1.05rem' }}>
                  Integrated partners have 24/7 direct access to our core engineering team. For general inquiries:
                </p>
                <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>info@connextechnologies.org</p>
                <div style={{ marginTop: '1.5rem' }}>
                  <a
                    href="https://www.linkedin.com/company/112496389/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'var(--white)', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', padding: '10px 16px', border: '1px solid var(--border-medium)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: '500' }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#0a66c2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.91h2.79v8.37H6.46v-8.37M7.86 5.5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z"/></svg>
                    <span>Follow Connex on LinkedIn</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="mono-label mb-sm">[ LOCATION ]</div>
                <h3 className="mb-sm">HEADQUARTERS</h3>
                <p className="text-muted" style={{ fontSize: '1.05rem' }}>Based in Kenya. Operates across Africa.</p>
                <div style={{ fontWeight: 'bold', marginTop: '1rem' }}>Iten, Kenya</div>
              </div>

              <div className="glass bento-card" style={{ padding: '2rem' }}>
                <div className="mono-label mb-sm" style={{ color: 'var(--accent)' }}>SECURITY</div>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  To report a security vulnerability or request a copy of our latest audit report, please email the address above with "SECURITY" in the subject line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
