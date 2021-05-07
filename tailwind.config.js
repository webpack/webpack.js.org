module.exports = {
  mode: 'jit',
  purge: ['./src/components/**/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        14: '14px',
      },
    },

    colors: {
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
      blue: {
        200: '#8dd6f9',
        400: '#1d78c1',
        600: '#465E69',
        800: '#2B3A42',
      },
      gray: {
        100: '#f2f2f2',
        200: '#dedede',
        300: '#999',
        500: '#666',
        600: '#535353',
        700: '#333',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
