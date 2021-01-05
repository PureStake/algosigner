const { wallet, extension } = require('./constants');
const { getPopup } = require('./helpers');

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

// Dapp Tests
async function ConnectAlgoSigner() {
  test('Expose Authorize Functions', async () => {
    async function authorizeDapp() {
      const popup = await getPopup();
      await popup.waitForSelector('#grantAccess');
      await popup.click('#grantAccess');
    }
    await dappPage.exposeFunction('authorizeDapp', authorizeDapp);
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
  ConnectAlgoSigner,
};
