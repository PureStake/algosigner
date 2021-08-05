import { IBaseTx } from './baseTx';

///
// Mapping interface of allowable fields for axfer transactions.
///

// prettier-ignore
export interface IAssetTransferTx extends IBaseTx {
  type: string,                 //"axfer"
  assetIndex: number,           //uint64	  "xaid"	    The unique ID of the asset to be transferred.
  amount: BigInt,	              //uint64	  "aamt"	    The amount of the asset to be transferred. A zero amount transferred to self allocates that asset in the account's Asset map.
  to: string,	                  //Address	  "arcv"	    The recipient of the asset transfer.
  closeRemainderTo?: string,	  //Address	  "aclose"	  Specify this field to remove the asset holding from the sender account and reduce the account's minimum balance.
}
