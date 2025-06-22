// functions/search.js
const axios    = require("axios");
const pdfParse = require("pdf-parse");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "" };

  const { url, query } = JSON.parse(event.body || "{}");
  if (!url || !query) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing `url` or `query`" }) };
  }

  try {
    const { data: buffer } = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 15000,
    });
    const pdfData = await pdfParse(buffer);
    const pages = pdfData.text
      .split("\f")
      .map((pg, i) => (pg.toLowerCase().includes(query.toLowerCase()) ? i + 1 : null))
      .filter(Boolean);
    return { statusCode: 200, body: JSON.stringify({ pages }) };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "Search failed" }) };
  }
};
