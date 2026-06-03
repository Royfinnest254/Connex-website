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
          <p className="lead">Connex is currently founder-led, designed to ensure neutral coordination for payments in Kenya. We represent a focused approach to resolving transaction data completeness and handoff proof.</p>
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
                <Link className="btn" to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="team-cta-h">
        <div className="wrap cta-final">
          <span className="eyebrow reveal" style={{ justifyContent: 'center' }}>Contact Us</span>
          <h2 className="h1 display reveal" id="team-cta-h" style={{ marginTop: 22 }}>Start the conversation.</h2>
          <p className="lead reveal" data-delay="1">If you represent an institution or want to request a technical briefing, get in touch.</p>
          <div className="row reveal" data-delay="2" style={{ justifyContent: 'center', marginTop: 40 }}>
            <Link className="btn" to="/contact">Request Briefing <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
