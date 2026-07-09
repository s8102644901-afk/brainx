const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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
    const { password } = JSON.parse(event.body || "{}");

    const adminPassword = process.env.ADMIN_PASSWORD || "brainx@admin2026";
    const adminKey = process.env.ADMIN_KEY;
    const viteAdminPassword = process.env.VITE_ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;
    const authSecret = process.env.AUTH_SECRET;

    const validPasswords = [
      adminPassword,
      adminKey,
      viteAdminPassword,
      jwtSecret,
      authSecret,
    ].filter(Boolean);

    const ip = event.headers["x-forwarded-for"] || event.headers["client-ip"] || "unknown";
    console.log(`[Admin Auth] Login attempt received from IP: ${ip}`);

    if (password && validPasswords.includes(password.trim())) {
      console.log(`[Admin Auth] Authentication successful for IP: ${ip}`);
      return {
        statusCode: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ success: true, token: "session_token_brainx_admin_secure_gate_9281" }),
      };
    } else {
      console.warn(`[Admin Auth] Authentication failed for IP: ${ip}. Invalid credentials.`);
      return {
        statusCode: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ success: false, error: "Invalid password credentials." }),
      };
    }
  } catch (error) {
    console.error("Admin login error:", error);
    return {
      statusCode: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
