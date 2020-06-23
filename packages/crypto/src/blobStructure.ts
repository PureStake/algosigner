/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { PBKDF2Security } from "./pbkdf2Security";

///
// Blob structure for locked objects.
///
export class BlobStructure {
    security: PBKDF2Security;
    encryptObject: ArrayBuffer; 
    tag?: ArrayBuffer;

    constructor(security: PBKDF2Security, encryptObject: ArrayBuffer, tag?: ArrayBuffer){
        this.security = security;
        this.encryptObject = encryptObject; 

        if(tag){
            this.tag = tag;
        }
    }
}