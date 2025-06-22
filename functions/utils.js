// functions/utils.js
const fs = require("fs").promises;
const path = require("path");
const os = require("os");
const pdfParse = require("pdf-parse");

const DATA_FILE = path.join(os.tmpdir(), "books.json");
const MAX_PAGES = 30;

// Dev-only cache
async function readBooks() {
  try {
    return JSON.parse(await fs.readFile(DATA_FILE));
  } catch {
    return [];
  }
}
async function writeBooks(list) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2));
  } catch {
    /* ignore */
  }
}

// Extract metadata and classify from full PDF buffer
async function extractTitleAndTypeFromBuffer(buffer, categories) {
  const pdfData = await pdfParse(buffer);
  let title = pdfData.info?.Title?.trim() || "";

  if (!title) {
    for (const pg of pdfData.text.split("\f")) {
      const line = pg.split("\n").find((l) => l.trim());
      if (line) {
        title = line.trim();
        break;
      }
    }
  }

  const text = pdfData.text
    .split("\f")
    .slice(0, MAX_PAGES)
    .join(" ")
    .toLowerCase();

  let best = { name: "General", count: 0 };
  for (const cat of categories) {
    let cnt = 0;
    for (const kw of cat.keywords) {
      (text.match(new RegExp(`\\b${kw}\\b`, "gi")) || []).forEach(() => cnt++);
    }
    if (cnt > best.count) best = { name: cat.name, count: cnt };
  }

  return { title: title || null, type: best.name };
}

module.exports = { readBooks, writeBooks, extractTitleAndTypeFromBuffer };
