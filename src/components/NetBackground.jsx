import { useEffect, useRef } from 'react';

export default function NetBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [], raf = null, t0 = performance.now();
    const isSmall = () => window.innerWidth < 720;

    function resize() {
      w = parent.clientWidth; h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }
    function build() {
      const density = isSmall() ? 0.00009 : 0.00013;
      const count = Math.max(14, Math.min(70, Math.round(w * h * density)));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16, r: Math.random() * 1.4 + 0.6, witness: false });
      }
      const wcount = isSmall() ? 1 : 2;
      for (let i = 0; i < wcount; i++) nodes[Math.floor(Math.random() * nodes.length)].witness = true;
    }
    const LINK = 138;
    function frame(now) {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const o = (1 - Math.sqrt(d2) / LINK) * 0.16;
            ctx.strokeStyle = (a.witness || b.witness) ? `rgba(242,241,236,${o * 1.7})` : `rgba(242,241,236,${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        if (!reduce) { n.x += n.vx; n.y += n.vy; }
        if (n.x < -10) n.x = w + 10; if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10; if (n.y > h + 10) n.y = -10;
        if (n.witness) {
          const pulse = 0.7 + Math.sin(t * 1.6 + n.x) * 0.3;
          ctx.fillStyle = `rgba(255,255,255,${pulse})`;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 1.4, 0, 7); ctx.fill();
          ctx.strokeStyle = `rgba(242,241,236,${pulse * 0.28})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 6 + Math.sin(t * 1.6 + n.x) * 3, 0, 7); ctx.stroke();
        } else {
          ctx.fillStyle = 'rgba(242,241,236,0.5)';
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 7); ctx.fill();
        }
      }
      raf = requestAnimationFrame(frame);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    raf = requestAnimationFrame(frame);
    const onVis = () => { if (document.hidden) { cancelAnimationFrame(raf); } else { t0 = performance.now(); raf = requestAnimationFrame(frame); } };
    document.addEventListener('visibilitychange', onVis);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  return <canvas ref={canvasRef} className="net-bg" aria-hidden="true" />;
}
