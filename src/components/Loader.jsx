import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  margin: 3rem auto;
  width: 48px;
  height: 48px;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s infinite linear;
`;

export default function Loader() {
  return <Spinner />;
}
