import React from "react";

export default function BrainHologram({ className = "w-full h-full" }) {
  return (
    <div className={`relative pointer-events-none select-none overflow-visible ${className} flex items-center justify-center`}>
      {/* Glow Backdrop Spotlights */}
      <div className="absolute w-[250px] h-[250px] rounded-full bg-indigo-500/10 blur-[80px] animate-pulse"></div>
      <div className="absolute w-[180px] h-[180px] rounded-full bg-amber-500/5 blur-[60px] animate-pulse" style={{ animationDelay: "2s" }}></div>

      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full max-w-[320px] transition-all duration-1000 animate-pulse-slow" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="holo-brain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="holo-wave" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#312E81" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <filter id="holo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Concentric Hologram Telemetry Rings with tech styling */}
        <circle cx="100" cy="100" r="85" stroke="url(#holo-brain-grad)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
        <circle cx="100" cy="100" r="72" stroke="#6366F1" strokeWidth="0.25" opacity="0.3" />
        <circle cx="100" cy="100" r="60" stroke="#F59E0B" strokeWidth="0.5" strokeDasharray="12 4 2 4" className="animate-spin" style={{ transformOrigin: "100px 100px", animationDuration: "25s" }} opacity="0.4" />
        
        {/* 2. Abstract Brain Lobes represented as highly accurate circuit clusters & waveforms */}
        {/* Left Hemisphere (Logical, AI-Era Coding, Analytical) */}
        <g opacity="0.85">
          {/* Outer Boundary Node paths */}
          <path 
            d="M 100,50 C 65,50 50,65 50,100 C 50,135 65,150 100,150 C 95,130 90,110 95,100 C 90,90 95,70 100,50" 
            stroke="url(#holo-brain-grad)" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            className="animate-pulse"
          />
          {/* Synaptic Inner Links */}
          <line x1="100" y1="50" x2="80" y2="70" stroke="#6366F1" strokeWidth="0.75" />
          <line x1="80" y1="70" x2="65" y2="90" stroke="#6366F1" strokeWidth="0.5" />
          <line x1="65" y1="90" x2="85" y2="105" stroke="#6366F1" strokeWidth="0.75" />
          <line x1="85" y1="105" x2="100" y2="100" stroke="#6366F1" strokeWidth="1" />
          <line x1="85" y1="105" x2="70" y2="125" stroke="#6366F1" strokeWidth="0.5" />
          <line x1="70" y1="125" x2="100" y2="150" stroke="#6366F1" strokeWidth="0.75" />

          {/* Active Synapse Nodes */}
          <circle cx="80" cy="70" r="2.5" fill="#8B5CF6" filter="url(#holo-glow)" className="animate-ping" style={{ animationDuration: "3s" }} />
          <circle cx="85" cy="105" r="3" fill="#6366F1" />
          <circle cx="65" cy="90" r="2" fill="#8B5CF6" />
          <circle cx="70" cy="125" r="2.5" fill="#3B82F6" />
        </g>

        {/* Right Hemisphere (Creative, Emotional, Intuitive Synthesis, Values) */}
        <g opacity="0.85">
          {/* Outer Boundary Node paths */}
          <path 
            d="M 100,50 C 135,50 150,65 150,100 C 150,135 135,150 100,150 C 105,130 110,110 105,100 C 110,90 105,70 100,50" 
            stroke="url(#holo-brain-grad)" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
          {/* Synaptic Inner Links */}
          <line x1="100" y1="65" x2="120" y2="78" stroke="#F59E0B" strokeWidth="0.75" />
          <line x1="120" y1="78" x2="135" y2="95" stroke="#F59E0B" strokeWidth="0.5" />
          <line x1="135" y1="95" x2="115" y2="115" stroke="#F59E0B" strokeWidth="0.75" />
          <line x1="115" y1="115" x2="100" y2="110" stroke="#F59E0B" strokeWidth="1" />
          <line x1="115" y1="115" x2="130" y2="135" stroke="#F59E0B" strokeWidth="0.5" />
          <line x1="130" y1="135" x2="100" y2="150" stroke="#F59E0B" strokeWidth="0.75" />

          {/* Active Synapse Nodes */}
          <circle cx="120" cy="78" r="3" fill="#F59E0B" />
          <circle cx="115" cy="115" r="2.5" fill="#EA580C" filter="url(#holo-glow)" className="animate-ping" style={{ animationDuration: "4s" }} />
          <circle cx="135" cy="95" r="2.5" fill="#F59E0B" />
          <circle cx="130" cy="135" r="2" fill="#D97706" />
        </g>

        {/* Central Core: Centre Brain (Diencephalon) Gate / Sensory Activation portal */}
        <circle cx="100" cy="100" r="7" fill="#F59E0B" filter="url(#holo-glow)" className="animate-pulse" />
        <circle cx="100" cy="100" r="12" stroke="#10B981" strokeWidth="1" strokeDasharray="3 2" className="animate-spin" style={{ transformOrigin: "100px 100px", animationDuration: "10s" }} />

        {/* 3. Grid coordinates system representing Howard Gardner Multiple Intelligences */}
        <text x="52" y="44" fill="#6366F1" fontSize="5" fontFamily="monospace" opacity="0.6">MATH [IQ]</text>
        <text x="116" y="44" fill="#F59E0B" fontSize="5" fontFamily="monospace" opacity="0.6">SPATIAL [EQ]</text>
        <text x="25" y="102" fill="#8B5CF6" fontSize="5" fontFamily="monospace" opacity="0.6">KINESTHETIC</text>
        <text x="148" y="102" fill="#D97706" fontSize="5" fontFamily="monospace" opacity="0.6">LINGUISTIC</text>
        <text x="50" y="165" fill="#10B981" fontSize="5" fontFamily="monospace" opacity="0.6">MORAL VALUE</text>
        <text x="116" y="165" fill="#3B82F6" fontSize="5" fontFamily="monospace" opacity="0.6">INTRAPERSONAL</text>

        {/* Faint HUD crosshair markers */}
        <line x1="100" y1="20" x2="100" y2="35" stroke="url(#holo-brain-grad)" strokeWidth="0.5" opacity="0.3" />
        <line x1="100" y1="165" x2="100" y2="180" stroke="url(#holo-brain-grad)" strokeWidth="0.5" opacity="0.3" />
        <line x1="20" y1="100" x2="35" y2="100" stroke="url(#holo-brain-grad)" strokeWidth="0.5" opacity="0.3" />
        <line x1="165" y1="100" x2="180" y2="100" stroke="url(#holo-brain-grad)" strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  );
}
