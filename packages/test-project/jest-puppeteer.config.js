const path = require('path');

function srcPath(subpath) {
  return path.resolve(__dirname, '../../' + subpath);
}

module.exports = {
  launch: {
    executablePath: process.env.PUPPETEER_EXEC_PATH || '',
    headless: false,
    //slowMo: 50, // For watching tests more closely in debugging
    args: [
      `--no-sandbox`,
      //`--no-sandbox-and-elevated`, //For Windows
      `--disable-extensions-except=${srcPath('dist')}`,
      `--load-extension=${srcPath('dist')}`,
    ],
  },
};
