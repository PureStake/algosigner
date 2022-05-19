import path from 'path';
import puppeteer, { Browser, Page } from 'puppeteer';
import NodeEnvironment from 'jest-environment-node';

function srcPath(subpath) {
  return path.resolve(__dirname, '../../' + subpath);
}
const SAMPLE_PAGE = 'https://google.com/';

class PuppeteerEnvironment extends NodeEnvironment {
  constructor({ globalConfig, projectConfig }, context) {
    super({ globalConfig, projectConfig }, context);
  }

  async setup() {
    await super.setup();
    const browser: Browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXEC_PATH || '',
      headless: false,
      defaultViewport: null,
      // slowMo: 50, // For watching tests more closely in debugging
      args: [
        '--no-sandbox',
        //'--no-sandbox-and-elevated', //For Windows
        '--window-size=450,700',
        `--disable-extensions-except=${srcPath('dist')}`,
        `--load-extension=${srcPath('dist')}`,
      ],
    });
    const pages = await browser.pages();
    this.global.dappPage = pages[0];
    // We use a sample page because algosigner.min.js doesn't load on empty pages
    (this.global.dappPage as Page).goto(SAMPLE_PAGE);
    this.global.extensionPage = await browser.newPage();
    this.global.browser = browser;
  }

  async teardown() {
    await super.teardown();
    const browser = this.global.browser as Browser;
    browser.close();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = PuppeteerEnvironment;
