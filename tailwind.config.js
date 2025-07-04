/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CDF501',
        secondary: '#7B6AF7',
        'primary-hover': '#B8E000',
        'secondary-hover': '#6B5AE7',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
      },
      height: {
        'screen-mobile': '100vh',
        'screen-desktop': '100vh',
      },
      minHeight: {
        'screen-mobile': '100vh',
        'screen-desktop': '100vh',
      },
    },
  },
  plugins: [],
} 