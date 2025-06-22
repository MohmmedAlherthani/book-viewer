// functions/extract.js
// functions/extract.js
const bucket = require("./lib/firebase");
const supabase = require("./lib/supabase");
const { extractTitleAndTypeFromBuffer } = require("./utils");
const { v4: uuidv4 } = require("uuid");

const { categories } = require("./data/categories");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "" };

  const { file, filename } = JSON.parse(event.body || "{}");
  if (!file || !filename) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing `file` or `filename`" }),
    };
  }

  // Decode PDF
  const buffer = Buffer.from(file, "base64");
  // Upload to Firebase Storage
  const key = `pdfs/books/${uuidv4()}_${filename}`;
  const fileRef = bucket.file(key);
  try {
    await fileRef.save(buffer, { contentType: "application/pdf" });
  } catch (err) {
    console.error("Storage upload error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Upload failed" }),
    };
  }

  const publicURL = `https://storage.googleapis.com/${
    process.env.FIREBASE_STORAGE_BUCKET
  }/${encodeURIComponent(key)}`;

  // Extract metadata
  let title = filename,
    type = "General";
  try {
    const out = await extractTitleAndTypeFromBuffer(buffer, categories);
    if (out.title) title = out.title;
    type = out.type;
  } catch {}

  // Insert into Supabase
  const { data: book, error: dbErr } = await supabase
    .from("books")
    .insert({ url: publicURL, filename, title, type })
    .select()
    .single();
  if (dbErr) {
    console.error("DB insert error:", dbErr.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "DB insert failed" }),
    };
  }

  // Return updated list
  const { data: books, error: fetchErr } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });
  if (fetchErr) {
    return { statusCode: 500, body: fetchErr.message };
  }

  return { statusCode: 200, body: JSON.stringify({ books }) };
};
