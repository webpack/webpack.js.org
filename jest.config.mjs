export default {
  verbose: true,
  testEnvironment: "node",
  setupFiles: ["./src/setupTests.js"],
  // react-router 8 is ESM only, so the component tests that mount a router
  // have to be ESM too; .jsx is not an extension node recognizes on its own.
  extensionsToTreatAsEsm: [".jsx"],
  transform: {
    "^.+\\.(m|c)?jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(scss|css)$": "<rootDir>/src/components/__mocks__/styleMock.js",
    "\\.svg$": "<rootDir>/src/components/__mocks__/svgMock.js",
    "\\.(png|jpg|jpeg|ico)$": "<rootDir>/src/components/__mocks__/fileMock.js",
    // ESM resolves the whole import graph up front, so a generated file that is
    // absent has to be mapped rather than mocked virtually.
    "_supporters\\.json$":
      "<rootDir>/src/components/__mocks__/supportersMock.js",
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
