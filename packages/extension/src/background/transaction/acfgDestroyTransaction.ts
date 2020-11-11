import { IAssetDestroyTx } from '@algosigner/common/interfaces/acfg_destroy';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Mapping, validation and error checking for acfg destroy transactions prior to sign.
///
class AssetDestroyTx implements IAssetDestroyTx {
  type: string = undefined;
  assetIndex: number = undefined;
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
}

///
// Mapping, validation and error checking for acfg destroy transactions prior to sign.
///
export class AssetDestroyTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Destroy Asset';
  constructor(params: IAssetDestroyTx) {
    super(params, AssetDestroyTx);
  }
}
