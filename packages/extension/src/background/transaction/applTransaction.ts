import { IApplTx } from "@algosigner/common/interfaces/appl";
import { BaseValidatedTxnWrap } from "./baseValidatedTxnWrap";

///
// Mapping, validation and error checking for appl transactions prior to sign.
///
export class ApplTx implements IApplTx {
    type: string = undefined;;
    apid: number = undefined;;
    apan: number = undefined;;
    apat?: string = null;
    apap?: string = null;
    apaa?: any = null;
    apsu?: string = null;
    apfa?: string = null;
    apas?: string = null;
    apgs?: any = null;
    apls?: any = null;
}

///
// Mapping, validation and error checking for appl transactions prior to sign.
///
export class ApplTransaction  extends BaseValidatedTxnWrap {
    txDerivedTypeText: string = 'Application';
    constructor(params: IApplTx){   
        super(params, ApplTx);
    }
}