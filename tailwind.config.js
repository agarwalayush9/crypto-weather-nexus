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
        animation: {
          'slide-in-right': 'slide-in-right 0.5s ease-out',
        },
        keyframes: {
          'slide-in-right': {
            '0%': { transform: 'translateX(100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  }
