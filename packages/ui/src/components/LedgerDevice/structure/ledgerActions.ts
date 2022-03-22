/* eslint-disable @typescript-eslint/no-var-requires */
import transport from './ledgerTransport';
const algosdk = require('algosdk');
const Algorand = require('@ledgerhq/hw-app-algorand');
import LedgerActionResponse from './ledgerActionsResponse';
import { WalletTransaction } from '@algosigner/common/types';
import { removeEmptyFields } from '@algosigner/common/utils';
import { EncodedSignedTransaction, Transaction } from 'algosdk';

let ledgerTransport: typeof Algorand;

const _PATH = {
  pathIndex: 0,
  get primary() {
    {
      return `44'/60'/0'/0/0`;
    }
  },
  get current() {
    {
      return `44'/60'/${this.pathIndex}'/0/0`;
    }
  },
};

const getDevice = async () => {
  // Check for the presence of an Algorand Ledger transport and return it if one exists
  if (ledgerTransport) {
    return ledgerTransport;
  }

  try {
    // Create a transport
    // TODO: Expand beyond hid, like bluetooth
    const newTransport = await transport.hid.create();

    // After obtaining the transport use it to create the Algorand Ledger transport
    ledgerTransport = new Algorand.default(newTransport);
  } catch (e: any) {
    if (e && 'message' in e) {
      throw e;
    } else {
      return {
        message:
          'Error creating the ledger transport. Please ensure device is connected and the Algorand app is open.',
      };
    }
  }
  return ledgerTransport;
};

// Check to see if a Ledger device is available at all
const isAvailable = async (): Promise<boolean> => {
  const ledgerDevice = await getDevice().catch(() => {
    // If we have an error then it is not available
    return false;
  });

  // If we now have a device, return true
  if (ledgerDevice !== undefined) {
    return true;
  }
  return false;
};

///
// Takes the account public address and tries to find the hex representation to get the index
// Returns the matching index or 0 if index is not found
///
const findAccountIndex = async (fromAccount: string): Promise<number> => {
  let foundIndex = 0;
  let foundAccount = false;
  let hasError = false;
  const maxAccounts = 8; // Arbitrary - to prevent infinite loops

  // Reset path index to get all accounts for loop
  _PATH.pathIndex = 0;

  // Convert fromAccount public address to hex publicKey
  const fromPubKey = Buffer.from(algosdk.decodeAddress(fromAccount).publicKey).toString('hex');

  while (!foundAccount && !hasError && _PATH.pathIndex < maxAccounts) {
    await ledgerTransport
      .getAddress(_PATH.current)
      .then((o: any) => {
        if (o.publicKey === fromPubKey) {
          foundIndex = _PATH.pathIndex;
          foundAccount = true;
        }
      })
      .catch((e) => {
        console.log(`Error when trying to find Ledger account. ${JSON.stringify(e)}`);
        // Abort on error and pass back the current foundIndex
        hasError = true;
      })
      .finally(() => {
        if (!foundAccount) {
          _PATH.pathIndex += 1;
        }
      });
  }
  return foundIndex;
};

///
// Tries to get multiple Ledger accounts
// Returns an array of publicKey addresses, encoded
///
const getAllAddresses = async (): Promise<LedgerActionResponse> => {
  const accounts = Array<object>();
  let errorOnIndex = false;
  const maxAccounts = 8; // Arbitrary - to prevent infinite loops
  let lar: LedgerActionResponse = {};

  // Reset path index to get all
  _PATH.pathIndex = 0;

  // If we haven't connected yet, do it now. This will prompt the tab to ask for device.
  if (!ledgerTransport) {
    ledgerTransport = await getDevice().catch((e) => {
      // If this is a known error from Ledger it will contain a message
      lar =
        e && 'message' in e
          ? { error: e.message }
          : { error: 'An unknown error has occured in connecting the Ledger device.' };
    });
  }

  // Return error if we have one
  if (lar.error) {
    return lar;
  }

  while (!errorOnIndex && _PATH.pathIndex < maxAccounts) {
    const currentIndex = `${_PATH.pathIndex}`;
    await ledgerTransport
      .getAddress(_PATH.current)
      .then((o: any) => {
        const publicAddress: string = algosdk.encodeAddress(Buffer.from(o.publicKey, 'hex'));
        const retrievedAccount = {
          ledgerIndex: currentIndex,
          hex: o.publicKey,
          publicAddress: publicAddress,
        };
        accounts.push(retrievedAccount);
      })
      .catch((e) => {
        console.log(e);
        // Abort on error and pass back the current foundIndex
        errorOnIndex = true;
        lar.error = e;
      })
      .finally((_PATH.pathIndex += 1));
  }

  lar.message = accounts;
  return lar;
};

