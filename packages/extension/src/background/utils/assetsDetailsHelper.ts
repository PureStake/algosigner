import { ExtensionStorage } from "@algosigner/storage/src/extensionStorage";
import { InternalMethods } from '../messaging/internalMethods';
import { Ledger } from "../messaging/types"

///
// Helper class for getting and saving the details of assets in an ordered fashion
///
export default class AssetsDetailsHelper {
    private static assetsToAdd : {[key: string]: Array<number>} = {
        [Ledger.TestNet]: [],
        [Ledger.MainNet]: []
    }

    private static timeouts = {
        [Ledger.TestNet]: null,
        [Ledger.MainNet]: null
    }

    public static add(assets: Array<number>, ledger: Ledger) {
        this.assetsToAdd[ledger] = this.assetsToAdd[ledger].concat(assets);
        if (this.timeouts[ledger] === null && this.assetsToAdd[ledger].length > 0)
            this.timeouts[ledger] = setTimeout(() => this.run(ledger), 500);
    }

    private static run(ledger: Ledger) {
        if (this.assetsToAdd[ledger].length === 0){
            this.timeouts[ledger] = null;
            return;
        }

        let extensionStorage = new ExtensionStorage();
        extensionStorage.getStorage('assets', (savedAssets: any) => {
            let assets = savedAssets || {
                [Ledger.TestNet]: {},
                [Ledger.MainNet]: {}
            };

            let assetId = this.assetsToAdd[ledger][0];
            while (assetId in assets[ledger]) {
                this.assetsToAdd[ledger].shift();
                if (this.assetsToAdd[ledger].length === 0)
                    return;
                assetId = this.assetsToAdd[ledger][0];
            }

            let indexer = InternalMethods.getIndexer(ledger);
            indexer.lookupAssetByID(assetId).do().then((res: any) => {
                assets[ledger][assetId] = res.asset.params;
                extensionStorage.setStorage('assets', assets, null);
            }).finally(() => {
                this.timeouts[ledger] = setTimeout(() => this.run(ledger), 500);
            });
        });
    }
}