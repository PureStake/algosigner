import { IKeyRegistrationTx } from '@algosigner/common/interfaces/keyreg';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class KeyRegistrationTx implements IKeyRegistrationTx {
  type: string = undefined;
  voteKey: string = undefined;
  selectionKey: string = undefined;
  voteFirst: number = undefined;
  voteLast: number = undefined;
  voteKeyDilution?: number = null;
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
// Mapping, validation and error checking for keyreg transactions prior to sign.
///
export class KeyregTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Key Registration';
  constructor(params: IKeyRegistrationTx) {
    super(params, KeyRegistrationTx);
  }
}
