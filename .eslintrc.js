module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
    'cypress/globals': true,
  },
  plugins: ['markdown', 'cypress', 'react-hooks'],
  rules: {
    'no-console': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'react/jsx-uses-react': 'off', // no longer needed with new jsx transform
    'react/react-in-jsx-scope': 'off', // ditto
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    { files: ['src/**/*.jsx'] }, // eslint would lint .js only by default
    {
      files: ['**/*.mdx'],
      extends: ['plugin:mdx/recommended'],
      globals: {
        Badge: true,
      },
      rules: {
        semi: ['off'],
      },
      settings: {
        'mdx/code-blocks': true,
      },
    },
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
    {
      files: ['**/*.{md,mdx}/*.{js,javascript}'], // we don't lint ts at the moment
      rules: {
        indent: ['error', 2],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-constant-condition': 'off',
        'no-useless-escape': 'off',
        'no-dupe-keys': 'off',
      },
    },
  ],
};
