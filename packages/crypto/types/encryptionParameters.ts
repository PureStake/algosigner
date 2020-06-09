/**
 * @license
 * Copyright 2020 
 * =========================================
*/

export default class EncryptionParameters {
    salt: Uint8Array;
    iv: Uint8Array;
    iterations: number;

    constructor(saltValue: Uint8Array, ivValue: Uint8Array, iterationsValue: number){
        this.salt = saltValue;
        this.iv = ivValue;
        this.iterations = iterationsValue;
    }
} 