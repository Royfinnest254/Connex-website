import { useState, useEffect, useRef } from 'react';

const SHORTCUTS = [
  { label: 'Who is Roy?', cmd: 'Tell me your story, Roy. How did you start Connex?' },
  { label: 'The Data Gap', cmd: 'Why are transaction data rails broken in Kenya?' },
  { label: 'The Proof Layer', cmd: 'How does Connex coordinate payments without touching the money?' },
  { label: 'Simulate Handoff', cmd: 'Simulate a payment handoff and dispute resolution.' }
];

const MOCK_RESPONSES = {
  'Tell me your story, Roy. How did you start Connex?': 
`I am a self-taught systems engineer based in Kenya, specializing in payment rails and distributed network infrastructure.

I founded Connex Technologies to solve the coordination gaps and data loss issues in East African payment networks. While consumer-facing money transfer loops move fast, our institutional backends are still disconnected and speak different legacy formats. When banks and telcos hand off transactions, critical metadata gets dropped and logs mismatch, causing frozen funds. I built Connex to be the neutral, cryptographic proof layer that resolves these bottlenecks.`,

  'Why are transaction data rails broken in Kenya?':
`When you send money from M-Pesa to a bank account, the transaction crosses two completely different core architectures. 

Because they speak different formats, legacy systems drop up to 35+ critical metadata fields (like structured sender/receiver addresses and purpose codes) in transition. The receiving bank gets the funds but loses the compliance context. That is the Data Gap. 

Furthermore, both institutions keep their own isolated databases. When logs disagree, there is no shared truth. Banks spend weeks cross-checking records manually. That is the Evidence Gap.`,

  'How does Connex coordinate payments without touching the money?':
`Connex operates alongside the transaction path, not in-line. This means if Connex goes offline, payments continue normally without interruption.

The core implementation is a lightweight Go Gateway coordinating 3 Go witness nodes (Alpha, Beta, Gamma on ports 8091-8093) with Ed25519 signatures. Data is enriched into compliant ISO 20022 XML (pacs.008.001.08) and consensus hashes are chained using SHA-256, then committed to an append-only SQLite ledger using database triggers to lock records. A standalone Python verifier using PyNaCl can verify these bundles independently. Performance reaches 250 to 500 TPS with P50 latency under 12 ms.`,

  'Simulate a payment handoff and dispute resolution.':
`CONNEX SYSTEM SIMULATION:

1. HANDOFF INITIATION
Transaction: KES 100,000 sent from Telco rail to Bank core.
Status: Legacy ISO 8583 translation drops 35+ fields.

2. ACTIVE ENRICHMENT & COORDINATION
Gateway parses transaction and enriches it to validated ISO 20022 XML (pacs.008.001.08).
Coordination Hash computed (SHA-256 of input + output + previous link).

3. CONSENSUS & LEDGER SECURING
Quorum verification requested from 3 independent witness nodes:
- Witness Alpha (Port 8091): SIGNED (Ed25519 signature valid)
- Witness Beta (Port 8092): SIGNED (Ed25519 signature valid)
- Witness Gamma (Port 8093): PENDING
Quorum established (2-of-3 signatures collected in 8 ms).
Proof bundle sealed to append-only SQLite ledger via BEFORE UPDATE and BEFORE DELETE trigger locks.

4. INSTANT RESOLUTION
Standalone Python verifier validates proof bundle. Bank verifies integrity and releases funds.
Dispute resolved in 8 ms.`
};

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Hi, I am Roy. Ask me anything about Connex, my story, or how we make transactions simple and certain in Kenya. No domain knowledge required.'
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

  // 1. Sleek 3-Node Consensus Orbit Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let angle = 0;

    function frame() {
      if (!canvas) return;
      ctx.clearRect(0, 0, 56, 56);
      
      // Interpolate mouse attraction coordinate shift
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.1;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.1;

      // Orbit center calculation with magnetic pull
      let cx = 28;
      let cy = 28;
      if (isHovered.current) {
        cx += mousePos.current.x * 0.16;
        cy += mousePos.current.y * 0.16;
      }

      angle += 0.02;

      // Draw Orbit Ring
      ctx.strokeStyle = isHovered.current ? 'rgba(192, 158, 90, 0.25)' : 'rgba(0, 134, 155, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 15, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Central Node (Gold)
      ctx.fillStyle = '#C09E5A';
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 3 Revolving Witness Nodes
      for (let i = 0; i < 3; i++) {
        const offsetAngle = angle + (i * Math.PI * 2) / 3;
        const nx = cx + Math.cos(offsetAngle) * 15;
        const ny = cy + Math.sin(offsetAngle) * 15;

        // Draw connections
        ctx.strokeStyle = isHovered.current ? 'rgba(192, 158, 90, 0.35)' : 'rgba(0, 134, 155, 0.3)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Draw node dot
        ctx.fillStyle = '#f2f1ec';
        ctx.beginPath();
        ctx.arc(nx, ny, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    frame();
    return () => cancelAnimationFrame(raf);
  }, []);

  // 2. Track mouse position relative to trigger button for magnetic warp
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

  // 3. Auto scroll to bottom
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, streamText, isOpen]);

  // 4. Typewriter stream simulator
  const streamResponse = (rawText) => {
    // Strip asterisks and replace em-dashes or en-dashes with standard hyphens/punctuation
    const fullText = rawText
      .replace(/\*/g, '')
      .replace(/—/g, ' - ')
      .replace(/–/g, '-');

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

  const getLocalFallbackReply = (text) => {
    const cleanText = text.trim();
    if (MOCK_RESPONSES[cleanText]) {
      return MOCK_RESPONSES[cleanText];
    }
    
    const query = cleanText.toLowerCase();

    // Priority 1: Founder details
    if (query.includes('story') || query.includes('roy') || query.includes('chumba') || query.includes('founder') || query.includes('who')) {
      return MOCK_RESPONSES['Tell me your story, Roy. How did you start Connex?'];
    }
    // Priority 2: Simulate/dispute
    if (query.includes('simulate') || query.includes('dispute') || query.includes('handoff')) {
      return MOCK_RESPONSES['Simulate a payment handoff and dispute resolution.'];
    }
    // Priority 3: Data gap
    if (query.includes('gap') || query.includes('data') || query.includes('broken') || query.includes('evidence')) {
      return MOCK_RESPONSES['Why are transaction data rails broken in Kenya?'];
    }
    // Priority 4: Proof / how it coordinates
    if (query.includes('how') || query.includes('work') || query.includes('coordinate') || query.includes('proof') || query.includes('money') || query.includes('touch')) {
      return MOCK_RESPONSES['How does Connex coordinate payments without touching the money?'];
    }

    return `Hi, I am Roy. You are running this website in a local development environment. 

To test, please click one of the quick shortcut buttons below to see simulations and briefings, or enter questions containing keywords like "Roy", "dispute", "gap", or "proof".`;
  };

  // 5. Send message payload
  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim() || isTyping || streamText) return;

    const userMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocal) {
      setTimeout(() => {
        const fallbackText = getLocalFallbackReply(textToSend);
        streamResponse(fallbackText);
      }, 500);
      return;
    }

    try {
      const history = messages
        .filter(m => m.content !== '')
        .map(m => ({ role: m.role, content: m.content }));
      
      history.push(userMsg);

      const res = await fetch('chat.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Please wait 3 seconds between messages.');
        }
        throw new Error('Server returned an error.');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      streamResponse(data.message || 'No response returned.');
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', content: `SYSTEM ERROR: ${err.message}` }]);
    }
  };

  return (
    <>
      {/* Floating Trigger Orb */}
      <button 
        ref={triggerRef}
        className="assistant-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask Roy a question"
        aria-expanded={isOpen}
      >
        <canvas ref={canvasRef} width="56" height="56" className="assistant-canvas" />
      </button>

      {/* Slide-out Terminal Console */}
      {isOpen && (
        <div className="assistant-console" role="dialog" aria-label="Ask Roy a Question">
          
          {/* Header */}
          <div className="assistant-header">
            <h3>ASK ROY A QUESTION</h3>
            <button className="assistant-close" onClick={() => setIsOpen(false)} aria-label="Close panel">
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
                Connecting...
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
                placeholder="Ask Roy a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping || !!streamText}
              />
              <button 
                type="submit" 
                className="assistant-submit"
                disabled={isTyping || !!streamText || !input.trim()}
              >
                SEND
              </button>
            </div>
          </form>

        </div>
      )}
    </>
  );
}
