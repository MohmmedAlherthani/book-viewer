import React from "react";
import styled from "styled-components";

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const Tab = styled.button`
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.muted)};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  box-shadow: ${({ active }) =>
    active ? "0 4px 8px rgba(0,0,0,0.15)" : "inset 0 1px 3px rgba(0,0,0,0.1)"};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;

export default function ExecutionOptions({ mode, setMode }) {
  return (
    <Tabs>
      <Tab active={mode === "list"} onClick={() => setMode("list")}>
        عرض الكتب
      </Tab>
      <Tab active={mode === "search"} onClick={() => setMode("search")}>
        بحث داخل كتاب
      </Tab>
      <Tab active={mode === "filter"} onClick={() => setMode("filter")}>
        تصنيفات الكتب
      </Tab>
    </Tabs>
  );
}
