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
    'no-console': 'off',
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
      files: ['**/*.{md,mdx}'],
      processor: 'markdown/markdown',
    },
    {
      files: ['**/*.{md,mdx}/*.{js,javascript}'], // we don't lint ts at the moment
      rules: {
        indent: ['error', 2],
        quotes: ['error', 'single'],
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-constant-condition': 'off',
        'no-useless-escape': 'off',
        'no-dupe-keys': 'off',
      },
    },
  ],
};
