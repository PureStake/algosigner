/**
 * Basic e2e tests for the AlgoSigner UI
 *
 * @group ui/accounts
 */

const { wallet } = require('./common/constants');
const { openExtension } = require('./common/helpers');
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

  test('Create An Account, Step 1 - Enter Account Name', async () => {
    await extensionPage.waitForSelector('#addAccount');
    await extensionPage.click('#addAccount');
    await extensionPage.waitForSelector('#createAccount');
    await extensionPage.click('#createAccount');
    await extensionPage.type('#setAccountName', createdAccount.name);
    await extensionPage.click('#nextStep');
  });

  test('Create An Account, Step 2 - Get Mnemonic', async () => {
    await extensionPage.click('#accountAddress');
    createdAccount.address = await extensionPage.$eval('#accountAddress', (e) => e.innerText); // setup for another test

    for (let i = 1; i <= 25; i++) {
      mnemonicArray[i - 1] = await extensionPage.$eval(
        `[data-key-index="${i}"]`,
        (e) => e.dataset['word']
      );
    }
    await extensionPage.waitForSelector('#recordCheckbox');
    await extensionPage.click('#recordCheckbox');
    await extensionPage.click('#nextStep');
  });

  test('Create An Account, Step 3 - Use Mnemonic', async () => {
    // Wait for mnemonic word buttons to be available
    await extensionPage.waitForSelector('[data-index]:not([disabled])');

    // We test the remove word functionality by first filling with random words
    const randomWords = [];
    for (let i = 0; i < 5; i++) {
      randomWords.push(mnemonicArray[i * 5 + Math.round(Math.random() * 4)]);
      await extensionPage.click(`#${randomWords[i]}:not([disabled]):not(.is-link)`);
    }
    await expect(extensionPage.$eval('#enterMnemonic', (e) => e.value)).resolves.toBe(
      randomWords.join(' ')
    );
    await extensionPage.waitForTimeout(200);
    for (let i = 0; i < 5; i++) {
      await extensionPage.click(`button.is-small.is-link`);
    }
    await expect(extensionPage.$eval('#enterMnemonic', (e) => e.value)).resolves.toBe('');
    await extensionPage.waitForTimeout(200);

    // We build the actual mnemonic
    for (let i = 0; i < 25; i++) {
      await extensionPage.click(`#${mnemonicArray[i]}:not([disabled]):not(.is-link)`);
    }
    await expect(extensionPage.$eval('#enterMnemonic', (e) => e.value)).resolves.toBe(
      mnemonicArray.join(' ')
    );

    await extensionPage.click('#nextStep');
  });

  test('Create an Account, Step 4 - Write Account into Storage', async () => {
    await extensionPage.waitForSelector('#enterPassword');
    await extensionPage.type('#enterPassword', wallet.password);
    await extensionPage.waitForTimeout(200);
    await extensionPage.click('#authButton');
  });

  VerifyAccount(createdAccount);

  DeleteAccount(createdAccount);
});
