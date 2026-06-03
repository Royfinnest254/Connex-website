import { Link } from 'react-router-dom';
import NetBackground from '../../components/NetBackground';

export default function Fintechs() {
  return (
    <>
      <title>Connex for Fintechs | Verified Payment Infrastructure | Connex Technologies</title>

      <section className="page-hero" aria-labelledby="fintechs-hero-h">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Solutions / Fintechs</span>
          <h1 id="fintechs-hero-h">For payment<br />fintechs.</h1>
          <p className="lead">Fintechs move fast. But when your transactions hand off to commercial banks, you lose visibility, data completeness, and, when disputes arise, you have no neutral record. Connex solves all three.</p>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="fintechs-value-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">What Fintechs Get</span>
            <h2 className="h2 display" id="fintechs-value-h">The infrastructure that makes you credible.</h2>
          </div>
          <div className="grid-4 reveal">
            <div className="cell">
              <span className="c-key">Institutional Trust</span>
              <h3>Verified Handoffs</h3>
              <p>Every transaction you hand off to a partner bank generates a tamper-evident proof record. When disputes arise, you are not arguing from your own logs, because you have independent evidence.</p>
            </div>
            <div className="cell">
              <span className="c-key">Compliance Infrastructure</span>
              <h3>ISO 20022 Ready</h3>
              <p>Automatically enrich your outgoing payment messages to meet ISO 20022 standards, the format increasingly required by commercial banks and regulators for cross-institutional transfers.</p>
            </div>
            <div className="cell">
              <span className="c-key">Fast Resolution</span>
              <h3>No More Waiting</h3>
              <p>Payment disputes with partner banks that used to take days or weeks of email chains now resolve in minutes. The proof bundle shows exactly what your system sent and when.</p>
            </div>
            <div className="cell">
              <span className="c-key">Simple Integration</span>
              <h3>API-First</h3>
              <p>Connect via a single API endpoint. No infrastructure overhaul. No changes to your payment logic. Connex observes the handoffs and does the rest, allowing you to keep moving fast.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="fintechs-cta-h">
        <div className="wrap cta-final">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>For Fintechs</span>
          <h2 className="h1 display reveal" id="fintechs-cta-h" style={{ marginTop: 22 }}>Build on verified payment infrastructure.</h2>
          <div className="row reveal" data-delay="1" style={{ justifyContent: 'center', marginTop: 40 }}>
            <Link className="btn" to="/contact">Get Access <span className="arrow">→</span></Link>
            <Link className="btn btn--ghost" to="/product">See How It Works</Link>
          </div>
        </div>
      </section>
    </>
  );
}
