import { GoogleGenAI } from "@google/genai";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

let aiClient = null;

function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

function provideFallbackSummary(title, ctaProgram) {
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

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { title, type, ctaProgram } = JSON.parse(event.body || "{}");

    if (!title) {
      return {
        statusCode: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Event Title is required." }),
      };
    }

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
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 100,
        },
      });

      const summary = response.text?.trim().replace(/^["']|["']$/g, "") ||
        "Special active session. Learn de-addiction techniques, parenting skills, value systems, and core brain coordination.";

      return {
        statusCode: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ summary, apiUsed: true }),
      };
    } else {
      const summary = provideFallbackSummary(title, ctaProgram);
      return {
        statusCode: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ summary, apiUsed: false }),
      };
    }
  } catch (error) {
    console.error("Gemini API Error in generate-summary:", error);
    const { title, ctaProgram } = JSON.parse(event.body || "{}");
    const summary = provideFallbackSummary(title || "Event", ctaProgram);
    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ summary, apiUsed: false, error: error?.message || "Internal server error" }),
    };
  }
};
