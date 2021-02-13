import { IAssetCreateTx } from '@algosigner/common/interfaces/acfg_create';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Mapping, validation and error checking for acfg create transactions prior to sign.
///
class AssetCreateTx implements IAssetCreateTx {
  assetTotal: number = undefined;
  assetDecimals: number = undefined;
  type: string = undefined;
  from: string = undefined;
  fee: number = undefined;
  firstRound: number = undefined;
  lastRound: number = undefined;
  note?: string = null;
  genesisID: string = undefined;
  genesisHash: any = undefined;
  assetDefaultFrozen?: boolean = null;
  assetUnitName?: string = null;
  assetName?: string = null;
  assetURL?: string = null;
  assetMetadataHash?: any = null;
  assetManager?: string = null;
  assetReserve?: string = null;
  assetFreeze?: string = null;
  assetClawback?: string = null;
  group?: any = null;
  lease?: any = null;
  reKeyTo?: any = null;
  flatFee?: any = null;
  name?: string = null;
  tag?: any = null;
}

///
// Mapping, validation and error checking for acfg create transactions prior to sign.
///
export class AssetCreateTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Create Asset';
  constructor(params: IAssetCreateTx) {
    super(params, AssetCreateTx);
  }
}
