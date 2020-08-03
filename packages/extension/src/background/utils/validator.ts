const algosdk = require("algosdk");

///
// Validation responses.
///
export enum ValidationResponse {
    Valid = 0,      // Field is valid or not one of the validated fields
    Invalid = 1,    // Field value is invalid and should not be used
    Warning = 2,    // Field is out of normal parameters and should be inspected closely
    Dangerous = 3   // Field has risky or costly fields with values and should be inspected very closely
}

///
// Return field if valid based on type.
///
export function Validate(field: any, value: any): ValidationResponse {
    switch(field) {
        // Validate the address is accurate
        case "to":
            if(!algosdk.isValidAddress(value)) {
                return ValidationResponse.Invalid; 
            }
            else {
                return ValidationResponse.Valid;  
            }

        case "amount":
        case "assetIndex":
        case "firstRound":
        case "lastRound":
        case "voteFirst":
        case "voteLast":
        case "voteKeyDilution":
            if (value && (!Number.isSafeInteger(value) || value < 0)){
                return ValidationResponse.Invalid;
            }
            else {
                return ValidationResponse.Valid;  
            }

        // Warn on fee amounts above minimum, send dangerous response on those above 1 Algo.
        case "fee":
            try {
                if(value && (!Number.isSafeInteger(value) || value < 0)) {
                    return ValidationResponse.Invalid;
                } 
                else if(value && parseInt(value) > 1000) { 
                    return ValidationResponse.Warning; 
                }
                else if(value && parseInt(value) > 1000000) {
                    return ValidationResponse.Dangerous; 
                }
                else {
                    return ValidationResponse.Valid;  
                }
            }
            catch {
                // For any case where the parse int may fail.
                return ValidationResponse.Invalid; 
            }

        // Close to types should issue a Dangerous validation warning if they contain values.
        case "closeRemainderTo":
            if(value) { 
                return ValidationResponse.Dangerous; 
            }
            else {
                return ValidationResponse.Valid;  
            }

        case "assetCloseTo":
            if(value) { 
                return ValidationResponse.Dangerous;  
            }
            else {
                return ValidationResponse.Valid;  
            }

        case "rekey":
            if(value) { 
                return ValidationResponse.Invalid;  
            }
            else {
                return ValidationResponse.Valid;  
            }
            
        default:
            // Our field isn't one of the listed ones, so we can mark it as valid
            return ValidationResponse.Valid;
    }

    // If for some reason the case falls through mark the field invalid.
    return ValidationResponse.Invalid;
}