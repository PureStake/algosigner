const { wallet, extension } = require('./constants');
const { openAccountDetails, goBack, closeModal, inputPassword, getPopup } = require('./helpers');

// Common Tests
async function WelcomePage() {
  test('Welcome Page Title', async () => {
    await expect(extensionPage.title()).resolves.toMatch(extension.name);
  });

  test('Create New Wallet', async () => {
    await extensionPage.waitForSelector('#setPassword');
    await extensionPage.click('#setPassword');
    await extensionPage.waitForSelector('#createWallet');
    await expect(extensionPage.$eval('.mt-2', (e) => e.innerText)).resolves.toMatch(
      'my_1st_game_was_GALAGA!'
    );
  });
}

async function SetPassword() {
  test('Set new Wallet Password', async () => {
    await extensionPage.type('#setPassword', wallet.password);
    await extensionPage.type('#confirmPassword', wallet.password);
    await extensionPage.click('#createWallet');
  });
}

async function SelectTestNetLedger() {
  test('Switch Ledger', async () => {
    await extensionPage.waitForSelector('#selectLedger');
    await extensionPage.click('#selectLedger');
    await extensionPage.waitForSelector('#selectTestNet');
    await extensionPage.click('#selectTestNet');
  });
}

async function CreateWallet() {
  WelcomePage();
  SetPassword();
  SelectTestNetLedger();
}

async function ImportAccount(account) {
  test(`Import Account ${account.name}`, async () => {
    await extensionPage.waitForSelector('#addAccount');
    await extensionPage.click('#addAccount');
    await extensionPage.waitForSelector('#importAccount');
    await extensionPage.click('#importAccount');
    await extensionPage.waitForSelector('#accountName');
    await extensionPage.type('#accountName', account.name);
    await extensionPage.type('#enterMnemonic', account.mnemonic);
    await extensionPage.click('#nextStep');
    await inputPassword();
  });

  await VerifyAccount(account);
}

async function VerifyAccount(account) {
  test(`Verify Account Info (${account.name})`, async () => {
    await openAccountDetails(account);
    await expect(extensionPage.$eval('#accountAddress', (e) => e.innerText)).resolves.toBe(
      account.address
    );
    await closeModal();
    await goBack();
  });
}

async function DeleteAccount(account) {
  test(`Delete Account (${account.name})`, async () => {
    await openAccountDetails(account);
    await extensionPage.click('#deleteAccount');
    await extensionPage.type('#enterPassword', wallet.password);
    await extensionPage.waitForTimeout(200);
    await extensionPage.click('#authButton');
  });

  test('Verify Account Deleted', async () => {
    await extensionPage.waitForSelector('#addAccount');
    const accountSelector = '#account_' + account.name.replace(/\s/g, '');
    await expect(extensionPage.select(accountSelector)).rejects.toThrow();
  });
}

// Dapp Tests
async function ConnectAlgoSigner() {
  test('Expose Authorize Functions', async () => {
    async function authorizeDapp() {
      const popup = await getPopup();
      await popup.waitForSelector('#grantAccess');
      await popup.click('#grantAccess');
    }
    await dappPage.exposeFunction('authorizeDapp', authorizeDapp);

    async function authorizeSign() {
      const popup = await getPopup();
      await popup.waitForSelector('#approveTx');
      await popup.click('#approveTx');
      await popup.waitForSelector('#enterPassword');
      await popup.type('#enterPassword', wallet.password);
      await popup.waitForSelector('#authButton');
      await popup.click('#authButton');
    }
    await dappPage.exposeFunction('authorizeSign', authorizeSign);

    async function authorizeSignTxn() {
      const popup = await getPopup();

      // Atomic txs Approval
      try {
        await popup.waitForTimeout(500);
        const txAmount = await popup.$eval('.dropdown-trigger span', (e) => +e.innerText.slice(-1));

        for (let i = 0; i < txAmount; i++) {
          await popup.click('#toggleApproval');
          await popup.waitForTimeout(250);
        }
      } catch (e) {
        // Maybe a Single transaction
      }

      await popup.waitForSelector('#approveTx');
      await popup.click('#approveTx');
      await popup.waitForSelector('#enterPassword');
      await popup.type('#enterPassword', wallet.password);
      await popup.waitForSelector('#authButton');
      await popup.click('#authButton');
    }
    await dappPage.exposeFunction('authorizeSignTxn', authorizeSignTxn);

    // Groups of Groups Approvals
    async function authorizeSignTxnGroups(amount) {
      const popup = await getPopup();
      for (let i = 0; i < amount; i++) {
        try {
          await authorizeSignTxn();
          await popup.waitForTimeout(2000);
        } catch (e) {
          console.log('Error:');
          console.log(e);
        }
      }
    }
    await dappPage.exposeFunction('authorizeSignTxnGroups', authorizeSignTxnGroups);
  });

  test('Connect Dapp through content.js', async () => {
    const connected = await dappPage.evaluate(async () => {
      const connectPromise = AlgoSigner.connect();
      await window.authorizeDapp();
      return await connectPromise;
    });
    await expect(connected).toEqual({});
  });
}

module.exports = {
  WelcomePage,
  SetPassword,
  SelectTestNetLedger,
  CreateWallet,
  ImportAccount,
  VerifyAccount,
  DeleteAccount,
  ConnectAlgoSigner,
};
