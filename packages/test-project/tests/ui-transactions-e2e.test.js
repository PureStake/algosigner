/**
 * Basic e2e tests for the AlgoSigner UI
 *
 * @group ui/transactions
 */

const { accounts, wallet } = require('./common/constants');
const {
  openExtension,
  selectAccount,
  verifyUITransaction,
  openSettingsMenu,
  closeSettingsMenu,
  closeModal,
  goBack,
} = require('./common/helpers');
const {
  CreateWallet,
  ImportAccount,
  DeleteAccount,
} = require('./common/tests');

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();

  ImportAccount(accounts.ui);
});

describe('UI Transactions Tests', () => {
  const amount = Math.ceil(Math.random() * 3); // txn size, modify multiplier for bulk

  let txId; // returned tx id from send txn
  let txTitle; // for tx verification

  beforeEach(async () => {
    jest.setTimeout(15000);
  });

  afterAll(async () => {
    extensionPage.close();
  });

  const returnToAccount = async () => {
    await extensionPage.waitForTimeout(1000);
    await extensionPage.click('#backToAccount');
    await extensionPage.waitForTimeout(1000);
  };

  const verifyDestination = async (account) => {
    const obfuscateAddress = (address) => `${address.slice(0, 10)}.....${address.slice(-10)}`;
    const nameSelector = '#selectedDestination .title';
    const addressSelector = '#selectedDestination .subtitle';
    await extensionPage.waitForSelector(nameSelector);
    await extensionPage.waitForSelector(addressSelector);
    await expect(extensionPage.$eval(nameSelector, (e) => e.innerText)).resolves.toBe(account.name);
    await expect(extensionPage.$eval(addressSelector, (e) => e.innerText)).resolves.toBe(
      obfuscateAddress(account.address)
    );
  };

  test('Add Multisig 1 as a Contact', async () => {
    await extensionPage.click('#contactsList');
    await extensionPage.click('#newContact');
    await extensionPage.type('#contactName', accounts.multisig.subaccounts[0].name);
    await extensionPage.type('#contactAddress', accounts.multisig.subaccounts[0].address);
    await extensionPage.click('#authButton');
    await goBack();
  });

  test('Send Algos Transaction / Regular address', async () => {
    await selectAccount(accounts.ui);

    await extensionPage.click('#sendTransfer');
    await extensionPage.waitForTimeout(100);
    await extensionPage.type('#transferAmount', amount.toString());
    // First we test with a normal address and save it as a contact
    await extensionPage.type('#destinationAddress', accounts.multisig.address);
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
    // Save destination as Account
    await extensionPage.waitForSelector('#saveNewContact');
    await extensionPage.click('#saveNewContact');
    await extensionPage.waitForSelector('#newContactName');
    await extensionPage.type('#newContactName', accounts.multisig.name);
    await extensionPage.waitForSelector('#confirmNewContact');
    await extensionPage.click('#confirmNewContact');
  });

  test('Verify transaction', () => verifyUITransaction(txId, txTitle, accounts.ui.address));

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

  test('Turn off external namespaces', async () => {
    await openSettingsMenu();
    await extensionPage.click('#showNamespacesConfiguration');
    await extensionPage.waitForTimeout(250);
    const namespaceToggles = await extensionPage.$$('#namespaceList .box a');
    for (const toggle of namespaceToggles) {
      await extensionPage.waitForTimeout(250);
      await toggle.click();
    }
    await closeSettingsMenu();
  });

  test('Send Asset Transaction / Account alias', async () => {
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
    // Select an Imported Account from aliases
    await extensionPage.type('#destinationAddress', 't');
    await extensionPage.waitForSelector('.alias-selector-container');
    await extensionPage.keyboard.press('ArrowDown');
    await extensionPage.keyboard.press('ArrowDown');
    await extensionPage.keyboard.press('Enter');
    await verifyDestination(accounts.ui);
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

  test('Verify transaction', () => verifyUITransaction(txId, txTitle, accounts.ui.address));

  test('Transaction Errors: OverSpend / Contact alias', async () => {
    await extensionPage.click('#sendTransfer');
    await extensionPage.waitForSelector('#transferAmount');
    await extensionPage.type('#transferAmount', '900000');
    // Select a Contact from aliases
    await extensionPage.type('#destinationAddress', 't');
    await extensionPage.waitForSelector('.alias-selector-container');
    await extensionPage.keyboard.press('ArrowDown');
    await extensionPage.keyboard.press('Enter');
    await verifyDestination(accounts.multisig);
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

    // Extra goBack to main screen
    await goBack();
  });

  DeleteAccount(accounts.ui);
});
