// src/components/BookList.jsx
import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing(2)};
  font-weight: 600;
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  flex: 1;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const Badge = styled.span`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.75rem;
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: inline-block;
`;

export default function BookList({ books }) {
  if (!books.length) return <p>لا توجد كتب.</p>;

  return (
    <Grid>
      {books.map(({ id, url, title, type }) => (
        <Card key={id}>
          <CardHeader>{type}</CardHeader>
          <CardBody>
            <Link href={url} target="_blank" rel="noopener">
              {title}
            </Link>
            <Badge>{type}</Badge>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
}
