/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { ContextSecurity } from "./structures/contextSecurity";
import { DefaultEncryptionParameters } from "./parameters/default";
import { validateSalt, validateIterations } from "./parameters/validate";
import { InvalidCipherText } from "./errors/types";
import { Blob } from "./structures/blob";

///
// Encryption default functionality for AlgoSigner. 
// Uses pbkdf2 and SHA-256 for passphrase derivation and hash.
// Uses a 256 bit AES-GCM cipher for encryption.
// params may contain values for ['nIterations', 'version'].
///
export class SecureStorageContext {
  contextSecurity: ContextSecurity;
  constructor(passphrase: ArrayBuffer, params?: any) {
    this.contextSecurity = new ContextSecurity(passphrase, params);
  }
  
  ///
  // Create a 96 bit array buffer using version for iv.
  ///
  private getVersionBuffer(){
    let paddedVersion = DefaultEncryptionParameters.Version.toString().padStart(12, '0');
    var versionBuffer = new ArrayBuffer(paddedVersion.length); 
    var versionUint8Array = new Uint8Array(versionBuffer);
    for (var i = 0; i < paddedVersion.length; i++) {
      versionUint8Array[i] = paddedVersion.charCodeAt(i);
    }
    return versionBuffer;
  }

  ///
  // Generate random values using crypto getRandomValues based on provided byte length value.
  ///
  private generateRandomValues(byteLength: number): Uint8Array {
      return window.crypto.getRandomValues(new Uint8Array(byteLength));
  }
  
  ///
  // Using the passphrase, create a CryptoKey for use in key derivation. 
  ///
  private async createPasskey(passphrase: ArrayBuffer): Promise<CryptoKey> { 
    return await window.crypto.subtle.importKey(
      "raw",
      passphrase, 
      "PBKDF2", 
      false,
      ["deriveBits", "deriveKey"])
    .then((cryptoKey: CryptoKey) => {
      return cryptoKey;
    });
  }

  private async deriveBitsFromRawKey(rawKey: CryptoKey, salt: Uint8Array, iterations: number): Promise<ArrayBuffer> {
    return await window.crypto.subtle.deriveBits(
      {
          name: "PBKDF2",
          hash: "SHA-256",
          salt: salt,
          iterations: iterations,
      },
      rawKey as CryptoKey,
      256
    )
    .then((masterBits: ArrayBuffer) => {
      return masterBits;
    });
  }

  ///
  // Derive the master key from the passphrase using PBKDF2
  ///
  private async deriveMasterKey(salt: Uint8Array, iterations: number): Promise<CryptoKey> { 
    // Generate the raw key directly from passphrase
    let rawKey = await this.createPasskey(this.contextSecurity.passphrase);
    // Generate bits from the key that will be ued for a master key import
    const masterKeyBits = await this.deriveBitsFromRawKey(rawKey, salt, iterations);
    // Import the newly created master key bits for HKDF
    return await window.crypto.subtle.importKey(
      "raw",
      masterKeyBits,
      {
          name: "HKDF",
          hash: "SHA-256",
      },
      false,
      ["deriveBits", "deriveKey"]
    ).then(masterKey => {
      return masterKey;
    });
  }

  ///
  // Using the masterkey and nonce create a new secret key for use in key derivation. 
  ///
  private async deriveAESKeyFromMasterKey(masterKey: CryptoKey, nonce: Uint8Array): Promise<CryptoKey> {
    // We use a hardcoded salt for all implementations, gerated with 'openssl rand -base64 32'
    const hkdfSalt = Uint8Array.from(atob("wJW4IFKeBayDZpNJTmMyb1nkGWX4LXdZ3XOJwz3reAY="), c => c.charCodeAt(0));
    return await window.crypto.subtle.deriveKey(
      {
        name: "HKDF",
        salt: hkdfSalt, 
        // Ignore Typescript warnings for HKDF/HKDF-CTR differences
        //@ts-ignore
        info: nonce,  
        hash: "SHA-256"
      },
      masterKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    ).then(aesKey => {
      return aesKey;
    });
  }

