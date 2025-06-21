// src/components/ExecutionOptions.jsx
import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const Tab = styled.button`
  background: ${({ active, theme }) =>
    active ? theme.colors.accent : theme.colors.surface};
  color: ${({ active, theme }) =>
    active ? theme.colors.text : theme.colors.muted};
  border: none;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) =>
  theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  transition: background 0.2s;
  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.colors.accent : theme.colors.surface};
  }
`;

export default function ExecutionOptions({ mode, setMode }) {
  return (
    <Wrap>
      {["list", "search", "filter"].map((m) => (
        <Tab
          key={m}
          active={mode === m}
          onClick={() => setMode(m)}
        >
          {{
            list: "عرض الكتب",
            search: "بحث داخل كتاب",
            filter: "تصنيفات الكتب",
          }[m]}
        </Tab>
      ))}
    </Wrap>
  );
}
