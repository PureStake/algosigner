/* eslint-disable @typescript-eslint/ban-types */

import { LedgerTemplate } from '@algosigner/common/types/ledgers';

// Key and value must match in this enum so we
// can compare its existance with i.e. "TestNet" in SupportedLedger
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
  /*
        assets: {
            ledger: [
                assetId: {
                    ...
                },
                ...
            ],
            ...
        },
        accounts: {
            ledger: [
                address: {
                    ...
                },
                ...
            ],
            ...
        },
        availableLedgers: [
          {
            ...
          }
        ],
    */
  assets: object;
  accounts: object;
  availableLedgers: Array<LedgerTemplate>;
}
