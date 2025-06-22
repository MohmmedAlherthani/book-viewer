// functions/books.js
const supabase = require("./lib/supabase");
const axios = require("axios");
const {
  readBooks,
  writeBooks,
  extractTitleAndTypeFromBuffer,
} = require("./utils");
const { v4: uuidv4 } = require("uuid");

const { categories } = require("./data/categories");

exports.handler = async (event) => {
  const method = event.httpMethod;

  if (method === "GET") {
    // List all books
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return { statusCode: 500, body: error.message };
    return { statusCode: 200, body: JSON.stringify({ books: data }) };
  }

  if (method === "POST") {
    // Add by URL
    let { urls } = JSON.parse(event.body || "{}");
    if (!Array.isArray(urls) || !urls.length) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "`urls` must be a non-empty array" }),
      };
    }

    for (const url of urls) {
      let buffer = null;
      try {
        // fetch entire PDF
        ({ data: buffer } = await axios.get(url, {
          responseType: "arraybuffer",
          timeout: 15000,
        }));
      } catch {
        buffer = null;
      }

      let title = url;
      let type = "General";
      if (buffer) {
        try {
          const out = await extractTitleAndTypeFromBuffer(buffer, categories);
          if (out.title) title = out.title;
          type = out.type;
        } catch {
          /* fallback */
        }
      }

      await supabase.from("books").insert({ url, filename: null, title, type });
    }

    // Return updated list
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return { statusCode: 500, body: error.message };
    return { statusCode: 200, body: JSON.stringify({ books: data }) };
  }

  if (method === "DELETE") {
    // Clear all
    await supabase.from("books").delete().neq("id", "");
    return { statusCode: 200, body: JSON.stringify({ books: [] }) };
  }

  return { statusCode: 405, body: "" };
};
