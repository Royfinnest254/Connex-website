import React, { useEffect, useRef } from 'react';
import { useModal } from '../../context/ModalContext';

const About = () => {
  const { openWaitlistModal } = useModal();
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
    <div className="company-page">
      {/* Hero Section */}
      <section
        className="section structural-border-bottom"
        style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}
      >
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ ABOUT CONNEX ]</div>
            <h1 className="hero-headline mb-md">
              WE EXIST BECAUSE <br />
              <span className="inverted-box">NO ONE ELSE CAN.</span>
            </h1>
            <p className="text-muted mb-lg" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '750px' }}>
              Every institution in the payment network has a financial interest in dispute outcomes. The neutral witness must have zero stake.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Why Connex Exists */}
      <section className="section structural-border-bottom">
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ OUR MISSION ]</div>
            <h2 className="mb-md">WHY CONNEX EXISTS.</h2>
            <div style={{ maxWidth: '850px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p className="text-muted" style={{ fontSize: '1.2rem', lineHeight: '1.7' }}>
                Kenya's digital payment ecosystem is one of the most advanced in the world. Millions of transactions move between banks, fintechs, and mobile money operators every day. But when something goes wrong between two institutions, the infrastructure for proving what happened hasn't kept pace.
              </p>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                No institution can solve this problem internally. If Safaricom builds the neutral record, why would KCB trust Safaricom's data in a dispute against Safaricom? If a bank builds it, why would a fintech trust the bank's version? The record-keeper must be structurally independent. That's why Connex exists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Our Principles */}
      <section className="section structural-border-bottom" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal mb-xl" ref={addToRefs}>
            <div className="mono-label mb-sm">[ IDENTITY ]</div>
            <h2 className="mb-md">OUR PRINCIPLES.</h2>
          </div>

          <div className="grid-2">
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">"ALONGSIDE, NOT IN-LINE."</h3>
              <p className="text-muted">We never touch the payment flow. We observe and record without ever becoming a point of failure or a dependency.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">"ZERO STAKE."</h3>
              <p className="text-muted">We have no financial relationship to any transaction we witness. Our neutrality is structural, not just promised.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">"VERIFY, DON'T TRUST."</h3>
              <p className="text-muted">Any party can independently check any record without contacting us. Trust through mathematics and open verification methods.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">"OPEN PROTOCOL."</h3>
              <p className="text-muted">The core coordination protocol is open for inspection. We believe trust is built through transparency and rigorous scrutiny.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Based in Kenya */}
      <section className="section">
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ HEADQUARTERS ]</div>
            <h2 className="mb-md">BASED IN KENYA. BUILT FOR AFRICA.</h2>
            <p className="text-muted" style={{ maxWidth: '850px', fontSize: '1.1rem', lineHeight: '1.7' }}>
              We're headquartered in Kenya because this is where the problem is most acute and the opportunity is largest. Africa's payment ecosystem is growing faster than anywhere in the world. The coordination layer needs to grow with it. We are building the trust infrastructure for the next billion African payment coordination events.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
