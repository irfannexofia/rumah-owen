import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f3ec",
        ink: "#171716",
        muted: "#6e6a61",
        olive: "#344235",
        moss: "#6b765f",
        line: "#ded6c9"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 24px 60px rgba(23, 23, 22, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
