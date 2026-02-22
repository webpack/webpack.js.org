export default {
  verbose: true,
  projects: [
    {
      displayName: "utils",
      testEnvironment: "node",
      transform: {},
      moduleFileExtensions: [
        "js",
        "mjs",
        "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node",
      ],
      testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)",
        "**/*.test.mjs",
      ],
      testPathIgnorePatterns: ["/node_modules/", "\\.test\\.jsx$"],
    },
    {
      displayName: "components",
      testEnvironment: "jsdom",
      transform: {
        "^.+\\.jsx?$": "babel-jest",
      },
      moduleNameMapper: {
        "\\.(scss|css)$": "<rootDir>/src/components/__mocks__/styleMock.js",
        "\\.svg$": "<rootDir>/src/components/__mocks__/svgMock.js",
      },
      moduleFileExtensions: ["js", "jsx", "json", "node"],
      testMatch: ["**/src/components/**/*.test.jsx"],
    },
  ],
};
