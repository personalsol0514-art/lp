import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
        maru: ["var(--font-zen-maru)", "var(--font-noto-sans-jp)", "sans-serif"],
        "zen-maru": ["var(--font-zen-maru)", "var(--font-noto-sans-jp)", "sans-serif"],
        kurenaido: [
          "var(--font-zen-kurenaido)",
          "var(--font-noto-sans-jp)",
          "sans-serif",
        ],
        yomogi: ["var(--font-yomogi)", "var(--font-noto-sans-jp)", "sans-serif"],
        klee: ["var(--font-klee-one)", "var(--font-noto-sans-jp)", "sans-serif"],
        point: ["var(--font-oswald)", "var(--font-noto-sans-jp)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "marquee-slow": "marquee 54s linear infinite",
      },
      fontSize: {
        label: ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.2em" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.7" }],
        body: ["0.875rem", { lineHeight: "1.75" }],
        "body-lg": ["1rem", { lineHeight: "1.75" }],
        lead: ["1rem", { lineHeight: "1.7" }],
        "lead-sm": ["0.875rem", { lineHeight: "1.7" }],
        heading: ["1.25rem", { lineHeight: "1.4" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.35" }],
        display: ["1.75rem", { lineHeight: "1.3" }],
        "display-sm": ["1.5rem", { lineHeight: "1.35" }],
      },
    },
  },
  plugins: [],
};

export default config;

