const {fontFamily} = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', [...fontFamily.sans]]
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            code: {
              backgroundColor: theme('colors.red.100'),
              border: `1px solid ${theme('colors.red.200')}`
            },
            a: {
              color: theme('colors.gray.700'),
              fontWeight: '700',
              position: 'relative'
            }
          }
        }
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')],
  experimental: {
    applyComplexClasses: true,
    extendedFontSizeScale: true,
    defaultLineHeights: true
  }
}
