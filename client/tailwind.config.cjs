const windmill = require("@windmill/react-ui/config");

/** @type {import('tailwindcss').Config} */
module.exports = windmill({
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Tailwind v2 uses 'purge' instead of 'content'
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // backgroundImage: {
      //   "custom-bg": "url('/src/assets/images/hero-bg.jpeg')", // Custom background image
      // },
      height: {
        "80vh": "80vh", // Custom 80% screen height
        "60vh": "60vh", // Custom 60% screen height
        "50vh": "50vh", // Custom 50% screen height
        "40vh": "40vh", // Custom 40% screen height
      },
      colors: {
        royalPurple: {
          DEFAULT: "#6300FF",
          light: "#874DFF", // Lighter variant
          dark: "#4000B3", // Darker variant
        },
      },
    },
  },
  variants: {
    extend: { extend: {
      ringWidth: ['focus'],
      outline: ['focus'],
    },},
  },
  plugins: [],
});
