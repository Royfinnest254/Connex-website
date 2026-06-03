import { Link } from 'react-router-dom';
import NetBackground from '../../components/NetBackground';

export default function Careers() {
  return (
    <>
      <title>Careers at Connex Technologies | Join the Team Building African Payment Infrastructure</title>

      <section className="page-hero" aria-labelledby="careers-hero-h">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Company / Careers</span>
          <h1 id="careers-hero-h">Work on<br />infrastructure<br />that matters.</h1>
          <p className="lead">We are building the neutral coordination layer for African payments. If you want to work on a problem that is technically challenging, commercially real, and has genuine impact on how money moves across the continent, read on.</p>
        </div>
      </section>

      {/* WHAT WE ARE BUILDING */}
      <section className="section" aria-labelledby="what-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">What We Are Building</span>
            <h2 className="h2 display" id="what-h">A hard problem. A real solution.</h2>
          </div>
          <div className="two-col">
            <p className="lead reveal">Cross-institutional payment coordination is broken in Kenya and across Africa. Banks and fintechs lose critical data when payment messages cross system boundaries. When disputes arise, there is no neutral record. Connex is building the infrastructure that fixes both problems, without touching a single payment or becoming a dependency for anyone.</p>
            <p className="lead reveal" data-delay="1">This is early-stage work. It requires people who think clearly about distributed systems, cryptographic proof, financial regulation, and real institutional needs. We are small on purpose. Everyone who joins now shapes the architecture, the product, and the culture.</p>
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="section section--tight" aria-labelledby="roles-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Open Roles</span>
            <h2 className="h2 display" id="roles-h">Current openings.</h2>
          </div>
          <div className="steps">
            <div className="step reveal">
              <div className="step-num">01</div>
              <div>
                <span className="step-tag">Engineering</span>
                <h3>Backend Engineer</h3>
                <p>We need a backend engineer who is comfortable with cryptographic primitives, REST API design, and building systems that financial institutions connect to. You should be able to own a service end-to-end: design, build, test, deploy, and maintain it. Go, Rust, or Node.js. Kenya-based or willing to work closely across Kenyan time zones.</p>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">02</div>
              <div>
                <span className="step-tag">Legal &amp; Compliance</span>
                <h3>Financial Regulation Specialist</h3>
                <p>We are building proof infrastructure designed for Kenyan legal admissibility. We need someone who understands the Evidence Act, the CBK regulatory framework, and how payment data needs to be structured to hold up in regulatory and court proceedings. Legal qualification or equivalent practitioner experience required.</p>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">03</div>
              <div>
                <span className="step-tag">Partnerships</span>
                <h3>Institutional Partnerships Lead</h3>
                <p>We are establishing partnerships with the founding cohort of partner institutions. We need someone who can open and manage relationships with banks, fintechs, and regulatory bodies in Kenya, and who understands the payment ecosystem well enough to speak credibly to technical and executive audiences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section" aria-labelledby="culture-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">How We Work</span>
            <h2 className="h2 display" id="culture-h">Small. Focused. Direct.</h2>
          </div>
          <div className="grid-4 reveal">
            <div className="cell">
              <span className="c-key">Communication</span>
              <h3>Direct and Written</h3>
              <p>We say what we mean. We write things down. We do not have opinions about things we have not researched. If something is wrong, we say so clearly.</p>
            </div>
            <div className="cell">
              <span className="c-key">Scope</span>
              <h3>One Problem at a Time</h3>
              <p>We work on the thing that matters most right now. We do not add complexity for its own sake. Every feature must earn its place in the architecture.</p>
            </div>
            <div className="cell">
              <span className="c-key">Location</span>
              <h3>Kenya-First</h3>
              <p>We are based in Kenya. We build for the Kenyan market with Kenyan institutions. Remote collaboration is possible but Kenya-based is strongly preferred for the founding team.</p>
            </div>
            <div className="cell">
              <span className="c-key">Stage</span>
              <h3>Early Stage</h3>
              <p>This is a founding team role. Compensation includes equity. We are pre-revenue and focused entirely on building the right product and establishing the founding partner cohort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="careers-cta-h">
        <div className="wrap cta-final">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>Apply</span>
          <h2 className="h1 display reveal" id="careers-cta-h" style={{ marginTop: 22 }}>Tell us what you would build.</h2>
          <p className="lead reveal" data-delay="1">Send us a short note about the role you are interested in, what you have built, and why the Connex problem interests you. No formal application process. Just a direct conversation.</p>
          <div className="row reveal" data-delay="2" style={{ justifyContent: 'center', marginTop: 40 }}>
            <a className="btn" href="mailto:info@connextechnologies.org?subject=Application - Connex Technologies">Email Us to Apply <span className="arrow">→</span></a>
          </div>
        </div>
      </section>
    </>
  );
}
