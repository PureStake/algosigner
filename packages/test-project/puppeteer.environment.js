/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer');
const path = require('path');
const NodeEnvironment = require('jest-environment-node');

function srcPath(subpath) {
  return path.resolve(__dirname, '../../' + subpath);
}

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    this.global.browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXEC_PATH || '',
      headless: false,
      defaultViewport: null,
      // slowMo: 50, // For watching tests more closely in debugging
      args: [
        '--no-sandbox',
        //'--no-sandbox-and-elevated', //For Windows
        '--window-size=350,700',
        `--disable-extensions-except=${srcPath('dist')}`,
        `--load-extension=${srcPath('dist')}`,
      ],
    });
    const pages = await this.global.browser.pages();
    this.global.page = pages[0];
  }

  async teardown() {
    await super.teardown();
    this.global.browser.close();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;
