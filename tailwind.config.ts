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
      backgroundImage: {
        checkmark: `url("data:image/svg+xml,%3Csvg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 7L5 11.5L12 1.5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        indeterminate: `url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIgZm9jdXNhYmxlPSJmYWxzZSI+PHBhdGggZD0iTTUgMTJIMTkiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+PC9zdmc+")`,
        overflowGradient:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.00)0%, #FFF 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
