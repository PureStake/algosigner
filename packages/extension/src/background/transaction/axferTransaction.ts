import { IAssetTransferTx } from '@algosigner/common/interfaces/axfer';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class AssetTransferTx implements IAssetTransferTx {
  type: string = undefined;
  assetIndex: number = undefined;
  amount: BigInt = BigInt(0);
  from: string = undefined;
  to: string = undefined;
  closeRemainderTo?: string = null;
  fee?: number = 0;
  firstRound: number = undefined;
  lastRound: number = undefined;
  note?: string = null;
  genesisID: string = undefined;
  genesisHash: any = undefined;
  group?: string = null;
  lease?: any = null;
  reKeyTo?: any = null;
  flatFee?: any = null;
  name?: string = null;
  tag?: string = null;
}

///
// Mapping, validation and error checking for axfer transactions prior to sign.
///
export class AssetTransferTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Asset Transfer';
  constructor(params: IAssetTransferTx, v1Validations: boolean) {
    super(params, AssetTransferTx, v1Validations);
  }
}
