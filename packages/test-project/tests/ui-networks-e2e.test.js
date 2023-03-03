/**
 * Basic e2e tests for the AlgoSigner UI
 *
 * @group ui/networks
 */

const { accounts } = require('./common/constants');
const { openExtension, inputPassword, openSettingsMenu } = require('./common/helpers');
const { CreateWallet, ImportAccount } = require('./common/tests');

const openNetworkMenu = async () => {
  await extensionPage.waitForTimeout(1000);
  await openSettingsMenu();
  await extensionPage.waitForSelector('#showNetworkConfiguration');
  await extensionPage.click('#showNetworkConfiguration');
  await extensionPage.waitForSelector('#selectMainNet');
  await extensionPage.waitForTimeout(1000);
};

jest.setTimeout(20000);

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();
});

// Create a new network in AlgoSigner
describe('Create and Test Custom Networks', () => {
  const NetworkConfig = {
    name: 'E2ENet',
    algod: 'https://betanet-algorand.api.purestake.io/ps2',
    indexer: 'https://betanet-algorand.api.purestake.io/idx2',
    headers: '{"Algod":{"x-api-key":"yiMMSnme3SE0CmZZARJW87yWHTXZrEGaNSJNx2Me"},"Indexer":{"x-api-key":"yiMMSnme3SE0CmZZARJW87yWHTXZrEGaNSJNx2Me"}}',
  };

  const e2eNetSelector = `button#select${NetworkConfig.name}`;
  const otherNet = 'OtherNet';
  const otherNetSelector = `button#select${otherNet}`;

  test('Add Custom TestNet proxy and test it', async () => {
    // Create network
    await openNetworkMenu();
    await extensionPage.click('#createNetwork');

    // Fill erroneous network config
    await extensionPage.type('#networkName', NetworkConfig.name);
    await extensionPage.type('#networkAlgodUrl', NetworkConfig.indexer);
    await extensionPage.type('#networkIndexerUrl', NetworkConfig.indexer);
    await extensionPage.type('#networkHeaders', NetworkConfig.headers);

    // Test connection rejected
    await extensionPage.click('#checkNetwork');
    await extensionPage.waitForSelector('#networkError');
    await expect(extensionPage.$eval('#networkError', (e) => e.innerText)).resolves.toContain(
      'algod'
    );
    await expect(extensionPage.$eval('#networkError', (e) => e.innerText)).resolves.toContain(
      'indexer'
    );

    // Fill correct network config
    await extensionPage.evaluate(() => (document.getElementById('networkAlgodUrl').value = ''));
    await extensionPage.waitForTimeout(1000);
    await extensionPage.type('#networkAlgodUrl', NetworkConfig.algod);

    // Test connection succesful
    await extensionPage.click('#checkNetwork');
    await extensionPage.waitForSelector('#saveNetwork:not(disabled)');
    await expect(extensionPage.select('#networkError')).rejects.toThrow();

    // // Save Network
    await extensionPage.waitForTimeout(2000);
    await extensionPage.waitForSelector('#saveNetwork:not(disabled)');
    await extensionPage.click('#saveNetwork');
    await extensionPage.waitForTimeout(3000);
  });

  ImportAccount(accounts.ui);

  test('Test Modifying Custom Network', async () => {
    await extensionPage.waitForTimeout(1000);
    await openNetworkMenu();

    // Change Network name
    await extensionPage.waitForSelector(e2eNetSelector);
    await extensionPage.click(e2eNetSelector);
    await extensionPage.waitForSelector('#networkName');
    await extensionPage.evaluate(() => (document.getElementById('networkName').value = ''));
    await extensionPage.type('#networkName', otherNet);
    await extensionPage.waitForSelector('#saveNetwork:not(disabled)');
    await extensionPage.click('#saveNetwork');
    await inputPassword();
  });

  test('Test Deleting Custom Network', async () => {
    await openNetworkMenu();

    // Delete OtherNet
    await extensionPage.waitForSelector(otherNetSelector);
    await extensionPage.click(otherNetSelector);
    await extensionPage.click('#deleteNetwork');
    await inputPassword();

    // Check network was deleted
    await extensionPage.waitForTimeout(1000);
    await expect(extensionPage.select(otherNetSelector)).rejects.toThrow();
  });
});
