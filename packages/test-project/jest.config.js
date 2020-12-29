module.exports = {
    preset: "jest-puppeteer",
    globals: {
      URL: "http://localhost:9000"
    },
    testMatch: [
      "**/*.test.{js,ts,tsx}"
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    verbose: true,
    runner: "groups",
    //maxConcurrency: 2,
    // mock for chrome does not work directly with puppeteer as browser is overwritten
    // setupFiles: [
    //   "jest-webextension-mock"
    // ],
    // Ignoring the test directory for coverage
    "collectCoverageFrom": [
        "**/src/*.{js,ts,tsx}",
    ],
    "coverageDirectory": './coverage'
}