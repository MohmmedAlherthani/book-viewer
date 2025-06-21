// src/theme.js
export const theme = {
  colors: {
    primary: "#0077cc",
    background: "#f5f8fa",
    surface: "#ffffff",
    text: "#333333",
    muted: "#666666",
    accent: "#ffcc00",
  },
  spacing: (scale) => `${scale * 8}px`,
  radii: {
    sm: "4px",
    md: "8px",
    lg: "16px",
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.1)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
  },
};
