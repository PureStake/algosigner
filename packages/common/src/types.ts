/* eslint-disable no-unused-vars */
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

export enum Ledger {
  TestNet = 'TestNet',
  MainNet = 'MainNet',
}

export type WalletMultisigMetadata = {
  readonly version: number;
  readonly threshold: number;
  readonly addrs: Array<string>;
};

export type WalletTransaction = {
  readonly txn: string;
  readonly signers?: Array<string>;
  readonly message?: string;
  readonly msig?: WalletMultisigMetadata;
  readonly authAddr?: string;
};

export type Alias = {
  readonly name: string;
  readonly address: string;
  readonly namespace: Namespace;
  collides: boolean;
};

export enum Namespace {
  AlgoSigner_Contacts = 'AlgoSigner_Contacts',
  AlgoSigner_Accounts = 'AlgoSigner_Accounts',
  NFD = 'NFD',
  ANS = 'ANS',
}

export type NamespaceConfig = {
  name: string;
  namespace: Namespace;
  toggle: boolean;
};
