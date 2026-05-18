import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F12",
        surface: "#1A1A1F",
        elevated: "#15151A",
        foreground: "#E8E6E1",
        accent: "#F5E6C8",
        muted: "#8A8784",
        border: "#2A2A30",
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Noto Serif KR", "serif"],
      },
      maxWidth: {
        content: "640px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
