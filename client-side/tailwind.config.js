/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to top right, #1A2980, #26D0CE)',
      },
      colors: {
        primarycolor: '#26D0CE',
        secondarycolor: '#101010',
        thirdcolor: '#4D4D4D',
        fourthcolor: '#FF0034',
        fifthcolor: '#1E1E1E',
      },
    },
    fontFamily: {
      fontcustom: ['"Poppins"', 'sans-serif'],
    },
  },
  plugins: [],
};
