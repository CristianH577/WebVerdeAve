// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        'ladrillo': "url('../src/assets/imgs/game/ladrillo.webp')",
        'piso': "url('../src/assets/imgs/game/piso.webp')",
        'puerta': "url('../src/assets/imgs/game/puerta.webp')",
        'char': "url('../src/assets/imgs/game/char.webp')",
      },

      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'rotate(-5deg)' },
          '20%, 40%, 60%, 80%': { transform: 'rotate(5deg)' },
        },
        shakeXLeft: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-30%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shakeXRight: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(30%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shakeYTop: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(30%)' },
          '100%': { transform: 'translateY(0%)' },
        }
      },
      animation: {
        shake: 'shake 1.5s ease-in-out infinite',
        shakeXLeft: 'shakeXLeft 2s infinite',
        shakeXRight: 'shakeXRight 2s infinite',
        shakeYTop: 'shakeYTop 2s infinite',
      }
    },
    screens: {
      xs: '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    maxWidth: {
      'screen': '100vw',
    }
  },

  darkMode: "class",

  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            game_p: '#FFAE40',
            game_s1: '#FFD040',
            game_s2: '#FF4C00',
            // content1: '#B9F73E',
            // foreground:'#E6399B'
          },
        },
        dark: {
          colors: {
            game_p: '#FF9400',
            game_s1: '#FFDD73',
            game_s2: '#A63100',
            // content1: '#679B00',
            // foreground:'#CD0074'
          },
        },
      },
    }),
  ],
}