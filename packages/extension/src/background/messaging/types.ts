// Key and value must match in this enum so we
// can compare its existance with i.e. "Testnet" in SupportedLedger

/* eslint-disable no-unused-vars */
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
  assets: Record<string, unknown>;
  accounts: Record<string, unknown>;
}
