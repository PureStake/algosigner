/**
 * dapp e2e tests for the AlgoSigner Multisig functionality
 *
 * @group dapp/multisig
 */

const { accounts } = require('./common/constants');
const {
  openExtension,
  getLedgerSuggestedParams,
  sendTransaction,
  decodeBase64Blob,
  byteArrayToBase64,
  encodeAddress,
  mergeMultisigTransactions,
  appendSignToMultisigTransaction,
} = require('./common/helpers');
const { CreateWallet, ConnectAlgoSigner, ImportAccount } = require('./common/tests');

const msigAccount = accounts.multisig;

let ledgerParams;
let multisigTransaction;
let signedTransactions = [];

async function signTransaction(transaction) {
  const signedTransaction = await dappPage.evaluate(async (transaction) => {
    const signPromise = AlgoSigner.signMultisig(transaction)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    await window.authorizeSign();
    return await Promise.resolve(signPromise);
  }, transaction);
  await expect(signedTransaction).toHaveProperty('txID');
  await expect(signedTransaction).toHaveProperty('blob');
  return signedTransaction;
}

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();
});

describe('dApp Setup', () => {
  ConnectAlgoSigner();

  test('Get TestNet params', async () => {
    ledgerParams = await getLedgerSuggestedParams();
    multisigTransaction = {
      msig: {
        subsig: msigAccount.subaccounts.map((acc) => {
          return { pk: acc.address };
        }),
        thr: 2,
        v: 1,
      },
      txn: {
        type: 'pay',
        from: msigAccount.address,
        to: accounts.ui.address,
        amount: Math.ceil(Math.random() * 1000),
        ...ledgerParams,
      },
    };
  });
});

describe('MultiSig Use cases', () => {
  test('Fail on Sign with no Valid Addresses', async () => {
    // We try to sign with no accounts loaded
    await expect(
      dappPage.evaluate((transaction) => {
        return Promise.resolve(AlgoSigner.signMultisig(transaction))
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
      }, multisigTransaction)
    ).resolves.toBe('No address match found.');
  });

  ImportAccount(msigAccount.subaccounts[0]);

  test('Sign MultiSig Transaction with First account', async () => {
    signedTransactions.push(await signTransaction(multisigTransaction));

    // Verify signature is added
    const decodedTransaction = decodeBase64Blob(signedTransactions[0].blob);
    expect(decodedTransaction).toHaveProperty('txn');
    expect(decodedTransaction).toHaveProperty('msig');
    expect(decodedTransaction.msig).toHaveProperty('subsig');
    expect(decodedTransaction.msig.subsig.length).toBe(3);
    expect(decodedTransaction.msig.subsig[0]).toHaveProperty('s');
  });

  test('Should fail signature treshold validation', async () => {
    const result = await sendTransaction(signedTransactions[0].blob);
    expect(result).toMatchObject({
      message: expect.stringContaining('multisig validation failed'),
    });
  });

  ImportAccount(msigAccount.subaccounts[1]);

  test('Sign MultiSig Transaction with Second account', async () => {
    // Merge first signature to original transaction
    const decodedFirstTransaction = decodeBase64Blob(signedTransactions[0].blob);
    multisigTransaction = {
      ...multisigTransaction,
      msig: {
        ...multisigTransaction.msig,
        subsig: decodedFirstTransaction.msig.subsig.map((subsig) => {
          const data = subsig;
          data.pk = encodeAddress(data.pk);
          return data;
        }),
      },
    };
    signedTransactions.push(await signTransaction(multisigTransaction));

    // Verify signature is added
    const decodedTransaction = decodeBase64Blob(signedTransactions[1].blob);
    expect(decodedTransaction).toHaveProperty('txn');
    expect(decodedTransaction).toHaveProperty('msig');
    expect(decodedTransaction.msig).toHaveProperty('subsig');
    expect(decodedTransaction.msig.subsig.length).toBe(3);
    expect(decodedTransaction.msig.subsig[1]).toHaveProperty('s');
  });

  test('Send SDK-merged Multisig Transaction', async () => {
    const sdkMerge = mergeMultisigTransactions(signedTransactions);
    const result = await sendTransaction(sdkMerge);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty('txId');
    expect(result).not.toHaveProperty('message');
    signedTransactions.push(sdkMerge);
  });

  test('Append Second signature with SDK', async () => {
    const appendedMultisig = appendSignToMultisigTransaction(
      signedTransactions[1],
      multisigTransaction.msig,
      msigAccount.subaccounts[0].mnemonic
    );
    expect(appendedMultisig).not.toBeNull();
    expect(appendedMultisig).toHaveProperty('txID');
    expect(appendedMultisig).toHaveProperty('blob');
    // We can't send it since it shares ID with the other
    signedTransactions.push(appendedMultisig);
  });

  test('Compare merge results', async () => {
    const decodedFirstMerge = decodeBase64Blob(signedTransactions[2]);
    const decodedSecondMerge = decodeBase64Blob(byteArrayToBase64(signedTransactions[3].blob));
    expect(decodedFirstMerge).toStrictEqual(decodedSecondMerge);
  });
});
