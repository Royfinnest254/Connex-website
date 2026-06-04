import { useState, useEffect, useRef } from 'react';

const SHORTCUTS = [
  { label: "Explain like I'm 5", cmd: 'How does Connex work? Explain like I am 5.' },
  { label: 'What is your story?', cmd: 'Tell me your story, Roy. How did you start Connex?' },
  { label: 'Why does Kenya need this?', cmd: 'Why does Kenya need this? How does it help ordinary people?' },
  { label: 'Simulate a payment', cmd: 'Show me a simple, visual simulation of a payment handoff.' }
];

const MOCK_RESPONSES = {
  'How does Connex work? Explain like I am 5.': 
`Imagine sending a letter in the mail. Before delivering it, the mailman tears off the sender's name and the receiver's address. The person getting the letter has to guess who sent it. That is what legacy bank systems do to transactions—they drop important data. 

Connex is like a plastic sleeve that keeps the envelope complete. 

Also, if the banks argue about whether money was sent, Connex acts as a neutral referee. We write down a digital proof of the transfer on a shared board so there are zero arguments and payment disputes resolve in seconds.`,

  'Tell me your story, Roy. How did you start Connex?':
`I am 19, self-taught, and based in Kenya. I won the Kenya Science and Engineering Fair in Computer Science three times. 

I built Connex because payment systems between banks are constantly dropping data and causing delays. I wanted to build a neutral coordination layer—an independent referee—that makes sure transactions are complete and certain for everyone in East Africa.`,

  'Why does Kenya need this? How does it help ordinary people?':
`When you send money from one financial service to another (like M-Pesa to a bank account), details are often lost or delayed due to incompatible system structures. If there is a dispute, your funds can get frozen for weeks.

Connex keeps the transfer data complete and proves the transaction happened instantly. For ordinary people, this means money moves safely, errors are fixed instantly, and transactions never get stuck in validation limbo.`,

  'Show me a simple, visual simulation of a payment handoff.':
`SIMULATING PAYMENT RESOLUTION:

STEP 1: SENDER INITIATES
You send KES 5,000 from Service A to Bank B. The traditional network drops your name and address code.

STEP 2: CORRELATION ALERT
Bank B's computer flags the incoming transfer as incomplete and freezes the money.

STEP 3: CONNEX VERIFICATION
Connex queries our three independent observer computers. Two of the three confirm they witnessed the transfer and sign their agreement.

STEP 4: INSTANT RESOLUTION
The missing name and address details are restored from the secure coordination record. Bank B releases your funds.

TOTAL TIME: 5.2 seconds (Instead of weeks of manual verification).`
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

  const getLocalFallbackReply = (text) => {
    if (MOCK_RESPONSES[text]) {
      return MOCK_RESPONSES[text];
    }
    
    const query = text.toLowerCase();
    if (query.includes('how') || query.includes('work') || query.includes('explain')) {
      return MOCK_RESPONSES['How does Connex work? Explain like I am 5.'];
    }
    if (query.includes('story') || query.includes('roy') || query.includes('chumba') || query.includes('founder') || query.includes('who')) {
      return MOCK_RESPONSES['Tell me your story, Roy. How did you start Connex?'];
    }
    if (query.includes('kenya') || query.includes('need') || query.includes('ordinary') || query.includes('help')) {
      return MOCK_RESPONSES['Why does Kenya need this? How does it help ordinary people?'];
    }
    if (query.includes('simulate') || query.includes('dispute') || query.includes('payment') || query.includes('handoff')) {
      return MOCK_RESPONSES['Show me a simple, visual simulation of a payment handoff.'];
    }

    return `I am currently in development mode. In production, your Namecheap server queries the DeepSeek-V3 API securely.

Please select a quick shortcut button below to test a live payment simulation or explain the system using analogies.`;
  };

  // 5. Send message payload
  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim() || isTyping || streamText) return;

    const userMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

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
        throw new Error('API communication failure');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      streamResponse(data.message || 'No response returned.');
    } catch (err) {
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
