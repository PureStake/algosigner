/**
 * dapp e2e tests for the AlgoSigner V2 Signing functionality
 *
 * @group dapp/groups
 */

const algosdk = require('algosdk');
const { accounts } = require('./common/constants');
const {
  openExtension,
  getLedgerSuggestedParams,
  buildSdkTx,
  prepareWalletTx,
} = require('./common/helpers');
const { CreateWallet, ConnectAlgoSigner, ImportAccount } = require('./common/tests');

const account = accounts.ui;

let ledgerParams;

async function signTxnGroups(transactionsToSign) {
  await dappPage.waitForTimeout(2000);
  const signedGroups = await dappPage.evaluate(
    async (transactionsToSign) => {
      const signPromise = AlgoSigner.signTxn(transactionsToSign)
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });

      const amountOfGroups = Array.isArray(transactionsToSign[0]) ? transactionsToSign.length : 1;
      await window['authorizeSignTxnGroups'](amountOfGroups);

      return await Promise.resolve(signPromise);
    },
    transactionsToSign,
  );

  signedGroups.forEach(async (group) => {
    await expect(group.filter((i) => i).length).toBeGreaterThan(0);
    group.forEach(async (signedTx) => {
      if (signedTx) {
        await expect(signedTx).toHaveProperty('txID');
        await expect(signedTx).toHaveProperty('blob');
      }
    });
  });
  return signedGroups;
}

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();

  ImportAccount(account);
});

describe('dApp Setup', () => {
  ConnectAlgoSigner();

  test('Get TestNet params', async () => {
    ledgerParams = await getLedgerSuggestedParams();
  });
});

describe('Group of Groups Use cases', () => {
  let tx1, tx2, tx3, tx4;

  test('Group of Grouped Transactions', async () => {
    tx1 = buildSdkTx({
      type: 'pay',
      from: account.address,
      to: account.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
      fee: 1000,
    });
    tx2 = buildSdkTx({
      type: 'pay',
      from: account.address,
      to: account.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
    });
    tx3 = buildSdkTx({
      type: 'pay',
      from: account.address,
      to: account.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
      fee: 1000,
    });
    tx4 = buildSdkTx({
      type: 'pay',
      from: account.address,
      to: account.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
    });

    jest.setTimeout(30000);
    const group1 = await algosdk.assignGroupID([tx1, tx2]).map((txn) => prepareWalletTx(txn));
    group1[1].signers = [];
    const group2 = await algosdk.assignGroupID([tx3, tx4]).map((txn) => prepareWalletTx(txn));

    const signedTransactions = await signTxnGroups([group1, group2]);
    await expect(signedTransactions).toHaveLength(2);
    await expect(signedTransactions[0][1]).toBeNull();
  });
});
