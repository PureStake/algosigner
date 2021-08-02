import { IKeyRegistrationTx } from '@algosigner/common/interfaces/keyreg';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class KeyRegistrationTx implements IKeyRegistrationTx {
  type: string = undefined;
  voteKey: string = undefined;
  selectionKey: string = undefined;
  voteFirst: BigInt = undefined;
  voteLast: BigInt = undefined;
  voteKeyDilution?: BigInt = null;
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
// Mapping, validation and error checking for keyreg transactions prior to sign.
///
export class KeyregTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Key Registration';
  constructor(params: IKeyRegistrationTx, v1Validations: boolean) {
    super(params, KeyRegistrationTx, v1Validations);
  }
}
