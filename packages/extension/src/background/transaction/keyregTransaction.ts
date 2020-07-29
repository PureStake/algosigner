import { KeyRegistrationTx } from "@algosigner/common/interfaces/keyreg";
import { FieldType, validate } from "../utils/validator";

///
// Mapping, validation and error checking for transaction keyreg transactions prior to sign.
///
export class KeyregTransaction implements KeyRegistrationTx {
    type: string;
    voteKey: string;
    selectionKey: string;
    voteFirst: number;
    voteLast: number;
    voteKeyDilution: number;
    from?: string;
    fee: number;
    firstRound: number;
    lastRound: number;
    note?: any;
    genesisID: string;
    genesisHash: any;
    group?: any;
    lease?: any;
    
    constructor(params: KeyregTransaction){
        for (let prop in params){
            // Verify there are no additional properties beyond the known property types
            var validProperties = ["type","voteKey","selectionKey","voteFirst","voteLast","voteKeyDilution","from","fee","firstRound","lastRound","note","genesisID","genesisHash","group","lease"];
            
            if(!(validProperties.includes(prop))){
                throw new Error(`Transaction has additional unknown fields.`);
            }
            
            // Validate the property type
            let propValid = validate(prop, params[prop], FieldType.Any);
            if(!propValid)
            {
                throw Error(`Property ${prop} is not valid with a value of ${params[prop]}.`);
            }

            // Assign the property
            this[prop] = params[prop];
        }
    }
}