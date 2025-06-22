import React, { useState, useMemo } from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Chip = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.muted)};
  border: none;
  border-radius: 16px;
  box-shadow: ${({ active }) =>
    active ? "0 4px 8px rgba(0,0,0,0.1)" : "inset 0 2px 4px rgba(0,0,0,0.05)"};
  cursor: pointer;
  transition: all 0.2s;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06);
`;

const Title = styled.a`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Type = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 0.5rem;
`;

export default function BookFilter({ books }) {
  const types = useMemo(
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
        <Chip active={active === "All"} onClick={() => setActive("All")}>
          الكل
        </Chip>
        {types.map((t) => (
          <Chip key={t} active={active === t} onClick={() => setActive(t)}>
            {t}
          </Chip>
        ))}
      </Section>
      <Grid>
        {filtered.map((b) => (
          <Card key={b.id}>
            <Title href={b.url} target="_blank" rel="noopener">
              {b.title}
            </Title>
            <Type>{b.type}</Type>
          </Card>
        ))}
      </Grid>
    </>
  );
}
