const {fontFamily} = require('tailwindcss/defaultTheme')

const darkModeTransitionTime = '200ms'

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/client/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', [...fontFamily.sans]]
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            transition: `color ${darkModeTransitionTime}`,
            code: {
              backgroundColor: theme('colors.red.100'),
              border: `1px solid ${theme('colors.red.200')}`,
              borderRadius: theme('borderRadius.sm'),
              padding: '2px',
              transition: `all ${darkModeTransitionTime}`
            },
            a: {
              color: theme('colors.gray.700'),
              fontWeight: '700',
              position: 'relative',
              transition: `color ${darkModeTransitionTime}`
            },
            'h2,h3,h4,h5': {
              transition: `color ${darkModeTransitionTime}`
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            code: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.700'),
              border: `1px solid ${theme('colors.gray.600')}`
            },
            'pre code': {
              backgroundColor: 'transparent',
              border: 'none'
            },
            a: {
              color: theme('colors.gray.100')
            },
            'h2,h3,h4,h5,strong': {
              color: theme('colors.gray.100')
            }
          }
        }
      })
    }
  },
  variants: {
    extend: {
      ringColor: ['hover'],
      borderStyle: ['dark'],
      typography: ['dark']
    }
  },
  plugins: [require('@tailwindcss/typography')],
  experimental: {
    applyComplexClasses: true,
    extendedFontSizeScale: true,
    defaultLineHeights: true
  }
}
