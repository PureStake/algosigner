const algosdk = require('algosdk');
const { extension, wallet } = require('./constants');

const listenToPageLogs = async (page, name) => {
  page.on('console', async (message) => {
    const args = await Promise.all(
      message
        .args()
        .map((jsHandle) =>
          jsHandle.executionContext().evaluate((obj) => JSON.stringify(obj), jsHandle)
        )
    );
    const type = message.type().substr(0, 3).toUpperCase();
    let text = message.text();
    console.log(`${name} ${type}:`, text);
    for (let i = 0; i < args.length; ++i) {
      const parsedJson = JSON.parse(args[i]);
      if (parsedJson !== text) console.log(parsedJson);
    }
  });
};

// UI Helpers
async function openExtension() {
  const targets = await browser.targets();

  const extensionTarget = targets.find(({ _targetInfo }) => {
    return _targetInfo.title === extension.name && _targetInfo.type === 'background_page';
  });
  const backgroundPage = await extensionTarget.page();

  const extensionUrl = extensionTarget._targetInfo.url || '';
  const [, , extensionID] = extensionUrl.split('/');

  const baseUrl = `chrome-extension://${extensionID}/${extension.html}`;

  await listenToPageLogs(backgroundPage, 'BACKGROUND PAGE');
  await listenToPageLogs(extensionPage, 'EXTENSION PAGE');
  await listenToPageLogs(dappPage, 'DAPP PAGE');
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

async function verifyUITransaction(id, title, address) {
  const txSelector = `[data-transaction-id="${id}"]`;
  await extensionPage.waitForSelector(txSelector);
  await extensionPage.click(txSelector);
  await expect(extensionPage.$eval('#txTitle', (e) => e.innerText)).resolves.toBe(title);
  await expect(
    extensionPage.$eval('.modal.is-active [data-transaction-id]', (e) => e.dataset['transactionId'])
  ).resolves.toBe(id);
  await expect(
    extensionPage.$eval(
      '.modal.is-active [data-transaction-sender]',
      (e) => e.dataset['transactionSender']
    )
  ).resolves.toBe(address);
  await closeModal();
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
  await extensionPage.waitForFunction(() => document.querySelector('#authButton') === null);
  await expect(extensionPage.select('#authButton')).rejects.toThrow();
}

async function getOpenedTab() {
  await dappPage.waitForTimeout(1500);
  const pages = await browser.pages();
  const tab = pages[pages.length - 1];

  await listenToPageLogs(tab, 'OPENED TAB');
  return tab;
}

// Dapp Helpers
async function getPopup() {
  await dappPage.waitForTimeout(1500);
  const pages = await browser.pages();
  const popup = pages[pages.length - 1];

  await listenToPageLogs(popup, 'OPENED POPUP');
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

async function getSDKSuggestedParams() {
  const algodServer = 'https://testnet-algorand.api.purestake.io/ps2';
  const token = { 'X-API-Key': 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab' };
  const algodClient = new algosdk.Algodv2(token, algodServer, '');

  const params = await algodClient.getTransactionParams().do();

  expect(params).toHaveProperty('flatFee');
  expect(params.flatFee).toEqual(false);
  expect(params).toHaveProperty('fee');
  expect(params.fee).toEqual(0);
  expect(params).toHaveProperty('genesisHash');
  expect(params).toHaveProperty('genesisID');
  expect(params).toHaveProperty('firstRound');
  expect(params).toHaveProperty('lastRound');

  return params;
}

async function signDappTxnsWAlgoSigner(transactionsToSign, testFunction) {
  const timestampedName = `popupTest-${new Date().getTime().toString()}`;
  if (testFunction) {
    await dappPage.exposeFunction(timestampedName, async () => {
      try {
        await testFunction();
      } catch (e) {
        console.log(e);
      }
    });
  }

  await dappPage.waitForTimeout(2000);
  const signedTransactions = await dappPage.evaluate(
    async (transactionsToSign, testFunction, testTimestamp) => {
      const signPromise = AlgoSigner.signTxn(transactionsToSign)
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });

      if (testFunction) {
        await window[testTimestamp]();
      }

      await window['authorizeSignTxn']();
      return await Promise.resolve(signPromise);
    },
    transactionsToSign,
    !!testFunction,
    timestampedName
  );
  for (let i = 0; i < signedTransactions.length; i++) {
    const signedTx = signedTransactions[i];
    if (signedTx) {
      await expect(signedTx).toHaveProperty('txID');
      await expect(signedTx).toHaveProperty('blob');
    }
  }
  return signedTransactions;
}

async function signDappTxnsWAlgorand(transactionsToSign, testFunction) {
  const timestampedName = `popupTest-${new Date().getTime().toString()}`;
  if (testFunction) {
    await dappPage.exposeFunction(timestampedName, async () => {
      try {
        await testFunction();
      } catch (e) {
        console.log(e);
      }
    });
  }

  await dappPage.waitForTimeout(2000);
  const signedTransactions = await dappPage.evaluate(
    async (transactionsToSign, testFunction, testTimestamp) => {
      const signPromise = algorand
        .signTxns(transactionsToSign)
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });

      if (testFunction) {
        await window[testTimestamp]();
      }

      await window['authorizeSignTxn']();
      return await Promise.resolve(signPromise);
    },
    transactionsToSign,
    !!testFunction,
    timestampedName
  );
  for (let i = 0; i < signedTransactions.length; i++) {
    const signedTx = signedTransactions[i];
    if (signedTx) {
      await expect(signedTx).toHaveProperty('length');
    }
  }
  return signedTransactions;
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

function buildSdkTx(tx) {
  return new algosdk.Transaction(tx);
}

function prepareWalletTx(tx) {
  return {
    txn: byteArrayToBase64(tx.toByte()),
  };
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
  verifyUITransaction,
  openSettingsMenu,
  closeSettingsMenu,
  goBack,
  closeModal,
  inputPassword,
  getOpenedTab,
  getPopup,
  getLedgerSuggestedParams,
  getSDKSuggestedParams,
  signDappTxnsWAlgoSigner,
  signDappTxnsWAlgorand,
  sendTransaction,
  base64ToByteArray,
  byteArrayToBase64,
  decodeObject,
  decodeBase64Blob,
  encodeAddress,
  decodeAddress,
  buildSdkTx,
  prepareWalletTx,
  mergeMultisigTransactions,
  appendSignToMultisigTransaction,
};
