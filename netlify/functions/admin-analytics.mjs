const CSV_URL = "https://docs.google.com/spreadsheets/d/1_sTHRM4kq3_Z25u_kW4DiOKiWU6JWo52Qv39wuApu3c/export?format=csv";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch CSV");
    }

    const csvText = await response.text();
    const lines = csvText.split("\n");
    const logs = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const cols = line.split(",");

      if (cols.length >= 6) {
        const parentName = (cols[0] || "").trim();
        const phone = (cols[1] || "").trim();
        const protocol = (cols[2] || "Consultation").trim() || "Consultation";
        const age = (cols[3] || "").trim();
        const location = (cols[4] || "").trim();
        let timestamp = (cols[5] || "").trim();

        if (!parentName && !phone && !timestamp) continue;

        let isoDate = new Date().toISOString();
        try {
          if (timestamp) {
            const nativeDate = new Date(timestamp);
            if (!isNaN(nativeDate.getTime())) {
              isoDate = nativeDate.toISOString();
            } else {
              const parts = timestamp.split(" ");
              if (parts.length >= 1) {
                const dateParts = parts[0].split("/");
                if (dateParts.length === 3) {
                  const d = parseInt(dateParts[0]);
                  const m = parseInt(dateParts[1]);
                  const y = parseInt(dateParts[2]);
                  if (y > 2000) {
                    const timeParts = parts[1] ? parts[1].split(":") : ["00", "00", "00"];
                    isoDate = new Date(
                      y, m - 1, d,
                      parseInt(timeParts[0] || "0"),
                      parseInt(timeParts[1] || "0"),
                      parseInt(timeParts[2] || "0")
                    ).toISOString();
                  }
                }
              }
            }
          }
        } catch (e) {
          // Keep default isoDate
        }

        logs.push({
          id: `sheet_${i}`,
          type: "Consultation",
          name: parentName || "Unknown",
          phone,
          date: isoDate,
          extraDetails: `Protocol: ${protocol}, Age: ${age}, Location: ${location}`,
          isFromSheet: true,
        });
      }
    }

    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, logs }),
    };
  } catch (error) {
    console.error("Failed to fetch analytics from sheets:", error);
    return {
      statusCode: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to fetch analytics" }),
    };
  }
};
