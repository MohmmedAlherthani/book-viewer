// src/App.jsx
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import ExecutionOptions from "./components/ExecutionOptions";
import BookList from "./components/BookList";
import BookSearch from "./components/BookSearch";
import BookFilter from "./components/BookFilter";
import Loader from "./components/Loader";
import { GlobalStyle } from "./GlobalStyle";
import { theme } from "./theme";
import items from "./items";
import { fetchBooks } from "./api";

const Main = styled.main`
  max-width: 900px;
  margin: ${({ theme }) => theme.spacing(4)} auto;
  padding: 0 ${({ theme }) => theme.spacing(2)};
`;

export default function App() {
  const [mode, setMode] = useState("list");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks(items)
      .then((b) => setBooks(b))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Main>
        <ExecutionOptions mode={mode} setMode={setMode} />

        {loading && <Loader />}
        {error && <p style={{ color: theme.colors.accent }}>Error: {error}</p>}

        {!loading && !error && mode === "list" && <BookList books={books} />}
        {!loading && !error && mode === "search" && (
          <BookSearch books={books} />
        )}
        {!loading && !error && mode === "filter" && (
          <BookFilter books={books} />
        )}
      </Main>
    </ThemeProvider>
  );
}
