import { IAssetConfigTx } from "@algosigner/common/interfaces/acfg";
import { BaseValidatedTxnWrap } from "./baseValidatedTxnWrap";

///
// Mapping, validation and error checking for transaction acfg transactions prior to sign.
///
class AssetConfigTx implements IAssetConfigTx {
    type: string = undefined;
    assetIndex?: number = undefined;
    assetTotal?: number = undefined;
    assetDecimals?: number = undefined;
    assetDefaultFrozen?: boolean = undefined;
    assetUnitName?: string = undefined;
    assetName?: string = undefined;
    assetURL?: string = undefined;
    assetMetadataHash?: any = undefined;
    assetManager?: string = undefined;
    assetReserve?: string = undefined;
    assetFreeze?: string = undefined;
    assetClawback?: string = undefined;
    from?: string = undefined;
    fee: number = undefined;
    firstRound: number = undefined;
    lastRound: number = undefined;
    note?: any = undefined;
    genesisID: string = undefined;
    genesisHash: any = undefined;
    group?: any = undefined;
    lease?: any = undefined;
};

///
// Mapping, validation and error checking for transaction pay transactions prior to sign.
///
export class AcfgTransaction  extends BaseValidatedTxnWrap {
    constructor(params: IAssetConfigTx){   
        super(params, AssetConfigTx);
    }
} 