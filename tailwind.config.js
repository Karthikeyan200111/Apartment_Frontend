/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'right': '10px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

