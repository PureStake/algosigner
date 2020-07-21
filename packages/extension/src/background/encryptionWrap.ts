/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { SecureStorageContext, PBKDF2Parameters, LockParameters, PBKDF2Security } from  "@algosigner/crypto/dist/secureStorageContext";
import { ExtensionStorage } from "@algosigner/storage/dist/extensionStorage";

///
// Wrapper for the crypto functionality used in AlgoSigner. 
// Allows for locking and unlocking the extention account wallet. 
///
export class EncryptionWrap {
  private _walletName: string; // Name of wallet to be modified.
  private _localEncryption: SecureStorageContext; // The wrap method of encryption.
  private _extensionStorage: ExtensionStorage; // The wrap method of storage.

  constructor(params?: any){
    this._walletName = (params && params["walletname"]) || "defaultwalletname";
    this._localEncryption = (params && params["encryption"]) || new SecureStorageContext();
    this._extensionStorage = (params && params["storage"]) || new ExtensionStorage();
  }

  ///
  // ** Helper Method **
  // Using the provided Uint8Array Buffer, create a string value. 
  ///
  public arrayBufferToString(uint8Array: ArrayBuffer): string {
    return String.fromCharCode.apply(null, Array.from(new Uint8Array(uint8Array)));
  }

  ///
  // ** Helper Method **
  // From the provided string, create an Uint8Array Buffer object.
  // This can be used as a quick conversion of saved data string into a format for decryption.
  ///
  public stringToUint8ArrayBuffer(rawString: string): ArrayBuffer {
    var arrBuffer = new ArrayBuffer(rawString.length); 
    var uint8Array = new Uint8Array(arrBuffer);
    for (var i = 0; i < rawString.length; i++) {
      uint8Array[i] = rawString.charCodeAt(i);
    }
    return arrBuffer;
  }

  ///
  // ** Helper Method **
  // From the provided array of integers in string form, create an Uint8Array object.
  ///
  public uint8ArrayReconstruct(stringArray: string): Uint8Array {
    return new Uint8Array(stringArray.split(',').map(x=>parseInt(x)));
  }

  private errorLog(error: string): void {
    // TODO: BC - How should we handle errors?
    console.log(error);
  }

  ///
  // Lock an object using the lock parameters which contain the 
  //  unencrypted object to be locked and passphrase.
  // Callback or return via async/await for multiple ways of returning information.
  ///
  public async lock(params: LockParameters, callback?: Function): Promise<void> {
    try {
      // Await the encryption step. This will take time based on the user's machine processing capability. 
      let encryptedAccount = await this._localEncryption.lock(params);

      // TODO: BC - Account object creation and deconstruction should be uniform and use a class/interface.
      // Prepare data for extension storage, creating a JSON saveObject.
      // The account data needs to be mapped to an array, then it and the salt and iv need to have encoding acceptible for saving.
      let saveObject = { 
        account: this.arrayBufferToString(encryptedAccount), 
        params: { 
          salt: this._localEncryption.security.salt.toString(), 
          iv: this._localEncryption.security.iv.toString(), 
          iterations: this._localEncryption.security.iterations 
        } 
      };
      
      // After resolution of the set storage operation callback with status of success. 
      this._extensionStorage.setStorage(this._walletName, saveObject, (isSuccessful: boolean) => { 
        callback && callback(isSuccessful); 
      });
    }
    catch(e) {
      this.errorLog(e);     
    }
  }

  ///
  // Unlock an encrypted object using the lock parameters which contain the 
  //  encrypted object or encrypted local account object if not provided and the passphrase.
  // Callback returns decrypted or a failed login object.
  ///
  public async unlock(params: LockParameters, callback?: Function): Promise<void> {
    // Remap lockParams style to not confuse with security parameters.
    let lockParams = params;

    try {
      // Retrieve the object from the storage location, then attempt to decrypt the value.
      this._extensionStorage.getStorage(this._walletName, async (result: { account: string, params: { salt: string, iv: string, iterations: number } }) => {  
        if(!result)
        {
          // No accounts
          callback && callback({TestNet: [], MainNet: []});
          return;
        }

        // We retrieved a value and mapped to the expected saved object format.
        // Modify the account, salt, and iv values back to array buffer objects.
        // Create a security model and lock model with these and attempt the decryption.
        let decryptionContext = new SecureStorageContext();
        let decryptSecurity = new PBKDF2Security(this.uint8ArrayReconstruct(result.params.salt), 
                                                this.uint8ArrayReconstruct(result.params.iv),
                                                result.params.iterations);
        decryptionContext.security = decryptSecurity;     
        lockParams.encryptObject = this.stringToUint8ArrayBuffer(result.account);

        // Await the unlock and callback with the string interpretation.
        await decryptionContext.unlock(lockParams).then((decryptedObject) => {
          callback && callback(JSON.parse(this.arrayBufferToString(decryptedObject)));
        }).catch((e) => {
          this.errorLog(e);
          callback && callback({error: 'Login Failed'});
        });        
      });    
    }
    catch(e) {
      this.errorLog(e);         
    }
    
  }

  public async checkStorage(callback: Function): Promise<void> {
    try {
      // Retrieve the object from the storage location, then attempt to decrypt the value.
      this._extensionStorage.getStorage(this._walletName, async (result: { account: string, params: { salt: string, iv: string, iterations: number } }) => {
        if(!result)
          callback(false);
        else
          callback(true);
      });    
    }
    catch(e) {
      this.errorLog(e);         
    }
    
  }
}
const encryptionWrap = new EncryptionWrap();
export default encryptionWrap;