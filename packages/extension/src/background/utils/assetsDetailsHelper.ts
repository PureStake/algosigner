import { ExtensionStorage } from '@algosigner/storage/src/extensionStorage';
import { Network } from '@algosigner/common/types/network';
import { InternalMethods } from '../messaging/internalMethods';
import { Cache } from '../messaging/types';
import { initializeCache } from './helper';

const TIMEOUT = 500;

///
// Helper class for getting and saving the details of assets in an ordered fashion
///
export default class AssetsDetailsHelper {
  private static assetsToAdd: { [key: string]: Array<number> } = {
    [Network.TestNet]: [],
    [Network.MainNet]: [],
  };

  private static timeouts = {
    [Network.TestNet]: null,
    [Network.MainNet]: null,
  };

  public static add(assets: Array<number>, ledger: Network) {
    // If this ledger doesn't have assets yet, then default them to an array
    if (this.assetsToAdd[ledger] === undefined) {
      this.assetsToAdd[ledger] = [];
    }

    this.assetsToAdd[ledger] = this.assetsToAdd[ledger].concat(assets);
    if (this.timeouts[ledger] === null && this.assetsToAdd[ledger].length > 0)
      this.timeouts[ledger] = setTimeout(() => this.run(ledger), TIMEOUT);
  }

  private static run(network: Network) {
    if (this.assetsToAdd[network].length === 0) {
      this.timeouts[network] = null;
      return;
    }

    const extensionStorage = new ExtensionStorage();
    extensionStorage.getStorage('cache', (storedCache: any) => {
      const cache: Cache = initializeCache(storedCache, network);

      let assetId = this.assetsToAdd[network][0];
      while (assetId in cache.assets[network]) {
        this.assetsToAdd[network].shift();
        if (this.assetsToAdd[network].length === 0) {
          this.timeouts[network] = null;
          return;
        }
        assetId = this.assetsToAdd[network][0];
      }

      const indexer = InternalMethods.getIndexer(network);
      indexer
        .lookupAssetByID(assetId)
        .do()
        .then((res: any) => {
          cache.assets[network][assetId] = res.asset.params;
          extensionStorage.setStorage('cache', cache, null);
        })
        .catch(() => {
          // If there's an issue with the request, remove the asset from the queue.
          // If not done, it will just keep trying to get the same asset over and over.
          this.assetsToAdd[network].shift();
        })
        .finally(() => {
          this.timeouts[network] = setTimeout(() => this.run(network), TIMEOUT);
        });
    });
  }
}
