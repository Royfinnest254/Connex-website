import NetBackground from '../../components/NetBackground';

export default function Privacy() {
  return (
    <>
      <title>Privacy Policy | Connex Technologies</title>

      <section className="page-hero" aria-labelledby="privacy-hero-h">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Legal / Privacy</span>
          <h1 id="privacy-hero-h">Privacy Policy</h1>
          <p className="lead">This policy explains what information Connex Technologies collects when you use this website, how we use it, and what your rights are. We collect the minimum necessary and we do not sell data to anyone.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="privacy-content-h">
        <div className="wrap">
          <div className="legal-body reveal">
            <p className="muted" style={{ marginBottom: '2.5rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Last updated: June 2025</p>

            <div className="section-item">
              <h3>1. Who We Are</h3>
              <p>Connex Technologies is a technology company based in Kenya. We build payment coordination infrastructure for financial institutions. Our contact email is info@connextechnologies.org.</p>
            </div>

            <div className="section-item">
              <h3>2. What We Collect on This Website</h3>
              <p>When you use this website, we may collect the following categories of information: information you submit through our contact or whitepaper request forms (your name, organisation, email address, and role); basic server log data such as your IP address, browser type, and pages visited; and any other information you voluntarily provide in a message to us. We do not use tracking cookies. We do not run third-party advertising scripts on this site.</p>
            </div>

            <div className="section-item">
              <h3>3. How We Use Your Information</h3>
              <p>We use the information you provide solely to respond to your inquiry, send you the document you requested, or follow up on a partnership or employment conversation. We do not add you to any marketing lists without your explicit consent. We do not share your personal information with third parties except where required by Kenyan law or necessary to provide our services (for example, an email service provider used to deliver a response to you).</p>
            </div>

            <div className="section-item">
              <h3>4. Operational Data</h3>
              <p>The Connex payment coordination product operates on a zero-knowledge principle: we do not store transaction amounts, account numbers, customer names, or personal financial data belonging to end customers of our institutional partners. Our proof bundles capture only the structural metadata of payment handoffs. This policy applies to the website only; our institutional data practices are governed by agreements with each partner institution.</p>
            </div>

            <div className="section-item">
              <h3>5. Data Retention</h3>
              <p>We retain contact form submissions and related correspondence for as long as reasonably necessary to manage the relevant business relationship. If you ask us to delete your information, we will do so unless retention is required by applicable law.</p>
            </div>

            <div className="section-item">
              <h3>6. Your Rights</h3>
              <p>You have the right to request access to the personal information we hold about you, to request correction of inaccurate information, and to request deletion of your information. To exercise any of these rights, email info@connextechnologies.org. We will respond within a reasonable time.</p>
            </div>

            <div className="section-item">
              <h3>7. Security</h3>
              <p>We take reasonable technical and organisational measures to protect the personal information we hold. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>
            </div>

            <div className="section-item">
              <h3>8. Changes to This Policy</h3>
              <p>We may update this policy from time to time. When we do, we will update the date at the top of this page. Continued use of this website after a change constitutes acceptance of the updated policy.</p>
            </div>

            <div className="section-item">
              <h3>9. Contact</h3>
              <p>For any privacy-related questions, contact us at info@connextechnologies.org.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
