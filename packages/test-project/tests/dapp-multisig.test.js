/**
 * dapp e2e tests for the AlgoSigner Multisig functionality
 *
 * @group dapp/multisig
 */

const { accounts } = require('./common/constants');
const { openExtension, getLedgerParams } = require('./common/helpers');
const { CreateWallet, ConnectAlgoSigner } = require('./common/tests');

const msigAccount = accounts.multisig;

let ledgerParams;
let multisigTransaction;

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
    /* eslint-disable-next-line */
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
