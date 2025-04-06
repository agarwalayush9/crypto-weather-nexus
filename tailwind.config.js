/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        colors: {
          brand: '#6366f1', // optional for buttons/highlights
          ocean: {
            dark: '#09203f',
            mid: '#1c3a5f',
            light: '#3a6ea5',
          },
        },
      },
    },
    plugins: [],
  }
  