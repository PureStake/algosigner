const algosdk = require('algosdk');
const { extension, wallet } = require('./constants');

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
  dappPage.on('console', (msg) => console.log('DAPP PAGE LOG:', msg.text()));
  await extensionPage.goto(baseUrl);
}

async function selectAccount(account) {
  const accountSelector = '#account_' + account.name.replace(/\s/g, '');
  await extensionPage.waitForSelector(accountSelector);
  await extensionPage.click(accountSelector);
  await extensionPage.waitForTimeout(500);
}

async function openAccountDetails(account) {
  await selectAccount(account);
  await extensionPage.waitForSelector('#accountName');
  await expect(extensionPage.$eval('#accountName', (e) => e.innerText)).resolves.toBe(account.name);
  await extensionPage.click('#showDetails');
}

async function openSettingsMenu() {
  await extensionPage.waitForSelector('#openSettings');
  await extensionPage.click('#openSettings');
}

async function closeSettingsMenu() {
  await extensionPage.waitForTimeout(500);
  await extensionPage.waitForSelector('#closeSettings');
  await extensionPage.click('#closeSettings');
}

async function goBack() {
  await extensionPage.click('#goBack');
  await extensionPage.waitForTimeout(250);
}

async function closeModal() {
  const modalSelector = '.modal.is-active button.modal-close';
  await extensionPage.waitForSelector(modalSelector);
  await extensionPage.click(modalSelector);
  await extensionPage.waitForTimeout(250);
}

async function inputPassword() {
  await extensionPage.waitForSelector('#enterPassword');
  await extensionPage.type('#enterPassword', wallet.password);
  await extensionPage.click('#authButton');
  await extensionPage.waitForFunction(() => !document.querySelector('#authButton'));
}

// Dapp Helpers
async function getPopup() {
  await dappPage.waitForTimeout(1500);
  const pages = await browser.pages();
  const popup = pages[pages.length - 1];

  popup.on('console', (msg) => console.log('POPUP PAGE LOG:', msg.text()));
  return popup;
}

async function getLedgerSuggestedParams(ledger = 'TestNet') {
  const params = await dappPage.evaluate((ledger) => {
    return Promise.resolve(
      AlgoSigner.algod({
        ledger: ledger,
        path: '/v2/transactions/params',
      })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        })
    );
  }, ledger);

  expect(params).toHaveProperty('consensus-version');
  expect(params).toHaveProperty('fee');
  expect(params.fee).toEqual(0);
  expect(params).toHaveProperty('min-fee');
  expect(params).toHaveProperty('genesis-hash');
  expect(params).toHaveProperty('genesis-id');
  expect(params).toHaveProperty('last-round');

  return {
    fee: params['fee'],
    flatFee: true,
    firstRound: params['last-round'],
    lastRound: params['last-round'] + 1000,
    genesisID: params['genesis-id'],
    genesisHash: params['genesis-hash'],
  };
}

async function sendTransaction(blob) {
  const sendBody = {
    ledger: 'TestNet',
    tx: blob,
  };
  const result = await dappPage.evaluate(async (sendBody) => {
    return Promise.resolve(
      AlgoSigner.send(sendBody)
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        })
    );
  }, sendBody);
  return result;
}

function base64ToByteArray(blob) {
  return new Uint8Array(
    Buffer.from(blob, 'base64')
      .toString('binary')
      .split('')
      .map((x) => x.charCodeAt(0))
  );
}

function byteArrayToBase64(array) {
  return Buffer.from(String.fromCharCode.apply(null, array), 'binary').toString('base64');
}

function decodeObject(obj) {
  return algosdk.decodeObj(obj);
}

function decodeBase64Blob(blob) {
  return decodeObject(base64ToByteArray(blob));
}

function encodeAddress(address) {
  return algosdk.encodeAddress(address);
}

function decodeAddress(address) {
  return algosdk.decodeAddress(address);
}

function mergeMultisigTransactions(signedTransactionsArray) {
  const convertedArray = signedTransactionsArray.map((s) => base64ToByteArray(s.blob));
  const mergedTx = algosdk.mergeMultisigTransactions(convertedArray);
  return byteArrayToBase64(mergedTx);
}

function appendSignToMultisigTransaction(partialTransaction, msigParams, mnemonic) {
  const byteArrayTransaction = base64ToByteArray(partialTransaction.blob);
  const params = {
    version: msigParams.v,
    threshold: msigParams.thr,
    addrs: msigParams.subsig.map((acc) => acc.pk),
  };
  const secretKey = algosdk.mnemonicToSecretKey(mnemonic).sk;
  return algosdk.appendSignMultisigTransaction(byteArrayTransaction, params, secretKey);
}

module.exports = {
  openExtension,
  selectAccount,
  openAccountDetails,
  openSettingsMenu,
  closeSettingsMenu,
  goBack,
  closeModal,
  inputPassword,
  getPopup,
  getLedgerSuggestedParams,
  sendTransaction,
  base64ToByteArray,
  byteArrayToBase64,
  decodeObject,
  decodeBase64Blob,
  encodeAddress,
  decodeAddress,
  mergeMultisigTransactions,
  appendSignToMultisigTransaction,
};
