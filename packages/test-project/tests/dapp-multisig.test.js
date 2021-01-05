/**
 * dapp e2e tests for the AlgoSigner Multisig functionality
 *
 * @group dapp/multisig
 */

const { openExtension } = require('./common/helpers');
const { CreateWallet } = require('./common/tests');

jest.setTimeout(10000);

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();
});
