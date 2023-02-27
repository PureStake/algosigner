/**
 * @license
 * Copyright 2020
 * =========================================
 */

import { extensionBrowser } from '@algosigner/common/chrome';
import { logging } from '@algosigner/common/logging';

///
// Handles the setting and retrieval of data into the browser storage.local location.
///
export class ExtensionStorage {
  ///
  // Takes an objectName and saveObject and sets or overrides a
  // storage.local instance of this combo.
  // Callback: Callback will return a boolean of true if storage sets without error
  // or false otherwise.
  ///
  public setStorage(objectName: string, saveObject: Object, callback: Function) {
    extensionBrowser.storage.local.set({ [objectName]: saveObject }, () => {
      const isSuccessful = !extensionBrowser.runtime.lastError;
      if (!isSuccessful) {
        logging.log(
          extensionBrowser.runtime.lastError &&
            `Chrome error: ${extensionBrowser.runtime.lastError.message}`
        );
      }

      callback && callback(isSuccessful);
    });
  }

  ///
  // Uses the provided objectName and returns any associated storage.local item.
  // Callback: Callback will return a boolean of true if an account exists
  // or false if no account is present.
  ///
  public getStorage(objectName: string, callback?: Function): any | void {
    extensionBrowser.storage.local.get([objectName], (result: any) => {
      if (callback) {
        callback(result[objectName])
      } else {
        return result[objectName];
      }
    });
  }

  ///
  // Check for the existance of a wallet account.
  // Callback: Callback will return a boolean of true if an account exists
  // or false if no account is present.
  ///
  public noAccountExistsCheck(objectName: string, callback: Function) {
    extensionBrowser.storage.local.get([objectName], function (result: any) {
      if (result[objectName]) {
        callback && callback(true);
      } else {
        callback && callback(false);
      }
    });
  }

  ///
  // Clear storage.local extension data.
  // Callback: Callback will return true if successful, false if there is an error.
  ///
  public clearStorageLocal(callback: Function) {
    extensionBrowser.storage.local.clear(() => {
      if (!extensionBrowser.runtime.lastError) {
        callback && callback(true);
      } else {
        callback && callback(false);
      }
    });
  }

  ///
  // **Testing Method**
  // View raw storage.local extension data.
  // Callback: Callback will return all data stored for the extension.
  ///
  protected getStorageLocal(callback: Function) {
    extensionBrowser.storage.local.get(null, (result: any) => {
      if (!extensionBrowser.runtime.lastError) {
        callback(JSON.stringify(result));
      }
    });
  }
}
const extensionStorage = new ExtensionStorage();
export default extensionStorage;
