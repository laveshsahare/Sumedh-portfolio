/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF9F6',
        charcoal: '#2D2D2D',
        pitch: '#000000',
      },
      fontFamily: {
        jack: ['"Jack Armstrong"', '"Comic Sans MS"', 'cursive'],
      },
    },
  },
  plugins: [],
}