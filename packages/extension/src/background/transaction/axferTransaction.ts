import { IAssetTransferTx } from '@algosigner/common/interfaces/axfer';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class AssetTransferTx implements IAssetTransferTx {
  type: string = undefined;
  assetIndex: number = undefined;
  amount: number = undefined;
  to: string = undefined;
  closeRemainderTo?: string = null;
  from: string = undefined;
  fee: number = undefined;
  firstRound: number = undefined;
  lastRound: number = undefined;
  note?: string = null;
  genesisID: string = undefined;
  genesisHash: any = undefined;
  group?: any = null;
  lease?: any = null;
  reKeyTo?: any = null;
  flatFee?: any = null;
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
