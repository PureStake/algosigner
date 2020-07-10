module.exports = {
    preset: "jest-puppeteer",
    globals: {
      URL: "http://localhost:9000"
    },
    testMatch: [
      "**/tests/**/e2e.test.js"
    ],
    verbose: true
}