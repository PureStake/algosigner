/**
 * dapp e2e tests for the AlgoSigner V2 Signing functionality
 *
 * @group dapp/signtxn
 */

const algosdk = require('algosdk');
const { accounts } = require('./common/constants');
const {
  openExtension,
  getPopup,
  getLedgerSuggestedParams,
  byteArrayToBase64,
  decodeBase64Blob,
} = require('./common/helpers');
const { CreateWallet, ConnectAlgoSigner, ImportAccount } = require('./common/tests');

const msigAccount = accounts.multisig;
const account1 = msigAccount.subaccounts[0];
const account2 = msigAccount.subaccounts[1];

let ledgerParams;
let unsignedTransactions = [];

const buildSdkTx = (tx) => {
  return new algosdk.Transaction(tx);
};

const prepareWalletTx = (tx) => {
  return {
    txn: byteArrayToBase64(tx.toByte()),
  };
};

async function signTxn(transactions, testFunction) {
  const timestampedName = `popupTest-${new Date().getTime().toString()}`;
  if (testFunction) {
    await dappPage.exposeFunction(timestampedName, async () => {
      try {
        await testFunction();
      } catch (e) {
        console.log(e);
      }
    });
  }

  await dappPage.waitForTimeout(2000);
  const signedTransactions = await dappPage.evaluate(
    async (transactions, testFunction, testTimestamp) => {
      const signPromise = AlgoSigner.signTxn(transactions)
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });

      if (testFunction) {
        await window[testTimestamp]();
      }
      await window.authorizeSignTxn();
      return await Promise.resolve(signPromise);
    },
    transactions,
    !!testFunction,
    timestampedName
  );
  for (let i = 0; i < signedTransactions.length; i++) {
    const signedTx = signedTransactions[i];
    if (signedTx) {
      await expect(signedTx).toHaveProperty('txID');
      await expect(signedTx).toHaveProperty('blob');
    }
  }
  return signedTransactions;
}

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();

  ImportAccount(account1);
  ImportAccount(account2);
});

describe('dApp Setup', () => {
  ConnectAlgoSigner();

  test('Get TestNet params', async () => {
    ledgerParams = await getLedgerSuggestedParams();
  });
});

describe('Single and Global Transaction Use cases', () => {
  test('Error on Missing account', async () => {
    const invalidAccount = accounts.ui;
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: invalidAccount.address,
        to: invalidAccount.address,
        amount: Math.ceil(Math.random() * 1000),
        ...ledgerParams,
      })
    );
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate((transaction) => {
        return Promise.resolve(AlgoSigner.signTxn(transaction))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('No matching account'),
    });
  });

  test('Error on Empty signers for Single transactions', async () => {
    const invalidAccount = accounts.ui;
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: invalidAccount.address,
        to: invalidAccount.address,
        amount: Math.ceil(Math.random() * 1000),
        ...ledgerParams,
      })
    );
    txn.signers = [];
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate((transaction) => {
        return Promise.resolve(AlgoSigner.signTxn(transaction))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('Signers array should only'),
    });
  });

  // // @TODO: Wallet Transaction Structure check tests

  test('Warning on Group ID for Single Transactions', async () => {
    const txn = buildSdkTx({
      type: 'pay',
      from: account1.address,
      to: account1.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
    });
    unsignedTransactions = [prepareWalletTx(algosdk.assignGroupID([txn])[0])];

    await signTxn(unsignedTransactions, async () => {
      const popup = await getPopup();
      await popup.waitForSelector('#txAlerts');
      await expect(
        popup.$$eval('#danger-tx-list b', (arr) => arr.map((item) => item.innerText.slice(0, -1)))
      ).resolves.toContain('group');
    });
  });

  test('Sign MultiSig Transaction with All Accounts', async () => {
    const multisigTxn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: msigAccount.address,
        to: msigAccount.address,
        amount: Math.ceil(Math.random() * 1000),
        ...ledgerParams,
      })
    );
    multisigTxn.msig = {
      version: 1,
      threshold: 2,
      addrs: msigAccount.subaccounts.map((acc) => acc.address),
    };

    unsignedTransactions = [multisigTxn];
    const signedTransactions = await signTxn(unsignedTransactions, async () => {
      const popup = await getPopup();
      const tooltipText = await popup.evaluate(() => {
        return getComputedStyle(
          document.querySelector('[data-tooltip]'),
          '::before'
        ).getPropertyValue('content');
      });
      await expect(tooltipText).toContain('Multisignature');
    });

    // Verify signature is added
    const decodedTransaction = decodeBase64Blob(signedTransactions[0].blob);
    expect(decodedTransaction).toHaveProperty('txn');
    expect(decodedTransaction).toHaveProperty('msig');
    expect(decodedTransaction.msig).toHaveProperty('subsig');
    expect(decodedTransaction.msig.subsig.length).toBe(3);
    expect(decodedTransaction.msig.subsig[0]).toHaveProperty('s');
    expect(decodedTransaction.msig.subsig[1]).toHaveProperty('s');
    expect(decodedTransaction.msig.subsig[2]).not.toHaveProperty('s');
  });

  test('Sign MultiSig Transaction with Specific Signer', async () => {
    unsignedTransactions[0].signers = [account1.address];
    const signedTransactions = await signTxn(unsignedTransactions);

    // Verify correctsignature is added
    const decodedTransaction = decodeBase64Blob(signedTransactions[0].blob);
    expect(decodedTransaction).toHaveProperty('txn');
    expect(decodedTransaction).toHaveProperty('msig');
    expect(decodedTransaction.msig).toHaveProperty('subsig');
    expect(decodedTransaction.msig.subsig.length).toBe(3);
    expect(decodedTransaction.msig.subsig[0]).toHaveProperty('s');
    expect(decodedTransaction.msig.subsig[1]).not.toHaveProperty('s');
    expect(decodedTransaction.msig.subsig[2]).not.toHaveProperty('s');
  });
});

describe('Group Transactions Use cases', () => {
  test('Group Transaction with Reference Transaction', async () => {
    const tx1 = buildSdkTx({
      type: 'pay',
      from: account1.address,
      to: account2.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
    });
    const tx2 = buildSdkTx({
      type: 'pay',
      from: account2.address,
      to: account1.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
    });
    const tx3 = buildSdkTx({
      type: 'pay',
      from: account1.address,
      to: account2.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
    });

    unsignedTransactions = await algosdk.assignGroupID([tx1, tx2, tx3]);
    unsignedTransactions = unsignedTransactions.map((txn) => prepareWalletTx(txn));
    unsignedTransactions[2].signers = [];

    const signedTransactions = await signTxn(unsignedTransactions);
    await expect(signedTransactions[2]).toBeNull();
    await expect(signedTransactions.filter((i) => i).length).toBe(2);
  });

  // @TODO: Add errors for mismatches, incomplete groups, etc
});
