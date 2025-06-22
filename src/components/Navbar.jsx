import React from "react";
import styled from "styled-components";
import { ReactComponent as BookIcon } from "../assets/book.svg"; // assume you have an SVG

const Bar = styled.header`
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 0.75rem;
  & > svg {
    width: 100%;
    height: 100%;
    fill: white;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

export default function Navbar() {
  return (
    <Bar>
      <Logo>
        <BookIcon />
      </Logo>
      <Title>Book Explorer</Title>
    </Bar>
  );
}
