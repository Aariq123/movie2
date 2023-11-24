/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner2': 'inset 1000px 1000px 1000px 1000px black',
      },
      height: {
        '90vh': '90vh',
      }
    },
  },
  plugins: [],
}

