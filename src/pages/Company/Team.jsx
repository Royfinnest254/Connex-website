import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RoyChumba from '../../assets/images/roy.png';
import { useModal } from '../../context/ModalContext';

const Team = () => {
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
    <div className="team-page">
      {/* Hero Section */}
      <section
        className="section structural-border-bottom"
        style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}
      >
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ COMPANY ]</div>
            <h1 className="hero-headline mb-md">
              THE PEOPLE <br />
              <span className="inverted-box">BEHIND CONNEX.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section structural-border-bottom">
        <div className="container">
          {/* Uses grid-contact: photo | bio — collapses to 1 col on mobile */}
          <div className="grid-contact">
            <div className="reveal" ref={addToRefs}>
              <div style={{ overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                <img
                  src={RoyChumba}
                  alt="Roy Chumba — Founder & CEO"
                  style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(0.1) contrast(1.1)' }}
                />
              </div>
            </div>
            <div className="reveal" ref={addToRefs} style={{ paddingTop: '0.5rem' }}>
              <div className="mono-label mb-sm">FOUNDER &amp; CEO</div>
              <h2 className="mb-md">ROY CHUMBA</h2>
              <p className="text-muted mb-lg" style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
                Roy designed the Connex coordination protocol and leads the company's technical and business strategy. A multiple award-winner at the Kenya Science &amp; Engineering Fair in Computer Science, he has been building software products since age 16 and has deep firsthand understanding of Kenya's payment infrastructure.
              </p>
              <div className="text-muted" style={{ fontSize: '1rem' }}>
                Based in Iten, Kenya.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growing Section */}
      <section className="section">
        <div className="container">
          <div className="reveal text-center" ref={addToRefs}>
            <div className="mono-label mb-sm">[ OPPORTUNITY ]</div>
            <h2 className="mb-md">WE'RE GROWING.</h2>
            <p className="text-muted mb-lg mx-auto" style={{ maxWidth: '750px', fontSize: '1.1rem' }}>
              We're a small team building critical infrastructure. If you want to work on hard problems that institutions will depend on, we want to hear from you.
            </p>
            <button onClick={openWaitlistModal} className="btn btn-primary" style={{ padding: '16px 48px' }}>
              JOIN WAITLIST
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
