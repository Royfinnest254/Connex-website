import { Link } from 'react-router-dom';
import NetBackground from '../../components/NetBackground';

export default function About() {
  return (
    <>
      <title>About Connex Technologies | Payment Coordination Layer Founded in Kenya</title>

      <section className="page-hero" aria-labelledby="about-hero-h">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Company / About</span>
          <h1 id="about-hero-h">Built in Kenya.<br />Built for Africa.</h1>
          <p className="lead">Connex Technologies is building the neutral coordination layer for cross-institutional payments across Kenya and Africa. We were founded on a simple observation: when money moves between institutions, two things consistently fail: data completeness and independent evidence. We fix both.</p>
        </div>
      </section>

      {/* MISSION */}
      <section className="section" aria-labelledby="mission-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Our Mission</span>
            <h2 className="h2 display" id="mission-h">Certainty for everyone in the payment chain.</h2>
          </div>
          <div className="two-col">
            <div className="reveal">
              <p className="lead">Every bank, fintech, and payment processor in Kenya operates in a system where cross-institutional payment handoffs are opaque. When money leaves one institution and arrives at another, neither party has a neutral record of exactly what happened. Disputes are expensive, slow, and often unresolvable. Compliance is patchy. Regulators have incomplete visibility.</p>
            </div>
            <div className="reveal" data-delay="1">
              <p className="lead">Connex changes that. Not by replacing existing payment rails or competing with the institutions that run them, but by adding a neutral layer that watches every handoff, fills every data gap, and generates tamper-evident proof that any party can independently verify. The witness must have zero stake in the outcome. That is us.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section section--tight" aria-labelledby="principles-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">What We Stand For</span>
            <h2 className="h2 display" id="principles-h">Principles we do not negotiate.</h2>
          </div>
          <div className="grid-4 reveal">
            <div className="cell">
              <span className="c-key">Neutrality</span>
              <h3>No Stake. No Bias.</h3>
              <p>We do not move money, process payments, or hold customer funds. We have no financial interest in any payment outcome. This is not a positioning statement: it is the architectural foundation of everything we build.</p>
            </div>
            <div className="cell">
              <span className="c-key">Transparency</span>
              <h3>Verify, Don't Trust</h3>
              <p>Every proof we generate can be independently verified by any authorised party using standard cryptographic methods. You do not need to take our word for anything. The mathematics speaks.</p>
            </div>
            <div className="cell">
              <span className="c-key">Non-Disruption</span>
              <h3>Alongside, Not In-Line</h3>
              <p>We never sit in the payment path. If Connex goes offline, every payment continues uninterrupted. We add a coordination layer, and we never become a single point of failure for anyone's payment operations.</p>
            </div>
            <div className="cell">
              <span className="c-key">Legal Integrity</span>
              <h3>Built for Court</h3>
              <p>Our proof records are designed from the ground up to satisfy the admissibility requirements of the Kenyan Evidence Act. When a dispute reaches a regulator or a courtroom, the evidence holds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="section section--tight" aria-labelledby="location-h">
        <div className="wrap two-col">
          <div className="reveal">
            <span className="eyebrow">Where We Are</span>
            <h2 className="h2 display" id="location-h" style={{ marginTop: 22 }}>Kenya.</h2>
          </div>
          <div className="reveal" data-delay="1" style={{ alignSelf: 'end' }}>
            <p className="lead">We are based in Kenya. We are building for the Kenyan market first, because that is where we know the infrastructure, the institutions, the regulatory environment, and the real friction points in the payment system. Kenya is not a stepping stone. It is the starting point for building coordination infrastructure that scales across Africa.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="about-cta-h">
        <div className="wrap cta-final">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>Get Involved</span>
          <h2 className="h1 display reveal" id="about-cta-h" style={{ marginTop: 22 }}>We are building this now.</h2>
          <p className="lead reveal" data-delay="1">If you are a financial institution, regulator, or potential partner who wants to understand what we are building and why, reach out.</p>
          <div className="row reveal" data-delay="2" style={{ justifyContent: 'center', marginTop: 40 }}>
            <Link className="btn" to="/contact">Contact Us <span className="arrow">→</span></Link>
            <Link className="btn btn--ghost" to="/company/team">Meet the Team</Link>
          </div>
        </div>
      </section>
    </>
  );
}
