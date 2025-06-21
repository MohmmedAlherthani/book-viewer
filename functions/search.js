// functions/search.js
const axios    = require("axios");
const pdfParse = require("pdf-parse");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST")
    return { statusCode: 405, body: "" };

  let body;
  try {
    body = JSON.parse(event.body);
    if (!body.url || !body.query) throw new Error();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing `url` or `query`" }) };
  }

  try {
    const { data } = await axios.get(body.url, { responseType: "arraybuffer" });
    const pdfData = await pdfParse(data);
    const pages = pdfData.text
      .split('\f')
      .map((pg, i) =>
        pg.toLowerCase().includes(body.query.toLowerCase()) ? i + 1 : null
      )
      .filter((p) => p);
    return { statusCode: 200, body: JSON.stringify({ pages }) };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "Search failed" }) };
  }
};
