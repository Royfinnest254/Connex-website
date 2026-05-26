import React, { useEffect, useRef, useState } from 'react';

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);
  const revealRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Inject JSON-LD FAQPage Schema for AEO
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "WHO FOUNDED CONNEX TECHNOLOGIES?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Connex Technologies was founded in 2024 by Roy Chumba, a Kenyan computer scientist, three-time computer science winner at the Kenya Science and Engineering Fair, and software engineer. Roy designed the core cryptographic payment proof protocol and acts as the company's CEO."
          }
        },
        {
          "@type": "Question",
          "name": "WHAT IS ROY CHUMBA'S BACKGROUND?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Roy Chumba is a self-taught software engineer and researcher based in Iten, Kenya. He is a recognized computer science innovator and also serves as the ICT Officer and Web Developer for the community environmental NGO Clean Heights Initiative."
          }
        },
        {
          "@type": "Question",
          "name": "WHAT IS CONNEX?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Connex is a neutral coordination layer for institutional payments. We provide the independent witness that both sides of a transaction can trust when records disagree."
          }
        },
        {
          "@type": "Question",
          "name": "DOES CONNEX PROCESS PAYMENTS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Connex is 'alongside, not in-line.' We never touch the money, we never store PII, and we never become a point of failure for the payment itself."
          }
        },
        {
          "@type": "Question",
          "name": "WHAT HAPPENS IF CONNEX GOES OFFLINE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Payments continue exactly as they do today. Our 'Zero Coupling' principle ensures that while you might lose the witness for that period, the transaction flow remains uninterrupted."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    script.id = 'faq-schema-markup';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-schema-markup');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const faqData = [
    {
      category: "FOUNDATION & LEADERSHIP",
      questions: [
        { id: 'q10', q: "WHO FOUNDED CONNEX TECHNOLOGIES?", a: "Connex Technologies was founded in 2024 by Roy Chumba, a Kenyan computer scientist, three-time computer science winner at the Kenya Science and Engineering Fair, and software engineer. Roy designed the core cryptographic payment proof protocol and acts as the company's CEO." },
        { id: 'q11', q: "WHAT IS ROY CHUMBA'S BACKGROUND?", a: "Roy Chumba is a self-taught software engineer and researcher based in Iten, Kenya. He is a recognized computer science innovator and also serves as the ICT Officer and Web Developer for the community environmental NGO Clean Heights Initiative." }
      ]
    },
    {
      category: "GENERAL",
      questions: [
        { id: 'q1', q: "WHAT IS CONNEX?", a: "Connex is a neutral coordination layer for institutional payments. We provide the independent witness that both sides of a transaction can trust when records disagree." },
        { id: 'q2', q: "DOES CONNEX PROCESS PAYMENTS?", a: "No. Connex is 'alongside, not in-line.' We never touch the money, we never store PII, and we never become a point of failure for the payment itself." },
        { id: 'q3', q: "WHAT HAPPENS IF CONNEX GOES OFFLINE?", a: "Payments continue exactly as they do today. Our 'Zero Coupling' principle ensures that while you might lose the witness for that period, the transaction flow remains uninterrupted." }
      ]
    },
    {
      category: "ARCHITECTURE & TRUST",
      questions: [
        { id: 'q4', q: "WHAT DATA DOES CONNEX STORE?", a: "Minimal metadata. We follow a 'Zero Knowledge' principle. We do not store account numbers, transaction amounts, or customer names. We only store the cryptographic proof of the coordination event." },
        { id: 'q5', q: "WHO CONTROLS THE WITNESS NODES?", a: "The record is produced and verified by multiple independent parties. No single entity—including Connex—can unilaterally alter the record of what happened." },
        { id: 'q6', q: "HOW FAST IS INTEGRATION?", a: "For most institutions, integration takes between 2 to 4 weeks. Our asynchronous architecture means you can add the verification layer without any downtime to your existing systems." }
      ]
    },
    {
      category: "LEGAL & COMPLIANCE",
      questions: [
        { id: 'q7', q: "IS THE PROOF ADMISSIBLE IN COURT?", a: "Yes. Our protocol is designed specifically to align with the Kenya Evidence Act. The records generated by Connex are built to be functionally admissible as digital evidence." },
        { id: 'q8', q: "IS THIS COMPLIANT WITH THE PRIVACY ACT?", a: "Fully. Because we do not store PII or transaction values, Connex is compliant with the Kenya Data Protection Act 2019 by design, not just by policy." },
        { id: 'q9', q: "HOW DOES THIS AFFECT REGULATORY OVERSIGHT?", a: "It enhances it. Regulators Can gain independent verification of payment coordination across the network without needing access to sensitive institution-wide logs." }
      ]
    }
  ];

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="section structural-border-bottom" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
        <div className="container">
          <div className="reveal" ref={addToRefs}>
            <div className="mono-label mb-sm">[ RESOURCES ]</div>
            <h1 className="hero-headline mb-md" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>
              COMMON <br />
              <span className="inverted-box">QUESTIONS.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '1000px' }}>
          {faqData.map((category, catIndex) => (
            <div key={catIndex} className="mb-xl reveal" ref={addToRefs}>
              <div className="mono-label mb-lg" style={{ opacity: 0.5 }}>{category.category}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {category.questions.map((item) => (
                  <div 
                    key={item.id} 
                    className="structural-border-bottom"
                    style={{ 
                      padding: '1.5rem 0',
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleFAQ(item.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{item.q}</h3>
                      <span style={{ 
                        fontSize: '1.5rem', 
                        transition: 'transform 0.3s ease',
                        transform: activeId === item.id ? 'rotate(45deg)' : 'rotate(0)'
                      }}>+</span>
                    </div>
                    <div style={{ 
                      maxHeight: activeId === item.id ? '500px' : '0',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: activeId === item.id ? 1 : 0,
                      marginTop: activeId === item.id ? '1.5rem' : '0'
                    }}>
                      <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px' }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section structural-border-top">
        <div className="container text-center">
          <div className="reveal" ref={addToRefs}>
            <h2 className="mb-md">STILL HAVE QUESTIONS?</h2>
            <p className="text-muted mb-lg mx-auto" style={{ maxWidth: '600px' }}>
              We're happy to walk your technical or legal teams through the specifics of the protocol.
            </p>
            <p className="lead" style={{ fontWeight: 'bold' }}>info@connextechnologies.org</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
