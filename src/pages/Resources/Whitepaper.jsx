import React, { useEffect, useRef } from 'react';
import { useModal } from '../../context/ModalContext';

const Whitepaper = () => {
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
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="whitepaper-page">
      {/* Hero Section */}
      <section className="section structural-border-bottom" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ RESOURCES ]</div>
            <h1 className="hero-headline mb-md" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>
              TECHNICAL <br />
              <span className="inverted-box">COORDINATION PROTOCOL.</span>
            </h1>
            <p className="lead mb-lg text-primary" style={{ fontSize: '1.25rem', maxWidth: '750px' }}>
              The math behind neutral witnessing. A deep dive into the architecture of the Connex coordination layer.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Access Control */}
      <section className="section structural-border-bottom">
        <div className="container text-center">
          <div className="reveal" ref={addToRefs}>
            <div className="glass bento-card mx-auto" style={{ maxWidth: '700px', padding: '3rem' }}>
              <h2 className="mb-md">NDA-PROTECTED RESOURCE.</h2>
              <p className="text-muted mb-lg" style={{ fontSize: '1.1rem' }}>
                The Connex Whitepaper contains proprietary protocol specifications and cryptographic proofs. We share it under NDA with institutional partners, regulators, and vetted technical reviewers.
              </p>
              <button onClick={openWaitlistModal} className="btn btn-primary" style={{ padding: '18px 40px' }}>JOIN WAITLIST</button>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Inside the document */}
      <section className="section">
        <div className="container">
          <div className="reveal mb-xl" ref={addToRefs}>
            <h2 className="mb-md">INSIDE THIS DOCUMENT.</h2>
          </div>

          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">PROTOCOL ARCHITECTURE</h3>
              <p className="text-muted">A detailed specification of the coordination layer, observer nodes, and the data-sharing protocol between institutions.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">CONSENSUS DESIGN</h3>
              <p className="text-muted">How independent witness nodes achieve low-latency, tamper-evident finality across heterogeneous payment networks.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">SECURITY PROOFS</h3>
              <p className="text-muted">Mathematical foundations of our zero-knowledge coordination model. How we prove handoffs without seeing private data.</p>
            </div>
            <div className="bento-card reveal" ref={addToRefs}>
              <h3 className="mb-sm">REGULATORY ALIGNMENT</h3>
              <p className="text-muted">A breakdown of how the protocol design satisfies the requirements of the Kenya Evidence Act and the NPS Act.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Whitepaper;
