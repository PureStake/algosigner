const { wallet, extension } = require('./constants');
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

module.exports = {
  WelcomePage,
  SetPassword,
  SelectTestNetLedger,
  CreateWallet,
};
