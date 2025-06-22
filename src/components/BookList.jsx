import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
`;

const Title = styled.a`
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.75rem;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Badge = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
`;

export default function BookList({ books }) {
  if (!books.length) {
    return <p style={{ textAlign: "center", color: "#777" }}>لا توجد كتب.</p>;
  }
  return (
    <Grid>
      {books.map(({ id, url, title, type }) => (
        <Card key={id}>
          <Title href={url} target="_blank" rel="noopener">
            {title}
          </Title>
          <Badge>{type}</Badge>
        </Card>
      ))}
    </Grid>
  );
}
