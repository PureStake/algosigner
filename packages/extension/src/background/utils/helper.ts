import algosdk from 'algosdk';
import { getBaseSupportedNetworks, Network, NetworkTemplate } from '@algosigner/common/types/network';
import { ExtensionStorage } from '@algosigner/storage/src/extensionStorage';
import { Settings } from '../config';
import { API, Cache } from '../messaging/types';

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
  c: Cache | undefined = undefined,
  network: Network | undefined = undefined
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

  if (network !== undefined) {
    if (!(network in cache.assets)) cache.assets[network] = {};
    if (!(network in cache.accounts)) cache.accounts[network] = {};
  }

  return cache;
}

export function getAvailableNetworksFromCache(callback?: Function): Array<NetworkTemplate> | void {
  // Load network details from Cache
  const availableNetworks = getBaseSupportedNetworks();
  const extensionStorage = new ExtensionStorage();
  extensionStorage.getStorage('cache', (storedCache) => {
    const cache: Cache = initializeCache(storedCache);

    // Join networks from cache with the base networks
    if (cache.availableLedgers && cache.availableLedgers.length > 0) {
      // We should reset and update the injected networks to ensure they will be available for use
      Settings.backend_settings.InjectedNetworks = {};
  
      for (let i = 0; i < cache.availableLedgers.length; i++) {
        const networkFromCache = new NetworkTemplate(cache.availableLedgers[i]);
        if (networkFromCache.isEditable) {
          Settings.addInjectedNetwork(networkFromCache);
          availableNetworks.push(networkFromCache);
        }
      }
    }
    if (callback) {
      callback(availableNetworks);
    } else {
      return availableNetworks;
    }
  });
}
