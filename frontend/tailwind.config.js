/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
    backgroundImage: {
      gradientDark: 'linear-gradient(180deg, #000000 0%, rgba(6, 8, 15, 0) 100%)',
      gradientDarkReverse: 'linear-gradient(180deg, rgba(6, 8, 15, 0) 0%, #06080F 100%)',
    },
    borderWidth: {
      1: '1px',
      3: '3px',
    },
    boxShadow: {
      black: '0px 2px 4px rgba(0, 0, 0, 0.12)',
    },
    zIndex: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
    }
  }
}
