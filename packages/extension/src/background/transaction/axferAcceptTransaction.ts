import { IAssetAcceptTx } from '@algosigner/common/interfaces/axfer_accept';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';
import { InvalidTransactionStructure } from '../../errors/validation';

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class AssetAcceptTx implements IAssetAcceptTx {
  type: string = undefined;
  assetIndex: number = undefined;
  from: string = undefined;
  fee: number = undefined;
  to: any = undefined;
  firstRound: number = undefined;
  lastRound: number = undefined;
  note?: string = null;
  genesisID: string = undefined;
  genesisHash: any = undefined;
  group?: any = null;
  lease?: any = null;
  reKeyTo?: any = null;
  amount?: number = null;
}

///
// Mapping, validation and error checking for axfer accept transactions prior to sign.
///
export class AssetAcceptTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Asset Opt-In';
  constructor(params: IAssetAcceptTx) {
    super(params, AssetAcceptTx);
    // Additional check to verify that amount is 0 and address from and to are the same
    if (
      this.transaction &&
      this.transaction['amount'] &&
      this.transaction['amount'] != 0
    ) {
      throw new InvalidTransactionStructure(
        `Creation of AssetAcceptTx has an invalid amount.`
      );
    }
    if (
      this.transaction &&
      this.transaction['to'] !== this.transaction['from']
    ) {
      throw new InvalidTransactionStructure(
        `Creation of AssetAcceptTx has non identical to and from fields.`
      );
    }
  }
}
