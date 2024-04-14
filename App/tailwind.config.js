/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.slate.100'),
            pre: {
              backgroundColor: '#1E1F22',
            },
            blockquote: {
              borderLeft: '2px solid white',
            },
          }
        },
      }),
      colors: {
        'od-context': '#111214',
        'od-1': '#1E1F22',
        'od-2': '#222427',
        'od-3': '#2B2D31',
        'od-4': '#313338',
        'od-5': '#41444B',
        'od-accent': '#9A85C7',
        'od-hover-1': 'rgba(255, 255, 255, 0.05)',
        'od-hover-1.5': 'rgba(255, 255, 255, 0.1)',
        'od-hover-2': 'rgba(31, 32, 35, 0.5)',
        'od-hover-2.5': 'rgba(31, 32, 35, 0.3)',
        'od-icon': '#B5B5B5',
        'od-darken': 'rgba(30, 31, 34, 0.75)',

        'ol-context': '',
        'ol-1': '#E3E5E8',
        'ol-2': '#EDEEEF',
        'ol-3': '#F2F3F5',
        'ol-4': '#FFFFFF',
        'ol-accent': '',
        'ol-hover-1': 'rgb(56, 61, 71, 0.1)',
        'ol-hover-1.5': '',
        'ol-hover-2': '',
        'ol-hover-2.5': '',
        'ol-icon': '#1E1F22',
        'ol-darken': 'rgba(227, 229, 232, 0.7)',
      },
      maxWidth: {
        '240': '60rem',
        '160': '40rem',
        '120': '30rem',
        '80': '20rem',
        '40': '10rem',
        '32': '8rem',
        '12': '3rem',
      },
      minWidth: {
        '160': '40rem',
        '120': '30rem',
        '80': '20rem',
        '40': '10rem',
        '32': '8rem',
        '12': '3rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

