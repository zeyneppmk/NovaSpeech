/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // dark mode aktif
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#dee4f0',
          border: '#DBE2EF',
          primary: '#3F72AF',
          text: '#112D4E'
        }
      }
    }
  },
  plugins: [],
}
