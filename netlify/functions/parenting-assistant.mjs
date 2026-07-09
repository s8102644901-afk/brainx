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

function provideScientificFallbackAdvisory(message, age, topic) {
  const query = message.toLowerCase();

  if (query.includes("screen") || query.includes("addict") || query.includes("phone") || query.includes("ipad") || query.includes("digital")) {
    return `Dear parent, digital overload is rewiring the child's dopamine pathways, reducing prefrontal cortex development (which dictates focus and impulse control). \n\nHere is BrainX India's science-backed strategy for a kid of age ${age || "6-12"}:\n\n1. **The 3-Dimensional Shift**: Every hour of passive digital input must be balanced with 30 minutes of sensory-rich spatial work (building blocks, hand-writing, tactile clay, or acoustic memory games). This activates the parietal lobes, offseting screen-associated gray-matter thinning.\n2. **Post-Screen Reset Interval (PRIs)**: Immediately after screen time, have your child do a physical "reset activity" (such as a 2-minute balloon-tap balance game or alternating hand-pat exercises). This transitions the brain smoothly from rapid digital dopamine loops to human spatial processing.\n3. **Mid-Brain Focusing Exercises**: Set up a calm acoustic field. Ask your child to close their eyes and point to the source of a soft hum while tracing a line with a finger. This boosts binaural auditory tuning and strengthens sensory attention fields.\n\nWould you like a sample scheduling routine to trial this transition this week?`;
  }

  if (query.includes("focus") || query.includes("concentration") || query.includes("adhd") || query.includes("restless") || query.includes("attention")) {
    return `Improving focus requires shifting neural circuits from short-term reward tracking to long-term task pursuit. \n\nBased on our clinical research at BrainX India, here is the focus restoration framework:\n\n1. **Foveal Focus Drills (The 90-Second Rule)**: Draw a small single teal dot on a raw card. Before starting school work or highly cognitive tasks, have your child lock their eyes onto the dot for 90 seconds without blink-panic. This naturally floods the visual system with epinephrine, boosting readiness and cortical lock-in.\n2. **Proprioceptive Resetting**: If they get hyper-active, do "bilateral coordinate hops" (touching the opposite foot with the opposite thumb, alternating count-up). This triggers left-right hemisphere synchronization, settling erratic brain wave spikes.\n3. **The DMIT Factor**: Often, poor focus is just a learning modality mismatch (e.g., trying to teach an Auditory-dominant child with purely Visual sheets). We highly recommend mapping their learning styles with a DMIT counseling scan, which reveals their primary natural input pathways.\n\nI can guide you on how to spot these primary modalities in your child right now if you wish.`;
  }

  if (query.includes("dmit") || query.includes("fingerprint") || query.includes("brain map") || query.includes("scan")) {
    return `Dermatoglyphics Multiple Intelligence Testing (DMIT) is a highly reliable scientific analysis of epidermal ridges on your child's fingertips, which develop concurrently with brain lobes during the 13th to 21st embryonic weeks. \n\nHere is what our diagnostic mapping reveals:\n1. **Parietal Lobe Density (Kinesthetic Output)**: Gauges fine motor control, active physical stamina, and whether your child will thrive in collaborative labs rather than standard desks.\n2. **Frontal Lobe Dominance**: Highlights whether their natural default state is logical-algorithmic (AI-like) or high-empathy leadership (HI-human).\n3. **Learning Modality Tuning**: Indicates whether their peak information intake is Visual (35%), Auditory (45%), or Kinesthetic/Sensory (20%).\n\nKnowing this unlocks an exact, frictionless "Neuro-Parenting Map" so you don't waste years forcing them down wrong educational pathways. Would you like to check some of your child's innate behavioral traits to estimate their dominant lobe?`;
  }

  if (query.includes("mid brain") || query.includes("midbrain") || query.includes("activation") || query.includes("blindfold")) {
    return `Mid-Brain Activation (or Interbrain development) targets the diencephalon, which links our higher cerebral hemispheres to the primitive sensory survival centers. \n\nWhen correctly stimulated through acoustic resonance, neuro-sensors, and blindfolded mental projection, it unlocks phenomenal sensory awareness:\n1. **Sensory Compensation**: The brain learns to synthesize sensory cues (sound waves, subtle thermal drafts, skin tactile resistance) into a rich spatial mental image—letting certified students sense colors or read while securely blindfolded.\n2. **Instant Alpha Wave Transition**: The child learns to slide into their Alpha wave output (8-12 Hz) at will, which is the exact brain state of elite focus, photographic recall, and intense flow state.\n3. **Unshakable Stress Shield**: It strengthens emotional regulation so they remain calm under academic and social pressure.\n\nThis program is premium and clinical. I can guide you through a simple 5-minute spatial-sound experiment you can perform at home tonight to measure their current alpha sensory threshold.`;
  }

  return `Hello! As the BrainX India Child Development Assistant, my focus is helping you raise high-intelligence, high-focus kids in this high-addiction era. \n\nTo help me tailor an exact response, could you share support questions regarding:\n1. **Digital Screen Recovery**: Offsetting digital screen over-stimulation and restoring focus.\n2. **DMIT Scientific Mapping**: Learning how fingerprint ridge density exposes their innate neurological learning styles.\n3. **Mid-Brain Activation**: Activating physical/acoustic awareness and transitioning into calm, high-focus Alpha states.\n4. **Emotional Intelligence (EQ)**: Fostering human-superior traits in the AI age.\n\nPlease share details about your child's age or specific challenges so we can construct a high-performance cognitive blueprint together.`;
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
    const { message, childAge, parentName, topic, chatHistory } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Message is required." }),
      };
    }

    const client = getGeminiClient();

    const systemInstruction = `You are the BrainX India Child Development Assistant, an automated parenting guide and cognitive resource.
BrainX India is a futuristic child development program helping parents equip children with high-performance Human Intelligence (HI) for the AI-dominated future.
We specialize in DMIT counseling (fingerprint dermatoglyphics for brain mapping), Mid-Brain Activation, ADHD & focus rescue, and high emotional quotient parenting in a high-tech/high-addiction age.

Always reply in a warm, professional, deeply reassuring, scientific yet emotionally resonant tone. 
Keep your advice clear, actionable, structured, and free of hype. Offer specific neuro-cognitive actions the parent can do at home instead of dry clinical guidance.
Tailor recommendations based on the child's context: Age/Bracket: ${childAge || "Ages 4-14"}, Topic: ${topic || "General Focus & Neural Development"}. Parent Name: ${parentName || "Parent"}.

Refrain from using robotic bulleted responses. Speak like an elegant, smart child development assistant.`;

    if (client) {
      const contents = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const msg of chatHistory) {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.75,
        },
      });

      const reply = response.text || "I apologize, but I could not formulate a response. Please let me try again.";
      return {
        statusCode: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ reply, apiUsed: true }),
      };
    } else {
      const reply = provideScientificFallbackAdvisory(message, childAge, topic);
      return {
        statusCode: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ reply, apiUsed: false }),
      };
    }
  } catch (error) {
    console.error("Gemini API Error in parenting assistant:", error);
    const { message: msg, childAge, topic } = JSON.parse(event.body || "{}");
    const reply = provideScientificFallbackAdvisory(msg || "", childAge, topic);
    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ reply, apiUsed: false, error: error?.message || "Internal server error" }),
    };
  }
};
