import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'nots-primary': {
          300: '#C2D2FC',
          500: '#398BF6',
          700: '#0839B7',
        },
        'nots-danger': {
          300: '#FECCCC',
          500: '#EF4444',
          700: '#9E1C1C',
        },
        'nots-grey': {
          50: '#F8F8F8',
          100: '#EDEDED',
          200: '#C8C8C8',
          300: '#A4A4A4',
          400: '#808080',
          500: '#5B5B5B',
          600: '#505050',
          700: '#303030',
          800: '#101010',
        },
      },
      fontFamily: {
        sans: [
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
