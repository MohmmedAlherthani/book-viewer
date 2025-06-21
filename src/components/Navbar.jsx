// src/components/Navbar.jsx
import React from "react";
import styled from "styled-components";

const Bar = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing(2)};
  color: white;
  text-align: center;
  font-size: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export default function Navbar() {
  return <Bar>📚 Professional Book Explorer</Bar>;
}
