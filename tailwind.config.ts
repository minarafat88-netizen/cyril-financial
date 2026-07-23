import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A192F",
        "navy-dark": "#060F1E",
        "navy-light": "#11263F",
        emerald: "#10B981",
        "emerald-dark": "#059669",
        gold: "#D4AF37",
        slate: "#64748B",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 40px -15px rgba(10, 25, 47, 0.08)",
        glass: "0 8px 32px 0 rgba(10, 25, 47, 0.12)",
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;