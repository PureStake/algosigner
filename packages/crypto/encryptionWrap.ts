/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { LocalEncryption } from "./localEncryption";
import { ExtensionStorage } from "./extensionStorage";
import LockParameters from "./types/lockParameters";

///
// Wrapper for the crypto functionality used in AlgoSigner. 
// Allows for locking and unlocking the extention account wallet. 
///
export class EncryptionWrap {
    walletName: string;
    localEncryption: LocalEncryption;
    extensionStorage: ExtensionStorage;

    constructor(params?: any){
      this.walletName = (params && params["walletname"]) || "defaultwalletname";
      this.localEncryption = new LocalEncryption();
      this.extensionStorage = new ExtensionStorage();
    }

    ///
    // Lock an object using the lock parameters which contain the 
    // unencrypted object to be locked and passphrase
    // Callback or return via async for multiple ways of returning information
    ///
    public async lock(params: LockParameters, callback?: Function) {
        let encryptionParams = this.localEncryption.getNewEncryptionParameters(); 
        let encryptedAccount = await this.localEncryption.encrypt(params.encryptObject, params.passphrase, encryptionParams.salt, encryptionParams.iv, encryptionParams.iterations);
        let stringified_salt = JSON.stringify(encryptionParams.salt);
        console.log(`stringified_salt: ${stringified_salt}`);
        let saveObject = { account: String.fromCharCode.apply(null, new Uint8Array(encryptedAccount)), params: { salt: String.fromCharCode.apply(null, encryptionParams.salt), iv: String.fromCharCode.apply(null, encryptionParams.iv), iterations: encryptionParams.iterations } };

        let returnSuccess = false;
        await Promise.resolve(this.extensionStorage.setStorage(this.walletName, saveObject, (isSuccessful:boolean) => { 
          returnSuccess = isSuccessful;
          callback && callback(returnSuccess);
        }));
        return returnSuccess;
    }

    ///
    // Unlock an encrypted object using the lock parameters which contain the 
    // encrypted object or encrypted local account object if not provided and the passphrase
    // Callback or return via async for multiple ways of returning information
    ///
    public async unlock(params: LockParameters, callback?: Function): Promise<object> {
      let decryptedObject: ArrayBuffer;
        try{
          await Promise.resolve(this.extensionStorage.getStorage(this.walletName, async (result: { account: string, params: { salt:string, iv:string, iterations:number } }) => { 
            decryptedObject = await this.localEncryption.decrypt(
              this.localEncryption.stringToUint8ArrayBuffer(result.account), 
              params.passphrase, 
              this.localEncryption.stringToUint8ArrayBuffer(result.params.salt), 
              this.localEncryption.stringToUint8ArrayBuffer(result.params.iv), 
              result.params.iterations
            );   

            callback && callback(this.localEncryption.uint8ArrayToString(new Uint8Array(decryptedObject)));
          }));   
        }
        catch(e){
          console.log(`Error: ${e}`);
        }
      
      //TODO: Return object check/conversion
      return decryptedObject;
    }

}
const encryptionWrap = new EncryptionWrap();
export default encryptionWrap;