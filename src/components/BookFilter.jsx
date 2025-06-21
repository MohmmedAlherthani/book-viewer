// src/components/BookFilter.jsx
import React, { useState, useMemo } from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
`;

const CategoryBtn = styled.button`
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.text)};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Grid = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

export default function BookFilter({ books }) {
  const categories = useMemo(
    () => Array.from(new Set(books.map((b) => b.type))),
    [books]
  );
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? books : books.filter((b) => b.type === active)),
    [active, books]
  );

  return (
    <>
      <Section>
        <CategoryBtn active={active === "All"} onClick={() => setActive("All")}>
          جميع التصنيفات
        </CategoryBtn>
        {categories.map((cat) => (
          <CategoryBtn
            key={cat}
            active={active === cat}
            onClick={() => setActive(cat)}
          >
            {cat}
          </CategoryBtn>
        ))}
      </Section>

      <Grid>
        {filtered.map(({ id, url, title, type }) => (
          <div key={id}>
            <a href={url} target="_blank" rel="noopener">
              <strong>{title}</strong>
            </a>
            <p style={{ color: "#555", fontSize: "0.9rem" }}>{type}</p>
          </div>
        ))}
      </Grid>
    </>
  );
}
