/* eslint-disable */
// Key and value must match in this enum so we
// can compare its existance with i.e. "Testnet" in SupportedLedger
export enum Ledger {
  TestNet = 'TestNet',
  MainNet = 'MainNet',
}

export enum Backend {
  PureStake = 'PureStake',
  Algod = 'Algod',
}
export enum API {
  Algod = 'Algod',
  Indexer = 'Indexer',
}

export interface Cache {
  assets: object;
  accounts: object;
}
