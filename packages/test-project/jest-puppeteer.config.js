const path = require('path');

function srcPath(subpath) {
  return path.resolve(__dirname, '../../' + subpath);
}

module.exports = {
  launch: {
    executablePath: process.env.PUPPETEER_EXEC_PATH || '',
    headless: false,
    args: [
      `--no-sandbox`,
      `--disable-extensions-except=${srcPath('dist')}`,
      `--load-extension=${srcPath('dist')}`
    ]
  },
  server: {
    command: 'node server.js',
    port: 9000
  }
}