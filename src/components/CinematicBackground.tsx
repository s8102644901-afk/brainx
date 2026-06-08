import React, { useEffect, useRef, useState } from "react";

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Neural network state
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1.5,
      alpha: Math.random() * 0.5 + 0.3,
      colorPhase: Math.random() * 360,
    }));

    // Mouse interactive coordinates
    let mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Sine wave parameters for smooth cognitive flow waves
    let waveTime = 0;

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // --- 1. SMOOTH SINE WAVES (COGNITIVE RESIDUAL RESONANCE) ---
      waveTime += 0.003;
      ctx.save();
      
      // Top wave (indigo)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.03)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x <= width; x += 10) {
        const y = 200 + Math.sin(x * 0.002 + waveTime) * 45 + Math.cos(x * 0.004 - waveTime * 0.5) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Lower wave (violet)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(139, 92, 246, 0.02)";
      ctx.lineWidth = 1.2;
      for (let x = 0; x <= width; x += 10) {
        const y = height * 0.65 + Math.sin(x * 0.0015 - waveTime * 0.8) * 60 + Math.cos(x * 0.003 + waveTime) * 30;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      ctx.restore();

      // --- 2. NEURAL NETWORK DOTS & CONNECTIVE SYNAPSE LINES ---
      particles.forEach((p, index) => {
        // Apply physics
        p.x += p.vx;
        p.y += p.vy;

        // Wall rebound
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Gentle color phase cycle
        p.colorPhase += 0.2;

        // Interaction with mouse pointer
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            // Smooth magnetic drift towards mouse
            p.x += (dx / dist) * 0.15;
            p.y += (dy / dist) * 0.15;
          }
        }

        // Draw node dot
        ctx.beginPath();
        // Shift colors between indigo, violet and teal slightly
        const r = Math.floor(99 + Math.sin(p.colorPhase * 0.01) * 30);
        const g = Math.floor(102 + Math.sin(p.colorPhase * 0.015) * 50);
        const b = 241;
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.2)`;
        ctx.shadowBlur = p.radius * 2;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow for fast line drawing

        // Draw connective links
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if particles are close enough
          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.07;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. SOFT FUTURISTIC GRADIENT MESH BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#f5f7ff] via-white to-[#eef4ff]"></div>
      
      {/* Interstitial subtle blue-purple and pink ambient glow points */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-purple-500/4 blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[10%] w-[650px] h-[650px] rounded-full bg-indigo-400/4 blur-[110px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] rounded-full bg-pink-400/2 blur-[100px] pointer-events-none"></div>

      {/* 2. LIVE INTERACTIVE CANVAS (Neural Networks + Synapse drift) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* 3. SHINY GLASSMORPHISM ORBITAL DECORATORS */}
      <div className="absolute top-[15%] right-[5%] w-[450px] h-[450px] border border-indigo-500/[0.03] rounded-full flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] border border-indigo-500/[0.02] border-dashed rounded-full"></div>
        <div className="absolute w-[180px] h-[180px] border border-purple-500/[0.015] rounded-full animate-pulse"></div>
      </div>
      
      {/* Faint Grid Layout lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.008)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.6]"></div>
    </div>
  );
}
