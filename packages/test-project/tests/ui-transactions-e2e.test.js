/**
 * Basic e2e tests for the AlgoSigner UI
 *
 * @group ui/transactions
 */

const { accounts, wallet } = require('./common/constants');
const { openExtension, selectAccount, closeModal, goBack } = require('./common/helpers');
const { CreateWallet, ImportAccount, DeleteAccount } = require('./common/tests');

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();

  ImportAccount(accounts.ui);
});

describe('UI Transactions Tests', () => {
  const amount = Math.ceil(Math.random() * 9); // txn size, modify multiplier for bulk

  let txId; // returned tx id from send txn
  let txTitle; // for tx verification

  beforeEach(async () => {
    jest.setTimeout(15000);
  });

  afterAll(async () => {
    extensionPage.close();
  });

  const verifyTransaction = async () => {
    const txSelector = `[data-transaction-id="${txId}"]`;
    await extensionPage.waitForSelector(txSelector);
    await extensionPage.click(txSelector);
    await expect(extensionPage.$eval('#txTitle', (e) => e.innerText)).resolves.toBe(txTitle);
    await expect(
      extensionPage.$eval(
        '.modal.is-active [data-transaction-id]',
        (e) => e.dataset['transactionId']
      )
    ).resolves.toBe(txId);
    await expect(
      extensionPage.$eval(
        '.modal.is-active [data-transaction-sender]',
        (e) => e.dataset['transactionSender']
      )
    ).resolves.toBe(accounts.ui.address);
    await closeModal();
  };

  const returnToAccount = async () => {
    await extensionPage.waitForTimeout(1000);
    await extensionPage.click('#backToAccount');
    await extensionPage.waitForTimeout(1000);
    return;
  };

  test('Send Algos Transaction', async () => {
    await selectAccount(accounts.ui);

    await extensionPage.click('#sendTransfer');
    await extensionPage.waitForTimeout(100);
    await extensionPage.type('#transferAmount', amount.toString());
    await extensionPage.type('#toAddress', accounts.ui.address);
    await extensionPage.type('#note', 'AutoTest Send Algo');
    await extensionPage.click('#submitTransfer');
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', wallet.password);
    await extensionPage.waitForSelector('#authButton');
    await extensionPage.click('#authButton');
    await extensionPage.waitForSelector('#txId');
    // setup tx details for next test
    txId = await extensionPage.$eval('#txId', (e) => e.innerText);
    txTitle = 'Payment';
    await returnToAccount();
  });

  test('Verify transaction', verifyTransaction);

  test('Check Asset details', async () => {
    const assetSelector = '[data-asset-id]';
    await extensionPage.waitForSelector(assetSelector);
    const assetId = await extensionPage.$eval(assetSelector, (e) => e.dataset['assetId']);
    const assetBalance = await extensionPage.$eval(assetSelector, (e) => e.dataset['assetBalance']);
    await extensionPage.click(assetSelector);
    await expect(
      extensionPage.$eval(`.modal ${assetSelector}`, (e) => e.dataset['assetId'])
    ).resolves.toBe(assetId);
    await expect(
      extensionPage.$eval(`.modal ${assetSelector}`, (e) => e.dataset['assetBalance'])
    ).resolves.toBe(assetBalance);
    await closeModal();
    const thereIsFullAssetList = await extensionPage.$('#showAssets');
    if (thereIsFullAssetList) {
      await extensionPage.click('#showAssets');
      await extensionPage.waitForSelector(`.modal [data-asset-id="${assetId}"]`);
      await closeModal();
    }
    await goBack();
  });

  test('Send Asset Transaction', async () => {
    await selectAccount(accounts.ui);

    await extensionPage.click('#sendTransfer');
    await extensionPage.waitForTimeout(100);
    await extensionPage.click('#selectAsset');
    await extensionPage.waitForTimeout(100);
    await extensionPage.waitForSelector('#asset-13169404');
    await extensionPage.click('#asset-13169404');
    await extensionPage.waitForTimeout(500);
    // Test correct decimal handling
    await extensionPage.type('#transferAmount', `0.000000000${amount}`);
    const actualAmount = await extensionPage.$eval('#transferAmount', (e) => {
      const inputValue = e.value;
      e.value = '';
      return inputValue;
    });
    expect(actualAmount).toMatch('0.000000');
    // Test actual transfer
    await extensionPage.type('#transferAmount', `0.00000${amount}`);
    await extensionPage.type('#toAddress', accounts.ui.address);
    await extensionPage.type('#note', 'AutoTest Send E2E Asset');
    await extensionPage.click('#submitTransfer');
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', wallet.password);
    await extensionPage.waitForSelector('#authButton');
    await extensionPage.click('#authButton');
    await extensionPage.waitForSelector('#txId');
    txId = await extensionPage.$eval('#txId', (e) => e.innerText);
    txTitle = 'Asset transfer';
    await returnToAccount();
  });

  test('Verify transaction', verifyTransaction);

  test('Transaction Errors: OverSpend', async () => {
    await extensionPage.click('#sendTransfer');
    await extensionPage.waitForSelector('#transferAmount');
    await extensionPage.type('#transferAmount', '900000');
    await extensionPage.type('#toAddress', accounts.ui.address);
    await extensionPage.type('#note', 'AutoTest Overspend Algo');
    await extensionPage.click('#submitTransfer');
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', wallet.password);
    await extensionPage.waitForSelector('#authButton');
    await extensionPage.click('#authButton');
    await extensionPage.waitForSelector('#tx-error');

    let pageError = await extensionPage.$eval('#tx-error', (e) => e.innerText);
    await expect(pageError).toMatch("Overspending. Your account doesn't have sufficient funds.");

    await closeModal();
    await goBack();
  });

  test('Transaction Errors: Invalid Field - Amount', async () => {
    await extensionPage.click('#sendTransfer');
    await extensionPage.waitForSelector('#transferAmount');
    await extensionPage.type('#transferAmount', '9999999999.999999');
    await extensionPage.type('#toAddress', accounts.ui.address);
    await extensionPage.type('#note', 'AutoTest Invalid Amount');
    await extensionPage.click('#submitTransfer');
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', wallet.password);
    await extensionPage.waitForSelector('#authButton');
    await extensionPage.click('#authButton');
    await extensionPage.waitForSelector('#tx-error');

    let pageError = await extensionPage.$eval('#tx-error', (e) => e.innerText);
    expect(pageError).toMatch('One or more fields are not valid. Please check and try again.');

    await closeModal();
    await goBack();
    // Extra goBack to main screen
    await goBack();
  });

  DeleteAccount(accounts.ui);
});
