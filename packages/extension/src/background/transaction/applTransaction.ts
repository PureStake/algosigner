import { IApplTx } from '@algosigner/common/interfaces/appl';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Mapping, validation and error checking for appl transactions prior to sign.
///
export class ApplTx implements IApplTx {
  type: string = undefined;
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

  appIndex?: any = null;
  appOnComplete?: any = null;
  appAccounts?: any = null;
  appApprovalProgram?: any = null;
  appArgs?: any = null;
  appClearProgram?: any = null;
  appForeignApps?: any = null;
  appForeignAssets?: any = null;
  appGlobalInts?: any = null;
  appGlobalByteSlices?: any = null;
  appLocalInts?: any = null;
  appLocalByteSlices?: any = null;
}

///
// Mapping, validation and error checking for appl transactions prior to sign.
///
export class ApplTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Application';
  constructor(params: IApplTx, v1Validations: boolean) {
    super(params, ApplTx, v1Validations);
  }
}
