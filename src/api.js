// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api"
});

export const fetchBooks   = (urls) => api.post("/books", { urls }).then(r => r.data.books);
export const searchInBook = (url, query) => api.post("/search", { url, query }).then(r => r.data.pages);
