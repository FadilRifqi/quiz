import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode support
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#2D2D2D", // Dark Gray
          secondary: "#595959", // Medium Gray
          accent: "#A6A6A6", // Light Gray
          neutral: "#D9D9D9", // Very Light Gray
          base: "#F5F5F5", // Off White
          info: "#737373", // Gray
          success: "#8C8C8C", // Light Gray
          warning: "#BFBFBF", // Very Light Gray
          error: "#E6E6E6", // Very Light Gray
          textPrimary: "#1A1A1A", // Very Dark Gray for text
          textSecondary: "#404040", // Dark Gray for text
          textAccent: "#737373", // Medium Gray for text
          textNeutral: "#A6A6A6", // Light Gray for text
        },
        dark: {
          primary: "#0D0D0D", // Very Dark Gray
          secondary: "#262626", // Dark Gray
          accent: "#404040", // Medium Dark Gray
          neutral: "#595959", // Medium Gray
          base: "#1A1A1A", // Dark Gray
          info: "#737373", // Gray
          success: "#8C8C8C", // Light Gray
          warning: "#A6A6A6", // Light Gray
          error: "#BFBFBF", // Light Gray
          textPrimary: "#F5F5F5", // Off White for text
          textSecondary: "#D9D9D9", // Very Light Gray for text
          textAccent: "#A6A6A6", // Light Gray for text
          textNeutral: "#737373", // Medium Gray for text
        },
      },
    },
  },
  plugins: [],
};
export default config;
