import { IApplTx } from '@algosigner/common/interfaces/appl';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Mapping, validation and error checking for appl transactions prior to sign.
///
export class ApplTx implements IApplTx {
  type: string = undefined;
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

  appIndex: number = 0;
  appOnComplete: number = 0;
  appAccounts?: any = null;
  appApprovalProgram?: any = null;
  appArgs?: any = null;
  appClearProgram?: any = null;
  appForeignApps?: any = null;
  appForeignAssets?: any = null;
  appGlobalInts?: number = null;
  appGlobalByteSlices?: number = null;
  appLocalInts?: number = null;
  appLocalByteSlices?: number = null;
  extraPages?: number = null;
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
