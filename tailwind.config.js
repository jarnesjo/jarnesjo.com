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
              backgroundImage: `linear-gradient(0deg,${theme('colors.red.300')} 30%,transparent 0)`,
              textDecoration: 'none',
              fontWeight: '700',
              '&:hover': {
                backgroundImage: `linear-gradient(0deg,${theme('colors.red.300')} 0,${theme(
                  'colors.red.300'
                )})`
              },
              '&:before': {
                content: '',
                display: ' block',
                height: '.5em',
                position: ' absolute',
                left: ' 0',
                right: ' 0',
                bottom: ' 0',
                zIndex: '-1'
              },
              '&:after': {
                backgroundColor: theme('colors.red.700'),
                transform: 'scaleX(0)',
                transformOrigin: '0 50%',
                transition: 'transform .3s cubic-bezier(.86,0,.07,1)'
              }
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
