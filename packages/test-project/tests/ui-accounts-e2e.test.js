/**
 * Basic e2e tests for the AlgoSigner UI
 *
 * @group ui/accounts
 */

const { wallet } = require('./common/constants');
const { openExtension, getOpenedTab } = require('./common/helpers');
const { CreateWallet, VerifyAccount, DeleteAccount } = require('./common/tests');

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();
});

// Create a new account in AlgoSigner
describe('Create Account', () => {
  const createdAccount = {
    name: 'Created-Account',
  };
  let mnemonicArray = [];
  let openedTab;

  test('Create An Account, Step 0 - Open Account creation tab', async () => {
    await extensionPage.waitForSelector('#addAccount');
    await extensionPage.click('#addAccount');
    await extensionPage.waitForSelector('#createAccount');
    await extensionPage.click('#createAccount');
    openedTab = await getOpenedTab();
  });

  test('Create An Account, Step 1 - Enter Account Name', async () => {
    await openedTab.type('#setAccountName', createdAccount.name);
    await openedTab.click('#nextStep');
  });

  test('Create An Account, Step 2 - Get Mnemonic', async () => {
    await openedTab.click('#accountAddress');
    createdAccount.address = await openedTab.$eval('#accountAddress', (e) => e.innerText); // setup for another test

    for (let i = 1; i <= 25; i++) {
      mnemonicArray[i - 1] = await openedTab.$eval(
        `[data-key-index="${i}"]`,
        (e) => e.dataset['word']
      );
    }
    await openedTab.waitForSelector('#recordCheckbox');
    await openedTab.click('#recordCheckbox');
    await openedTab.click('#nextStep');
  });

  test('Create An Account, Step 3 - Use Mnemonic', async () => {
    // Wait for mnemonic word buttons to be available
    await openedTab.waitForSelector('[data-index]:not([disabled])');

    // We test the remove word functionality by first filling with random words
    const randomWords = [];
    for (let i = 0; i < 5; i++) {
      randomWords.push(mnemonicArray[i * 5 + Math.round(Math.random() * 4)]);
      await openedTab.click(`#${randomWords[i]}:not([disabled]):not(.is-link)`);
    }
    await expect(openedTab.$eval('#enterMnemonic', (e) => e.value)).resolves.toBe(
      randomWords.join(' ')
    );
    await openedTab.waitForTimeout(200);
    for (let i = 0; i < 5; i++) {
      await openedTab.click(`button.is-small.is-link`);
    }
    await expect(openedTab.$eval('#enterMnemonic', (e) => e.value)).resolves.toBe('');
    await openedTab.waitForTimeout(200);

    // We build the actual mnemonic
    for (let i = 0; i < 25; i++) {
      await openedTab.click(`#${mnemonicArray[i]}:not([disabled]):not(.is-link)`);
    }
    await expect(openedTab.$eval('#enterMnemonic', (e) => e.value)).resolves.toBe(
      mnemonicArray.join(' ')
    );

    await openedTab.click('#nextStep');
  });

  test('Create an Account, Step 4 - Write Account into Storage', async () => {
    await openedTab.waitForSelector('#enterPassword');
    await openedTab.type('#enterPassword', wallet.password);
    await openedTab.waitForTimeout(200);
    await openedTab.click('#authButton');
    await openedTab.waitForSelector('[data-account-name]');
    await expect(
      openedTab.$eval('[data-account-name]', (e) => e.dataset['accountName'])
    ).resolves.toBe(createdAccount.name);
    await openedTab.close();
    await extensionPage.reload();
  });

  VerifyAccount(createdAccount);

  DeleteAccount(createdAccount);
});
