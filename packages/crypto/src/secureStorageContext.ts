/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { LockParameters } from "./lockParameters";
import { PBKDF2Security } from "./pbkdf2Security";
import { PBKDF2Parameters } from "./pbkdf2Parameters";

///
// Encryption default functionality for AlgoSigner. 
// Uses pbkdf2 and SHA-256 for passphrase derivation and hash.
// Uses a 256 bit AES-GCM cipher for encryption.
///
export class SecureStorageContext {
  security: PBKDF2Security; // Security information for the local secure context

  constructor(params?: any){
    const iterations = (params && params["iterations"]) || PBKDF2Parameters.Iterations.STRONG;
    const saltSize = PBKDF2Parameters.SaltSize;
    const ivSize = PBKDF2Parameters.IVSize;

    this.security = new PBKDF2Security(this.generateRandomValues(saltSize), this.generateRandomValues(ivSize), iterations);
  }
  
  ///
  // Create a 96 bit array buffer using version for iv.
  ///
  private getVersionBuffer(){
    let version = this.security.version.toString().padStart(12, '0');
    var versionBuffer = new ArrayBuffer(version.length); 
    var versionUint8Array = new Uint8Array(versionBuffer);
    for (var i = 0; i < version.length; i++) {
      versionUint8Array[i] = version.charCodeAt(i);
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
      { name: "PBKDF2" }, 
      false,
      ["deriveBits", "deriveKey"]
    );
  }

  ///
  // **NOT FUNCTIONAL** Master/secret key functionality is not working currently
  // Using the key material create a new master key. 
  ///
  private async deriveMasterKey(keyMaterial: CryptoKey): Promise<CryptoKey> { 
    return await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: this.security.salt, 
        iterations: this.security.iterations,   
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "HKDF", length: 256 },
      //{ name: "AES-GCM", length: 256 },
      false,
      ["deriveBits", "deriveKey"]
      //["encrypt", "decrypt"]
    );
  }

  ///
  // Using the masterkey and nonce create a new secret key for use in key derivation. 
  ///
  private async deriveLockKey(keyMaterial: CryptoKey, nonce?: ArrayBuffer): Promise<CryptoKey> { 
    return await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: nonce, 
        iterations: this.security.iterations,   
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  ///
  // Using the context passphrase, salt, iv, and iterations, derive a password hash and encrypt with lockParameters.
  // Return the ArrayBuffer result from the encrypt step. 
  ///
  public async lock(lockParameters: LockParameters): Promise<ArrayBuffer> {          
    let keyMaterial = await this.createPasskey(lockParameters.passphrase);
    //let masterKey = await this.deriveMasterKey(keyMaterial);

    // TODO: BC - Swap for multiple, introduce nonce update
    // let nonce = this.generateRandomValues(32);
    let nonce = this.security.iv;
    let secretKey = await this.deriveLockKey(keyMaterial, nonce);

    console.log(`Unlock key:\n${JSON.stringify(secretKey)}`);
    
    // Use crypto subtle with the iv and a AES-GCM cipher for encryption. 
    return await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: this.getVersionBuffer()  
      },
      secretKey, 
      lockParameters.encryptObject
    );
  }
    
  ///
  // Using the context passphrase, salt, iv, and iterations, derive a password hash and decrypt with lockParameters.
  // Return the ArrayBuffer result from the decrypt step. 
  ///
  public async unlock(lockParameters: LockParameters): Promise<ArrayBuffer> {
    // TODO: BC - Raise errors if Lock Parameters are malformed

  
    let keyMaterial = await this.createPasskey(lockParameters.passphrase);
    //let masterKey = await this.deriveMasterKey(keyMaterial);

    // TODO: BC - change this to handle multiple decrypts
    let secretKey = await this.deriveLockKey(keyMaterial, this.security.iv);
    // TODO: BC - Raise an exception if salt matches but version or iterations do not.
    
    console.log(`Unlock key:\n${JSON.stringify(secretKey)}`);

    // TODO: BC - Raise an invalid-ciphertext exception if decryption fails.
    // Use crypto subtle with the iv and a AES-GCM cipher for decryption. 
    return await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: this.getVersionBuffer() 
      },
      secretKey,
      lockParameters.encryptObject
    );
  }
}

export  { LockParameters, PBKDF2Security, PBKDF2Parameters };