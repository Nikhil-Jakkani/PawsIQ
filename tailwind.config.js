/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated brand blue mapped onto the indigo scale so Home page color changes without refactoring classes
        indigo: {
          50: '#eef4ff',
          100: '#dbe7ff',
          200: '#b9d2ff',
          300: '#93bcff',
          400: '#6aa1ff',
          500: '#3f84ff',
          600: '#145ae6', // primary brand color
          700: '#0f47b4',
          800: '#0b3688',
          900: '#07265d',
          950: '#041839',
        },
        // Pet-themed colors
        'pet-blue': {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36aaf5',
          500: '#0c8ee7',
          600: '#0270c4',
          700: '#0359a0',
          800: '#074b85',
          900: '#0a406f',
        },
        'pet-purple': {
          50: '#faf5ff',
          100: '#f4e8ff',
          200: '#ebd5ff',
          300: '#dbb4fe',
          400: '#c384fc',
          500: '#aa55f7',
          600: '#9333ea',
          700: '#7c22ce',
          800: '#6821a8',
          900: '#541c87',
        },
        'pet-pink': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        'pet-orange': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'pet': '0 4px 14px 0 rgba(99, 102, 241, 0.1)',
      },
      backgroundImage: {
        'paw-pattern': "none",
      },
    },
  },
  plugins: [],
}