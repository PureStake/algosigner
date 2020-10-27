import { Validate, ValidationResponse } from "../utils/validator";
import { logging } from "@algosigner/common/logging";
import { InvalidTransactionStructure } from "../../errors/validation"

//
// Base validated transaction wrap.  
///
export class BaseValidatedTxnWrap {
    transaction: any = undefined;
    validityObject: object = {};
    txDerivedTypeText: string;
    
    constructor(params: any, txnType: any, requiredParamsSet: Array<string> = undefined) { 
        this.transaction = new txnType();
        var missingFields = [];
        var extraFields = [];
        
        // Cycle base transaction fields for this type of transaction to verify require fields are present. 
        // Nullable type fields are being initialized to null instead of undefined.
        Object.entries(this.transaction).forEach(([key, value]) => {
            if(value === undefined && (params[key] === undefined || params[key] === null)){
                missingFields.push(key)
            }
        });
        
        // Check required values in the case where one of a set is required.
        if(requiredParamsSet && requiredParamsSet.length > 0){
            var foundValue = false;
            requiredParamsSet.forEach(key => {
                if(params[key] !== undefined && params[key] !== null){
                    foundValue = true;
                }
            });
            if(!foundValue){
                missingFields.push(`Transaction requires one parameter from:[${requiredParamsSet}]`);
            }
        }

        // Throwing error here so that missing fields can be combined. 
        if(missingFields.length > 0){
            throw new InvalidTransactionStructure(`Creation of ${txnType.name} has missing or invalid required properties: ${missingFields.toString()}.`)
        }

        // Check the properties included versus the interface. Reject transactions with unknown fields.
        
        for (let prop in params) {
            if(!(Object.keys(this.transaction).includes(prop))){
                extraFields.push(prop);
            }
            else {
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

        // Throwing error here so that extra fields can be combined. 
        if(extraFields.length > 0){
            throw new InvalidTransactionStructure(`Creation of ${txnType.name} has extra or invalid fields: ${extraFields.toString()}.`)
        }
    }
}
