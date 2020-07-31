import { IPaymentTx } from "@algosigner/common/interfaces/pay";
import { BaseValidatedTxnWrap } from "./baseValidatedTxnWrap";

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class PaymentTx implements IPaymentTx{
    type: string = undefined;
    to: string = undefined;
    amount: number = undefined;
    closeRemainderTo?: string = undefined;
    rekey?: any = undefined;
    from?: string = undefined;
    fee: number = undefined;
    firstRound: number = undefined;
    lastRound: number = undefined;
    note?: any = undefined;
    genesisID: string = undefined;
    genesisHash: any = undefined;
    group?: any = undefined;
    lease?: any = undefined;
};

///
// Mapping, validation and error checking for transaction pay transactions prior to sign.
///
export class PayTransaction extends BaseValidatedTxnWrap {
    constructor(params: IPaymentTx){   
        super(params, PaymentTx);
    }
}
