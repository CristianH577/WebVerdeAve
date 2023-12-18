// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
    screens: {
      xs: '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',


      // "2xl": { 'max': '1535px' },
      // xl: { 'max': '1279px' },
      // lg: { 'max': '1023px' },
      // md: { 'max': '767px' },
      // sm: { 'max': '640px','max': '640px' },
      // xs: { 'max': '360px' },


      // 'xxs': { 'min': '0', 'max': '359px' },
      // 'xs': { 'min': '360px', 'max': '639px' },
      // 'sm': { 'min': '640px', 'max': '767px' },
      // 'md': { 'min': '768px', 'max': '1023px' },
      // 'lg': { 'min': '1024px', 'max': '1279px' },
      // 'xl': { 'min': '1280px', 'max': '1535px' },
      // '2xl': { 'min': '1536px' },
    },
  },

  darkMode: "class",

  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            t: '#f1f5f9',
            custom: '#92c5fc',
            // tfix: '#000000',
            // foregroundSolve:'#000000',
            // background: "#fafafa",
          },
        },
        dark: {
          colors: {
            t: '#020617',
            custom: '#eae4d9',
          },
        },
      },
    }),
  ],
}