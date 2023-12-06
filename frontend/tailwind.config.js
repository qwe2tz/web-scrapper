/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        card: '0 1 32%',
      },

      maxWidth: {
        'third': '32%',
        'half': '49%',
      },

      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        hd: '1920px',
        three: '1280px'
      },

      height: {
        '400': '400px',
      },

  
      fontFamily: {
        sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    }
  },
  plugins: [],
  extend: {
  }
}
