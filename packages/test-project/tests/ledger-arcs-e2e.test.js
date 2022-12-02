/**
 * Basic e2e tests for ensuring functionality of Ledger devices
 *
 * @group ledger/arcs
 */

const { wallet } = require('./common/constants');
const {
  openExtension,
  getOpenedTab,
  selectAccount,
  verifyUITransaction,
  getLedgerSuggestedParams,
  decodeBase64Blob,
  buildSdkTx,
  prepareWalletTx,
  sendTransaction,
  signDappTxnsWAlgorand,
} = require('./common/helpers');
const {
  CreateWallet,
  VerifyAccount,
  ConnectWithAlgorandObject,
} = require('./common/tests');

jest.setTimeout(18000);
jest.retryTimes(0, { logErrorsBeforeRetry: true });
const testAssetIndex = 13169404;
const linkedLedgerAccount = {
  name: 'Ledger Account',
};
let openedTab;
let ledgerParams;

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();
  ConnectWithAlgorandObject();

  test('Get TestNet params', async () => {
    ledgerParams = await getLedgerSuggestedParams();
  });
});

// Create a new account in AlgoSigner
describe('Link Ledger Account', () => {
  test('Link An Account, Step 1 - Begin Linking Process', async () => {
    await extensionPage.waitForSelector('#addAccount');
    await extensionPage.click('#addAccount');
    await extensionPage.click('#linkAccount');
    await extensionPage.click('#nextStep');
    openedTab = await getOpenedTab();
  });

  test('Link An Account, Step 2 - Select Address to Link and Name', async () => {
    await openedTab.waitForSelector('#loadAccounts');
    await openedTab.click('#loadAccounts');
    await openedTab.waitForSelector('[data-public-address]');
    linkedLedgerAccount.address = await openedTab.$eval(
      '[data-public-address]',
      (e) => e.innerText
    );
    await openedTab.type('#accountName', linkedLedgerAccount.name);
    await openedTab.click('#nextStep');
  });

  test('Link an Account, Step 3 - Write Account into Storage', async () => {
    await openedTab.waitForSelector('#enterPassword');
    await openedTab.type('#enterPassword', wallet.password);
    await openedTab.waitForTimeout(200);
    await openedTab.click('#authButton');
  });

  test('Link An Account, Step 4 - Close tab and reload extension', async () => {
    await openedTab.waitForTimeout(5000);
    await openedTab.close();
    await openExtension(); // Reloads extension
  });

  VerifyAccount(linkedLedgerAccount);
});

describe('dApp functionalities', () => {
  let txPromise;
  let signedBlob;

  test('Create Asset Opt-in tx and send it to AlgoSigner', async () => {
    await extensionPage.waitForSelector('#addAccount');

    const optinTx = prepareWalletTx(
      buildSdkTx({
        type: 'axfer',
        from: linkedLedgerAccount.address,
        to: linkedLedgerAccount.address,
        assetIndex: testAssetIndex,
        note: new Uint8Array(Buffer.from('Opt-in to gAlgo')),
        amount: 0,
        ...ledgerParams,
        fee: 1000,
      })
    );
    txPromise = signDappTxnsWAlgorand([optinTx]);
    await extensionPage.waitForTimeout(3000);
  });

  test('Send Tx to Ledger Device', async () => {
    await extensionPage.waitForTimeout(3000);
    openedTab = await getOpenedTab();
    await openedTab.waitForSelector('a[href*="asset"]');
    const sentAssetIndex = await openedTab.$eval('a[href*="asset"]', (e) => e.innerText);
    await expect(+sentAssetIndex).toBe(testAssetIndex);
    await openedTab.waitForSelector('#nextStep');
    await openedTab.click('#nextStep');
  });

  test('Verify and Send transaction', async () => {
    // Obtain ID from open tab before closing
    await openedTab.waitForSelector('#txResponseDetail');
    const printedResponse = JSON.parse(
      await openedTab.$eval('#txResponseDetail', (e) => e.innerText)
    );
    const printedSignedTx = decodeBase64Blob(printedResponse[0]);
    const dappResponse = await Promise.resolve(txPromise);
    signedBlob = dappResponse[0];
    const dappSignedTx = decodeBase64Blob(signedBlob);

    await expect(printedResponse[0]).toBe(dappResponse[0]);
    await expect(dappSignedTx).toHaveProperty('sig');
    await expect(dappSignedTx).toHaveProperty('txn');
    await expect(dappSignedTx['txn']).toHaveProperty('type');
    await expect(dappSignedTx['txn']['type']).toBe('axfer');
    await expect(dappSignedTx['txn']).toHaveProperty('xaid');
    await expect(dappSignedTx['txn']['xaid']).toBe(testAssetIndex);
    await expect(dappSignedTx).toStrictEqual(printedSignedTx);
  });

  test('Wait for Tx to complete and reload extension', async () => {
    await sendTransaction(signedBlob);
    await openedTab.waitForTimeout(8000);
    await openedTab.close();
    await openExtension(); // Reloads extension
  });
});

describe('UI functionalities', () => {
  let signedTxId;

  test('Opt-out of test Asset', async () => {
    await selectAccount(linkedLedgerAccount);
    const assetSelector = `[data-asset-id="${testAssetIndex}"]`;
    await extensionPage.waitForSelector(assetSelector);
    const assetBalance = +(await extensionPage.$eval(
      assetSelector,
      (e) => e.dataset['assetBalance']
    ));
    await expect(assetBalance).toBe(0);
    await extensionPage.click(assetSelector);
    await extensionPage.waitForSelector('#assetOptOut');
    await extensionPage.click('#assetOptOut');
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', wallet.password);
    await extensionPage.waitForTimeout(200);
    await extensionPage.click('#authButton');
    await extensionPage.waitForTimeout(3000);
  });

  test('Send Tx to Ledger Device', async () => {
    openedTab = await getOpenedTab();
    await openedTab.waitForSelector('a[href*="asset"]');
    const sentAssetIndex = await openedTab.$eval('a[href*="asset"]', (e) => e.innerText);
    await expect(+sentAssetIndex).toBe(testAssetIndex);
    await openedTab.waitForSelector('#nextStep');
    await openedTab.click('#nextStep');
    await openedTab.waitForSelector('#txResponseDetail');
    signedTxId = await openedTab.$eval('#txResponseDetail', (e) => e.innerText);
    await openedTab.waitForTimeout(1000);
    await openedTab.close();
  });

  test('Verify Asset is not present', async () => {
    await extensionPage.waitForTimeout(8000);
    await openExtension(); // Reloads extension
    await selectAccount(linkedLedgerAccount);
    await extensionPage.waitForTimeout(3000);
    const assetSelector = `[data-asset-id="${testAssetIndex}"]`;
    await expect(extensionPage.select(assetSelector)).rejects.toThrow();
  });

  test('Verify transaction', () => verifyUITransaction(signedTxId, 'Asset transfer', linkedLedgerAccount.address));
});
