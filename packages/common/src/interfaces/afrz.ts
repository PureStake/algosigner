import { BaseTx } from "./baseTx";

///
// Mapping interface of allowable fields for afrz transactions.
///
export interface AssetFreezeTx extends BaseTx {
    type: string,               //"afrz"
    assetIndex: number,         //uint64	"xaid"	    The unique ID of the asset to be transferred.
    freezeAccount: string,	    //Address	"fadd"	The address of the account whose asset is being frozen or unfrozen.
    freezeState: boolean	    //bool	    "afrz"	True to freeze the asset.
}
