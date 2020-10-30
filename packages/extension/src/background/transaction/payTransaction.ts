import { IPaymentTx } from "@algosigner/common/interfaces/pay";
import { BaseValidatedTxnWrap } from "./baseValidatedTxnWrap";

///
// Base implementation of the transactions type interface, for use in the export wrapper class below.
///
class PaymentTx implements IPaymentTx{
    type: string = undefined;
    to: string = undefined;
    amount: number = undefined;
    closeRemainderTo?: string = null;
    reKeyTo?: any = null;
    from: string = undefined;
    fee: number = undefined;
    firstRound: number = undefined;
    lastRound: number = undefined;
    note?: string = null;
    genesisID: string = undefined;
    genesisHash: any = undefined;
    group?: any = null;
    lease?: any = null;
};

///
// Mapping, validation and error checking for pay transactions prior to sign.
///
export class PayTransaction extends BaseValidatedTxnWrap {
    txDerivedTypeText: string = 'Pay Algos';
    constructor(params: IPaymentTx){   
        super(params, PaymentTx);
    }
}
