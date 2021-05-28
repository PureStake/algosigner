module.exports = {
  testMatch: ['**/*.test.{js,ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: './puppeteer.environment.js',
  verbose: true,
  runner: 'groups',
  // Ignoring the test directory for coverage
  collectCoverageFrom: ['**/src/*.{js,ts,tsx}'],
  coverageDirectory: './coverage',
  testTimeout: 15000,
};
