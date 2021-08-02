import { IBaseTx } from './baseTx';

///
// Mapping interface of allowable fields for afrz transactions.
///

// prettier-ignore
export interface IAssetFreezeTx extends IBaseTx {
  type: string,               //"afrz"
  assetIndex: BigInt,         //uint64	  "xaid"	The unique ID of the asset to be transferred.
  freezeAccount: string,	    //Address	  "fadd"	The address of the account whose asset is being frozen or unfrozen.
  freezeState?: boolean	      //bool	    "afrz"	True to freeze the asset.
}
