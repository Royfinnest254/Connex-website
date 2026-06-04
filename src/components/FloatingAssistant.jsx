import { useState, useEffect, useRef } from 'react';

const SHORTCUTS = [
  { label: 'Simulate Dispute', cmd: 'Simulate a cross-institutional payment dispute resolution step by step.' },
  { label: 'The Handoff Gap', cmd: 'Explain the Data Gap vs the Evidence Gap in Kenyan payments.' },
  { label: 'Technical Setup', cmd: 'What is the technical architecture of Connex? Detail the Go, Python, and PostgreSQL stack.' },
  { label: 'About Roy', cmd: 'Tell me about the founder and CEO, Roy Chumba.' }
];

const MOCK_RESPONSES = {
  'Simulate a cross-institutional payment dispute resolution step by step.': 
`SIMULATING CROSS-INSTITUTIONAL DISPUTE RESOLUTION:

STEP 1: PAYMENT HANDOFF INITIATION
Sender sends KES 50,000 via M-Pesa to Equity Bank. The legacy rail processes the core transaction but drops recipient name and structured address metadata.

STEP 2: CORRELATION ALERT
Equity Bank's core system flags the transaction due to missing compliance fields. Funds are frozen. Manual logs are printed.

STEP 3: CONNEX COORDINATION QUERY
Compliance officer queries the Connex coordination layer using the unique transaction hash.

STEP 4: CRYPTOGRAPHIC PROOF VERIFICATION
Connex checks the 2-of-3 witness node consensus signatures (Ed25519) and SHA-256 parent hash chain.
- Witness Node A: VERIFIED (Signature matches)
- Witness Node B: VERIFIED (Signature matches)
- Witness Node C: VERIFIED (Signature matches)

STEP 5: RESOLUTION
The complete enriched ISO 20022 message metadata is retrieved from the secure database. The recipient address is verified. The bank releases the funds.

TOTAL ELAPSED TIME: 5.2 SECONDS (Compared to 5.2 weeks on legacy rails).`,

  'Explain the Data Gap vs the Evidence Gap in Kenyan payments.':
`THE COORDINATION GAP IN KENYAN PAYMENTS:

THE DATA GAP
When money moves between institutions (e.g. M-Pesa to KCB), legacy core systems running ISO 8583 format drop up to 35+ critical metadata fields (like structured sender/receiver addresses and purpose codes). The receiving institution gets an incomplete picture, forcing manual compliance investigations.

THE EVIDENCE GAP
No single party holds the independent, neutral record of the handoff. Both sending and receiving banks maintain separate databases. When logs disagree, there is no shared truth. Resolving disputes takes weeks of administrative overhead.

THE CONNEX SOLUTION
Connex resolves both gaps. We enrich the transaction message with missing metadata to achieve full ISO 20022 compliance, and we secure a cryptographically signed proof of the handoff witnessed by independent nodes.`,

  'What is the technical architecture of Connex? Detail the Go, Python, and PostgreSQL stack.':
`CONNEX SYSTEM ARCHITECTURE:

1. DATA ENRICHMENT LAYER (Local Python AI Microservices)
Uses local XGBoost models for purpose code classification and local DistilBERT engines for structured address parsing over secure Unix sockets (~2ms latency). Decoupled from the web to guarantee absolute user data privacy.

2. COORDINATION PROOF LAYER (Go Consensus Engine)
Performs sub-10ms signature verification using Ed25519 keys. Distributes hashes to three witness nodes. A 2-of-3 quorum consensus signature is collected in parallel via non-blocking Go channels.

3. AUDIT & DELIVERY LAYER (PostgreSQL Append-Only Storage)
Delivers compliant ISO 20022 XML messages to national rails (KEPSS/PesaLink) while appending the signed proof bundles to a PostgreSQL database protected by database-level immutable rules.`,

  'Tell me about the founder and CEO, Roy Chumba.':
`ABOUT THE FOUNDER:

Roy Chumba is a 19-year-old self-taught systems engineer based in Kenya. He is a three-time winner of the prestigious Kenya Science and Engineering Fair in Computer Science.

Roy founded Connex Technologies to build the neutral coordination proof layer for cross-institutional payment handoffs in East Africa. He also serves as the ICT Officer and Web Developer at Clean Heights Initiative, an environmental community organization in Kenya.`
};

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Welcome to Connex. I am your Virtual Briefing Assistant, powered by DeepSeek.\n\nSelect a preset shortcut below or ask any question to begin.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamText, setStreamText] = useState('');
  
  const canvasRef = useRef(null);
  const triggerRef = useRef(null);
  const messageEndRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isHovered = useRef(false);

  // 1. WebGL/Canvas Cryptographic Orb Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let angle = 0;

    const points = [];
    const numPoints = 24;
    // Pre-calculate 3D sphere points (3 rings)
    for (let i = 0; i < numPoints; i++) {
      const a = (i / numPoints) * Math.PI * 2;
      // Ring 1: XY plane
      points.push({ x: Math.cos(a) * 16, y: Math.sin(a) * 16, z: 0 });
      // Ring 2: YZ plane
      points.push({ x: 0, y: Math.cos(a) * 16, z: Math.sin(a) * 16 });
      // Ring 3: XZ plane
      points.push({ x: Math.cos(a) * 16, y: 0, z: Math.sin(a) * 16 });
    }

    function rotateX(p, theta) {
      const c = Math.cos(theta), s = Math.sin(theta);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    }

    function rotateY(p, theta) {
      const c = Math.cos(theta), s = Math.sin(theta);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    }

    function frame() {
      if (!canvas) return;
      ctx.clearRect(0, 0, 56, 56);
      
      // Interpolate mouse coordinates for smooth magnetic warping
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.1;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.1;

      // Base rotation speeds
      angle += 0.015;
      
      ctx.strokeStyle = isHovered.current ? '#C09E5A' : '#00869B';
      ctx.lineWidth = 1;

      // Project and draw rings
      const projected = points.map(p => {
        // Double axes rotation
        let pr = rotateX(p, angle);
        pr = rotateY(pr, angle * 0.6);
        
        // Apply magnetic warp toward mouse coordinates relative to center (28, 28)
        let cx = 28;
        let cy = 28;
        if (isHovered.current) {
          cx += mousePos.current.x * 0.14;
          cy += mousePos.current.y * 0.14;
        }

        // 3D to 2D projection
        const scale = 35 / (35 + pr.z);
        return {
          x: cx + pr.x * scale,
          y: cy + pr.y * scale
        };
      });

      // Draw lines between ring segments
      const step = numPoints;
      for (let ring = 0; ring < 3; ring++) {
        const offset = ring * step;
        ctx.beginPath();
        ctx.moveTo(projected[offset].x, projected[offset].y);
        for (let i = 1; i < step; i++) {
          ctx.lineTo(projected[offset + i].x, projected[offset + i].y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw small network nodes
      ctx.fillStyle = '#f2f1ec';
      projected.forEach((p, idx) => {
        if (idx % 4 === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      raf = requestAnimationFrame(frame);
    }

    frame();
    return () => cancelAnimationFrame(raf);
  }, []);

  // 2. Track global mouse positioning relative to trigger for attraction calculations
  useEffect(() => {
    const handleMouseMove = (e) => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const tx = rect.left + rect.width / 2;
      const ty = rect.top + rect.height / 2;
      
      const dx = e.clientX - tx;
      const dy = e.clientY - ty;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        isHovered.current = true;
        mousePos.current.targetX = dx;
        mousePos.current.targetY = dy;
      } else {
        isHovered.current = false;
        mousePos.current.targetX = 0;
        mousePos.current.targetY = 0;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Scroll container auto-sync
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, streamText, isOpen]);

  // 4. Typewriter printout simulator
  const streamResponse = (fullText) => {
    setIsTyping(false);
    let index = 0;
    setStreamText('');
    
    const charsPerStep = 4;
    const interval = setInterval(() => {
      if (index >= fullText.length) {
        clearInterval(interval);
        setMessages(prev => [...prev, { role: 'bot', content: fullText }]);
        setStreamText('');
      } else {
        const nextChunk = fullText.slice(index, index + charsPerStep);
        setStreamText(prev => prev + nextChunk);
        index += charsPerStep;
      }
    }, 10);
  };

  // Helper to handle local offline fallback matching
  const getLocalFallbackReply = (text) => {
    // Exact match check
    if (MOCK_RESPONSES[text]) {
      return MOCK_RESPONSES[text];
    }
    
    // Keyword match checks
    const query = text.toLowerCase();
    if (query.includes('dispute') || query.includes('simulate')) {
      return MOCK_RESPONSES['Simulate a cross-institutional payment dispute resolution step by step.'];
    }
    if (query.includes('gap') || query.includes('data') || query.includes('evidence')) {
      return MOCK_RESPONSES['Explain the Data Gap vs the Evidence Gap in Kenyan payments.'];
    }
    if (query.includes('architecture') || query.includes('tech') || query.includes('stack') || query.includes('go') || query.includes('python')) {
      return MOCK_RESPONSES['What is the technical architecture of Connex? Detail the Go, Python, and PostgreSQL stack.'];
    }
    if (query.includes('roy') || query.includes('chumba') || query.includes('founder') || query.includes('ceo')) {
      return MOCK_RESPONSES['Tell me about the founder and CEO, Roy Chumba.'];
    }

    return `DEVELOPMENT ENVIRONMENT ACTIVE:

This assistant is communicating locally. In production, cPanel proxies requests to the DeepSeek completions model securely via chat.php.

To verify layout and streaming text, please select one of the quick shortcuts below.`;
  };

  // 5. Send payload to php endpoint
  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim() || isTyping || streamText) return;

    const userMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Build message payload history
      const history = messages
        .filter(m => m.content !== '')
        .map(m => ({ role: m.role, content: m.content }));
      
      history.push(userMsg);

      // Relative path chat.php ensures correct subfolder routing
      const res = await fetch('chat.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });

      if (!res.ok) {
        throw new Error('API communication failure');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      streamResponse(data.message || 'No response returned.');
    } catch (err) {
      // Local development or server connection fallback
      setTimeout(() => {
        const fallbackText = getLocalFallbackReply(textToSend);
        streamResponse(fallbackText);
      }, 500);
    }
  };

  return (
    <>
      {/* Floating Trigger Orb */}
      <button 
        ref={triggerRef}
        className="assistant-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle briefing assistant"
        aria-expanded={isOpen}
      >
        <canvas ref={canvasRef} width="56" height="56" className="assistant-canvas" />
      </button>

      {/* Slide-out Terminal Console */}
      {isOpen && (
        <div className="assistant-console" role="dialog" aria-label="Connex Briefing Terminal">
          
          {/* Header */}
          <div className="assistant-header">
            <h3>CONNEX ASSISTANT</h3>
            <button className="assistant-close" onClick={() => setIsOpen(false)} aria-label="Close assistant">
              &#10005;
            </button>
          </div>

          {/* Messages */}
          <div className="assistant-messages">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`assistant-msg ${m.role === 'user' ? 'assistant-msg--user' : 'assistant-msg--bot'}`}
              >
                {m.content}
              </div>
            ))}
            {streamText && (
              <div className="assistant-msg assistant-msg--bot">
                {streamText}
              </div>
            )}
            {isTyping && (
              <div className="assistant-typing">
                SYSTEM: Connecting to DeepSeek...
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {/* Preset Shortcuts for Non-Technical Users */}
          <div className="assistant-shortcuts">
            {SHORTCUTS.map((s, idx) => (
              <button 
                key={idx}
                className="assistant-btn-shortcut"
                onClick={() => handleSendMessage(s.cmd)}
                disabled={isTyping || !!streamText}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form 
            className="assistant-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
          >
            <div className="assistant-input-row">
              <input 
                type="text"
                className="assistant-input"
                placeholder="Ask about architecture, data logs, etc..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping || !!streamText}
              />
              <button 
                type="submit" 
                className="btn assistant-submit"
                disabled={isTyping || !!streamText || !input.trim()}
              >
                SEND
              </button>
            </div>
            <div className="assistant-credits">Powered by DeepSeek AI</div>
          </form>

        </div>
      )}
    </>
  );
}
