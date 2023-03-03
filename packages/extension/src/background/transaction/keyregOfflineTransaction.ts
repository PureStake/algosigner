import { IKeyRegistrationTx } from '@algosigner/common/interfaces/keyreg';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class OfflineKeyRegistrationTx implements IKeyRegistrationTx {
  type: string = undefined;
  stateProofKey?: string = null;
  nonParticipation: boolean = undefined;
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
// Mapping, validation and error checking for keyreg transactions prior to sign.
///
export class OfflineKeyregTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Offline Key Registration';
  constructor(params: IKeyRegistrationTx) {
    super(params, OfflineKeyRegistrationTx);
  }
}
