/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marigold: {
          DEFAULT: '#F28C28',
          light: '#F8A95A',
          dark: '#D77212'
        },
        kumkum: {
          DEFAULT: '#C8341C',
          light: '#E24C34',
          dark: '#A62713'
        },
        turmeric: {
          DEFAULT: '#F5B700',
          light: '#FFCB33',
          dark: '#D49E00'
        },
        indigo: {
          DEFAULT: '#1B2A5A',
          light: '#2B3E7A',
          dark: '#111C40'
        },
        peacock: {
          DEFAULT: '#0E7C7B',
          light: '#179E9D',
          dark: '#085C5B'
        },
        terracotta: {
          DEFAULT: '#B5532A',
          light: '#CD693D',
          dark: '#93401D'
        },
        paper: {
          DEFAULT: '#FFF6E5',
          dark: '#F7EBD1',
          pure: '#FFFCF5'
        },
        charcoal: {
          DEFAULT: '#2B2B2B',
          muted: '#5A5A5A',
          border: '#E2DAC8'
        }
      },
      fontFamily: {
        yatra: ['"Yatra One"', 'cursive', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        'clay': '0 8px 24px -4px rgba(181, 83, 42, 0.18)',
        'marigold': '0 8px 30px -4px rgba(242, 140, 40, 0.35)',
        'indigo': '0 12px 36px -6px rgba(27, 42, 90, 0.25)',
        'chalk': '0 0 15px rgba(255, 255, 255, 0.65)'
      }
    },
  },
  plugins: [],
}
