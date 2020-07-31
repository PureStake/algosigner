import { IAssetFreezeTx } from "@algosigner/common/interfaces/afrz";
import { BaseValidatedTxnWrap } from "./baseValidatedTxnWrap";

///
// Mapping, validation and error checking for transaction afrz transactions prior to sign.
///
class AssetFreezeTx implements IAssetFreezeTx{
    type: string = undefined;
    assetIndex: number = undefined;
    freezeAccount: string = undefined;
    freezeState: boolean = undefined;
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
export class AfrzTransaction  extends BaseValidatedTxnWrap {
    constructor(params: IAssetFreezeTx){   
        super(params, AssetFreezeTx);
    }
}