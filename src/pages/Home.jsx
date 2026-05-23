import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

const Home = () => {
  const { openWaitlistModal, waitlistCount } = useModal();
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
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="section structural-border-bottom"
        style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}
      >
        <div className="container">
          <div className="reveal" ref={addToRefs} style={{ maxWidth: '900px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', padding: '6px 16px', border: '1px solid var(--border-medium)', borderRadius: '4px', marginBottom: '2rem' }}>
              <span className="mono-label" style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.7rem' }}>WAITLIST ACTIVE | {waitlistCount} {waitlistCount !== 1 ? 'PEOPLE ENROLLED' : 'PERSON ENROLLED'}</span>
            </div>
            <h1 className="hero-headline mb-md">
              ONE SYSTEM. <br />
              <span className="inverted-box">COMPLETE DATA. PROVABLE HANDOFFS.</span>
            </h1>
            <p className="text-muted mb-lg" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '750px', fontWeight: '500', lineHeight: '1.6' }}>
              When money moves between institutions, two things break: data shrinks during format handoffs, and proof disappears when independent logs disagree. Connex solves both in a single, neutral coordination layer.
            </p>
            <div className="hero-actions">
              <button onClick={openWaitlistModal} className="btn btn-primary" style={{ padding: '16px 36px' }}>
                JOIN WAITLIST
              </button>
              <button onClick={() => navigate('/product')} className="btn btn-outline" style={{ padding: '16px 36px' }}>
                LEARN HOW IT WORKS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section: The Problem */}
      <section className="section structural-border-bottom">
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ THE COORDINATION GAP ]</div>
            <h2 className="mb-md" style={{ maxWidth: '850px' }}>UNCOORDINATED HANDOFFS CREATE TWO PROBLEMS.</h2>
            <div className="grid-2">
              <div>
                <h3 className="mb-sm" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>PROBLEM 1: THE DATA GAP</h3>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Legacy core banking systems speak older formats, dropping dozens of critical compliance fields required by modern ISO 20022 standards. When messages cross institutional boundaries, data is lost. The receiving institution gets an incomplete picture, compliance fails, and regulatory visibility is compromised.
                </p>
              </div>
              <div>
                <h3 className="mb-sm" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>PROBLEM 2: THE EVIDENCE GAP</h3>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Every cross-institutional payment involves a handoff. Both institutions keep their own separate logs. When those logs tell different stories, there is no neutral witness. Disputes take weeks of manual investigation, costing institutions real money while customer funds sit in limbo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: The Solution */}
      <section className="section structural-border-bottom" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="reveal mb-xl" ref={addToRefs}>
            <div className="mono-label mb-sm">[ WHAT CONNEX DOES ]</div>
            <h2 className="mb-md">A COMPLETE COORDINATION LAYER.</h2>
            <p className="text-muted" style={{ maxWidth: '850px', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Connex sits alongside existing payment systems without touching the payment flow. In a single seamless action, we enrich outgoing transaction data so it arrives fully compliant, while simultaneously generating tamper-evident proof of the handoff that any party can independently verify.
            </p>
          </div>

          <div className="grid-3">
            <div className="bento-card reveal" ref={addToRefs}>
              <div className="mono-label mb-sm">[ ENRICH ]</div>
              <h3 className="mb-md">DATA COMPLETENESS</h3>
              <p className="text-muted">Automatically transforms and enriches legacy payment messages into fully compliant, structured ISO 20022 formats.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <div className="mono-label mb-sm">[ PROVE ]</div>
              <h3 className="mb-md">INDEPENDENT WITNESS</h3>
              <p className="text-muted">Captures and secures cross-institutional handoffs with tamper-evident cryptographic proofs signed by independent witness nodes.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <div className="mono-label mb-sm">[ RESOLVE ]</div>
              <h3 className="mb-md">INSTANT SETTLEMENT</h3>
              <p className="text-muted">What used to take weeks of manual log-matching can now be resolved and settled in minutes with absolute certainty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Neutral by Design */}
      <section className="section structural-border-bottom">
        <div className="container">
          <div className="reveal text-center" ref={addToRefs}>
            <h2 className="mb-xl">NEUTRAL BY DESIGN.</h2>
            <div className="grid-2" style={{ marginBottom: '4rem' }}>
              <div className="bento-card">
                <p className="mono-label" style={{ fontSize: '1.1rem' }}>"WE DON'T MOVE MONEY."</p>
              </div>
              <div className="bento-card">
                <p className="mono-label" style={{ fontSize: '1.1rem' }}>"WE DON'T PROCESS PAYMENTS."</p>
              </div>
              <div className="bento-card">
                <p className="mono-label" style={{ fontSize: '1.1rem' }}>"WE DON'T STORE CUSTOMER DATA."</p>
              </div>
              <div className="bento-card">
                <p className="mono-label" style={{ fontSize: '1.1rem' }}>"WE HAVE NO FINANCIAL INTEREST IN ANY DISPUTE OUTCOME."</p>
              </div>
            </div>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
              This isn't a feature. It's the entire point. The witness must have zero stake in the outcome. That's Connex.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Legal */}
      <section className="section structural-border-bottom" style={{ background: 'var(--black)', color: 'var(--white)' }}>
        <div className="container">
          <div className="reveal" ref={addToRefs} style={{ maxWidth: '800px' }}>
            <h2 style={{ color: 'var(--white)', marginBottom: '2rem' }}>DESIGNED TO HOLD UP IN COURT.</h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', opacity: 0.8, lineHeight: '1.6' }}>
              Connex is built within the framework of Kenyan law. Our proof records are designed to satisfy the admissibility requirements of the Evidence Act. When a dispute reaches a regulator or a courtroom, the evidence should speak for itself.
            </p>
          </div>
        </div>
      </section>

      {/* Section: CTA */}
      <section className="section">
        <div className="container text-center">
          <div className="reveal" ref={addToRefs}>
            <h2 className="mb-md">BE AMONG THE FIRST INSTITUTIONS ON THE NETWORK.</h2>
            <p className="text-muted mb-lg mx-auto" style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
              We're onboarding a founding cohort of institutions in Kenya. Founding members get priority access, direct input into the product, and a seat at the table as we build the coordination layer for African payments.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
              <button onClick={openWaitlistModal} className="btn btn-primary" style={{ padding: '18px 48px' }}>
                JOIN WAITLIST
              </button>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Or <Link to="/product" style={{ color: 'var(--white)', fontWeight: 'bold' }}>read about how it works.</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
