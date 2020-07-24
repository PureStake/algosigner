/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { SecureStorageContext, Blob } from  "@algosigner/crypto/src/secureStorageContext";
import { ExtensionStorage } from "@algosigner/storage/dist/extensionStorage";

///
// Wrapper for the crypto functionality used in AlgoSigner. 
// Allows for locking and unlocking the extention account wallet. 
///
export default class EncryptionWrap {
  private _walletName: string; // Name of wallet to be modified.
  private _localEncryption: SecureStorageContext; // The wrap method of encryption.
  private _extensionStorage: ExtensionStorage; // The wrap method of storage.

  constructor(passphrase: string, params?: any){
    this._walletName = (params && params["walletname"]) || "defaultwalletname";
    this._localEncryption = (params && params["encryption"]) || new SecureStorageContext(new TextEncoder().encode(passphrase));
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

  /// Placeholder error log function
  private errorLog(error: string): void {
    // TODO: BC - How should we handle errors?
    console.log(error);
  }

  ///
  // ** Helper Method **
  // For hex based saving of array buffers.
  ///
  private buf2hex(buffer: ArrayBuffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  }

  ///
  // ** Helper Method **
  // For hex based loading of array buffers.
  ///
  private hexStringToUint8Array(hex: string){
    var arrayBuffer = new Uint8Array(hex.length/2);
    for (var i = 0; i < hex.length; i+=2) {
        var byteValue = parseInt(hex.substr(i,2), 16);
        arrayBuffer[i/2] = byteValue;
    }
    return arrayBuffer;
}

  ///
  // ** Helper Method **
  // Wapper for hex saving, since only certain fields need modified.
  ///
  private convertEncryptedValueToHex(encryptedValue: Blob) {
    let returnObject: any = {};
    Object.entries(encryptedValue).forEach(([key, value]) => {
        if(key === "salt" || key === "nonce" || key === "encryptedObject") {    
          returnObject[key] = this.buf2hex(value);
        }
        else {
          returnObject[key] = value;
        }
    });
    return returnObject;
  }

  ///
  // Lock an object using the lock parameters which contain the 
  //  unencrypted object to be locked and passphrase.
  // Callback or return via async/await for multiple ways of returning information.
  ///
  public async lock(record: string, callback?: Function): Promise<void> {
    try {
      // Await the encryption step. This will take time based on the user's machine processing capability. 
      await this._localEncryption.lock(this.stringToUint8ArrayBuffer(record)).then((encryptedValue)=>{
        let index = 0;
        let singleRecord: any = undefined;
        let multiRecords: any = [];
        console.log('dsfafyoiu');
        if(!Array.isArray(encryptedValue)) {
          singleRecord = this.convertEncryptedValueToHex(encryptedValue);
        }
        else {
            encryptedValue.forEach(() => {
              multiRecords.push(this.convertEncryptedValueToHex(encryptedValue[index]));
                index++;
            });
        }
        // After resolution of the set storage operation callback with status of success. 
        this._extensionStorage.setStorage(this._walletName, singleRecord || multiRecords, (isSuccessful: boolean) => { 
          callback && callback(isSuccessful); 
        });
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
  public async unlock(callback?: Function): Promise<void> {
    try {
      // Retrieve the object from the storage location, then attempt to decrypt the value.
      this._extensionStorage.getStorage(this._walletName, async (result: { encryptedObject: string, salt: string, nonce: string, nIterations: number, version: number }) => {  
        if(!result)
        {
          // No accounts
          callback && callback({TestNet: [], MainNet: []});
          return;
        }

        let blob = new Blob(this.hexStringToUint8Array(result.encryptedObject), this.hexStringToUint8Array(result.salt), this.hexStringToUint8Array(result.nonce), result.nIterations, result.version);
        // Await the unlock and callback with the string interpretation.
        await this._localEncryption.unlock(blob).then((decryptedObject) => {
          if(Array.isArray(decryptedObject)) {
            let returnValues: any = [];
            console.log('youdsf');
            decryptedObject.forEach(value => { returnValues.push(this.arrayBufferToString(value)); });
            callback && callback(returnValues);
          }
          else {
            callback && callback(JSON.parse(this.arrayBufferToString(decryptedObject)));
          }
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