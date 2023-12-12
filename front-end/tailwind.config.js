/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blueCustom1: '#00BFFF',
        skyCustom2: '#87CEFF',
      },
      fontFamily: {
        'titan-one': ['Titan One', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
