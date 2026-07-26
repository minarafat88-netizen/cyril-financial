import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#173152",
          dark: "#060F23",
          light: "#162B56",
        },
        silver: {
          light: "#DBDAD8",
          DEFAULT: "#D1D5DB",
          dark: "#9CA3AF",
        },
        surface: "#F8FAFC",
      },
      backgroundImage: {
        'silver-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 50%, #D1D5DB 100%)',
        'silver-button': 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)',
        'navy-gradient': 'linear-gradient(180deg, #173152 0%, #060F23 100%)',
      },
      boxShadow: {
        'card-soft': '0 10px 30px -5px rgba(11, 27, 61, 0.05)',
        'icon-emboss': 'inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 4px 10px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;