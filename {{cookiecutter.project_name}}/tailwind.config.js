/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'rgb(var(--color-text-base))',
          muted: 'rgb(var(--color-text-muted))',
          inverted: 'rgb(var(--color-text-inverted))'
        }
      },
      backgroundColor: {
        skin: {
          fill: 'rgb(var(--color-fill))',
          'fill-primary': 'rgb(var(--color-fill-primary))',
          'fill-secondary': 'rgb(var(--color-fill-secondary))',
          button: 'rgb(var(--color-button))',
          'button-hover': 'rgb(var(--color-button-hover))'
        }
      },
      animation: {
        fade: 'fade 225ms ease-in-out',
        ripple: 'ripple 550ms ease-out',
        strokedrift: 'strokedrift 1.4s ease-in-out infinite'
      },
      keyframes: {
        fade: {
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
