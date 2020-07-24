/**
 * @license
 * Copyright 2020 
 * =========================================
*/
import { DefaultEncryptionParameters } from "../parameters/default";
///
// Blob structure for locked objects.
///
export class Blob {
    salt: Uint8Array;
    nonce: Uint8Array;
    nIterations: number;
    version: number;
    encryptedObject: ArrayBuffer; 
    tag?: ArrayBuffer;

    constructor(encryptedObject: ArrayBuffer, salt: Uint8Array, nonce: Uint8Array, nIterations?: number, version?: number, tag?: ArrayBuffer){
        this.encryptedObject = encryptedObject; 
        this.salt = salt;
        this.nonce = nonce;
        this.nIterations = nIterations|| DefaultEncryptionParameters.Iterations;
        this.version = version || DefaultEncryptionParameters.Version;
        this.tag = tag;
    }
}