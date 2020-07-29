import { AssetFreezeTx } from "@algosigner/common/interfaces/afrz";
import { FieldType, validate } from "../utils/validator";

///
// Mapping, validation and error checking for transaction afrz transactions prior to sign.
///
export class AfrzTransaction implements AssetFreezeTx {
    type: string;
    assetIndex: number;
    freezeAccount: string;
    freezeState: boolean;
    from: string;
    fee: number;
    firstRound: number;
    lastRound: number;
    note?: any;
    genesisID: string;
    genesisHash: any;
    group?: any;
    lease?: any;

    constructor(params: AssetFreezeTx){
        for (let prop in params){
            // Verify there are no additional properties beyond the known property types
            var validProperties = ["type","assetIndex","freezeAccount","freezeState","from","fee","firstRound","lastRound","note","genesisID","genesisHash","group","lease"];
            
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