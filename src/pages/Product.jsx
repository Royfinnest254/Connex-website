import { Link } from 'react-router-dom';
import NetBackground from '../components/NetBackground';

export default function Product() {
  return (
    <>
      <title>How Connex Works | Payment Coordination Layer | Connex Technologies</title>

      <section className="page-hero" aria-labelledby="product-hero-heading">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Architecture</span>
          <h1 id="product-hero-heading">Alongside,<br />not in-line.</h1>
          <p className="lead">Your existing payment systems stay exactly as they are. Connex adds a verification layer that watches the handoffs, fills the data gaps, and keeps the permanent record - without touching a single transaction.</p>
        </div>
      </section>

      {/* ========== THE GAP ========== */}
      <section className="section" aria-labelledby="gap-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">The Coordination Gap</span>
            <h2 className="h2 display" id="gap-h">The space between institutions.</h2>
          </div>
          <div className="two-col">
            <p className="lead reveal">When Institution A sends money and Institution B receives it, both maintain their own separate records. When those records disagree, there is no shared log. No neutral party who witnessed what happened. Every institution has its own version of the truth, and every institution has a financial interest in the outcome.</p>
            <p className="lead reveal" data-delay="1">That is the coordination gap. It exists in every market where multiple institutions move money between each other. It cannot be solved by any participant in the payment network, because every participant has a stake in the result.</p>
          </div>
        </div>
      </section>

      {/* ========== DATA MATRIX ========== */}
      <section className="section section--tight" aria-labelledby="matrix-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Data Completeness</span>
            <h2 className="h2 display" id="matrix-h">What survives the handoff.</h2>
          </div>
          <div className="matrix-scroll reveal">
            <table className="matrix">
              <thead>
                <tr><th>Data Field</th><th>Legacy Payment Rail</th><th>Connex Gateway</th><th>Evidence Status</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th>Creditor Address (Structured)</th>
                  <td><span className="tag tag--fail">Dropped</span><span className="cell-note">Lost at handoff</span></td>
                  <td><span className="tag">Enriched</span><span className="cell-note">CBK codebook lookup</span></td>
                  <td><span className="tag tag--ok">Verified</span></td>
                </tr>
                <tr>
                  <th>Transaction Purpose Code</th>
                  <td><span className="tag tag--fail">Missing</span><span className="cell-note">Absent in legacy formats</span></td>
                  <td><span className="tag">Enriched</span><span className="cell-note">Classification engine</span></td>
                  <td><span className="tag tag--ok">Verified</span></td>
                </tr>
                <tr>
                  <th>End-to-End Reference ID</th>
                  <td><span className="tag tag--fail">Truncated</span><span className="cell-note">Cut to 12 characters</span></td>
                  <td><span className="tag">Preserved</span><span className="cell-note">Full 36-char reference</span></td>
                  <td><span className="tag tag--ok">Verified</span></td>
                </tr>
                <tr>
                  <th>Cryptographic Handoff Proof</th>
                  <td><span className="tag tag--fail">None</span><span className="cell-note">No neutral record exists</span></td>
                  <td><span className="tag">Witnessed</span><span className="cell-note">Multi-node consensus</span></td>
                  <td><span className="tag tag--ok">Verified</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== 4-STEP PROCESS ========== */}
      <section className="section" id="process" aria-labelledby="process-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">How It Works</span>
            <h2 className="h2 display" id="process-h">Capture. Enrich. Prove. Resolve.</h2>
          </div>
          <div className="steps">
            <div className="step reveal">
              <div className="step-num">01</div>
              <div>
                <span className="step-tag">Capture</span>
                <h3>Connect, without disruption.</h3>
                <p>Institutions connect via a lightweight, non-invasive API. Connex captures payment events in real time as money moves across institutional boundaries, without sitting in the transaction path and without any risk to payment operations.</p>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">02</div>
              <div>
                <span className="step-tag">Enrich</span>
                <h3>Fill in what was dropped.</h3>
                <p>Our enrichment engine reconstructs missing compliance fields, purpose codes, and structured address data, assembling a fully compliant ISO 20022 message from what the legacy system sent, even when critical fields were absent.</p>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">03</div>
              <div>
                <span className="step-tag">Prove</span>
                <h3>Witness the handoff.</h3>
                <p>Independent witness nodes observe the payment handoff and generate a tamper-evident proof bundle. No single institution controls this record. The proof is signed, timestamped, and immutable, ready for dispute resolution or regulatory review.</p>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">04</div>
              <div>
                <span className="step-tag">Resolve</span>
                <h3>Minutes, not weeks.</h3>
                <p>When a discrepancy occurs, any authorised party retrieves the proof bundle. The record shows exactly what was sent, what was received, and when, with cryptographic certainty. Disputes that took weeks can now be resolved in minutes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRINCIPLES ========== */}
      <section className="section section--tight" id="principles" aria-labelledby="principles-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">What We Believe</span>
            <h2 className="h2 display" id="principles-h">Four constraints we never break.</h2>
          </div>
          <div className="grid-4 reveal">
            <div className="cell">
              <span className="c-key">Constraint 01</span>
              <h3>Zero Coupling</h3>
              <p>If Connex goes offline, every payment continues without interruption. We add a layer. We never become a dependency that can block money movement.</p>
            </div>
            <div className="cell">
              <span className="c-key">Constraint 02</span>
              <h3>Zero Knowledge</h3>
              <p>We do not store what we do not need. No transaction amounts. No account numbers. No customer names. Only the structural proof that the handoff happened.</p>
            </div>
            <div className="cell">
              <span className="c-key">Constraint 03</span>
              <h3>Zero Stake</h3>
              <p>We have no financial interest in any payment outcome. The witness must be completely neutral, or the evidence it produces means nothing in a dispute.</p>
            </div>
            <div className="cell">
              <span className="c-key">Constraint 04</span>
              <h3>Verify, Don't Trust</h3>
              <p>You do not need to take Connex's word for anything. Every proof can be independently verified by any authorised party using standard cryptographic methods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="section" aria-labelledby="product-cta-h">
        <div className="wrap cta-final">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>Founding Cohort</span>
          <h2 className="h1 display reveal" id="product-cta-h" style={{ marginTop: 22 }}>See the architecture in a live briefing.</h2>
          <p className="lead reveal" data-delay="1">We walk through the full technical architecture, answer your specific integration questions, and show you exactly how Connex connects to your existing systems.</p>
          <div className="row reveal" data-delay="2" style={{ justifyContent: 'center', marginTop: 40 }}>
            <Link className="btn" to="/contact">Request a Briefing <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
