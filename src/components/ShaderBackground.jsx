import React, { useEffect, useRef } from 'react';

const ShaderBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const drawGrid = () => {
      const gridSize = 100;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw dots at intersections
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawCoordinationLines = (t) => {
      ctx.lineWidth = 1;
      const nodes = 8;
      
      for (let i = 0; i < nodes; i++) {
        const x1 = (Math.sin(t * 0.2 + i) * 0.4 + 0.5) * canvas.width;
        const y1 = (Math.cos(t * 0.3 + i * 2) * 0.4 + 0.5) * canvas.height;
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + Math.sin(t + i) * 0.02})`;
        
        // Horizontal scan
        ctx.beginPath();
        ctx.moveTo(0, y1);
        ctx.lineTo(canvas.width, y1);
        ctx.stroke();

        // Vertical scan
        ctx.beginPath();
        ctx.moveTo(x1, 0);
        ctx.lineTo(x1, canvas.height);
        ctx.stroke();

        // Node circle
        ctx.beginPath();
        ctx.arc(x1, y1, 3, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
        
        // Coordination text (Hex)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.font = '10px JetBrains Mono';
        const hex = Math.floor(x1 + y1).toString(16).toUpperCase().padStart(4, '0');
        ctx.fillText(`0x${hex}`, x1 + 10, y1 - 10);
      }
    };

    const drawFlowPackets = (t) => {
      const packets = 5;
      for (let i = 0; i < packets; i++) {
        const progress = (t * 0.1 + i / packets) % 1;
        const x = progress * canvas.width;
        const y = (Math.sin(t * 0.5 + i) * 0.2 + 0.5) * canvas.height;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(x, y, 2, 2);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.moveTo(x - 50, y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background base
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawCoordinationLines(time);
      drawFlowPackets(time);

      // Add digital noise/grain
      const grainCount = 1000;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      for (let i = 0; i < grainCount; i++) {
        const gx = Math.random() * canvas.width;
        const gy = Math.random() * canvas.height;
        ctx.fillRect(gx, gy, 1, 1);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ShaderBackground;
