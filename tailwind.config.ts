import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#111010",
          soft: "#181614",
          line: "#2A2724",
        },
        parchment: "#F3EEE3",
        gold: {
          DEFAULT: "#C6A05C",
          dim: "#8F754A",
          bright: "#E4C888",
        },
        smoke: "#A79C8B",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        content: "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
