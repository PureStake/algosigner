/* eslint-disable no-unused-vars */
export enum RequestErrors {
  None,
  NotAuthorized = '[RequestErrors.NotAuthorized] The extension user does not authorize the request.',
  InvalidTransactionParams = '[RequestErrors.InvalidTransactionParams] Invalid transaction parameters.',
  UnsupportedAlgod = '[RequestErrors.UnsupportedAlgod] The provided method is not supported.',
  UnsupportedLedger = '[RequestErrors.UnsupportedLedger] The provided ledger is not supported.',
  Undefined = '[RequestErrors.Undefined] An undefined error occurred.',
}

export type Field<T> = string | number;

export type TAccount = Field<string>;
export type Note = Field<string>;
export type Amount = Field<number>;

export type Transaction = {
  readonly amount: Amount;
  readonly from: TAccount;
  readonly note?: Note;
  readonly to: TAccount;
};

export type MultisigTransaction = {
  readonly msig: any;
  readonly txn: Transaction;
};

export type WalletMultisigMetadata = {
  readonly version: number;
  readonly threshold: number;
  readonly addrs: Array<string>;
};

export type WalletTransaction = {
  readonly tx: string;
  readonly signers?: Array<string>;
  readonly message?: string;
  readonly msig?: WalletMultisigMetadata;
  readonly authAddr?: string;
};
