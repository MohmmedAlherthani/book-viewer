// src/components/BookSearch.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { searchInBook } from "../api";

const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Select = styled.select`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid #ccc;
`;

const Input = styled.input`
  flex: 2;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) =>
  theme.spacing(2)};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;
`;

const Result = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-weight: 500;
`;

export default function BookSearch({ books }) {
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!url || !query) return;
    setLoading(true);
    searchInBook(url, query)
      .then(setPages)
      .finally(() => setLoading(false));
  };

  const options = books.map((b) => (
    <option key={b.id} value={b.url}>
      {b.title} — {b.type}
    </option>
  ));

  return (
    <Section>
      <Row>
        <Select value={url} onChange={(e) => setUrl(e.target.value)}>
          <option value="">-- اختر كتاباً --</option>
          {options}
        </Select>
        <Input
          placeholder="كلمة البحث..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "جاري البحث…" : "بحث"}
        </Button>
      </Row>
      {!!pages.length && (
        <Result>صفحات مطابقة: {pages.join(", ")}</Result>
      )}
      {!loading && url && query && !pages.length && (
        <Result>لا نتائج.</Result>
      )}
    </Section>
  );
}
