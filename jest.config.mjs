export default {
  verbose: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(scss|css)$": "<rootDir>/src/components/__mocks__/styleMock.js",
    "\\.svg$": "<rootDir>/src/components/__mocks__/svgMock.js",
  },
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
    "**/src/components/**/*.test.jsx",
  ],
  testPathIgnorePatterns: ["/node_modules/"],
};
