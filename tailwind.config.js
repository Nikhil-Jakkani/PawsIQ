/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
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
        'bounce-slow': 'bounce 3s infinite',
        'bounce-subtle': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'paw-walk': 'pawWalk 10s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pawWalk: {
          '0%': { transform: 'translateX(-100%) rotate(0deg)' },
          '100%': { transform: 'translateX(100vw) rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'pet': '0 4px 14px 0 rgba(99, 102, 241, 0.1)',
      },
      backgroundImage: {
        'paw-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-16-8c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2zm32 0c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2zm-16-16c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2zm0 32c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2z' fill='%23a5b4fc' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}