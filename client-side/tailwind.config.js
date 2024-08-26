/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primarycolor: 'linear-gradient(to right, #1A2980, #26D0CE)',
        secondarycolor: '#101010',
        thirdcolor: '#4D4D4D',
        fourthcolor: '#FF0034',
        fifthcolor: '#1E1E1E',
      },
    },
  },
  plugins: [],
};
