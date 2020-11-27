import { Transaction } from 'algosdk/src/transaction';

export function buildTransaction(txn: object) {
  const builtTxn = new Transaction(txn);
  if (txn['group']) {
    // Remap group field lost from cast
    builtTxn.group = Buffer.from(txn['group'], 'base64');
  }

  return builtTxn;
}
