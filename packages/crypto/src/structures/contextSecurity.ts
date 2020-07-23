/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { Iterations, DefaultEncryptionParameters, ValidVersions } from "../parameters/default";
import { validateIterations, validateVersion } from "../parameters/validate";

///
// Structure used for locking and unlocking via secure storage context parameters.
///
export class ContextSecurity {
    passphrase: ArrayBuffer;
    nIterations: number;
    version: number; 
       
    // Passphrase required, nIterations and version can be overridden or left as defaults.
    constructor(passphrase: ArrayBuffer, params?: any) {
        if(!(passphrase instanceof ArrayBuffer || ArrayBuffer.isView(passphrase))){
            console.log(typeof(passphrase));
            throw new SyntaxError("The provided passphrase parameter is not an instance of ArrayBuffer.");
        }
        this.passphrase = passphrase;
             
        if((params && params.version)){ 
            validateVersion(params.version);      
        }
        this.version = (params && params.version) || DefaultEncryptionParameters.Version;

        if((params && params.nIterations)) {
            validateIterations(params.nIterations);       
        }
        // Default the iteration to strong if not present
        this.nIterations = (params && params.nIterations) || Iterations.STRONG; 
    }
}
