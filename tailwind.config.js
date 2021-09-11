module.exports = {
  mode: 'jit',
  purge: ['./src/components/**/*.{js,jsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
      print: { raw: 'print' },
    },
    extend: {
      fontSize: {
        14: '14px',
      },
      gridTemplateColumns: {
        contributors: 'repeat(auto-fit, 36px)',
      },
    },
    spacing: {
      0: '0px',
      5: '5px',
      10: '10px',
      20: '20px',
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
        800: '#222', // non-branding color
        900: '#101619', // non-branding color, used by dark mode
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
