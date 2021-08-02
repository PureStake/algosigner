import { IAssetDestroyTx } from '@algosigner/common/interfaces/acfg_destroy';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Mapping, validation and error checking for acfg destroy transactions prior to sign.
///
class AssetDestroyTx implements IAssetDestroyTx {
  type: string = undefined;
  assetIndex: BigInt = undefined;
  from: string = undefined;
  fee: BigInt = undefined;
  firstRound: BigInt = undefined;
  lastRound: BigInt = undefined;
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
// Mapping, validation and error checking for acfg destroy transactions prior to sign.
///
export class AssetDestroyTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Destroy Asset';
  constructor(params: IAssetDestroyTx, v1Validations: boolean) {
    super(params, AssetDestroyTx, v1Validations);
  }
}
