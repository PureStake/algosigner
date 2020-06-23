/**
 * @license
 * Copyright 2020 
 * =========================================
*/

import { extension } from "../../common/src/chrome"

///
// Handles the setting and retrieval of data into the browser storage.local location. 
///
export class ExtensionStorage {
    constructor(){}
    
    ///
    // Takes an objectName and saveObject and sets or overrides a storage.local instance of this combo.
    // Callback: Callback will return a boolean of true if storage sets without error or false otherwise. 
    ///
    public setStorage(objectName: string, saveObject: object, callback: Function){
      console.log(`Setting storage with an object that is a type of ${typeof saveObject} and value: \n{${objectName}:${saveObject}}`);
      extension.storage.local.set({ [objectName]: saveObject }, () => {
          let isSuccessful = !extension.runtime.lastError;
          if(!isSuccessful) {
            //TODO: How to handle save failures?
            console.log(extension.runtime.lastError && `Chrome error: ${extension.runtime.lastError.message}`);
          }
          
          callback && callback(isSuccessful);
      });
    }

    ///
    // Uses the provided objectName and returns any associated storage.local item.
    // Callback: Callback will return a boolean of true if an account exists or false if no account is present. 
    ///
    public getStorage(objectName: string, callback: Function) {
      extension.storage.local.get([objectName], (result: any) => {
        callback && callback(result[objectName]);
      });
    }

    ///
    // Check for the existance of a wallet account.
    // Callback: Callback will return a boolean of true if an account exists or false if no account is present. 
    ///
    public noAccountExistsCheck(objectName: string, callback: Function) {
      extension.storage.local.get([objectName], function(result) {
            if(result[objectName]) {
              callback && callback(true);
            }
            else {
              callback && callback(false)
            }
        });
    }

    ///
    // **Testing Method** 
    // View raw storage.local extension data.
    // Callback: Callback will return all data stored for the extension. 
    ///
    protected getStorageLocal(callback: Function) {
      extension.storage.local.get(null, (result)=> {
          if(!extension.runtime.lastError){
            callback(JSON.stringify(result));
          }
      });
    }

    ///
    // **Testing Method** 
    // Clear storage.local extension data.
    // Callback: Callback will return true if successful, false if there is an error. 
    ///
    protected clearStorageLocal(callback: Function) {
      extension.storage.local.clear(() => {
          if(!extension.runtime.lastError) {
            console.log('Clearing of local data successful.');
            callback && callback(true);
          }
          else {
            console.log('Clearing of local data faiiled.');
            callback && callback(false);
          }
      });
    }
}
const extensionStorage = new ExtensionStorage();
export default extensionStorage;