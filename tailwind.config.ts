import type { Config } from 'tailwindcss'

export default {
  darkMode: "class",
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend:{
      fontFamily: {
        sans: ["Reggae One", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
        cinzel: ["Cinzel", "serif"],
        bellefair: ["Bellefair", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#FFCC33",
          dark: "#FFA500",
          light: "#FFFF99",
        },
        secondary: {
          DEFAULT: "#38bc95",
          dark: "#00BFFF",
          light: "#9FE2BF",
        },
      }
    }
  },
  plugins: [],
} satisfies Config

