import { RequestError } from '@algosigner/common/errors';
import { IKeyRegistrationTx } from '@algosigner/common/interfaces/keyreg';
import { BaseValidatedTxnWrap } from './baseValidatedTxnWrap';

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class OnlineKeyRegistrationTx implements IKeyRegistrationTx {
  type: string = undefined;
  voteKey: string = undefined;
  selectionKey: string = undefined;
  stateProofKey?: string = null;
  voteFirst: number = undefined;
  voteLast: number = undefined;
  voteKeyDilution: number = undefined;
  nonParticipation?: boolean = false;
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
export class OnlineKeyregTransaction extends BaseValidatedTxnWrap {
  txDerivedTypeText: string = 'Online Key Registration';
  constructor(params: IKeyRegistrationTx) {
    // Additional checks for Key Regs
    if (params.nonParticipation) {
      throw RequestError.InvalidTransactionStructure(`On creation of OfflineKeyRegistrationTx if nonParticipation is set to true; voteKey, selectionKey, voteFirst, voteLast, and voteKeyDilution must be undefined.`);
    }
    super(params, OnlineKeyRegistrationTx);
  }
}
