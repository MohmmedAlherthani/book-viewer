import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { GlobalStyle } from "./GlobalStyle";
import Navbar from "./components/Navbar";
import ExecutionOptions from "./components/ExecutionOptions";
import BookList from "./components/BookList";
import BookSearch from "./components/BookSearch";
import BookFilter from "./components/BookFilter";
import UploadBook from "./components/UploadBook";
import AddBookByUrl from "./components/AddBookByUrl";
import Loader from "./components/Loader";
import {
  listBooks,
  addBooks,
  clearBooks,
  uploadBook,
  searchInBook,
} from "./api";

export default function App() {
  const [mode, setMode] = useState("list");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listBooks().then((b) => {
      setBooks(b);
      setLoading(false);
    });
  }, []);

  const refresh = () => {
    setLoading(true);
    listBooks().then((b) => {
      setBooks(b);
      setLoading(false);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <main style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
        <button
          onClick={() => {
            clearBooks().then(setBooks);
          }}
          style={{
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "0.5rem",
            borderRadius: 6,
          }}
        >
          مسح جميع الكتب
        </button>
        <ExecutionOptions mode={mode} setMode={setMode} />
        <AddBookByUrl onAdd={(url) => addBooks([url]).then(setBooks)} />
        <UploadBook onUpload={() => uploadBook().then(setBooks)} />
        {loading ? <Loader /> : null}
        {!loading && mode === "list" && <BookList books={books} />}
        {!loading && mode === "search" && <BookSearch books={books} />}
        {!loading && mode === "filter" && <BookFilter books={books} />}
      </main>
    </ThemeProvider>
  );
}
