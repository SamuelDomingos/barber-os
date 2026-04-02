export const THEMES = [
  {
    id: "clean-slate",
    name: "Clean Slate",
    description: "Moderno e minimalista",
    preview: {
      primary: "oklch(0.59 0.2 277.06)",
      background: "oklch(0.98 0 0)",
      card: "oklch(1 0 0)",
    },
    darkPreview: {
      primary: "oklch(0.68 0.16 276.93)",
      background: "oklch(0.21 0.04 264.04)",
      card: "oklch(0.28 0.04 260.33)",
    },
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Profissional e estruturado",
    preview: {
      primary: "oklch(0.48 0.20 260.47)",
      background: "oklch(0.96 0.01 271.34)",
      card: "oklch(0.98 0.01 271.41)",
    },
    darkPreview: {
      primary: "oklch(0.56 0.24 260.92)",
      background: "oklch(0.26 0.03 262.67)",
      card: "oklch(0.35 0.02 255.68)",
    },
  },
  {
    id: "marshmallow",
    name: "Marshmallow",
    description: "Suave e colorido",
    preview: {
      primary: "oklch(0.8 0.14 348.82)",
      background: "oklch(0.97 0.01 267.41)",
      card: "oklch(1 0 0)",
    },
    darkPreview: {
      primary: "oklch(0.8 0.14 348.82)",
      background: "oklch(0.22 0 0)",
      card: "oklch(0.29 0 0)",
    },
  },
  {
    id: "marvel",
    name: "Marvel",
    description: "Ousado e vibrante",
    preview: {
      primary: "oklch(0.55 0.22 27.03)",
      background: "oklch(0.98 0.01 25.23)",
      card: "oklch(0.95 0.02 25.25)",
    },
    darkPreview: {
      primary: "oklch(0.55 0.22 27.03)",
      background: "oklch(0.17 0.01 31.25)",
      card: "oklch(0.22 0.01 34.34)",
    },
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Verde e moderno",
    preview: {
      primary: "oklch(0.67 0.17 153.85)",
      background: "oklch(0.99 0 0)",
      card: "oklch(1 0 0)",
    },
    darkPreview: {
      primary: "oklch(0.67 0.17 153.85)",
      background: "oklch(0.15 0.02 269.18)",
      card: "oklch(0.20 0.02 266.02)",
    },
  },
  {
    id: "vsCode",
    name: "VS Code",
    description: "Técnico e preciso",
    preview: {
      primary: "oklch(0.71 0.15 239.15)",
      background: "oklch(0.97 0.02 225.66)",
      card: "oklch(0.98 0.01 228.79)",
    },
    darkPreview: {
      primary: "oklch(0.71 0.15 239.15)",
      background: "oklch(0.18 0.02 271.27)",
      card: "oklch(0.22 0.02 271.67)",
    },
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export type ThemePreview = (typeof THEMES)[number]["preview"];