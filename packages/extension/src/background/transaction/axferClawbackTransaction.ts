import { IAssetClawbackTx } from '@algosigner/common/interfaces/axfer_clawback';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class AssetClawbackTx implements IAssetClawbackTx {
  type: string = undefined;
  assetIndex: number = undefined;
  amount: number = undefined;
  closeRemainderTo?: string = null;
  from: string = undefined;
  to: string = undefined;
  fee: number = undefined;
  firstRound: number = undefined;
  lastRound: number = undefined;
  note?: string = null;
  genesisID: string = undefined;
  genesisHash: any = undefined;
  group?: any = null;
  lease?: any = null;
  reKeyTo?: any = null;
  assetRevocationTarget: string = undefined;
}

///
// Mapping, validation and error checking for axfer clawback transactions prior to sign.
///
export class AssetClawbackTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Asset Clawback';
  constructor(params: IAssetClawbackTx) {
    super(params, AssetClawbackTx);
  }
}
