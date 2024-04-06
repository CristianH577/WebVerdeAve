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
      backgroundImage:{
        'ladrillo': "url('../src/assets/imgs/game/ladrillo.jpg')",
        'piso': "url('../src/assets/imgs/game/piso.jpg')",
        'puerta': "url('../src/assets/imgs/game/puerta.png')",
        'char': "url('../src/assets/imgs/game/char.png')",
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