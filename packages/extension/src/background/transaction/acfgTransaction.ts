import { AssetConfigTx } from "@algosigner/common/interfaces/acfg";
import { FieldType, validate } from "../utils/validator";

///
// Mapping, validation and error checking for transaction acfg transactions prior to sign.
///
export class AcfgTransaction implements AssetConfigTx {
    type: string;
    from?: string;
    fee: number;
    firstRound: number;
    lastRound: number;
    note?: any;
    genesisID: string;
    genesisHash: any;
    group?: any;
    lease?: any;
    assetIndex?: number;
    assetTotal?: number;
    assetDecimals?: number;
    assetDefaultFrozen?: boolean;
    assetUnitName?: string;
    assetName?: string;
    assetURL?: string;
    assetMetadataHash?: any;
    assetManager?: string;
    assetReserve?: string;
    assetFreeze?: string;
    assetClawback?: string;


    constructor(params: AcfgTransaction){
        for (let prop in params){
            // Verify there are no additional properties beyond the known property types
            var validProperties = ["type","from","fee","firstRound","lastRound","note","genesisID","genesisHash","group","lease","assetIndex","assetTotal","assetDecimals","assetDefaultFrozen","assetUnitName","assetName","assetURL","assetMetadataHash","assetManager","assetReserve","assetFreeze","assetClawback"];

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