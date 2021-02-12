const algosdk = require('algosdk');
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
  dappPage.on('console', (msg) => console.log('DAPP PAGE LOG:', msg.text()));
  await extensionPage.goto(baseUrl);
}

async function selectAccount(account) {
  const accountSelector = '#account_' + account.name.replace(/\s/g, '');
  await extensionPage.waitForSelector(accountSelector);
  await extensionPage.click(accountSelector);
  await extensionPage.waitForTimeout(500);
}

async function goBack() {
  await extensionPage.click('#goBack');
  await extensionPage.waitForTimeout(500);
}

async function closeModal() {
  const modalSelector = '.modal.is-active button.modal-close';
  await extensionPage.waitForSelector(modalSelector);
  await extensionPage.click(modalSelector);
}

// Dapp Helpers
async function getPopup() {
  await dappPage.waitForTimeout(1500);
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

async function signTransaction(transaction) {
  const signedTransaction = await dappPage.evaluate(async (transaction) => {
    const signPromise = AlgoSigner.signMultisig(transaction)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    await window.authorizeSign();
    return await Promise.resolve(signPromise);
  }, transaction);
  await expect(signedTransaction).toHaveProperty('txID');
  await expect(signedTransaction).toHaveProperty('blob');
  return signedTransaction;
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
  goBack,
  closeModal,
  getPopup,
  getLedgerParams,
  signTransaction,
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
