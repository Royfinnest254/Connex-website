import { Link } from 'react-router-dom';
import NetBackground from '../../components/NetBackground';

export default function Banks() {
  return (
    <>
      <title>Connex for Banks | ISO 20022 Enrichment and Payment Proof | Connex Technologies</title>

      <section className="page-hero" aria-labelledby="banks-hero-h">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Solutions / Banks</span>
          <h1 id="banks-hero-h">For commercial<br />and retail banks.</h1>
          <p className="lead">Banks carry the highest compliance burden in the payment ecosystem. Connex gives your operations team the data completeness and evidence infrastructure they need, without changing how you move money.</p>
        </div>
      </section>

      <div style={{ display: 'flex', gap: 'clamp(6px,1vw,12px)', padding: 'clamp(20px,4vw,60px) var(--gutter)', maxWidth: 'var(--maxw)', margin: '0 auto', flexWrap: 'wrap' }}>
        <Link to="/solutions/banks" className="tabs" style={{ marginBottom: 0, display: 'inline-flex', flex: 'unset' }}>
          <a href="#" className="active" onClick={e => e.preventDefault()}>Banks</a>
        </Link>
        <Link to="/solutions/fintechs" className="tabs" style={{ marginBottom: 0, display: 'inline-flex', flex: 'unset' }}>
          <a href="#" onClick={e => e.preventDefault()}>Fintechs</a>
        </Link>
        <Link to="/solutions/regulators" className="tabs" style={{ marginBottom: 0, display: 'inline-flex', flex: 'unset' }}>
          <a href="#" onClick={e => e.preventDefault()}>Regulators</a>
        </Link>
      </div>

      <section className="section section--tight" aria-labelledby="banks-problem-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">The Problem for Banks</span>
            <h2 className="h2 display" id="banks-problem-h">Compliance gaps cost real money.</h2>
          </div>
          <div className="compare reveal">
            <div className="compare-col now">
              <div className="cc-label"><span className="mk" />Without Connex</div>
              <h3>Incomplete and Contested</h3>
              <p>Payment messages lose critical compliance fields when they cross system boundaries. Operations teams spend hours reconstructing data manually. Disputes with correspondent banks take weeks to resolve. Regulatory queries arrive with no neutral evidence to support your position.</p>
            </div>
            <div className="compare-col then">
              <div className="cc-label"><span className="mk" />With Connex</div>
              <h3>Complete and Verifiable</h3>
              <p>Every outgoing payment is automatically enriched to ISO 20022 standards before it leaves your network. Every cross-institutional handoff generates a tamper-evident proof record. When a dispute or regulatory query arrives, you retrieve the proof bundle in seconds, and the evidence is unambiguous.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="banks-value-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">What Banks Get</span>
            <h2 className="h2 display" id="banks-value-h">Built for your operations team.</h2>
          </div>
          <div className="grid-4 reveal">
            <div className="cell">
              <span className="c-key">ISO 20022 Compliance</span>
              <h3>Automatic Enrichment</h3>
              <p>Legacy payment messages are automatically transformed to include all required ISO 20022 data fields: no manual formatting, no compliance gaps, no exceptions.</p>
            </div>
            <div className="cell">
              <span className="c-key">Dispute Resolution</span>
              <h3>Evidence on Demand</h3>
              <p>Retrieve a cryptographically verified proof bundle for any cross-institutional transaction at any time. Correspondent bank disputes close in minutes, not weeks.</p>
            </div>
            <div className="cell">
              <span className="c-key">Non-Invasive Integration</span>
              <h3>Zero Disruption</h3>
              <p>Connex connects via a lightweight API alongside your existing core banking system. We observe the handoffs, and we never sit in the payment path or create a dependency.</p>
            </div>
            <div className="cell">
              <span className="c-key">Regulatory Readiness</span>
              <h3>Audit-Ready Records</h3>
              <p>Every proof record is designed to meet the Kenyan Evidence Act admissibility standard. When CBK or any regulator requests evidence of a transaction, you have it ready.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="banks-cta-h">
        <div className="wrap cta-final">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>For Banks</span>
          <h2 className="h1 display reveal" id="banks-cta-h" style={{ marginTop: 22 }}>Ready to close the compliance gap?</h2>
          <div className="row reveal" data-delay="1" style={{ justifyContent: 'center', marginTop: 40 }}>
            <Link className="btn" to="/contact">Request a Briefing <span className="arrow">→</span></Link>
            <Link className="btn btn--ghost" to="/product">See How It Works</Link>
          </div>
        </div>
      </section>
    </>
  );
}
