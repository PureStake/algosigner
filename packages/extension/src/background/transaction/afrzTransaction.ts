import { IAssetFreezeTx } from '@algosigner/common/interfaces/afrz';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Mapping, validation and error checking for afrz transactions prior to sign.
///
class AssetFreezeTx implements IAssetFreezeTx {
  type: string = undefined;
  assetIndex: number = undefined;
  freezeAccount: string = undefined;
  freezeState?: boolean = null;
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
}

///
// Mapping, validation and error checking for afrz transactions prior to sign.
///
export class AssetFreezeTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Freeze Asset';
  constructor(params: IAssetFreezeTx) {
    super(params, AssetFreezeTx);
  }
}
