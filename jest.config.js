module.exports = {
    preset: "jest-puppeteer",
    globals: {
      URL: "http://localhost:9000"
    },
    testMatch: [
      "**/tests/**/*.test.js"
    ],
    verbose: true
}