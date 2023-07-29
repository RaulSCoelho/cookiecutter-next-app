/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#D1E9FC',
          dark: '#103996'
        },
        secondary: {
          light: '#EFD6FF',
          dark: '#8E33FF'
        },
        info: {
          light: '#CAFDF5',
          dark: '#00B8D9'
        },
        success: {
          light: '#77ED8B',
          dark: '#118D57'
        },
        warning: {
          light: '#FFD666',
          dark: '#B76E00'
        },
        error: {
          light: '#FFAC82',
          dark: '#B71D18'
        }
      },
      animation: {
        'fade-in': 'fade-in 225ms ease-in-out',
        ripple: 'ripple 550ms ease-out',
        strokedrift: 'strokedrift 1.4s ease-in-out infinite'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.3' },
          '50%': { opacity: '0.1' },
          '100%': { transform: 'scale(1)', opacity: '0' }
        },
        strokedrift: {
          '0%': { strokeDasharray: '1px, 200px', strokeDashoffset: '0' },
          '50%': { strokeDasharray: '100px, 200px', strokeDashoffset: '-15px' },
          '100%': { strokeDasharray: '100px, 200px', strokeDashoffset: '-125px' }
        }
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
