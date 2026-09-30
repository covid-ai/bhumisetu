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
        govnavy: {
          800: "#0e1e38",
          900: "#0b1526",
          950: "#070c17",
        },
        govblue: {
          500: "#1e60d5",
          600: "#134db5",
          700: "#0c3b94",
        },
        govorange: {
          500: "#ea580c",
          600: "#c2410c",
        },
        govgreen: {
          600: "#15803d",
          700: "#166534",
        }
      },
    },
  },
  plugins: [],
};
export default config;
