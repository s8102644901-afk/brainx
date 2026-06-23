import React, { useState, useEffect } from "react";
import { 
  Cpu, 
  BookOpen, 
  Image as ImageIcon, 
  Music, 
  Zap, 
  Users, 
  Brain, 
  TreePine, 
  Sparkles, 
  Lock, 
  Compass, 
  TrendingUp, 
  Award,
  ChevronRight
} from "lucide-react";

interface IntelligenceFactor {
  key: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  textColor: string;
  glowColor: string;
}

const FACTORS: IntelligenceFactor[] = [
  { 
    key: "logical", 
    label: "Logical / Mathematical", 
    description: "Algorithmic thinking, pattern-solving, coding aptitude.",
    icon: Cpu, 
    color: "bg-indigo-500", 
    textColor: "text-indigo-600",
    glowColor: "rgba(79, 70, 229, 0.4)"
  },
  { 
    key: "linguistic", 
    label: "Linguistic / Verbal", 
    description: "Phonetic recall, emotional dialogue, narrative synthesis.",
    icon: BookOpen, 
    color: "bg-blue-500", 
    textColor: "text-blue-600",
    glowColor: "rgba(59, 130, 246, 0.4)"
  },
  { 
    key: "spatial", 
    label: "Visual / Spatial", 
    description: "Mental rotations, geometry, high spatial synesthesia.",
    icon: ImageIcon, 
    color: "bg-purple-500", 
    textColor: "text-purple-600",
    glowColor: "rgba(139, 92, 246, 0.4)"
  },
  { 
    key: "musical", 
    label: "Musical / Harmonic", 
    description: "Auditory resonance, pitch sensitivity, acoustic focus.",
    icon: Music, 
    color: "bg-rose-500", 
    textColor: "text-rose-600",
    glowColor: "rgba(244, 63, 94, 0.4)"
  },
  { 
    key: "kinesthetic", 
    label: "Bodily / Kinesthetic", 
    description: "Tactile dexterity, micro-motor response, kinetic memory.",
    icon: Zap, 
    color: "bg-amber-500", 
    textColor: "text-amber-600",
    glowColor: "rgba(245, 158, 11, 0.4)"
  },
  { 
    key: "interpersonal", 
    label: "Interpersonal / Social", 
    description: "Empathy, leadership structures, collaborative persuasion.",
    icon: Users, 
    color: "bg-emerald-500", 
    textColor: "text-emerald-600",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  { 
    key: "intrapersonal", 
    label: "Intrapersonal / Reflective", 
    description: "Self-governance, honesty index, contemplative focus.",
    icon: Brain, 
    color: "bg-sky-500", 
    textColor: "text-sky-600",
    glowColor: "rgba(56, 189, 248, 0.4)"
  },
  { 
    key: "naturalistic", 
    label: "Naturalistic / Organic", 
    description: "Taxonomy classification, environmental adaptation.",
    icon: TreePine, 
    color: "bg-teal-500", 
    textColor: "text-teal-600",
    glowColor: "rgba(20, 184, 166, 0.4)"
  },
];

export default function BiometricInteractiveDashboard() {
  const [ratings, setRatings] = useState<Record<string, number>>({
    logical: 65,
    linguistic: 55,
    spatial: 70,
    musical: 45,
    kinesthetic: 60,
    interpersonal: 80,
    intrapersonal: 75,
    naturalistic: 50,
  });

  const [highestFactor, setHighestFactor] = useState<IntelligenceFactor>(FACTORS[0]);
  const [attentionIndex, setAttentionIndex] = useState<number>(0);
  const [sovereigntyIndex, setSovereigntyIndex] = useState<number>(0);

  // Recalculate indicators dynamically when custom parent ratings shift
  useEffect(() => {
    // Determine highest rated factor
    let maxVal = -1;
    let maxF = FACTORS[0];
    FACTORS.forEach((f) => {
      if (ratings[f.key] > maxVal) {
        maxVal = ratings[f.key];
        maxF = f;
      }
    });
    setHighestFactor(maxF);

    // Dynamic attention safety calculation
    const calculatedAttention = Math.round(
      (ratings.intrapersonal * 0.4) + (ratings.logical * 0.3) + (ratings.spatial * 0.3)
    );
    setAttentionIndex(calculatedAttention);

    // Sovereignty Index (Resistance to basic AI career substitution)
    const calculatedSovereignty = Math.round(
      (ratings.interpersonal * 0.3) + (ratings.intrapersonal * 0.3) + (ratings.logical * 0.4)
    );
    setSovereigntyIndex(calculatedSovereignty);
  }, [ratings]);

  const handleRatingChange = (key: string, val: number) => {
    setRatings((prev) => ({ ...prev, [key]: val }));
  };

  // Generate SVG coordinates for drawing the radial radar mesh
  const width = 260;
  const height = 260;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = 100;

  const points = FACTORS.map((f, i) => {
    const angle = i * (2 * Math.PI / FACTORS.length) - Math.PI / 2;
    const rating = ratings[f.key];
    const radius = (rating / 100) * maxRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y, label: f.label, rating, angle };
  });

  // Polyline path string
  const polylinePath = points.map(p => `${p.x},${p.y}`).join(" ");

  // Career mappings based on dominant intelligence
  const getCareerForecast = (key: string) => {
    switch (key) {
      case "logical": return "Machine Learning Architect, Decentralized Systems Cryptographer, Quantum Analytics Counsel.";
      case "linguistic": return "Prompt Cognitive Engineer, Digital Diplomacy Specialist, Creative Synergistic Author.";
      case "spatial": return "AR Spatial UI Craftsman, Neuro-Interface Architect, Holographic Environment Designer.";
      case "musical": return "Sonic Brand Synthesist, Audio Bio-Response Therapist, Acoustic Privacy Engineer.";
      case "kinesthetic": return "Surgical Robotics Co-Pilot, Bio-Mechanical Prosthetics Integrator, Spatial Sports Medicine Expert.";
      case "interpersonal": return "Human-AI Synergy Mediator, Organizational Empathy Director, Ethical Compliance Negotiator.";
      case "intrapersonal": return "Cognitive Wellness Strategist, Deep Restorative Counselor, Integrity Systems Auditor.";
      case "naturalistic": return "Biomimetic Systems Engineer, Climate Synthetics Expert, Ecological Integrity Designer.";
      default: return "AI Synergist, Cognitive Architect.";
    }
  };

  // Curriculum mappings
  const getSyllabusRecommendation = (key: string) => {
    switch (key) {
      case "logical": return "Dermatoglyphic Level-4 algorithmic modeling, system diagnostics, code formulation logic.";
      case "linguistic": return "Parent-child communication loops, public speaking mastery, structural storytelling.";
      case "spatial": return "Spatial mental puzzles, multi-dimensional modeling metrics, cognitive architecture maps.";
      case "musical": return "Binaural frequency brain balancing, sonic-focus modulation protocols, acoustic rest loops.";
      case "kinesthetic": return "Bi-lateral brain physical coordinations, visual sensory synchronization scripts.";
      case "interpersonal": return "Leadership and emotional intelligence academies, collective negotiation labs.";
      case "intrapersonal": return "Values education core syllabus, honesty tracking metrics, reflection rituals.";
      case "naturalistic": return "Taxonomy sorting matrices, botanical-neural correlation mapping programs.";
      default: return "Complimentary DMIT Mapping.";
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(99,102,241,0.06)] border border-slate-200/50 max-w-6xl mx-auto backdrop-blur-lg relative overflow-hidden">
      
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
      
      <div className="flex items-center gap-2.5 border-b border-slate-200/60 pb-5 mb-8">
        <span className="p-2 w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center text-indigo-600 transition-colors">
          <Compass className="w-5 h-5" />
        </span>
        <div>
          <span className="text-[9px] font-mono tracking-widest uppercase text-indigo-600 font-extrabold block">BIOMETRIC SIMULATION INSTRUMENT</span>
          <h3 className="text-xl font-display font-bold text-slate-900">Dynamic Multiple Intelligence Mapping Dashboard</h3>
          <p className="text-xs text-slate-500">Tune the sliding metrics representing your child's characteristics to outline a customized biometric brain profile graph instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN: INTERACTIVE METRIC TUNERS (8 SLIDERS) */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-xs font-mono tracking-wider uppercase text-slate-500 font-bold mb-1">Observation Ratings</h4>
          
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
            {FACTORS.map((f) => {
              const IconComp = f.icon;
              return (
                <div key={f.key} className="p-3 rounded-xl bg-slate-55/70 hover:bg-slate-50 border border-slate-200/40 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded bg-slate-100 ${f.textColor}`}>
                        <IconComp className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-bold text-slate-800">{f.label}</span>
                    </div>
                    <span className={`text-[11px] font-mono font-bold ${f.textColor}`}>{ratings[f.key]}%</span>
                  </div>
                  
                  <input 
                    type="range"
                    min="15"
                    max="100"
                    value={ratings[f.key]}
                    readOnly
                    aria-label={`${f.label} percentage score`}
                    className="w-full h-1 bg-slate-200 rounded accent-indigo-600 pointer-events-none cursor-default"
                  />
                  
                  <p className="text-[10px] text-slate-500 font-normal leading-tight">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* MIDDLE COLUMN: DYNAMIC RADIATING SVG POLYGON MESH */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-y lg:border-y-0 lg:border-x border-slate-200/60 min-h-[340px]">
          <div className="relative w-[280px] h-[280px] flex items-center justify-center rounded-2xl bg-slate-50/50 border border-slate-200/40 p-2 shadow-inner">
            
            {/* Real-time reactive vector chart */}
            <svg width={width} height={height} className="overflow-visible select-none z-10">
              <defs>
                <radialGradient id="radar-glow-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.30" />
                  <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="poly-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>

              {/* DRAW CONCENTRIC MESH BACKGROUNDS (BOUNDS) */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((step, sIdx) => {
                const stepPoints = FACTORS.map((_, idx) => {
                  const angle = idx * (2 * Math.PI / FACTORS.length) - Math.PI / 2;
                  const radius = step * maxRadius;
                  const x = centerX + radius * Math.cos(angle);
                  const y = centerY + radius * Math.sin(angle);
                  return `${x},${y}`;
                }).join(" ");

                return (
                  <polygon 
                    key={sIdx} 
                    points={stepPoints} 
                    fill="none" 
                    stroke="rgba(0, 0, 0, 0.05)" 
                    strokeWidth="1" 
                    strokeDasharray={step === 1.0 ? "none" : "3 3"}
                  />
                );
              })}

              {/* RAY RADIAL DIVIDERS */}
              {FACTORS.map((_, idx) => {
                const angle = idx * (2 * Math.PI / FACTORS.length) - Math.PI / 2;
                const outerX = centerX + maxRadius * Math.cos(angle);
                const outerY = centerY + maxRadius * Math.sin(angle);
                return (
                  <line 
                    key={idx} 
                    x1={centerX} 
                    y1={centerY} 
                    x2={outerX} 
                    y2={outerY} 
                    stroke="rgba(0, 0, 0, 0.03)" 
                    strokeWidth="1" 
                  />
                );
              })}

              {/* POLYGON OF ACTIVE PROFILE SCORES */}
              {polylinePath && (
                <>
                  <polygon 
                    points={polylinePath} 
                    fill="url(#radar-glow-grad)"
                    stroke="url(#poly-glow)"
                    strokeWidth="2.5"
                    className="transition-all duration-300"
                  />
                </>
              )}

              {/* AXIS INTERACTIVE TEXT TAGS */}
              {points.map((p, pIdx) => {
                const textDistanceMultiplier = 1.25;
                const angle = pIdx * (2 * Math.PI / FACTORS.length) - Math.PI / 2;
                const lblX = centerX + (maxRadius * textDistanceMultiplier) * Math.cos(angle);
                const lblY = centerY + (maxRadius * (textDistanceMultiplier + 0.05)) * Math.sin(angle);
                const shortLabel = FACTORS[pIdx].label.split(" ")[0]; // Get first word
                
                return (
                  <g key={pIdx}>
                    {/* Floating mini score dot */}
                    <circle 
                      cx={p.x} 
                      cy={p.y} 
                      r="4" 
                      fill={FACTORS[pIdx].key === highestFactor.key ? "#F59E0B" : "#4F46E5"} 
                      className="transition-all duration-300 shadow-xl"
                    />
                    
                    <text 
                      x={lblX} 
                      y={lblY} 
                      fill="#475569" 
                      fontSize="9" 
                      fontWeight="bold" 
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="select-none text-slate-500 tracking-tighter"
                    >
                      {shortLabel}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Core logo icon inside central node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100 pointer-events-none z-20">
              <Brain className="w-4 h-4 text-indigo-600 animate-pulse" />
            </div>
          </div>

          <div className="flex gap-4 mt-4 w-full">
            <div className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-50 border border-slate-200/40">
              <span className="block text-[8px] font-mono text-slate-500 uppercase font-black uppercase">SOVEREIGNTY RATIO</span>
              <span className="text-sm font-black text-slate-800">{sovereigntyIndex}% Secure</span>
            </div>
            <div className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-50 border border-slate-200/40">
              <span className="block text-[8px] font-mono text-slate-500 uppercase font-black uppercase">FOCUS MARGIN</span>
              <span className="text-sm font-black text-indigo-600">+{attentionIndex}% Alpha</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: GENERATIVE RECOMMENDATIONS AND DEEP READOUTS */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100/50 space-y-2">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span className="text-[10px] font-mono uppercase text-indigo-700 font-extrabold tracking-wide">Dominant Core Quotient</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1">
              <span className={highestFactor.textColor}>{highestFactor.label.split(" / ")[0]}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Based on the child's dermis fingerprints, this profile indicates a high-probability natural command over the associated sensory lobes.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold uppercase block">AI-Synergistic Career Trajectory</span>
              <p className="text-slate-700 leading-relaxed font-sans bg-slate-100/50 p-2.5 rounded-lg border border-slate-200/30 text-[11px]">
                {getCareerForecast(highestFactor.key)}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono tracking-widest text-[#f59e0b] font-bold uppercase block">Recommended BrainX Protocol</span>
              <p className="text-slate-700 leading-relaxed font-sans bg-slate-100/50 p-2.5 rounded-lg border border-slate-200/30 text-[11px]">
                {getSyllabusRecommendation(highestFactor.key)}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              className="w-full py-2 bg-slate-900 text-white rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 hover:scale-[1.01]"
              onClick={() => {
                const el = document.getElementById("lead-reservation-segment");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Lock Vouchers for Diagnosis</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
      
    </div>
  );
}
