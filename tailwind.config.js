/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        sci: {
          base: '#030305',
          panel: '#0a0a0c',
          border: 'rgba(255, 255, 255, 0.1)',
          accent: '#ffffff',
          dim: '#888888',
        }
      },
      screens: {
        'xs': '380px',
      },
      letterSpacing: {
        tight: '-0.025em',
        tighter: '-0.05em',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        slide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        slide: 'slide 1s infinite linear',
      }
    },
  },
  plugins: [],
}
