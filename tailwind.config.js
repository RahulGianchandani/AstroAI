/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {},
    screens: {
      'sm': '576px',

      'md': '768px',

      'lg': '992px',

      'xl': '1200px',

      'xxl': '1400px',

      '2xl': '1536px',
    },
  },
  plugins: [],
  corePlugins: {
    visibility: false,
  },
};
