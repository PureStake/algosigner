/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { PBKDF2Parameters } from "./pbkdf2Parameters";

///
// Encryption values for password derivation and encryption.
///
export class PBKDF2Security {
  salt: Uint8Array;
  iv: Uint8Array;
  iterations: number;
  version: number;

  // Creation requires a salt, iv, and an iterations amount that matches a PBKDF2Parameters.Iterations value.
  constructor(salt: Uint8Array, iv: Uint8Array, iterations: number) {
    if(salt.byteLength != PBKDF2Parameters.SaltSize || iv.byteLength != PBKDF2Parameters.IVSize) {
      throw new RangeError(`The Salt and IV byteLengths must be ${PBKDF2Parameters.SaltSize} and ${PBKDF2Parameters.IVSize}.`);
    }
    this.salt = salt;
    this.iv = iv;
    this.version = 1; // Currently the only version, will need to parameterize when a new version is created

    // Restrict iteration values to a default option.
    if(!Object.values(PBKDF2Parameters.Iterations).includes(iterations)) {
      throw new RangeError("The iterations value must match a PBKDF2Parameters.Iterations value.");
    }
    this.iterations =  iterations;
  }
}