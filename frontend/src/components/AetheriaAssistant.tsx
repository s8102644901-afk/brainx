import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Bot, User, Send, Sparkles, BrainCircuit, Loader2, ShieldCheck, HelpCircle } from "lucide-react";

export default function AetheriaAssistant() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-welcome",
      role: "assistant",
      content: "Hello! welcome to BrainX India Child Development Assistant. I help parents restore screen-exhausted focus, activate whole-brain spatial pathways based on Howard Gardner's Multiple Intelligences, and build strong value systems. What specific learning, behavior, or focus challenge regarding your child can we explore today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [childAge, setChildAge] = useState("Ages 6-11");
  const [isConsulting, setIsConsulting] = useState(false);
  const [apiUsed, setApiUsed] = useState<boolean | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const starterPrompts = [
    { text: "My 9yo throws extreme tantrums when screens are removed.", topic: "Screen Detox" },
    { text: "How does BrainX DMIT map fingerprints to Gardner's lobes?", topic: "DMIT Science" },
    { text: "How does BrainX merge scientific learning with value education?", topic: "Value Syllabus" },
    { text: "Do you have centers outside Pune? Where are your diagnostic branches?", topic: "Franchises" }
  ];

  // Scroll to bottom of message list on updates
  useEffect(() => {
    if (messages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `m-u-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsConsulting(true);

    try {
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch(`${API_BASE_URL}/api/parenting-assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          childAge: childAge,
          topic: "Child Development Search",
          chatHistory: historyPayload.slice(-4) // Keep history concise
        })
      });

      if (response.ok) {
        const data = await response.json();
        const serverReply: ChatMessage = {
          id: `m-a-${Date.now()}`,
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, serverReply]);
        setApiUsed(data.apiUsed);
      } else {
        throw new Error("Response pipeline saturated.");
      }
    } catch (err) {
      console.warn("Retrying locally due to offline pipeline redirection:", err);
      // Fast fallback response simulation
      setTimeout(() => {
        let fallbackText = "";
        
        if (textToSend.toLowerCase().includes("franchise") || textToSend.toLowerCase().includes("center") || textToSend.toLowerCase().includes("outside")) {
          fallbackText = `BrainX India has a powerful national footprint with **Franchise Centers** spanning major cities across India, alongside over **160 school collaborations** (primarily in Pune and surrounding regions). 
          
Our local centers are fully equipped to perform clinical high-fidelity biometric fingertip scanning for DMIT mapping and conduct weekend Centre Brain Ignition labs. Each child's biometric scan is compiled into a 34-page premium neurological dossier reviewed by certified professionals. 

Would you like me to connect you with our nearest franchise partner location to claim a complimentary assessment slot?`;
        } else if (textToSend.toLowerCase().includes("value") || textToSend.toLowerCase().includes("moral") || textToSend.toLowerCase().includes("merge")) {
          fallbackText = `At BrainX India, we strongly believe that high IQ or cognitive processing velocity without deep moral integrity leads to a highly vulnerable human state in the AI Era. 

We merge scientific child development (DMIT maps and Alphawave focus) with a structured **6-Month integrated Ethics & Focus Syllabus**:
1. **Empathy Mapping**: Scenario play to map interpersonal resonance profiles.
2. **Integrity Metrics**: Case exercises designed to prevent susceptibility to digital and social peer pressure.
3. **Character Ledgers**: Keeping parents updated on core qualities like task dedication, elder gratitude, and adversity resilience (AQ).

We partner with 160+ elite schools in Pune to deploy this holistic values framework natively.`;
        } else {
          fallbackText = `Thank you for sharing that challenge. In the ${childAge} group, children undergo massive myelination in the frontal and temporal lobes, which are highly vulnerable to hyper-stimulating digital screen cycles (passive high-frequency swipes).

At BrainX India, we mitigate this through a 3-step targeted clinical approach:
1. **Innate Profiling (DMIT)**: Identifying if your child is kinesthetic, visual, or auditory. Forced alignment avoids homework resistance.
2. **Prefrontal Activation**: Practicing 90-second non-visual alpha-wave focus triggers to restore standard synaptic baseline thresholds.
3. **Values Integration**: Inspiring independent task-completion through intrinsic reward structures.

Would you like to book a complimentary 1-on-1 parenting consultation at one of our franchise centers or online to run a custom Digital Toxicity score review?`;
        }
        
        const fallbackReply: ChatMessage = {
          id: `m-a-fb-${Date.now()}`,
          role: "assistant",
          content: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, fallbackReply]);
        setApiUsed(false);
      }, 1000);
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <div id="ai-assistant-container" className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden relative">
      {/* Settings Side Panel */}
      <div id="ai-settings-panel" className="p-6 bg-slate-50 border-r border-slate-200/80 space-y-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 font-bold border border-indigo-100">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-lg font-display font-medium text-slate-900">BrainX Assistant</h4>
              <p className="text-[10px] text-indigo-700 font-mono tracking-wider font-bold">COGNITIVE SYSTEM</p>
            </div>
          </div>
          
          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            Engage with our virtual counselor trained on Dr. Howard Gardner's Multiple Intelligence frameworks, screen toxicity de-escalation, and family values education.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="child-age-selector" className="block text-[10px] font-mono text-slate-550 mb-2 uppercase tracking-wide font-bold">
                Target Child Development Age
              </label>
              <select
                id="child-age-selector"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="w-full text-xs bg-white text-slate-800 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-indigo-400 cursor-pointer transition-all shadow-sm"
              >
                <option value="Toddler (Ages 2-4)">Toddler (Ages 2-4)</option>
                <option value="Early Primary (Ages 5-7)">Early Primary (Ages 5-7)</option>
                <option value="Pre-Teen (Ages 8-11)">Pre-Teen (Ages 8-11)</option>
                <option value="High School (Ages 12-15)">High School (12-15)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-550 mb-2 uppercase tracking-wide font-bold">
                Security & Data Integrity
              </label>
              <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-705 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  Biometric Encryption
                </span>
                <span className="text-[10px] font-mono text-indigo-705 bg-indigo-100 px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                  Secure Server
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Guided Topics triggers */}
        <div className="pt-6 border-t border-slate-200 hidden lg:block">
          <h5 className="text-[10px] font-mono text-slate-550 uppercase tracking-widest mb-3 flex items-center gap-1 font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
            Suggested Quick Inquiries
          </h5>
          <div className="space-y-2">
            {starterPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p.text)}
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-indigo-50/50 text-[11px] text-slate-700 hover:text-indigo-600 border border-slate-200 transition-all truncate"
              >
                "{p.text}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Advisory Chat Portal */}
      <div id="ai-chat-portal" className="col-span-1 lg:col-span-2 flex flex-col h-[600px] min-h-[500px] bg-white">
        {/* Status Indicator Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-705 uppercase tracking-wider font-bold">
              Diagnostic Loop Active
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            {apiUsed === true ? (
              <span className="text-indigo-700 uppercase bg-indigo-100 px-2 py-0.5 rounded font-bold">
                Live Gemini Active
              </span>
            ) : (
              <span className="text-slate-600 uppercase bg-slate-100 px-2 py-0.5 rounded font-bold">
                Local Analysis Engine
              </span>
            )}
          </span>
         </div>

         {/* Message Feeds Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3.5 max-w-[85%] ${
                m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  m.role === "user"
                    ? "bg-indigo-105 bg-indigo-50 text-indigo-600 border border-indigo-200 font-bold"
                    : "bg-indigo-600 text-white font-bold"
                }`}
              >
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className="space-y-1">
                <div
                  className={`rounded-2xl py-3 px-4 text-xs leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-indigo-50 text-indigo-950 border border-indigo-100 hover:bg-indigo-100/50"
                      : "bg-slate-50 text-slate-800 border border-slate-200"
                  }`}
                >
                  {m.content}
                </div>
                <div
                  className={`text-[9px] font-mono text-slate-400 ${
                    m.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isConsulting && (
            <div className="flex items-center gap-3.5 max-w-[80%] mr-auto">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-mono text-indigo-600 animate-pulse flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-550" />
                Processing cognitive dynamic metrics...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Composer Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2.5 items-center"
        >
          <input
            id="chat-advisory-input"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isConsulting}
            placeholder="Ask about screen overstimulation, DMIT mapping, family values..."
            aria-label="Parenting Advisor Message Input"
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 font-sans focus:outline-none focus:border-indigo-400 cursor-text transition-all disabled:opacity-50 shadow-sm"
          />
          <button
            id="chat-advisory-submit"
            type="submit"
            disabled={!inputMessage.trim() || isConsulting}
            aria-label="Send message to parenting assistant"
            className="p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-550 transition-all disabled:opacity-30 disabled:hover:shadow-none flex items-center justify-center h-11 w-11 shrink-0 cursor-pointer shadow-sm hover:scale-[1.01]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
