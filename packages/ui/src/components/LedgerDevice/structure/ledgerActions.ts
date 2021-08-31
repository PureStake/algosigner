/* eslint-disable @typescript-eslint/no-var-requires */
import transport from './ledgerTransport';
const algosdk = require('algosdk');
const Algorand = require('@ledgerhq/hw-app-algorand');
import LedgerActionResponse from './ledgerActionsResponse';

let ledgerTransport: typeof Algorand;
const _PATH = "44'/60'/0'/0/0";

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
// Takes an unsigned decoded transaction object and converts strings into Uint8Arrays
// for note, appArgs, approval and close programs. Then returns a transactionBuilder encoded value
///
function cleanseBuildEncodeUnsignedTransaction(transaction: any): any {
  const txn = { ...transaction };
  const errors = new Array<string>();
  Object.keys({ ...transaction }).forEach((key) => {
    if (txn[key] === undefined || txn[key] === null) {
      delete txn[key];
    }
  });

  // Modify base64 encoded fields
  if ('note' in txn && txn.note) {
    if (JSON.stringify(txn.note) === '{}') {
      // If we got here from converting a blank note Uint8 value to an object we should remove it
      txn.note = undefined;
    } else {
      txn.note = new Uint8Array(Buffer.from(txn.note));
    }
  }

  // Application transactions only
  if (txn.type == 'appl') {
    if ('appApprovalProgram' in txn) {
      try {
        txn.appApprovalProgram = Uint8Array.from(Buffer.from(txn.appApprovalProgram, 'base64'));
      } catch {
        errors.push('Error trying to parse appApprovalProgram into a Uint8Array value.');
      }
    }
    if ('appClearProgram' in txn) {
      try {
        txn.appClearProgram = Uint8Array.from(Buffer.from(txn.appClearProgram, 'base64'));
      } catch {
        errors.push('Error trying to parse appClearProgram into a Uint8Array value.');
      }
    }
    if ('appArgs' in txn) {
      try {
        const tempArgs = new Array<Uint8Array>();
        txn.appArgs.forEach((element) => {
          tempArgs.push(Uint8Array.from(Buffer.from(element, 'base64')));
        });
        txn.appArgs = tempArgs;
      } catch {
        errors.push('Error trying to parse appArgs into Uint8Array values.');
      }
    }
  }

  const builtTxn = new algosdk.Transaction(txn);

  if ('group' in txn && txn['group']) {
    // Remap group field lost from cast
    builtTxn.group = Buffer.from(txn['group'], 'base64');
  }

  // Encode the transaction and join any errors for return
  const encodedTxn = algosdk.encodeUnsignedTransaction(builtTxn);
  return { transaction: encodedTxn, error: errors.join() };
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
    .getAddress(_PATH)
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
  const txnResponse = cleanseBuildEncodeUnsignedTransaction(txn.transaction);
  const message = Buffer.from(txnResponse.transaction).toString('hex');

  // Send the hex transaction to the Ledger device for signing
  await ledgerTransport
    .sign(_PATH, message)
    .then((o: any) => {
      // The device responds with a signature only. We need to build the typical signed transaction
      const txResponse = {
        sig: o.signature,
        txn: algosdk.decodeObj(txnResponse.transaction),
      };

      // Convert to binary for return
      lar = { message: new Uint8Array(algosdk.encodeObj(txResponse)) };
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

export const ledgerActions = {
  isAvailable,
  getAddress,
  signTransaction,
};

export default ledgerActions;
