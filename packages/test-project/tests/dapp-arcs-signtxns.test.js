/**
 * dapp e2e tests for the AlgoSigner V2 Signing functionality
 *
 * @group dapp/arcs/signtxns
 */

const { accounts } = require('./common/constants');
const {
  openExtension,
  getPopup,
  getSDKSuggestedParams,
  signDappTxnsWAlgorand,
  decodeBase64Blob,
  buildSdkTx,
  prepareWalletTx,
} = require('./common/helpers');
const { CreateWallet, ConnectWithAlgorandObject, ImportAccount } = require('./common/tests');

const msigAccount = accounts.multisig;
const account1 = msigAccount.subaccounts[0];
const account2 = msigAccount.subaccounts[1];

let sdkParams;
let unsignedTransactions;
let msigTxn;

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();

  test('Get TestNet params', async () => {
    sdkParams = await getSDKSuggestedParams();
    const baseTxn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: msigAccount.address,
        to: msigAccount.address,
        amount: Math.ceil(Math.random() * 1000),
        ...sdkParams,
        fee: 1000,
      })
    );
    const msigMetadata = {
      version: 1,
      threshold: 2,
      addrs: msigAccount.subaccounts.map((acc) => acc.address),
    };
    msigTxn = { ...baseTxn, msig: msigMetadata };
  });

  ImportAccount(account1);
  ImportAccount(account2);
  ConnectWithAlgorandObject([account1, account2]);
});

describe('Txn Signing Validation errors', () => {
  // General validations
  test('Error on User signing refusal', async () => {
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: account1.address,
        to: account1.address,
        amount: Math.ceil(Math.random() * 1000),
        ...sdkParams,
        fee: 1000,
      })
    );
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate(async (transactions) => {
        const signPromise = algorand.signTxns(transactions);
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
      message: expect.stringContaining('The extension user does not'),
      code: 4001,
    });
  });

  test('Error on Sender not imported to AlgoSigner', async () => {
    const invalidAccount = accounts.ui.address;
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: invalidAccount,
        to: invalidAccount,
        amount: Math.ceil(Math.random() * 1000),
        ...sdkParams,
        fee: 1000,
      })
    );
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(algorand.signTxns(transactions))
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
      data: expect.stringContaining(invalidAccount),
    });
  });

  // Signers validations
  test('Error on Empty signers for Single transactions', async () => {
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: account1.address,
        to: account1.address,
        amount: Math.ceil(Math.random() * 1000),
        ...sdkParams,
        fee: 1000,
      })
    );
    txn.signers = [];
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(algorand.signTxns(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('There are no transactions to sign'),
      code: 4300,
      name: expect.stringContaining('AlgoSignerRequestError'),
    });
  });

  test('Error on Single signer not matching the sender', async () => {
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: account1.address,
        to: account1.address,
        amount: Math.ceil(Math.random() * 1000),
        ...sdkParams,
        fee: 1000,
      })
    );
    txn.signers = [account2.address];
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(algorand.signTxns(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('There was a problem signing the transaction(s).'),
      code: 4300,
      name: expect.stringContaining('AlgoSignerRequestError'),
      data: expect.stringContaining("When a single-address 'signers'"),
    });
  });

  test('Error on Single signer not matching authAddr', async () => {
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: account1.address,
        to: account1.address,
        amount: Math.ceil(Math.random() * 1000),
        ...sdkParams,
        fee: 1000,
      })
    );
    txn.signers = [account1.address];
    txn.authAddr = account2.address;
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(algorand.signTxns(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('There was a problem signing the transaction(s).'),
      code: 4300,
      name: expect.stringContaining('AlgoSignerRequestError'),
      data: expect.stringContaining("When a single-address 'signers'"),
    });
  });

  test('Error on Invalid signer address', async () => {
    const fakeAccount = 'THISSIGNERDOESNTEXIST';
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: account1.address,
        to: account1.address,
        amount: Math.ceil(Math.random() * 1000),
        ...sdkParams,
        fee: 1000,
      })
    );
    txn.signers = [fakeAccount];
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(algorand.signTxns(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('There was a problem signing the transaction(s).'),
      code: 4300,
      name: expect.stringContaining('AlgoSignerRequestError'),
      data: expect.stringContaining(`Signers array contains the invalid address "${fakeAccount}"`),
    });
  });

  // AuthAddr validations
  test('Error on Invalid authAddr', async () => {
    const fakeAccount = 'THISAUTHADDRDOESNTEXIST';
    const txn = prepareWalletTx(
      buildSdkTx({
        type: 'pay',
        from: account1.address,
        to: account1.address,
        amount: Math.ceil(Math.random() * 1000),
        ...sdkParams,
        fee: 1000,
      })
    );
    txn.authAddr = fakeAccount;
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(algorand.signTxns(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('There was a problem signing the transaction(s).'),
      code: 4300,
      name: expect.stringContaining('AlgoSignerRequestError'),
      data: expect.stringContaining(`'authAddr' contains the invalid address "${fakeAccount}"`),
    });
  });

  // Msig validations
  test('Error on Msig Signer not imported to AlgoSigner', async () => {
    const invalidAccount = msigAccount.subaccounts[2].address;
    const txn = { ...msigTxn };
    txn.signers = [account1.address, invalidAccount];
    unsignedTransactions = [txn];

    await expect(
      dappPage.evaluate((transactions) => {
        return Promise.resolve(algorand.signTxns(transactions))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, unsignedTransactions)
    ).resolves.toMatchObject({
      message: expect.stringContaining('There was a problem signing the transaction(s).'),
      code: 4300,
      name: expect.stringContaining('AlgoSignerRequestError'),
      data: expect.stringContaining(invalidAccount),
    });
  });

  // // @TODO: Wallet Transaction Structure check tests
});

describe('Multisig Transaction Use cases', () => {
  test('Sign MultiSig Transaction with All Accounts', async () => {
    unsignedTransactions = [msigTxn];
    const signedTransactions = await signDappTxnsWAlgorand(unsignedTransactions, async () => {
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
    const decodedTransaction = decodeBase64Blob(signedTransactions[0]);
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
    const signedTransactions = await signDappTxnsWAlgorand(unsignedTransactions);

    // Verify correct signature is added
    const decodedTransaction = decodeBase64Blob(signedTransactions[0]);
    expect(decodedTransaction).toHaveProperty('txn');
    expect(decodedTransaction).toHaveProperty('msig');
    expect(decodedTransaction.msig).toHaveProperty('subsig');
    expect(decodedTransaction.msig.subsig).toHaveLength(3);
    expect(decodedTransaction.msig.subsig[0]).toHaveProperty('s');
    expect(decodedTransaction.msig.subsig[1]).not.toHaveProperty('s');
    expect(decodedTransaction.msig.subsig[2]).not.toHaveProperty('s');
  });
});