  ///
  // Help to create a synced encrypt and decrypt to maintain the same item order.
  ///
  public async asyncForEach(array: any, callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  ///
  // Using the context passphrase, salt, iv, and iterations, derive a password hash and encrypt with lockParameters.
  // Return the ArrayBuffer result from the encrypt step. 
  ///
  public async lock(records: ArrayBuffer|ArrayBuffer[], compatibleWithBlob?: Blob): Promise<Blob|Blob[]> {   
    if(!(records instanceof ArrayBuffer || Array.isArray(records) && records.every(value => value instanceof ArrayBuffer))){
      throw new SyntaxError("The provided records parameter was not an instance or list of ArrayBuffer.");
    }

    // Check for overrides
    let saltOverride: Uint8Array;
    let iterationsOverride: number; 
    if(compatibleWithBlob) {
      // Checking indepently so that salt alone may be provided, using default iterations for the current or provided version.
      if(compatibleWithBlob.salt) {
        saltOverride = compatibleWithBlob.salt;
        validateSalt(saltOverride, compatibleWithBlob.version);
      }
      if(compatibleWithBlob.nIterations) {
        iterationsOverride = compatibleWithBlob.nIterations;
        validateIterations(iterationsOverride, compatibleWithBlob.version);   
      }  
    }    

    // Use overrides or a random salt and defaults
    let salt = saltOverride || this.generateRandomValues(DefaultEncryptionParameters.SaltSize);  
    let nIterations = iterationsOverride || this.contextSecurity.nIterations;

    // Derive a master key.
    let masterKey = await this.deriveMasterKey(salt, nIterations);

    // Setup the return blob array
    var blobs:Blob[] = [];

    // Handle singular record input by combining the record to a records array
    let recordsArray:ArrayBuffer[] = [];
    recordsArray = recordsArray.concat(records);

    await this.asyncForEach(recordsArray, async (record: any) => {
      // Generate a new nonce with each encrypt
      let nonce = this.generateRandomValues(DefaultEncryptionParameters.NonceSize);
      // Generate the AES key from the master with new nonce.
      let aesKey = await this.deriveAESKeyFromMasterKey(masterKey, nonce);
      // Use crypto subtle with the iv and a AES-GCM cipher for encryption. 
      await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: this.getVersionBuffer()  
        },
        aesKey, 
        record 
      ).then(encryptedObject => {
        blobs.push(new Blob(encryptedObject, salt, nonce, nIterations, this.contextSecurity.version));
      }); 
    });

    // Return array or singular based on input option
    return Array.isArray(records) ? blobs : blobs[0];      
  }
    
  ///
  // Using the context passphrase, salt, iv, and iterations, derive a password hash and decrypt.
  // Return the ArrayBuffer result from the decrypt step. 
  ///
  public async unlock(blobs: Blob|Blob[]): Promise<ArrayBuffer|ArrayBuffer[]> {
    // Setup the return records array
    var records:ArrayBuffer[] = [];

    // Handle singular record input by combining the record to a blobs array
    let blobsArray:Blob[] = [];
    blobsArray = blobsArray.concat(blobs);

    await this.asyncForEach(blobsArray, async (blob: Blob) => {
      // Recreate master key from the blob information.
      let masterKey = await this.deriveMasterKey(blob.salt, blob.nIterations);
      // Recreate the AES key from the blob structure.
      let aesKey = await this.deriveAESKeyFromMasterKey(masterKey, blob.nonce);
      // Use crypto subtle with the iv and a AES-GCM cipher for decryption. 
      try {
        await window.crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: this.getVersionBuffer() 
          },
          aesKey,
          blob.encryptedObject
        ).then(decryptedValue => {
          records.push(decryptedValue);
        });
      }
      catch { 
        throw new InvalidCipherText();
      }
    });

    // Return array or singular based on input option
    return Array.isArray(blobs) ? records : records[0]; 
  }
}

export  { Blob, DefaultEncryptionParameters };