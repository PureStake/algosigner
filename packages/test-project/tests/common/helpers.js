const { extension } = require('./constants');

// UI Helpers
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

// Dapp Helpers
async function getPopup() {
  await dappPage.waitForTimeout(1000);
  const pages = await browser.pages();
  return pages[pages.length - 1];
}

async function getLedgerParams() {
  const params = await dappPage.evaluate(() => {
    return Promise.resolve(
      AlgoSigner.algod({
        ledger: 'TestNet',
        path: '/v2/transactions/params',
      })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        })
    );
  });

  expect(params).toHaveProperty('consensus-version');
  expect(params).toHaveProperty('fee');
  expect(params.fee).toEqual(0);
  expect(params).toHaveProperty('min-fee');
  expect(params).toHaveProperty('genesis-hash');
  expect(params).toHaveProperty('genesis-id');
  expect(params).toHaveProperty('last-round');
  return params;
}

module.exports = {
  openExtension,
  getPopup,
  getLedgerParams,
};
