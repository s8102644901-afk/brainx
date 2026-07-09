const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz54HtrtT8BJfZKtHVxTKlCP-WvvCcDjfs0Q3VexaLL0UklJfN6M4quQb2ySN9ju3b7fg/exec";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (event) => {
  // Handle CORS preflight
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
    const body = JSON.parse(event.body || "{}");

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      let responseData = {};
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
      return {
        statusCode: response.status,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify(responseData),
      };
    } else {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("Google Apps Script proxy error:", response.status, errorText);
      return {
        statusCode: response.status,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ error: errorText }),
      };
    }
  } catch (error) {
    console.error("Netlify function proxy error:", error);
    return {
      statusCode: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to forward request to Google Apps Script.",
        details: error?.message || String(error),
      }),
    };
  }
};
