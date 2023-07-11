/** @type {import('tailwindcss').Config} */

function withColorEffect(variableName) {
  return props => {
    const { opacity, opacityValue, brightness } = props
    let color = `rgb(var(${variableName}))`
    if (opacity !== undefined) {
      color = `rgba(var(${variableName}), ${opacity})`
    }
    if (opacityValue !== undefined) {
      color = `rgba(var(${variableName}), ${opacityValue})`
    }
    if (brightness !== undefined) {
      color += ` brightness(${brightness})`
    }
    return color
  }
}

const fillProps = {
  fill: withColorEffect('--color-fill'),
  'fill-primary': withColorEffect('--color-fill-primary'),
  'fill-secondary': withColorEffect('--color-fill-secondary')
}

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        skin: {
          ...fillProps,
          base: withColorEffect('--color-text-base'),
          muted: withColorEffect('--color-text-muted'),
          inverted: withColorEffect('--color-text-inverted')
        }
      },
      backgroundColor: {
        skin: {
          ...fillProps,
          button: withColorEffect('--color-button'),
          'button-hover': withColorEffect('--color-button-hover')
        }
      },
      borderColor: {
        skin: {
          ...fillProps
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
