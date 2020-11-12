/**
 * @license
 * Copyright 2020
 * =========================================
 */

import {
  SecureStorageContext,
  Blob,
} from '@algosigner/crypto/src/secureStorageContext';
import { ExtensionStorage } from '@algosigner/storage/src/extensionStorage';
import { logging } from '@algosigner/common/logging';
import EncryptionHelpers from './utils/encryptionHelpers';

///
// Wrapper for the crypto functionality used in AlgoSigner.
// Allows for locking and unlocking the extention account wallet.
///
/* eslint-disable @typescript-eslint/ban-types*/
export default class EncryptionWrap {
  private _walletName: string; // Name of wallet to be modified.
  private _localEncryption: SecureStorageContext; // The wrap method of encryption.
  private _extensionStorage: ExtensionStorage; // The wrap method of storage.

  constructor(passphrase: string, params?: any) {
    this._walletName = (params && params['walletname']) || 'defaultwalletname';
    this._localEncryption =
      (params && params['encryption']) ||
      new SecureStorageContext(new TextEncoder().encode(passphrase));
    this._extensionStorage =
      (params && params['storage']) || new ExtensionStorage();
  }

  ///
  // Lock an object using the lock parameters which contain the
  //  unencrypted object to be locked and passphrase.
  // Callback or return via async/await for multiple ways of returning information.
  ///
  public async lock(record: string, callback?: Function): Promise<void> {
    try {
      // Await the encryption step. This will take time based on the user's machine processing capability.
      await this._localEncryption
        .lock(EncryptionHelpers.stringToUint8ArrayBuffer(record))
        .then((encryptedValue) => {
          let index = 0;
          let singleRecord: any = undefined;
          const multiRecords: any = [];

          if (!Array.isArray(encryptedValue)) {
            singleRecord = EncryptionHelpers.convertEncryptedResultToHex(
              encryptedValue
            );
          } else {
            encryptedValue.forEach(() => {
              multiRecords.push(
                EncryptionHelpers.convertEncryptedResultToHex(
                  encryptedValue[index]
                )
              );
              index++;
            });
          }
          // After resolution of the set storage operation callback with status of success.
          this._extensionStorage.setStorage(
            this._walletName,
            singleRecord || multiRecords,
            (isSuccessful: boolean) => {
              callback && callback(isSuccessful);
            }
          );
        });
    } catch (e) {
      logging.log(e);
    }
  }

  ///
  // Unlock an encrypted object using the lock parameters which contain the
  // encrypted object or encrypted local account object if not provided and the passphrase.
  // Callback returns decrypted or a failed login object.
  ///
  public async unlock(callback?: Function): Promise<void> {
    try {
      // Retrieve the object from the storage location, then attempt to decrypt the value.
      this._extensionStorage.getStorage(
        this._walletName,
        async (result: {
          encryptedObject: string;
          salt: string;
          nonce: string;
          nIterations: number;
          version: number;
        }) => {
          if (!result) {
            // No accounts
            callback && callback({ TestNet: [], MainNet: [] });
            return;
          }

          const blob = new Blob(
            EncryptionHelpers.hexStringToUint8Array(result.encryptedObject),
            EncryptionHelpers.hexStringToUint8Array(result.salt),
            EncryptionHelpers.hexStringToUint8Array(result.nonce),
            result.nIterations,
            result.version
          );
          // Await the unlock and callback with the string interpretation.
          await this._localEncryption
            .unlock(blob)
            .then((decryptedObject) => {
              if (Array.isArray(decryptedObject)) {
                const returnValues: any = [];

                decryptedObject.forEach((value) => {
                  returnValues.push(
                    EncryptionHelpers.arrayBufferToString(value)
                  );
                });
                callback && callback(returnValues);
              } else {
                callback &&
                  callback(
                    JSON.parse(
                      EncryptionHelpers.arrayBufferToString(decryptedObject)
                    )
                  );
              }
            })
            .catch((e) => {
              logging.log(e);
              callback && callback({ error: 'Login Failed' });
            });
        }
      );
    } catch (e) {
      logging.log(e);
    }
  }

  public async checkStorage(callback: Function): Promise<void> {
    try {
      this._extensionStorage.getStorage(
        this._walletName,
        async (result: {
          account: string;
          params: { salt: string; iv: string; iterations: number };
        }) => {
          if (!result) callback(false);
          else callback(true);
        }
      );
    } catch (e) {
      logging.log(e);
    }
  }
}
