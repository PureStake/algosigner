/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { BlobStructure } from "./blobStructure";

///
// Class used as parameters for locking and unlocking wallet information.
///
export class LockParameters {
    passphrase: ArrayBuffer;
    encryptObject?: ArrayBuffer; 
    cVersion?: Number; 
    cSalt?: Uint8Array; 

    // Used initiate information around an encrypt object. Can be compatible with existing blobs, using the same version and salt.
    constructor(passphrase: ArrayBuffer, encryptObject?: ArrayBuffer, compatibleWithBlob?: BlobStructure){
        this.passphrase = passphrase;
        this.encryptObject = encryptObject; 
        
        if(compatibleWithBlob){
            this.cVersion = compatibleWithBlob.security.version;
            this.cSalt = compatibleWithBlob.security.salt;
        }
    }
}