import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Enable CORS
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(",") 
    : ["http://localhost:5173", "http://localhost:3000"];
    
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or local fetch calls depending on environment)
      if (!origin || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));

  // Middleware
  app.use(express.json());

  // Instantiate Gemini Client safely. Lazy initialize inside route to prevent startup crash if key is missing.
  let aiClient: GoogleGenAI | null = null;
  
  function getGeminiClient(): GoogleGenAI | null {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
        aiClient = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      }
    }
    return aiClient;
  }

  // --- API Routes ---

  // Admin Login Verification Endpoint
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "brainx@admin2026";
    if (password === adminPassword) {
      return res.json({ success: true, token: "session_token_brainx_admin_secure_gate_9281" });
    } else {
      return res.status(401).json({ success: false, error: "Invalid password credentials." });
    }
  });

  // Google Apps Script Sheets Submission Proxy Endpoint
  app.post("/api/submit-to-sheets", async (req, res) => {
    try {
      const targetUrl = "https://script.google.com/macros/s/AKfycbz54HtrtT8BJfZKtHVxTKlCP-WvvCcDjfs0Q3VexaLL0UklJfN6M4quQb2ySN9ju3b7fg/exec";
      
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      if (response.ok) {
        let responseData: any = {};
        try {
          responseData = await response.json();
        } catch (e) {
          try {
            const rawText = await response.text();
            responseData = { message: rawText };
          } catch (err) {
            responseData = { success: true };
          }
        }
        return res.status(response.status).json(responseData);
      } else {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error("Google Apps Script proxy error:", response.status, errorText);
        return res.status(response.status).json({ error: errorText });
      }
    } catch (error: any) {
      console.error("Backend proxy network or execution error:", error);
      return res.status(500).json({ 
        error: "Failed to forward request to Google Apps Script.", 
        details: error?.message || String(error)
      });
    }
  });

  // Fetch real Google Sheets Data for Analytics
  app.get("/api/admin/analytics", async (req, res) => {
    try {
      const csvUrl = "https://docs.google.com/spreadsheets/d/1_sTHRM4kq3_Z25u_kW4DiOKiWU6JWo52Qv39wuApu3c/export?format=csv";
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch CSV");
      }
      const csvText = await response.text();
      const lines = csvText.split("\n");
      const logs = [];
      
      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Simple CSV parse handling basic commas (assuming no commas within fields)
        const cols = line.split(",");
        if (cols.length >= 6) {
          const parentName = (cols[0] || "").trim();
          const phone = (cols[1] || "").trim();
          const protocol = (cols[2] || "Consultation").trim() || "Consultation";
          const age = (cols[3] || "").trim();
          const location = (cols[4] || "").trim();
          let timestamp = (cols[5] || "").trim();
          
          // Skip completely empty rows
          if (!parentName && !phone && !timestamp) continue;
          
          let isoDate = new Date().toISOString();
          try {
            if (timestamp) {
               const nativeDate = new Date(timestamp);
               if (!isNaN(nativeDate.getTime())) {
                   isoDate = nativeDate.toISOString();
               } else {
                   // Fallback for DD/MM/YYYY
                   const parts = timestamp.split(" ");
                   if (parts.length >= 1) {
                      const dateParts = parts[0].split("/");
                      if (dateParts.length === 3) {
                         const d = parseInt(dateParts[0]);
                         const m = parseInt(dateParts[1]);
                         const y = parseInt(dateParts[2]);
                         if (y > 2000) {
                             const timeParts = parts[1] ? parts[1].split(":") : ["00", "00", "00"];
                             isoDate = new Date(y, m-1, d, parseInt(timeParts[0]||"0"), parseInt(timeParts[1]||"0"), parseInt(timeParts[2]||"0")).toISOString();
                         }
                      }
                   }
               }
            }
          } catch(e) {}
          
          logs.push({
            id: `sheet_${i}`,
            type: protocol.toLowerCase().includes("midbrain") || protocol.toLowerCase().includes("dmit") ? "Consultation" : "Consultation",
            name: parentName || "Unknown",
            phone: phone,
            date: isoDate,
            extraDetails: `Protocol: ${protocol}, Age: ${age}, Location: ${location}`,
            isFromSheet: true
          });
        }
      }
      
      res.json({ success: true, logs });
    } catch (error: any) {
      console.error("Failed to fetch analytics from sheets:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Health and API Status
  app.get("/api/health", (req, res) => {
    const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
    res.json({
      status: "online",
      timestamp: new Date().toISOString(),
      features: {
        geminiActive: hasKey,
        fallbackModeEnabled: !hasKey
      }
    });
  });

  // AI Parent Assistant Consultant Endpoint
  app.post("/api/parenting-assistant", async (req, res) => {
    const { message, childAge, parentName, topic, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    try {
      const client = getGeminiClient();
      
      const systemInstruction = `You are the BrainX India Child Development Assistant, an automated parenting guide and cognitive resource.
BrainX India is a futuristic child development program helping parents equip children with high-performance Human Intelligence (HI) for the AI-dominated future.
We specialize in DMIT counseling (fingerprint dermatoglyphics for brain mapping), Mid-Brain Activation, ADHD & focus rescue, and high emotional quotient parenting in a high-tech/high-addiction age.

Always reply in a warm, professional, deeply reassuring, scientific yet emotionally resonant tone. 
Keep your advice clear, actionable, structured, and free of hype. Offer specific neuro-cognitive actions the parent can do at home instead of dry clinical guidance.
Tailor recommendations based on the child's context: Age/Bracket: ${childAge || "Ages 4-14"}, Topic: ${topic || "General Focus & Neural Development"}. Parent Name: ${parentName || "Parent"}.

Refrain from using robotic bulleted responses. Speak like an elegant, smart child development assistant.`;

      if (client) {
        // Build chat parameters
        const contents = [];
        
        // Include chat history if provided
        if (chatHistory && Array.isArray(chatHistory)) {
          for (const msg of chatHistory) {
            contents.push({
              role: msg.role === "assistant" ? "model" : "user",
              parts: [{ text: msg.content }]
            });
          }
        }
        
        // Append current message
        contents.push({
          role: "user",
          parts: [{ text: message }]
        });

        const response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.75,
          }
        });

        const reply = response.text || "I apologize, but I could not formulate a response. Please let me try again.";
        return res.json({ reply, apiUsed: true });
      } else {
        // Graceful Scientific Fallback Mode with realistic high-utility rules-based advisory
        const reply = provideScientificFallbackAdvisory(message, childAge, topic);
        return res.json({ reply, apiUsed: false });
      }
    } catch (error: any) {
      console.error("Gemini API Error in parenting assistant route:", error);
      // Fallback response rather than a hard crash
      const reply = provideScientificFallbackAdvisory(message, childAge, topic);
      return res.json({ reply, apiUsed: false, error: error?.message || "Internal server error" });
    }
  });

  // AI Event Summary Generation Endpoint
  app.post("/api/generate-summary", async (req, res) => {
    const { title, type, ctaProgram } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Event Title is required." });
    }

    try {
      const client = getGeminiClient();
      
      const systemInstruction = `You are a professional copywriting assistant for BrainX India, a premium child cognitive development platform.
Your task is to write a single, compelling, highly engaging one-sentence summary/description for an event, seminar, or announcement.
The summary must be concise (approx 15-25 words), professional, and emotionally resonant for parents. Focus on child development, cognitive brain mapping, screen detox, focus improvement, or human-superior skills in the AI era.
Do NOT use quotes in your output. Return only the summary text itself.`;

      const prompt = `Generate a single short summary sentence for an event with Title: "${title}"${type ? `, Type: "${type}"` : ""}${ctaProgram ? `, Category: "${ctaProgram}"` : ""}.`;

      if (client) {
        const response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            maxOutputTokens: 100,
          }
        });

        const summary = response.text?.trim().replace(/^["']|["']$/g, "") || "Special active session. Learn de-addiction techniques, parenting skills, value systems, and core brain coordination.";
        return res.json({ summary, apiUsed: true });
      } else {
        // Rules-based fallback summary based on title/category
        const summary = provideFallbackSummary(title, ctaProgram);
        return res.json({ summary, apiUsed: false });
      }
    } catch (error: any) {
      console.error("Gemini API Error in generate-summary route:", error);
      const summary = provideFallbackSummary(title, ctaProgram);
      return res.json({ summary, apiUsed: false, error: error?.message || "Internal server error" });
    }
  });

  function provideFallbackSummary(title: string, ctaProgram?: string): string {
    const t = title.toLowerCase();
    const cat = ctaProgram ? ctaProgram.toLowerCase() : "";
    
    if (t.includes("screen") || t.includes("detox") || t.includes("addiction") || cat === "parenting") {
      return "Learn exact home-detox protocols to stop electronic screens from cannibalizing prefrontal attention spans, centering core neuro-focus.";
    }
    if (t.includes("fingerprint") || t.includes("ridge") || t.includes("dmit") || cat === "dmit") {
      return "An interactive live demonstration for parents and students to map Howard Gardner sensory modalities. Take a direct fingerprint baseline test live.";
    }
    if (t.includes("activation") || t.includes("blindfold") || t.includes("alpha") || cat === "midbrain") {
      return "Witness our certified blindfold reading practitioners demonstrate spatial vibration and color awareness, with clinical feedback.";
    }
    return `Special active session for '${title}'. Learn de-addiction techniques, parenting skills, value systems, and core brain coordination.`;
  }

  // Comprehensive static fallback advisory generator when API key is not present
  function provideScientificFallbackAdvisory(message: string, age: string, topic: string): string {
    const query = message.toLowerCase();
    
    // Core parenting response blocks
    if (query.includes("screen") || query.includes("addict") || query.includes("phone") || query.includes("ipad") || query.includes("digital")) {
      return `Dear parent, digital overload is rewiring the child's dopamine pathways, reducing prefrontal cortex development (which dictates focus and impulse control). 

Here is BrainX India's science-backed strategy for a kid of age ${age || "6-12"}:

1. **The 3-Dimensional Shift**: Every hour of passive digital input must be balanced with 30 minutes of sensory-rich spatial work (building blocks, hand-writing, tactile clay, or acoustic memory games). This activates the parietal lobes, offseting screen-associated gray-matter thinning.
2. **Post-Screen Reset Interval (PRIs)**: Immediately after screen time, have your child do a physical "reset activity" (such as a 2-minute balloon-tap balance game or alternating hand-pat exercises). This transitions the brain smoothly from rapid digital dopamine loops to human spatial processing.
3. **Mid-Brain Focusing Exercises**: Set up a calm acoustic field. Ask your child to close their eyes and point to the source of a soft hum while tracing a line with a finger. This boosts binaural auditory tuning and strengthens sensory attention fields.

Would you like a sample scheduling routine to trial this transition this week?`;
    }
    
    if (query.includes("focus") || query.includes("concentration") || query.includes("adhd") || query.includes("restless") || query.includes("attention")) {
      return `Improving focus requires shifting neural circuits from short-term reward tracking to long-term task pursuit. 

Based on our clinical research at BrainX India, here is the focus restoration framework:

1. **Foveal Focus Drills (The 90-Second Rule)**: Draw a small single teal dot on a raw card. Before starting school work or highly cognitive tasks, have your child lock their eyes onto the dot for 90 seconds without blink-panic. This naturally floods the visual system with epinephrine, boosting readiness and cortical lock-in.
2. **Proprioceptive Resetting**: If they get hyper-active, do "bilateral coordinate hops" (touching the opposite foot with the opposite thumb, alternating count-up). This triggers left-right hemisphere synchronization, settling erratic brain wave spikes.
3. **The DMIT Factor**: Often, poor focus is just a learning modality mismatch (e.g., trying to teach an Auditory-dominant child with purely Visual sheets). We highly recommend mapping their learning styles with a DMIT counseling scan, which reveals their primary natural input pathways.

I can guide you on how to spot these primary modalities in your child right now if you wish.`;
    }

    if (query.includes("dmit") || query.includes("fingerprint") || query.includes("brain map") || query.includes("scan")) {
      return `Dermatoglyphics Multiple Intelligence Testing (DMIT) is a highly reliable scientific analysis of epidermal ridges on your child's fingertips, which develop concurrently with brain lobes during the 13th to 21st embryonic weeks. 

Here is what our diagnostic mapping reveals:
1. **Parietal Lobe Density (Kinesthetic Output)**: Gauges fine motor control, active physical stamina, and whether your child will thrive in collaborative labs rather than standard desks.
2. **Frontal Lobe Dominance**: Highlights whether their natural default state is logical-algorithmic (AI-like) or high-empathy leadership (HI-human).
3. **Learning Modality Tuning**: Indicates whether their peak information intake is Visual (35%), Auditory (45%), or Kinesthetic/Sensory (20%).

Knowing this unlocks an exact, frictionless "Neuro-Parenting Map" so you don't waste years forcing them down wrong educational pathways. Would you like to check some of your child's innate behavioral traits to estimate their dominant lobe?`;
    }

    if (query.includes("mid brain") || query.includes("midbrain") || query.includes("activation") || query.includes("blindfold")) {
      return `Mid-Brain Activation (or Interbrain development) targets the diencephalon, which links our higher cerebral hemispheres to the primitive sensory survival centers. 

When correctly stimulated through acoustic resonance, neuro-sensors, and blindfolded mental projection, it unlocks phenomenal sensory awareness:
1. **Sensory Compensation**: The brain learns to synthesize sensory cues (sound waves, subtle thermal drafts, skin tactile resistance) into a rich spatial mental image—letting certified students sense colors or read while securely blindfolded.
2. **Instant Alpha Wave Transition**: The child learns to slide into their Alpha wave output (8-12 Hz) at will, which is the exact brain state of elite focus, photographic recall, and intense flow state.
3. **Unshakable Stress Shield**: It strengthens emotional regulation so they remain calm under academic and social pressure.

This program is premium and clinical. I can guide you through a simple 5-minute spatial-sound experiment you can perform at home tonight to measure their current alpha sensory threshold.`;
    }

    return `Hello! As the BrainX India Child Development Assistant, my focus is helping you raise high-intelligence, high-focus kids in this high-addiction era. 

To help me tailor an exact response, could you share support questions regarding:
1. **Digital Screen Recovery**: Offsetting digital screen over-stimulation and restoring focus.
2. **DMIT Scientific Mapping**: Learning how fingerprint ridge density exposes their innate neurological learning styles.
3. **Mid-Brain Activation**: Activating physical/acoustic awareness and transitioning into calm, high-focus Alpha states.
4. **Emotional Intelligence (EQ)**: Fostering human-superior traits in the AI age.

Please share details about your child's age or specific challenges so we can construct a high-performance cognitive blueprint together.`;
  }

  app.listen(PORT, () => {
    console.log(`API Server is running on port ${PORT}`);
  });
}

startServer();
