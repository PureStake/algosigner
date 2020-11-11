import { Settings } from '../config';
import { API, Cache, Ledger } from '../messaging/types';
const algosdk = require('algosdk');

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
