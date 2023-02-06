import { IAssetConfigTx } from '@algosigner/common/interfaces/acfg';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Mapping, validation and error checking for acfg transactions prior to sign.
///
class AssetConfigTx implements IAssetConfigTx {
  type: string = undefined;
  assetIndex: number = undefined;
  from: string = undefined;
  fee?: number = 0;
  firstRound: number = undefined;
  lastRound: number = undefined;
  note?: string = null;
  genesisID: string = undefined;
  genesisHash: any = undefined;
  assetManager: string = undefined;
  assetReserve: string = undefined;
  assetFreeze: string = undefined;
  assetClawback: string = undefined;
  group?: string = null;
  lease?: any = null;
  reKeyTo?: any = null;
  flatFee?: any = null;
  name?: string = null;
  tag?: string = null;
}

///
// Mapping, validation and error checking for asset config transactions prior to sign.
///
export class AssetConfigTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Modify Asset';
  constructor(params: IAssetConfigTx) {
    super(params, AssetConfigTx);
  }
}
