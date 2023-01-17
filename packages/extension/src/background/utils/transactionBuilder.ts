import { Transaction } from 'algosdk';
import AnyTransaction from 'algosdk/dist/types/types/transactions';

export function buildTransaction(txn: object): Transaction {
  const builtTxn = new Transaction(txn as AnyTransaction);
  if (txn['group']) {
    // Remap group field lost from cast
    builtTxn.group = Buffer.from(txn['group'], 'base64');
  }

  return builtTxn;
}
