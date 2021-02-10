/**
 * dapp e2e tests for the AlgoSigner Multisig functionality
 *
 * @group dapp/multisig
 */

const { accounts } = require('./common/constants');
const {
  openExtension,
  getLedgerParams,
  signTransaction,
  sendTransaction,
  decodeBlob,
  encodeAddress,
} = require('./common/helpers');
const { CreateWallet, ConnectAlgoSigner, ImportAccount } = require('./common/tests');

const msigAccount = accounts.multisig;

let ledgerParams;
let multisigTransaction;
let signedTransactions = [];

jest.setTimeout(10000);

describe('Wallet Setup', () => {
  beforeAll(async () => {
    await openExtension();
  });

  CreateWallet();
});

describe('dApp Setup', () => {
  ConnectAlgoSigner();

  test('Get TestNet params', async () => {
    ledgerParams = await getLedgerParams();
    console.log(`TestNet transaction params: [last-round: ${ledgerParams['last-round']}, ...]`);
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
        fee: ledgerParams['fee'],
        firstRound: ledgerParams['last-round'],
        lastRound: ledgerParams['last-round'] + 1000,
        genesisID: ledgerParams['genesis-id'],
        genesisHash: ledgerParams['genesis-hash'],
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

  test('Sign MultiSig Transaction with first account', async () => {
    signedTransactions.push(await signTransaction(multisigTransaction));

    // Verify signature is added
    const decodedTransaction = await decodeBlob(signedTransactions[0].blob);
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

  test('Append Second Signature to MultiSig Transaction', async () => {
    // Merge signature to original transaction
    const decodedTransaction = await decodeBlob(signedTransactions[0].blob);
    multisigTransaction = {
      ...multisigTransaction,
      msig: {
        ...multisigTransaction.msig,
        subsig: decodedTransaction.msig.subsig.map((subsig) => {
          const data = subsig;
          data.pk = encodeAddress(data.pk);
          return data;
        }),
      },
    };
    signedTransactions.push(await signTransaction(multisigTransaction));
  });
});
