import axios from "axios";
const api = axios.create({ baseURL: "/api" });

export const fetchBooks = (urls) =>  api.post("/books", { urls }).then((r) => r.data.books);

export const listBooks    = () => api.get("/books").then(r => r.data.books);
export const addBooks     = (urls) => api.post("/books", { urls }).then(r => r.data.books);
export const clearBooks   = () => api.delete("/books").then(r => r.data.books);
export const uploadBook   = (file, name) => api.post("/extract", { file, filename: name }).then(r => r.data.books);
export const searchInBook = (url, q) => api.post("/search", { url, query: q }).then(r => r.data.pages);
