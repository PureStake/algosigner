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
} = require('./common/helpers');
const { CreateWallet, ConnectAlgoSigner, ImportAccount } = require('./common/tests');

const msigAccount = accounts.multisig;

let ledgerParams;
let multisigTransaction;
let signedTransaction;

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

  test('Append 1 Signature to MultiSig Transaction', async () => {
    signedTransaction = await signTransaction(multisigTransaction);
  });

  test('Should fail signature treshold validation', async () => {
    const result = await sendTransaction(signedTransaction);
    expect(result.message).toBe('multisig validation failed');
  });
});
