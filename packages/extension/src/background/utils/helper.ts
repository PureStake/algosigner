/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const algosdk = require('algosdk');

import { Settings } from '@algosigner/common/messaging/config';
import { API, Ledger } from '@algosigner/common/messaging/types';
import { Cache } from '../messaging/types';

export function getAlgod(ledger: Ledger) {
  const params = Settings.getBackendParams(ledger, API.Algod);
  return new algosdk.Algodv2(params.apiKey, params.url, params.port);
}

export function getIndexer(ledger: Ledger) {
  const params = Settings.getBackendParams(ledger, API.Indexer);
  return new algosdk.Indexer(params.apiKey, params.url, params.port);
}

// Helper function to initialize Cache
export function initializeCache(
  c: Cache | undefined,
  ledger: Ledger | undefined = undefined
): Cache {
  let cache: Cache;
  if (c === undefined) {
    cache = {
      assets: {},
      accounts: {},
    };
  } else {
    cache = c;
  }

  if (ledger !== undefined) {
    if (!(ledger in cache.assets)) cache.assets[ledger] = {};
    if (!(ledger in cache.accounts)) cache.accounts[ledger] = {};
  }

  return cache;
}