///
// Takes the modified transaction request which contains groupsToSign
// then from that will extract the first walletTransaction of the calculated group
///
function cleanseBuildEncodeUnsignedTransaction(transaction: any): any {
  // If there's no dApp structure, we're coming from the UI
  if (!transaction.encodedTxn && !transaction.groupsToSign) {
    const removedFieldsTxn = removeEmptyFields(transaction.transaction);

    // Explicit conversion of amount. Ledger transactions are stringified and retrieved,
    // which converts the amount to a string. Moving to int/bigint here. 
    if ('amount' in removedFieldsTxn) {
      removedFieldsTxn['amount'] = BigInt(removedFieldsTxn['amount'])
      if (removedFieldsTxn['amount'] <= Number.MAX_SAFE_INTEGER){
        removedFieldsTxn['amount'] = parseInt(removedFieldsTxn['amount'])
      }
    }

    const builtTx = new Transaction(removedFieldsTxn);
    const byteTxn = algosdk.encodeUnsignedTransaction(builtTx);

    return { transaction: byteTxn, error: '' };
  }

  // If coming from a v1 sign we will have an encodedTxn object
  if (transaction.encodedTxn) {
    const byteTxn = new Uint8Array(
      Buffer.from(transaction.encodedTxn, 'base64')
        .toString('binary')
        .split('')
        .map((x) => x.charCodeAt(0))
    );

    return { transaction: byteTxn, error: '' };
  }

  // Using ledgerGroup if provided since the user may sign multiple more by the time we sign.
  // Defaulting to current after, but making sure we don't go above the current length.
  const { groupsToSign, currentGroup, ledgerGroup } = transaction;
  const txPositionInGroup = Math.min(ledgerGroup || currentGroup || 0, groupsToSign.length - 1);

  const walletTransactions: Array<WalletTransaction> = groupsToSign[txPositionInGroup];

  const transactionObjs = walletTransactions.map((walletTx) => {
    const byteWalletTxn = new Uint8Array(
      Buffer.from(walletTx.txn, 'base64')
        .toString('binary')
        .split('')
        .map((x) => x.charCodeAt(0))
    );
    return byteWalletTxn;
  });

  // If we didn't have a v1 txn then verify we have some transactionObjs
  if (transactionObjs.length === 0) {
    return {
      transaction: undefined,
      error: 'No signable transaction found in cached Ledger transactions.',
    };
  }

  // Currently we only allow a single transaction going into Ledger.
  // TODO: To work with groups in the future this should grab the first acceptable one, not the first one overall.
  const encodedTxn = transactionObjs[0];

  return { transaction: encodedTxn, error: '' };
}

const getAddress = async (): Promise<LedgerActionResponse> => {
  let lar: LedgerActionResponse = {};

  // If we haven't connected yet, do it now. This will prompt the tab to ask for device.
  if (!ledgerTransport) {
    ledgerTransport = await getDevice().catch((e) => {
      // If this is a known error from Ledger it will contain a message
      lar =
        e && 'message' in e
          ? { error: e.message }
          : { error: 'An unknown error has occured in connecting the Ledger device.' };
    });
  }

  // Return error if we have one
  if (lar.error) {
    return lar;
  }

  // Now attempt to get the default Algorand address
  await ledgerTransport
    .getAddress(_PATH.primary)
    .then((o: any) => {
      lar = { message: o.publicKey };
    })
    .catch((e) => {
      // If this is a known error from Ledger it will contain a message
      lar =
        e && 'message' in e
          ? { error: e.message }
          : { error: 'An unknown error has occured in connecting the Ledger device.' };
    });

  return lar;
};

const signTransaction = async (txn: any): Promise<LedgerActionResponse> => {
  let lar: LedgerActionResponse = {};

  // If we haven't connected yet, do it now. This will prompt the tab to ask for device.
  if (!ledgerTransport) {
    ledgerTransport = await getDevice().catch((e) => {
      // If this is a known error from Ledger it will contain a message
      lar =
        e && 'message' in e
          ? { error: e.message }
          : { error: 'An unknown error has occured in connecting the Ledger device.' };
    });
  }

  // Return error if we have one
  if (lar.error) {
    return lar;
  }

  // Sign method accesps a message that is "hex" format, need to convert
  // and remove any empty fields before the conversion
  const txnResponse = cleanseBuildEncodeUnsignedTransaction(txn);
  const decodedTxn = algosdk.decodeUnsignedTransaction(txnResponse.transaction);
  const message = Buffer.from(txnResponse.transaction).toString('hex');

  // Since we currently don't support groups, logic, or rekeyed accounts on Ledger sign
  // we can check just the from field to get the index
  const fromAccount = algosdk.encodeAddress(decodedTxn.from.publicKey);
  const foundIndex = await findAccountIndex(fromAccount);
  if (foundIndex === -1) {
    lar.error = 'Transaction "from" field does not match any ledger account.';
    return lar;
  } else {
    _PATH.pathIndex = foundIndex;

    // Send the hex transaction to the Ledger device for signing
    await ledgerTransport
      .sign(_PATH.current, message)
      .then((o: any) => {
        const sTxn: EncodedSignedTransaction = {
          sig: o.signature,
          txn: decodedTxn.get_obj_for_encoding(),
        };
        const encTxn = algosdk.encodeObj(sTxn);

        // Convert to base64 string for return
        lar = { message: Buffer.from(encTxn, 'base64').toString('base64') };
      })
      .catch((e) => {
        // If this is a known error from Ledger it will contain a message
        lar =
          e && 'message' in e
            ? { error: e.message }
            : { error: 'An unknown error has occured in connecting the Ledger device.' };
      });

    return lar;
  }
};

export const ledgerActions = {
  isAvailable,
  getAddress,
  getAllAddresses,
  signTransaction,
};

export default ledgerActions;
