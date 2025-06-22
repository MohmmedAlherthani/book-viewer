import React, { useState } from "react";
import styled from "styled-components";
import { searchInBook } from "../api";
import Loader from "./Loader";

const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Input = styled.input`
  flex: 2;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: darken(${({ theme }) => theme.colors.primary}, 10%);
  }
`;

const Result = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export default function BookSearch({ books }) {
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!url || !query) return;
    setLoading(true);
    try {
      const res = await searchInBook(url, query);
      setPages(res);
    } catch {}
    setLoading(false);
  };

  return (
    <Container>
      <Row>
        <Select value={url} onChange={(e) => setUrl(e.target.value)}>
          <option value="">-- اختر كتاباً --</option>
          {books.map((b) => (
            <option key={b.id} value={b.url}>
              {b.title} — {b.type}
            </option>
          ))}
        </Select>
        <Input
          placeholder="كلمة البحث…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>بحث</Button>
      </Row>
      {loading ? (
        <Loader />
      ) : pages.length ? (
        <Result>صفحات مطابقة: {pages.join(", ")}</Result>
      ) : (
        url && query && <Result style={{ color: "#999" }}>لا نتائج.</Result>
      )}
    </Container>
  );
}
