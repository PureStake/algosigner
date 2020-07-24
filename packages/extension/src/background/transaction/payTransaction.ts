import { Pay } from "@algosigner/common/interfaces/pay";
import { FieldType, validate } from "../utils/validator";

///
// Mapping, validation and error checking for transaction pay transactions prior to sign.
///
export class PayTransaction implements Pay {
    type: string;
    to: string;
    fee: number;
    amount: number; 
    firstRound: number;
    lastRound: number;
    genesisID: string; 
    genesisHash: string;
    closeRemainderTo: string;
    note: Uint8Array;

    constructor(params: Pay){
        // Verify there are no additional properties beyond the known property types
        for (let prop in params){
            console.log(`Property: ${prop} - ${typeof prop}`);
            if(!(prop in this)){
                throw new Error(`Transaction has additional unknown fields.`);
            }
        }

        // TODO: Verify the type is Pay
        // Question: Verify the address?
        this.type = params.type;
        this.to = params.to;

        if(params.fee > 1000) {
            // TODO: Warn/Error on fee amount? Threshold?
            // throw new Error(`Transaction has an abnormaly large fee.`);
        }
        this.fee = params.fee;


        this.amount = params.amount; 

        // TODO: Warn/Error on rounds already past or out too far out for current genesisHash? 
        this.firstRound = params.firstRound;
        this.lastRound = params.lastRound;
        this.genesisID = params.genesisID; 
        this.genesisHash = params.genesisHash;

        if(params.closeRemainderTo){
            // TODO: Warn/Error on closeto? Threshold?
            // throw new Error(`Transaction has additional unknown fields.`);
        }
        this.closeRemainderTo = params.closeRemainderTo;

        this.note = params.note;
    }
}