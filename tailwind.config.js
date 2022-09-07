/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'IbarraReal':['Ibarra Real Nova', "serif"],
      },
      backgroundImage:{
        // 'imgdown':"url('./public/img/pexels-sam-kolder-2387873.jpg')",
        'imgup':"url('/src/Components/Form/img/pexels-sam-kolder-2387873.jpg')"
      }
    },
  },
  plugins: [],
}