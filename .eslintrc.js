module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
    'cypress/globals': true,
  },
  plugins: ['markdown', 'cypress'],
  globals: {
    __DEV__: true,
  },
  rules: {
    'no-undef': 2,
    'no-unreachable': 2,
    'no-unused-vars': 0,
    'no-console': 0,
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'react/jsx-uses-react': 'off', // no longer needed with new jsx transform
    'react/react-in-jsx-scope': 'off', // ditto
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    { files: ['src/**/*.jsx'] }, // eslint would lint .js only by default
    {
      files: ['src/content/**/*.{md,mdx}'],
      processor: 'markdown/markdown',
    },
    {
      files: ['src/content/**/*.{md,mdx}/*.{js,javascript}'], // we don't lint ts at the moment
      rules: {
        indent: ['error', 2],
        quotes: ['error', 'single'],
        'no-undef': 0,
        'no-constant-condition': 0,
        'no-useless-escape': 0,
        'no-dupe-keys': 0,
      },
    },
  ],
};
