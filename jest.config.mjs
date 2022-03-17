import jestConfig from 'jest-config';
export default {
  verbose: true,
  transform: {},
  moduleFileExtensions: [...jestConfig.defaults.moduleFileExtensions, 'mjs'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
    '**/*.test.mjs',
  ],
};
