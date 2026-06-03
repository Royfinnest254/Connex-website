import NetBackground from '../../components/NetBackground';

export default function Terms() {
  return (
    <>
      <title>Terms of Use | Connex Technologies</title>

      <section className="page-hero" aria-labelledby="terms-hero-h">
        <NetBackground />
        <div className="wrap">
          <span className="eyebrow">Legal / Terms</span>
          <h1 id="terms-hero-h">Terms of Use</h1>
          <p className="lead">These terms govern your use of the Connex Technologies website at connextechnologies.org. Please read them. They are written in plain language.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="terms-content-h">
        <div className="wrap">
          <div className="legal-body reveal">
            <p className="muted" style={{ marginBottom: '2.5rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Last updated: June 2025</p>

            <div className="section-item">
              <h3>1. Who These Terms Apply To</h3>
              <p>These Terms of Use apply to anyone who accesses or uses the Connex Technologies website at connextechnologies.org. By using the website, you agree to these terms. If you do not agree, do not use the website. Separate agreements govern the use of Connex's institutional services; these terms apply to the website only.</p>
            </div>

            <div className="section-item">
              <h3>2. What the Website Is For</h3>
              <p>This website provides information about Connex Technologies, our payment coordination product, and how financial institutions can engage with us. It is a marketing and information website. Nothing on this website constitutes financial, legal, or investment advice. Any decisions you make based on information on this website are your own responsibility.</p>
            </div>

            <div className="section-item">
              <h3>3. Intellectual Property</h3>
              <p>All content on this website, including text, design, graphics, and code, is the property of Connex Technologies or its licensors. You may not reproduce, distribute, or create derivative works from any content on this website without our explicit written permission. You may share links to pages on this website freely.</p>
            </div>

            <div className="section-item">
              <h3>4. No Warranties</h3>
              <p>This website is provided on an as-is basis. We make reasonable efforts to ensure the information on this website is accurate and up to date, but we make no warranties about the completeness, reliability, or accuracy of any content. Product capabilities, pricing, availability, and roadmap items described on this website are subject to change.</p>
            </div>

            <div className="section-item">
              <h3>5. Limitation of Liability</h3>
              <p>To the maximum extent permitted by Kenyan law, Connex Technologies will not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website. Our total liability to you for any claim arising from your use of this website will not exceed the amount you have paid us in the twelve months preceding the claim, which in the case of a free website will be zero.</p>
            </div>

            <div className="section-item">
              <h3>6. Links to Other Websites</h3>
              <p>This website may contain links to external websites. We do not control those websites, and we are not responsible for their content or privacy practices. Linking to an external site does not constitute an endorsement.</p>
            </div>

            <div className="section-item">
              <h3>7. Governing Law</h3>
              <p>These terms are governed by the laws of Kenya. Any disputes arising from these terms or your use of this website will be subject to the jurisdiction of the Kenyan courts.</p>
            </div>

            <div className="section-item">
              <h3>8. Changes to These Terms</h3>
              <p>We may update these terms from time to time. When we do, we will update the date at the top of this page. Continued use of the website after a change constitutes acceptance of the updated terms.</p>
            </div>

            <div className="section-item">
              <h3>9. Contact</h3>
              <p>For any questions about these terms, contact us at info@connextechnologies.org.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
