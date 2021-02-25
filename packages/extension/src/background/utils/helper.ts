/* eslint-disable @typescript-eslint/no-var-requires */
const algosdk = require('algosdk');
import { getBaseSupportedLedgers, LedgerTemplate } from '@algosigner/common/types/ledgers';
import { ExtensionStorage } from '@algosigner/storage/src/extensionStorage';
import { Settings } from '../config';
import { API, Cache, Ledger } from '../messaging/types';

export function getAlgod(ledger: string) {
  const params = Settings.getBackendParams(ledger, API.Algod);
  return new algosdk.Algodv2(params.apiKey, params.url, params.port, params.headers);
}

export function getIndexer(ledger: string) {
  const params = Settings.getBackendParams(ledger, API.Indexer);
  return new algosdk.Indexer(params.apiKey, params.url, params.port, params.headers);
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
      availableLedgers: [],
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

export function getAvailableLedgersExt(callback) {
  // Load Accounts details from Cache
  const availableLedgers = getBaseSupportedLedgers();
  const extensionStorage = new ExtensionStorage();
  extensionStorage.getStorage('cache', (storedCache: any) => {
    const cache: Cache = initializeCache(storedCache);
    // Add ledgers from cache to the base ledgers
    if (cache.availableLedgers && cache.availableLedgers.length > 0) {
      // We should reset and update the injected networks to ensure they will be available for use
      Settings.backend_settings.InjectedNetworks = {};

      for (var i = 0; i < cache.availableLedgers.length; i++) {
        if (
          !availableLedgers.some(
            (e) => e.name.toLowerCase() === cache.availableLedgers[i].name.toLowerCase()
          )
        ) {
          const ledgerFromCache = new LedgerTemplate(cache.availableLedgers[i]);
          Settings.addInjectedNetwork(ledgerFromCache);
          availableLedgers.push(ledgerFromCache);
        }
      }
    }
    callback(availableLedgers);
  });
}
