// src/components/Loader.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(0,0,0,0.1);
  border-top-color: #0077cc;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 2rem auto;
`;

export default function Loader() {
  return <Spinner />;
}
