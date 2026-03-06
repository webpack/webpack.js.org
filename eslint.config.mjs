import { defineConfig, globalIgnores } from "eslint/config";
import configs from "eslint-config-webpack/configs.js";
import cypressPlugin from "eslint-plugin-cypress";
import * as mdx from "eslint-plugin-mdx";
import globals from "globals";

export default defineConfig([
  globalIgnores([
    "**/dist/",
    "**/examples/",
    "**/printable.mdx",
    "src/content/loaders/_*.mdx",
    "src/content/plugins/_*.mdx",
    "src/content/contribute/Governance-*.mdx",
    ".github/**/*.md",
    "**/README.md",
    "src/mdx-components.mjs",
  ]),
  {
    extends: [configs.recommended],
    rules: {
      "no-console": "off",
      "n/no-unsupported-features/node-builtins": "off",
    },
  },
  {
    extends: [configs["browser/recommended-outdated-module"]],
    files: [
      "src/components/**/*.{js,jsx}",
      "src/utilities/test-local-storage.js",
      "src/*.jsx",
      "src/sw.js",
    ],
    rules: {
      "unicorn/prefer-global-this": "off",
    },
  },
  {
    files: ["cypress/**/*.js"],
    extends: [cypressPlugin.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...cypressPlugin.configs.globals.languageOptions.globals,
      },
    },
    rules: {
      "no-unused-expressions": "off",
    },
  },
  {
    ...mdx.flat,
    files: ["**/*.mdx"],
    linterOptions: {
      // Buggy with mdx
      reportUnusedDisableDirectives: "off",
    },
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
    }),
  },
  {
    ...mdx.flatCodeBlocks,
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          globalReturn: true,
          impliedStrict: true,
        },
      },
    },
    files: ["**/*.mdx/*.{js,jsx,javascript}"],
    rules: {
      ...configs["markdown/recommended"].find(
        (item) => item.name === "markdown/code-blocks/js",
      ).rules,
      "func-names": "off",
      "no-duplicate-imports": "off",
      "n/exports-style": "off",
      "import/no-amd": "off",
      "import/extensions": "off",
      "import/default": "off",
      "unicorn/prefer-top-level-await": "off",
    },
  },
]);
