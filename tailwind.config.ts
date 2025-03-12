import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#8A2BE2",
          dark: "#4B0082",
        },
        gray: {
          900: "#111827",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
