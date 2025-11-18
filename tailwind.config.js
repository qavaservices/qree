/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Monochrome palette
        'charcoal': '#1a1a1a',
        'dark-gray': '#2d2d2d',
        'gray': '#4a4a4a',
        'light-gray': '#6b6b6b',
        'lighter-gray': '#9a9a9a',
        'lightest-gray': '#d0d0d0',
        'off-white': '#f5f5f5',
      },
    },
  },
  plugins: [],
}

