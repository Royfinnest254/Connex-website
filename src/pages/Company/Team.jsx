import { Link } from 'react-router-dom';
import NetBackground from '../../components/NetBackground';
import royImage from '../../assets/images/roy.png';

export default function Team() {
  return (
    <>
      <title>Team | Connex Technologies | Founded by Roy Chumba</title>

      <section className="page-hero" aria-labelledby="team-hero-h">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Company / Team</span>
          <h1 id="team-hero-h">The people<br />building Connex.</h1>
          <p className="lead">Connex is currently founder-led. We are in the process of building the core team. If you are an engineer, legal expert, or payments specialist who wants to work on infrastructure that matters, we want to hear from you.</p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section" aria-labelledby="founder-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Founder</span>
            <h2 className="h2 display" id="founder-h">Roy Chumba</h2>
          </div>
          <div className="founder reveal">
            <div className="founder-photo">
              <img src={royImage} alt="Roy Chumba, Founder and CEO of Connex Technologies" />
              <span className="ph-tag">Founder &amp; CEO</span>
            </div>
            <div>
              <span className="role">Founder &amp; CEO</span>
              <h2 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.95, margin: '14px 0 22px' }}>Roy Chumba</h2>
              <p className="muted">Roy Chumba is the founder and CEO of Connex Technologies, based in Kenya. He identified the coordination gap in Kenya's cross-institutional payment system through direct research into how payment data is lost and disputed in the space between institutions.</p>
              <p className="muted" style={{ marginTop: 16 }}>Roy is a three-time winner of the Kenya Science and Engineering Fair in Computer Science. He is also ICT Officer and Web Developer at Clean Heights Initiative, a community environmental organisation. He is building Connex while based in Kenya, for Kenya.</p>
              <p className="muted" style={{ marginTop: 16 }}>Connex is his primary focus. The problem is real. The infrastructure does not yet exist. He is building it.</p>
              <div className="row" style={{ marginTop: 28 }}>
                <Link className="btn" to="/contact">Work With Us</Link>
                <Link className="btn btn--ghost" to="/company/careers">Open Roles</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILDING THE TEAM */}
      <section className="section section--tight" aria-labelledby="hiring-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">We Are Hiring</span>
            <h2 className="h2 display" id="hiring-h">Building the core team now.</h2>
          </div>
          <div className="grid-2 reveal">
            <div className="cell">
              <span className="c-key">Engineering</span>
              <h3>Systems &amp; Backend</h3>
              <p>We are looking for engineers who want to build cryptographic infrastructure, payment API integrations, and distributed systems that financial institutions actually depend on. Go, Rust, or Node.js background preferred.</p>
            </div>
            <div className="cell">
              <span className="c-key">Legal &amp; Compliance</span>
              <h3>Financial Law</h3>
              <p>We need someone who understands Kenyan financial regulation, the Evidence Act, and the CBK regulatory framework, and who wants to help build the legal architecture of a neutral payment witness system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="team-cta-h">
        <div className="wrap cta-final">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>Join Us</span>
          <h2 className="h1 display reveal" id="team-cta-h" style={{ marginTop: 22 }}>Want to build this?</h2>
          <p className="lead reveal" data-delay="1">We are a small, focused team building infrastructure that the African payment system does not yet have. If that matters to you, reach out.</p>
          <div className="row reveal" data-delay="2" style={{ justifyContent: 'center', marginTop: 40 }}>
            <Link className="btn" to="/company/careers">See Open Roles <span className="arrow">→</span></Link>
            <Link className="btn btn--ghost" to="/contact">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
