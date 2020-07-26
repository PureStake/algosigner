const pathToExtension = require('path').join('../..', 'dist');

module.exports = {
  launch: {
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    headless: false,
    args: [
      `--no-sandbox`,
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  },
  server: {
    command: 'node server.js',
    port: 9000
  }
}