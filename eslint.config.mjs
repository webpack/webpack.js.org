import cypress from 'eslint-plugin-cypress';
import reactHooks from 'eslint-plugin-react-hooks';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/dist/',
      '**/examples/',
      'src/content/loaders/_*.mdx',
      'src/content/plugins/_*.mdx',
      '.github/**/*.md',
      '**/README.md',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ),
  {
    plugins: {
      cypress,
      'react-hooks': fixupPluginRules(reactHooks),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        ...cypress.configs.globals.languageOptions.globals,
      },

      parser: babelParser,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'no-console': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-duplicate-imports': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react/no-unknown-property': [
        'error',
        {
          ignore: ['watch', 'align'],
        },
      ],
    },
  },
  {
    files: ['src/**/*.jsx'],
  },
  ...compat.extends('plugin:mdx/recommended').map((config) => ({
    ...config,
    files: ['**/*.mdx'],
  })),
  {
    files: ['**/*.mdx'],
    ignores: [
      '**/dist/',
      '**/examples/',
      'src/content/loaders/_*.mdx',
      'src/content/plugins/_*.mdx',
      '.github/**/*.md',
      '**/README.md',
    ],

    languageOptions: {
      globals: {
        Badge: true,
        StackBlitzPreview: true,
      },
    },

    settings: {
      'mdx/code-blocks': true,
    },

    rules: {
      semi: ['off'],
    },
  },
  {
    files: ['**/*.mdx/*.{js,javascript}'],

    rules: {
      indent: ['error', 2],

      quotes: [
        'error',
        'single',
        {
          allowTemplateLiterals: true,
        },
      ],

      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-constant-condition': 'off',
      'no-useless-escape': 'off',
      'no-dupe-keys': 'off',
      'no-duplicate-imports': 'off',
    },
  },
];
