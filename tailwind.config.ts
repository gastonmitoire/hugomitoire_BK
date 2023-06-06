import type { Config } from 'tailwindcss'

export default {
  darkMode: "class",
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // default breakpoints but with 40px removed
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      // you can configure the container to be centered
      // center: true,

      // or have default horizontal padding
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
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
  plugins: [require("@tailwindcss/typography")],
} satisfies Config

