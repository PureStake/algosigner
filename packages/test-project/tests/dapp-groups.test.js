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
  signDappTxns,
  buildSdkTx,
  prepareWalletTx,
} = require('./common/helpers');
const { CreateWallet, ConnectWithAlgoSignerObject, ImportAccount } = require('./common/tests');

const account = accounts.ui;

let ledgerParams;
let tx1, tx2, tx3, tx4;

async function signDappTxnGroups(transactionsToSign) {
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
  ConnectWithAlgoSignerObject();

  test('Get TestNet params', async () => {
    ledgerParams = await getLedgerSuggestedParams();
  });

  ImportAccount(account);
});

describe('Group Transactions Use cases', () => {
  let signedTxn;

  test('Reject on incomplete Group', async () => {
    tx1 = buildSdkTx({
      type: 'pay',
      from: account.address,
      to: account.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
      fee: 1000,
    });
    const groupedTransactions = algosdk.assignGroupID([tx1, tx1]);
    const unsignedTransactions = [prepareWalletTx(groupedTransactions[0])];

    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(AlgoSigner.signTxn(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('group is incomplete'),
      code: 4300,
      name: expect.stringContaining('AlgoSignerRequestError'),
    });
  });

  test('Accept Group ID for Single Transactions', async () => {
    tx1 = buildSdkTx({
      type: 'pay',
      from: account.address,
      to: account.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
      fee: 1000,
    });
    const groupedTransactions = algosdk.assignGroupID([tx1]);
    const unsignedTransactions = [prepareWalletTx(groupedTransactions[0])];

    const signedTransactions = await signDappTxns(unsignedTransactions);
    await expect(signedTransactions[0]).not.toBeNull();
  });

  test('Group Transaction with Reference Transaction && Pooled Fee', async () => {
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
    });

    const groupedTransactions = await algosdk.assignGroupID([tx1, tx2, tx3]);
    const unsignedTransactions = groupedTransactions.map((txn) => prepareWalletTx(txn));
    unsignedTransactions[2].signers = [];

    const signedTransactions = await signDappTxns(unsignedTransactions);
    await expect(signedTransactions[2]).toBeNull();
    await expect(signedTransactions.filter((i) => i)).toHaveLength(2);

    // For next test
    signedTxn = signedTransactions[1];
  });

  test('Provide "stxn" for Reference Transaction', async () => {
    const unsignedTransactions = [tx1, tx2, tx3].map((txn) => prepareWalletTx(txn));
    unsignedTransactions[1].signers = [];
    unsignedTransactions[1].stxn = signedTxn.blob;

    const signedTransactions = await signDappTxns(unsignedTransactions);
    await expect(signedTransactions[1]).toStrictEqual(signedTxn);
    await expect(signedTransactions[2]).not.toBeNull();
    await expect(signedTransactions.filter((i) => i)).toHaveLength(3);
  });

  test('Max # of Transactions on Group', async () => {
    const tx = buildSdkTx({
      type: 'pay',
      from: account.address,
      to: account.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
      fee: 1000,
    });

    const txArray = [];
    for (let i = 0; i < 16; i++) {
      txArray.push(tx);
    }
    
    const groupedTransactions = await algosdk.assignGroupID(txArray);
    groupedTransactions[16] = groupedTransactions[0];
    const unsignedTransactions = groupedTransactions.map((txn) => prepareWalletTx(txn));

    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(AlgoSigner.signTxn(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('16 transactions at a time'),
      code: 4201,
      name: expect.stringContaining('AlgoSignerRequestError'),
    });
  });

  // @TODO: Add errors for mismatches, incomplete groups, etc
});

describe('Group of Groups Use cases', () => {
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

    const signedTransactions = await signDappTxnGroups([group1, group2]);
    await expect(signedTransactions).toHaveLength(2);
    await expect(signedTransactions[0][1]).toBeNull();
  });
});
