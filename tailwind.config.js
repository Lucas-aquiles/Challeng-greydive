/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], 
   theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(255,255,255,0.5)',
      },

    },
  },
  plugins: [],
}
