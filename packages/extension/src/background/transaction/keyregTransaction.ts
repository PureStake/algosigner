import { IKeyRegistrationTx } from "@algosigner/common/interfaces/keyreg";
import { BaseValidatedTxnWrap } from "./baseValidatedTxnWrap";

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class KeyRegistrationTx implements IKeyRegistrationTx {
    type: string = undefined;
    voteKey: string = undefined;
    selectionKey: string = undefined;
    voteFirst: number = undefined;
    voteLast: number = undefined;
    voteKeyDilution: number = undefined;
    from?: string = undefined;
    fee: number = undefined;
    firstRound: number = undefined;
    lastRound: number = undefined;
    note?: any = undefined;
    genesisID: string = undefined;
    genesisHash: any = undefined;
    group?: any = undefined;
    lease?: any = undefined;
}

///
// Mapping, validation and error checking for transaction keyreg transactions prior to sign.
///
export class KeyregTransaction  extends BaseValidatedTxnWrap {
    constructor(params: IKeyRegistrationTx){   
        super(params, KeyRegistrationTx);
    }
}