/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { extension } from "../common/src/chrome"

export class ExtensionStorage {
    constructor(){}
    
    async setStorage(objectName: string, saveObject: object, callback: Function){
      extension.storage.local.set({ [objectName]: saveObject }, () => {
          let isSuccessful = !extension.runtime.lastError;
          if(!isSuccessful) {
            //TODO: How to handle save failures?
            console.log(extension.runtime.lastError && `Chrome error: ${extension.runtime.lastError.message}`);
          }
          
          callback && callback(isSuccessful);
      });
    }

    async getStorage(objectName: string, callback: Function) {
      extension.storage.local.get([objectName], (result: any) => {
          callback(result[objectName]);
      });
    }

    ///
    // Testing method for viewing locally stored data.
    // Callback: Callback will return all data stored for the extension. 
    ///
    getStorageLocal(callback) {
      extension.storage.local.get(null, (res)=> {
          if(!extension.runtime.lastError){
              callback(JSON.stringify(res));
          }
      });
    }

    ///
    // Testing method for clearing locally stored data.
    // Callback: Callback will return true if successful. 
    ///
    clearStorageLocal(callback) {
      extension.storage.local.clear((res)=> {
          if(!extension.runtime.lastError){
              callback(true);
          }
      });
    }

    ///
    // Check for the existance of a wallet account.
    // Callback: Callback will return a boolean of true if an account exists or false if no account is present. 
    ///
    noAccountExistsCheck(objectName: string, callback) {
      extension.storage.local.get([objectName], function(result) {
            if(result[objectName]) {
                callback(true);
            }
            else {
                callback(false)
            }
        });
    }
}
const extensionStorage = new ExtensionStorage();
export default extensionStorage;