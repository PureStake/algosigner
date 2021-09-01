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
  group?: string = null;
  lease?: any = null;
  reKeyTo?: any = null;
  flatFee?: any = null;
  name?: string = null;
  tag?: string = null;

  // Modifications must include one of these
  assetTotal?: BigInt = null;
  assetDecimals?: number = null;
  assetDefaultFrozen?: boolean = null;
  assetUnitName?: string = null;
  assetName?: string = null;
  assetURL?: string = null;
  assetMetadataHash?: any = null;
  assetManager?: string = null;
  assetReserve?: string = null;
  assetFreeze?: string = null;
  assetClawback?: string = null;
}

// A set of params in which at least one must have a value
const requiredAcfgParams: Array<string> = [
  'assetTotal',
  'assetDecimals',
  'assetDefaultFrozen',
  'assetUnitName',
  'assetName',
  'assetURL',
  'assetMetadataHash',
  'assetManager',
  'assetReserve',
  'assetFreeze',
  'assetClawback',
];

///
// Mapping, validation and error checking for asset config transactions prior to sign.
///
export class AssetConfigTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Modify Asset';
  constructor(params: IAssetConfigTx, v1Validations: boolean) {
    super(params, AssetConfigTx, v1Validations, requiredAcfgParams);
  }
}
