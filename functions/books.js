// functions/api/books.js
const axios = require("axios");
const pdfParse = require("pdf-parse");
const { v4: uuidv4 } = require("uuid");

// (Include your classifyTitle() and categories here…)
const categories = [
  {
    name: "Mathematics",
    keywords: [
      "algebra",
      "geometry",
      "calculus",
      "probability",
      "statistics",
      "trigonometry",
      "differential",
      "integral",
      "vector",
      "matrix",
      "theorem",
    ],
  },
  {
    name: "Signal Processing",
    keywords: [
      "signal",
      "wavelet",
      "fourier",
      "filter",
      "sampling",
      "spectral",
      "convolution",
      "transform",
      "dsp",
    ],
  },
  {
    name: "Computer Science",
    keywords: [
      "algorithm",
      "data",
      "machine",
      "learning",
      "ai",
      "neural",
      "network",
      "programming",
      "compiler",
      "os",
      "database",
      "cryptography",
      "security",
      "web",
      "software",
      "hardware",
    ],
  },
  {
    name: "Physics",
    keywords: [
      "quantum",
      "relativity",
      "gravity",
      "thermodynamics",
      "optics",
      "mechanics",
      "particle",
      "astrophysics",
      "nuclear",
    ],
  },
  {
    name: "Chemistry",
    keywords: [
      "organic",
      "inorganic",
      "biochemistry",
      "analytical",
      "physical",
      "polymer",
      "reaction",
      "molecule",
    ],
  },
  {
    name: "Biology",
    keywords: [
      "cell",
      "genetics",
      "ecology",
      "microbiology",
      "anatomy",
      "physiology",
      "evolution",
    ],
  },
  {
    name: "Engineering",
    keywords: [
      "electrical",
      "mechanical",
      "civil",
      "chemical",
      "robotics",
      "aerospace",
      "thermo",
      "fluid",
      "dynamics",
      "structural",
    ],
  },
  {
    name: "Finance",
    keywords: [
      "economics",
      "finance",
      "investment",
      "trading",
      "market",
      "banking",
      "stock",
      "derivative",
      "portfolio",
      "risk",
    ],
  },
  {
    name: "Literature",
    keywords: [
      "novel",
      "poetry",
      "drama",
      "fiction",
      "story",
      "character",
      "plot",
      "theme",
    ],
  },
  {
    name: "Psychology",
    keywords: [
      "psychology",
      "behavior",
      "cognition",
      "emotion",
      "therapy",
      "perception",
    ],
  },
  {
    name: "History",
    keywords: [
      "history",
      "ancient",
      "medieval",
      "modern",
      "war",
      "revolution",
      "archaeology",
    ],
  },
  {
    name: "Philosophy",
    keywords: ["philosophy", "metaphysics", "ethics", "logic", "epistemology"],
  },
  {
    name: "Art",
    keywords: ["art", "painting", "sculpture", "design", "architecture"],
  },
  {
    name: "Music",
    keywords: ["music", "harmony", "melody", "rhythm", "composition"],
  },
  {
    name: "Medical",
    keywords: [
      "medical",
      "anatomy",
      "surgery",
      "pathology",
      "clinical",
      "pharmacology",
    ],
  },
  {
    name: "Law",
    keywords: ["law", "legal", "justice", "constitution", "contract"],
  },
  {
    name: "Business",
    keywords: [
      "business",
      "management",
      "marketing",
      "entrepreneurship",
      "strategy",
    ],
  },
  {
    name: "Sociology",
    keywords: ["sociology", "society", "culture", "social", "institution"],
  },
  {
    name: "Education",
    keywords: ["education", "teaching", "learning", "pedagogy"],
  },
  {
    name: "Language",
    keywords: ["language", "linguistics", "grammar", "syntax", "semantics"],
  },
];

function classifyTitle(title) {
  const lower = title.toLowerCase();
  let best = { name: "General", count: 0 };
  for (const cat of categories) {
    let count = 0;
    for (const kw of cat.keywords) {
      const matches = lower.match(new RegExp(`\\b${kw}\\b`, "gi"));
      if (matches) count += matches.length;
    }
    if (count > best.count) best = { name: cat.name, count };
  }
  return best.name;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST")
    return { statusCode: 405, body: "" };

  let urls;
  try {
    ({ urls } = JSON.parse(event.body));
    if (!Array.isArray(urls)) throw new Error();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "`urls` must be an array" }) };
  }

  const books = await Promise.all(
    urls.map(async (url) => {
      try {
        const { data } = await axios.get(url, { responseType: "arraybuffer" });
        const pdfData = await pdfParse(data);
        let title = pdfData.info?.Title?.trim()
          || pdfData.text.split("\f")[0].split("\n").find(l=>l.trim())?.trim()
          || "عنوان غير متوفر";
        const type = classifyTitle(title);
        return { id: uuidv4(), url, title, type };
      } catch {
        return { id: uuidv4(), url, title: "خطأ في استخراج العنوان", type: "Unknown" };
      }
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ books })
  };
};