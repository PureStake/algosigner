const { extension } = require('./constants');

async function openExtension() {
  const targets = await browser.targets();

  const extensionTarget = targets.find(({ _targetInfo }) => {
    return _targetInfo.title === extension.name && _targetInfo.type === 'background_page';
  });

  const extensionUrl = extensionTarget._targetInfo.url || '';
  const [, , extensionID] = extensionUrl.split('/');

  const baseUrl = `chrome-extension://${extensionID}/${extension.html}`;

  extensionPage.on('console', (msg) => console.log('EXTENSION PAGE LOG:', msg.text()));
  await extensionPage.goto(baseUrl);
}

module.exports = {
  openExtension,
};
