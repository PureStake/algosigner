import { Validate, ValidationResponse } from "../utils/validator";
import { logging } from "@algosigner/common/logging";

//
// Base validated transaction wrap.  
///
export class BaseValidatedTxnWrap {
    transaction: any = undefined;
    validityObject: object = {};

    constructor(params: any, txnType: any) { 
        this.transaction = new txnType();
        for (let prop in params) {
            if(!(Object.keys(this.transaction).includes(prop))){
                throw new Error(`Transaction has additional unknown fields.`);
            }
            try {
                this.transaction[prop] = params[prop];
                this.validityObject[prop] = Validate(prop, params[prop]) as ValidationResponse;     
            }
            catch(e){
                logging.log(e);
                throw new Error(`Transaction has encountered an unknown error while processing.`);
            }
        }
    }
}
