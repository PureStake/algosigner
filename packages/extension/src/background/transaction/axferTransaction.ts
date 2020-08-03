import { IAssetTransferTx } from "@algosigner/common/interfaces/axfer";
import { BaseValidatedTxnWrap } from "./baseValidatedTxnWrap";

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class AssetTransferTx implements IAssetTransferTx {
    type: string = undefined;
    assetIndex: number = undefined;
    amount?: number = undefined;
    to: string = undefined;
    assetCloseTo?: string = undefined;
    from?: string = undefined;
    fee: number = undefined;
    firstRound: number = undefined;
    lastRound: number = undefined;
    note?: string = undefined;
    genesisID: string = undefined;
    genesisHash: any = undefined;
    group?: any = undefined;
    lease?: any = undefined;

}

///
// Mapping, validation and error checking for transaction axfer transactions prior to sign.
///
export class AxferTransaction   extends BaseValidatedTxnWrap {
    constructor(params: IAssetTransferTx){   
        super(params, AssetTransferTx);
    }
}