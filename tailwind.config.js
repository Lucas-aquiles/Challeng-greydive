/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], 
   theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(255,255,255,0.5)',
        'black-example': ' #2b2d33',
        'green-example' : '#30bb5c'
      },
      screens: {
        'md': {'min': '308px', 'max': '500px'},
      }

    },
  },
  plugins: [],
}
