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

async function signTxn(transactionsToSign, testFunction) {
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
    async (transactionsToSign, testFunction, testTimestamp) => {
      const signPromise = AlgoSigner.signTxn(transactionsToSign)
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });

      if (testFunction) {
        await window[testTimestamp]();
      }

      await window['authorizeSignTxn']();
      return await Promise.resolve(signPromise);
    },
    transactionsToSign,
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

describe('dApp Connecting', () => {
  ConnectAlgoSigner();

  test('Get TestNet params', async () => {
    ledgerParams = await getLedgerSuggestedParams();
  });
});

describe('Error Use cases', () => {
  test('UserRejected error upon signing refusal', async () => {
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: account1.address,
        to: account1.address,
        amount: Math.ceil(Math.random() * 1000),
        ...ledgerParams,
        fee: 1000,
      })
    );
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate(async (transactions) => {
        const signPromise = AlgoSigner.signTxn(transactions);
        await window.rejectSign();
        return Promise.resolve(signPromise)
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('[RequestError.UserRejected]'),
      code: 4001,
    });
  });

  test('Error on Missing account', async () => {
    const invalidAccount = accounts.ui;
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: invalidAccount.address,
        to: invalidAccount.address,
        amount: Math.ceil(Math.random() * 1000),
        ...ledgerParams,
        fee: 1000,
      })
    );
    unsignedTransactions = [txn];

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
      message: expect.stringContaining('There was a problem signing the transaction(s).'),
      code: 4100,
      name: expect.stringContaining('AlgoSignerRequestError'),
      data: expect.stringContaining(accounts.ui.address),
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
        fee: 1000,
      })
    );
    txn.signers = [];
    unsignedTransactions = [txn];

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
      message: expect.stringContaining('Signers array should only'),
      code: 4300,
      name: expect.stringContaining('AlgoSignerRequestError'),
    });
  });

  // // @TODO: Wallet Transaction Structure check tests
});

describe('Multisig Transaction Use cases', () => {
  test('Sign MultiSig Transaction with All Accounts', async () => {
    const multisigTxn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: msigAccount.address,
        to: msigAccount.address,
        amount: Math.ceil(Math.random() * 1000),
        ...ledgerParams,
        fee: 1000,
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
    expect(decodedTransaction.msig.subsig).toHaveLength(3);
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
    expect(decodedTransaction.msig.subsig).toHaveLength(3);
    expect(decodedTransaction.msig.subsig[0]).toHaveProperty('s');
    expect(decodedTransaction.msig.subsig[1]).not.toHaveProperty('s');
    expect(decodedTransaction.msig.subsig[2]).not.toHaveProperty('s');
  });
});

describe('Group Transactions Use cases', () => {
  test('Reject on incomplete Group', async () => {
    const txn = buildSdkTx({
      type: 'pay',
      from: account1.address,
      to: account1.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
      fee: 1000,
    });
    const groupedTransactions = algosdk.assignGroupID([txn, txn]);
    unsignedTransactions = [prepareWalletTx(groupedTransactions[0])];

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
    const txn = buildSdkTx({
      type: 'pay',
      from: account1.address,
      to: account1.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
      fee: 1000,
    });
    const groupedTransactions = algosdk.assignGroupID([txn]);
    unsignedTransactions = [prepareWalletTx(groupedTransactions[0])];

    const signedTransactions = await signTxn(unsignedTransactions);
    await expect(signedTransactions[0]).not.toBeNull();
  });

  test('Group Transaction with Reference Transaction && Pooled Fee', async () => {
    const tx1 = buildSdkTx({
      type: 'pay',
      from: account1.address,
      to: account2.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
      fee: 1000,
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
    await expect(signedTransactions.filter((i) => i)).toHaveLength(2);
  });

  test('Max # of Transactions on Group', async () => {
    const tx = buildSdkTx({
      type: 'pay',
      from: account1.address,
      to: account2.address,
      amount: Math.ceil(Math.random() * 1000),
      ...ledgerParams,
      fee: 1000,
    });

    const txArray = [];
    for (let i = 0; i < 16; i++) {
      txArray.push(tx);
    }
    
    unsignedTransactions = await algosdk.assignGroupID(txArray);
    unsignedTransactions[16] = unsignedTransactions[0];
    unsignedTransactions = unsignedTransactions.map((txn) => prepareWalletTx(txn));

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
