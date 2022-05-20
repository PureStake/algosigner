const { wallet, extension } = require('./constants');
const { openAccountDetails, goBack, closeModal, inputPassword, getPopup } = require('./helpers');

// Common Tests
function WelcomePage() {
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

function SetPassword() {
  test('Set new Wallet Password', async () => {
    await extensionPage.type('#setPassword', wallet.password);
    await extensionPage.type('#confirmPassword', wallet.password);
    await extensionPage.click('#createWallet');
  });
}

function SelectTestNetLedger() {
  test('Switch Ledger', async () => {
    await extensionPage.waitForSelector('#selectLedger');
    await extensionPage.click('#selectLedger');
    await extensionPage.waitForSelector('#selectTestNet');
    await extensionPage.click('#selectTestNet');
  });
}

function CreateWallet() {
  WelcomePage();
  SetPassword();
  SelectTestNetLedger();
}

function ImportAccount(account) {
  test(`Import Account ${account.name}`, async () => {
    await extensionPage.waitForSelector('#addAccount');
    await extensionPage.click('#addAccount');
    await extensionPage.click('#addAccount');
    await extensionPage.waitForSelector('.modal.is-active');
    await extensionPage.waitForSelector('#importAccount');
    await extensionPage.click('#importAccount');
    await extensionPage.waitForSelector('#accountName');
    await extensionPage.type('#accountName', account.name);
    await extensionPage.type('#enterMnemonic', account.mnemonic);
    await extensionPage.click('#nextStep');
    await inputPassword();
    await extensionPage.waitForTimeout(2000);
  });

  VerifyAccount(account);
}

function VerifyAccount(account) {
  test(`Verify Account Info (${account.name})`, async () => {
    const addressSelector = '#accountAddress';
    await openAccountDetails(account);
    await extensionPage.waitForSelector(addressSelector);
    await expect(extensionPage.$eval(addressSelector, (e) => e.innerText)).resolves.toBe(
      account.address
    );
    await goBack();
    await goBack();
  });
}

function DeleteAccount(account) {
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
function ConnectAlgoSigner() {
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

    async function rejectDapp() {
      const popup = await getPopup();
      await popup.waitForSelector('#denyAccess');
      await popup.click('#denyAccess');
    }
    await dappPage.exposeFunction('rejectDapp', rejectDapp);

    async function rejectSign() {
      const popup = await getPopup();
      await popup.waitForSelector('#rejectTx');
      await popup.click('#rejectTx');
    }
    await dappPage.exposeFunction('rejectSign', rejectSign);

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

  test('NotAuthorized error before connecting', async () => {
    await expect(
      dappPage.evaluate(() => {
        return Promise.resolve(AlgoSigner.accounts())
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      })
    ).resolves.toMatchObject({
      message: expect.stringContaining('[RequestError.NotAuthorized]'),
      code: 4100,
    });
  });

  test('UserRejected error upon connection refusal', async () => {
    await expect(
      dappPage.evaluate(async () => {
        const connectPromise = AlgoSigner.connect();
        await window.rejectDapp();
        return Promise.resolve(connectPromise)
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      })
    ).resolves.toMatchObject({
      message: expect.stringContaining('[RequestError.UserRejected]'),
      code: 4001,
    });
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
