import { IBaseTx } from './baseTx';

///
// Mapping interface of allowable fields for axfer transactions.
///

// prettier-ignore
export interface IAssetCloseTx extends IBaseTx {
  type: string,                     //"axfer"
  assetIndex: number,               //uint64	  "xaid"	    The unique ID of the asset to be transferred.
  closeRemainderTo: string,	        //Address	  "aclose"	  Specify this field to remove the asset holding from the sender account and reduce the account's minimum balance.
  to: string,                       //Address               
}
