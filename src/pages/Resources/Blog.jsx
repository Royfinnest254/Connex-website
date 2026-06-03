import { Link } from 'react-router-dom';
import NetBackground from '../../components/NetBackground';

const POSTS = [
  {
    id: 1,
    tag: 'Explainer',
    title: 'The Coordination Gap: Why Cross-Institutional Payments Lose Data at the Border',
    excerpt: 'Every time a payment crosses from one institution to another in Kenya, it passes through a translation layer. What gets lost in that translation, and why it matters for compliance, dispute resolution, and the future of the payment system.',
    status: 'coming-soon',
  },
  {
    id: 2,
    tag: 'Technical',
    title: 'ISO 20022: What It Is, Why Kenya Is Behind, and What Enrichment Actually Means',
    excerpt: 'ISO 20022 is the global standard for financial messaging. Most Kenyan institutions still operate on legacy formats that drop fields ISO 20022 requires. This piece explains what those fields are, why they get dropped, and how enrichment reconstructs them.',
    status: 'coming-soon',
  },
  {
    id: 3,
    tag: 'Infrastructure',
    title: 'Neutral by Design: Why the Payment Witness Must Have Zero Stake in the Outcome',
    excerpt: 'The only way a cross-institutional proof system works is if the witness has no financial interest in the result. This is not a business decision: it is an architectural requirement. Here is why, and how we built Connex around it.',
    status: 'coming-soon',
  },
  {
    id: 4,
    tag: 'Legal',
    title: 'Admissibility: What the Kenyan Evidence Act Requires for Electronic Payment Records',
    excerpt: 'For a proof record to be useful in a dispute, it has to be admissible. This piece walks through the specific requirements of the Kenyan Evidence Act for electronic records, and how Connex proof bundles are designed to meet them.',
    status: 'coming-soon',
  },
  {
    id: 5,
    tag: 'Industry',
    title: 'The African Payment Infrastructure Gap: What Exists, What Is Missing, and Who Fills It',
    excerpt: 'A structured look at the current payment infrastructure landscape in Kenya and across Africa: what works, where the gaps are, and why a neutral coordination layer is the missing piece.',
    status: 'coming-soon',
  },
  {
    id: 6,
    tag: 'Perspective',
    title: 'Building in Kenya: Why Geography Is Not a Constraint in Infrastructure Work',
    excerpt: 'Connex is built in Kenya. The institutions we serve are in Nairobi and across the country. Here is why building in Kenya, not in spite of it, is a strategic advantage.',
    status: 'coming-soon',
  },
];

export default function Blog() {
  return (
    <>
      <title>Blog | Connex Technologies | Payment Infrastructure, ISO 20022, and African Fintech</title>

      <section className="page-hero" aria-labelledby="blog-hero-h">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Resources / Blog</span>
          <h1 id="blog-hero-h">Thinking on<br />payments and<br />infrastructure.</h1>
          <p className="lead">We write about the coordination gap in African payments, ISO 20022, cryptographic proof systems, Kenyan financial regulation, and the infrastructure that the continent's payment ecosystem is missing.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="posts-h">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Articles</span>
            <h2 className="h2 display" id="posts-h">Posts coming soon.</h2>
          </div>
          <p className="lead reveal" style={{ marginBottom: 'clamp(40px,7vh,80px)', maxWidth: '56ch' }}>We are currently in the founding cohort phase. These articles are written and will be published shortly. Subscribe or check back here.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))', gap: 'clamp(14px, 1.4vw, 22px)' }}>
            {POSTS.map((post, i) => (
              <div key={post.id} className="locked-card reveal" data-delay={i % 3}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{post.tag}</span>
                  <h3 style={{ fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 12, fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}>{post.title}</h3>
                  <p style={{ color: 'var(--ink-dim)', marginTop: 12, fontSize: '0.95rem', lineHeight: 1.55 }}>{post.excerpt}</p>
                </div>
                <span className="locked-tag">Publishing Soon</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(48px,8vh,90px)', display: 'flex', justifyContent: 'center' }}>
            <Link className="btn" to="/contact">Notify Me When Articles Publish <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
