/* eslint-disable no-unused-vars */
import { NetworkTemplate } from "./types/network";

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

export enum Network {
  TestNet = 'TestNet',
  MainNet = 'MainNet',
}

export enum NetworkSelectionType {
  NoneProvided,
  OnlyIDProvided,
  BothProvided,
}

export type WalletMultisigMetadata = {
  readonly version: number;
  readonly threshold: number;
  readonly addrs: Array<string>;
};

export type WalletTransaction = {
  readonly txn: string;
  readonly signers?: Array<string>;
  readonly stxn?: string;
  readonly message?: string;
  readonly msig?: WalletMultisigMetadata;
  readonly authAddr?: string;
};

export type SignTxnsOpts = {
  [key: string]: string | boolean,
};

export enum OptsKeys {
  ARC01Return = 'AlgoSigner_arc01',
  sendTxns = 'AlgoSigner_send'
}

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

export type SafeAccount = {
  address: string;
  isRef: boolean;
  name: string;
  details?: any;
}

export type SensitiveAccount = SafeAccount & {
  mnemonic: string;
}

export type SessionObject = {
  wallet: Record<string, Array<SafeAccount>>;
  network: Network;
  availableNetworks: Array<NetworkTemplate>;
  txnRequest: any;
}