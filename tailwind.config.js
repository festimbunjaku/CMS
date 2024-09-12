/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        silver: '#c4bbafff',
        cinereous: '#a5978bff',
        liver: '#5c4742ff',
        redwood: '#8d5b4cff',
        caputMortuum: '#5a2a27ff',
      },
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#6f4f28',    // Coffee Brown
          secondary: '#a67b5b',  // Cinnamon
          accent: '#b2d8b4',     // Mint Green
          neutral: '#dcdcdc',   // Light Gray
          cream: "#f5f5dc", // Cream
        },
      },
      // You can add more custom themes here
    ],
  },
}
