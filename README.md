# 📚 Book Explorer

A professional one-page React app for fetching, classifying, and searching PDF books by URL, backed by Node.js “serverless” functions on Netlify. Extracts titles from PDF metadata (with a fast first-page fallback), auto-classifies each book into rich categories, and lets users search inside any PDF. Deployed end-to-end on Netlify—zero CORS headaches.

* Live Demo
[https://taupe-griffin-e0220b.netlify.app/]
---

## Table of Contents

- [Idea & Goals](#idea--goals)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture](#architecture)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
  - [Folder Structure](#folder-structure)  
- [API Endpoints (Netlify Functions)](#api-endpoints-netlify-functions)  
  - [POST /api/books](#post-apibooks)  
  - [POST /api/search](#post-apisearch)  
- [Front-end Usage](#front-end-usage)  
- [Deployment to Netlify](#deployment-to-netlify)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Idea & Goals

When working with raw PDF URLs, it’s tedious to manually extract titles, categorize content, and search inside documents. *Book Explorer* was born to:

1. *Automate title extraction*  
   - Use PDF metadata first (blazing-fast).  
   - Fallback to page-1 text if metadata is missing.  

2. *Classify books* into meaningful categories  
   - A rich keyword-based classifier picks “Mathematics,” “Signal Processing,” “Literature,” etc., by counting matches.  

3. *Search inside any PDF* by keyword  
   - Quickly scan text, split by pages, and list matching page numbers.  

4. *Deliver a seamless UX*  
   - One-page React app with loader, error handling, and card-grid layout.  
   - Professional theme, responsive design.  

5. *Host on Netlify* for free, with serverless functions  
   - Avoid CORS issues by moving PDF fetch + parse to the backend.  
   - Keep front-end lightweight and secure.  

---

## Features

- *📖 Title Extraction* from PDF metadata or first page  
- *🏷 Auto-Classification* into 20+ categories  
- *🔍 Full-Text Search* inside any PDF  
- *⚡ Fast, One-Page UI* in React with styled-components & ThemeProvider  
- *☁ Serverless Backend* via Netlify Functions (no dedicated server)  
- *🚀 Zero-Config Deployment* with Netlify CLI or Git integration  

---

## Tech Stack

- *Front-end*: React, axios, styled-components  
- *Backend Functions*: Node.js, Netlify Functions, pdf-parse, axios, uuid  
- *Deployment*: Netlify (Functions + Static hosting)  

---

## Architecture

┌─────────────┐       HTTPS       ┌─────────────────────┐ │   Browser   │ ─────────────────>│   React App (SPA)   │ │             │                   │  (Netlify hosting)  │ │  • Loader   │ <─────────────────│• fetchBooks()/search│ │  • Cards    │                   └─────────────────────┘ └─────────────┘                            │ │ /api/… ▼ ┌─────────────────────┐ │ Netlify Functions   │ │ (functions/*.js)    │ │                     │ │ • books.js          │ │ • search.js         │ └─────────────────────┘ │ │ axios ▼ ┌─────────────────────────┐ │   External PDF URLs     │ └─────────────────────────┘

- *No direct PDF fetch* in browser—avoids CORS and slows.
- *All PDF parsing* happens in secure, serverless functions.

---

## Getting Started

### Prerequisites

- *Node.js* v14+  
- *npm* v6+  
- *Netlify CLI* (optional for local dev & deploy)  
  ```bash
  npm install -g netlify-cli

Installation

1. Clone the repo

git clone https://github.com/your-user/book-explorer.git
cd book-explorer


2. Install front-end deps

npm install


3. Install function deps

cd functions
npm install
cd ..



Running Locally

# 1. Start Netlify Dev (serves React + Functions):
netlify dev

# 2. Open http://localhost:8888 in your browser

> This spins up:

React app on http://localhost:8888/

Functions under /.netlify/functions/...




Folder Structure

book-explorer/
├─ functions/                # Netlify Functions (Node.js)
│  ├─ books.js               # POST /api/books
│  ├─ search.js              # POST /api/search
│  └─ package.json           # Functions’ dependencies
├─ public/                   # Static assets
├─ src/                      # React source
│  ├─ api.js                 # axios client
│  ├─ App.jsx                # Main app & routing
│  ├─ theme.js               # Styled-components theme
│  ├─ GlobalStyle.jsx        # Global CSS reset + typography
│  └─ components/            # UI components
├─ netlify.toml              # Netlify build & redirect rules
├─ package.json              # Front-end dependencies & scripts
└─ README.md                 # This documentation


---

API Endpoints (Netlify Functions)

POST /api/books

Request Body

{ "urls": [ "https://.../file1.pdf", "https://.../file2.pdf" ] }

Response

{
  "books": [
    { "id": "...", "url": "...", "title": "Extracted Title", "type": "Mathematics" },
    ...
  ]
}

Behavior

Fetches each PDF as binary

Extracts info.Title or first line of page 1

Classifies by matching rich keyword lists

Returns an array of { id, url, title, type }



POST /api/search

Request Body

{ "url": "https://.../file1.pdf", "query": "keyword" }

Response

{ "pages": [ 2, 5, 10 ] }

Behavior

Fetches PDF

Splits text by form-feed (\f) into pages

Returns page numbers containing the query (case-insensitive)




---

Front-end Usage

View Books: Displays cards with title & category badge.

Search Inside Book: Select a book, enter keyword, click “بحث” to see matching pages.

Filter by Category: Click any category badge to scope the card grid.


All data is retrieved via our /api client in src/api.js.


---

Deployment to Netlify

1. Build React

npm run build


2. Deploy

netlify deploy --prod


3. Visit your live site URL (provided by Netlify).



Netlify will automatically detect your netlify.toml, publish build/, and wire /api/* to your Functions folder.


---

Contributing

1. Fork & clone this repo


2. Create a feature branch (git checkout -b feat/new-feature)


3. Build & test locally (netlify dev)


4. Commit & open a PR



Please keep UI & API changes decoupled and update this README accordingly.


---

License

MIT © [Mohmmed Asad Alherthani]
Feel free to adapt and extend!
