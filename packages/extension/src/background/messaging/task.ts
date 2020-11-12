/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const algosdk = require('algosdk');

import { RequestErrors } from '@algosigner/common/types';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { Ledger, API } from './types';
import { getValidatedTxnWrap } from '../transaction/actions';
import { ValidationStatus } from '../utils/validator';
import { InternalMethods } from './internalMethods';
import { MessageApi } from './api';
import encryptionWrap from '../encryptionWrap';
import { Settings } from '../config';
import { extensionBrowser } from '@algosigner/common/chrome';
import { logging } from '@algosigner/common/logging';
import { InvalidTransactionStructure } from '../../errors/validation';

/* eslint-disable @typescript-eslint/ban-types */
export class Task {
  private static requests: { [key: string]: any } = {};
  private static authorized_pool: Array<string> = [];

  public static isAuthorized(origin: string): boolean {
    return Task.authorized_pool.indexOf(origin) > -1;
  }

  private static fetchAPI(url, params) {
    return new Promise((resolve, reject) => {
      fetch(url, params)
        .then((response) => {
          return response.json().then((json) => {
            if (response.ok) {
              return json;
            } else {
              return Promise.reject(json);
            }
          });
        })
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          const res: unknown = {
            message: error.message,
            data: error.data,
          };
          reject(res);
        });
    });
  }

  public static build(request: any) {
    const body = request.body;
    const method = body.method;

    // Check if there's a previous request from the same origin
    if (request.originTabID in Task.requests)
      return new Promise((resolve, reject) => {
        request.error = {
          message: 'Another query processing',
        };
        reject(request);
      });
    else Task.requests[request.originTabID] = request;

    return new Promise((resolve, reject) => {
      Task.methods().public[method](request, resolve, reject);
    }).finally(() => {
      delete Task.requests[request.originTabID];
    });
  }

  public static clearPool() {
    Task.authorized_pool = [];
  }

  public static methods(): {
    [key: string]: {
      [JsonRpcMethod: string]: Function;
    };
  } {
    return {
      public: {
        // authorization
        [JsonRpcMethod.Authorization]: (d: any) => {
          // Delete any previous request made from the Tab that it's
          // trying to connect.
          delete Task.requests[d.originTabID];

          // If access was already granted, authorize connection.
          if (Task.isAuthorized(d.origin)) {
            d.response = {};
            MessageApi.send(d);
          } else {
            extensionBrowser.windows.create(
              {
                url: extensionBrowser.runtime.getURL('index.html#/authorize'),
                type: 'popup',
                focused: true,
                width: 400 + 12,
                height: 550 + 34,
              },
              function (w: any) {
                if (w) {
                  Task.requests[d.originTabID] = {
                    window_id: w.id,
                    message: d,
                  };
                  setTimeout(function () {
                    extensionBrowser.runtime.sendMessage(d);
                  }, 500);
                }
              }
            );
          }
        },
        // sign-transaction
        [JsonRpcMethod.SignTransaction]: (
          d: any,
          resolve: Function,
          reject: Function
        ) => {
          let transactionWrap = undefined;
          let validationError = undefined;
          try {
            transactionWrap = getValidatedTxnWrap(
              d.body.params,
              d.body.params['type']
            );
          } catch (e) {
            logging.log(`Validation failed. ${e}`);
            validationError = e;
          }
          if (
            !transactionWrap &&
            validationError &&
            validationError instanceof InvalidTransactionStructure
          ) {
            // We don't have a transaction wrap, but we have a validation error.
            d.error = {
              message: validationError.message,
            };
            reject(d);
            return;
          } else if (!transactionWrap) {
            // We don't have a transaction wrap. We have an unknow error or extra fields, reject the transaction.
            logging.log(
              'A transaction has failed because of an inability to build the specified transaction type.'
            );
            d.error = {
              message:
                validationError ||
                'Validation failed for transaction. Please verify the properties are valid.',
            };
            reject(d);
          } else if (
            transactionWrap.validityObject &&
            Object.values(transactionWrap.validityObject).some(
              (value) => value['status'] === ValidationStatus.Invalid
            )
          ) {
            // We have a transaction that contains fields which are deemed invalid. We should reject the transaction.
            // We can use a modified popup that allows users to review the transaction and invalid fields and close the transaction.
            const invalidKeys = [];
            Object.entries(transactionWrap.validityObject).forEach(
              ([key, value]) => {
                if (value['status'] === ValidationStatus.Invalid) {
                  invalidKeys.push(`${key}`);
                }
              }
            );
            d.error = {
              message: `Validation failed for transaction because of invalid properties [${invalidKeys.join(
                ','
              )}].`,
            };
            reject(d);
          } else {
            if (
              (transactionWrap.validityObject &&
                Object.values(transactionWrap.validityObject).some(
                  (value) => value['status'] === ValidationStatus.Warning
                )) ||
              Object.values(transactionWrap.validityObject).some(
                (value) => value['status'] === ValidationStatus.Dangerous
              )
            ) {
              // Check for the validity of the from field.
              d.body.params = transactionWrap;

              // We have a transaction which does not contain invalid fields, but does contain fields that are dangerous
              // or ones we've flagged as needing to be reviewed. We can use a modified popup to allow the normal flow, but require extra scrutiny.
              extensionBrowser.windows.create(
                {
                  url: extensionBrowser.runtime.getURL(
                    'index.html#/sign-transaction'
                  ),
                  type: 'popup',
                  focused: true,
                  width: 400 + 12,
                  height: 550 + 34,
                },
                function (w) {
                  if (w) {
                    Task.requests[d.originTabID] = {
                      window_id: w.id,
                      message: d,
                    };
                    // Send message with tx info
                    setTimeout(function () {
                      extensionBrowser.runtime.sendMessage(d);
                    }, 500);
                  }
                }
              );
            } else {
              d.body.params = transactionWrap;
              // We have a transaction which appears to be valid. Show the popup as normal.
              extensionBrowser.windows.create(
                {
                  url: extensionBrowser.runtime.getURL(
                    'index.html#/sign-transaction'
                  ),
                  type: 'popup',
                  focused: true,
                  width: 400 + 12,
                  height: 550 + 34,
                },
                function (w) {
                  if (w) {
                    Task.requests[d.originTabID] = {
                      window_id: w.id,
                      message: d,
                    };
                    // Send message with tx info
                    setTimeout(function () {
                      extensionBrowser.runtime.sendMessage(d);
                    }, 500);
                  }
                }
              );
            }
          }
        },
        // algod
        [JsonRpcMethod.SendTransaction]: (
          d: any,
          resolve: Function,
          reject: Function
        ) => {
          const { params } = d.body;
          const conn = Settings.getBackendParams(params.ledger, API.Algod);
          const sendPath = '/v2/transactions';
          const fetchParams: any = {
            headers: {
              ...conn.apiKey,
              'Content-Type': 'application/x-binary',
            },
            method: 'POST',
          };
          const tx = atob(params.tx)
            .split('')
            .map((x) => x.charCodeAt(0));
          fetchParams.body = new Uint8Array(tx);

          let url = conn.url;
          if (conn.port.length > 0) url += ':' + conn.port;

          Task.fetchAPI(`${url}${sendPath}`, fetchParams)
            .then((response) => {
              d.response = response;
              resolve(d);
            })
            .catch((error) => {
              d.error = error;
              reject(d);
            });
        },
        // algod
        [JsonRpcMethod.Algod]: (
          d: any,
          resolve: Function,
          reject: Function
        ) => {
          const { params } = d.body;
          const conn = Settings.getBackendParams(params.ledger, API.Algod);

          const contentType = params.contentType ? params.contentType : '';

          const fetchParams: any = {
            headers: {
              ...conn.apiKey,
              'Content-Type': contentType,
            },
            method: params.method || 'GET',
          };
          if (params.body) fetchParams.body = params.body;

          let url = conn.url;
          if (conn.port.length > 0) url += ':' + conn.port;

          Task.fetchAPI(`${url}${params.path}`, fetchParams)
            .then((response) => {
              d.response = response;
              resolve(d);
            })
            .catch((error) => {
              d.error = error;
              reject(d);
            });
        },
        // Indexer
        [JsonRpcMethod.Indexer]: (
          d: any,
          resolve: Function,
          reject: Function
        ) => {
          const { params } = d.body;
          const conn = Settings.getBackendParams(params.ledger, API.Indexer);

          const contentType = params.contentType ? params.contentType : '';

          const fetchParams: any = {
            headers: {
              ...conn.apiKey,
              'Content-Type': contentType,
            },
            method: params.method || 'GET',
          };
          if (params.body) fetchParams.body = params.body;

          let url = conn.url;
          if (conn.port.length > 0) url += ':' + conn.port;

          Task.fetchAPI(`${url}${params.path}`, fetchParams)
            .then((response) => {
              d.response = response;
              resolve(d);
            })
            .catch((error) => {
              d.error = error;
              reject(d);
            });
        },
        // Accounts
        [JsonRpcMethod.Accounts]: (
          d: any,
          resolve: Function
          // reject: Function
        ) => {
          const session = InternalMethods.getHelperSession();
          const accounts = session.wallet[d.body.params.ledger];
          const res = [];
          for (let i = 0; i < accounts.length; i++) {
            res.push({
              address: accounts[i].address,
            });
          }
          d.response = res;
          resolve(d);
        },
      },
      private: {
        // authorization-allow
        [JsonRpcMethod.AuthorizationAllow]: (d) => {
          const { responseOriginTabID } = d.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          extensionBrowser.windows.remove(auth.window_id);
          Task.authorized_pool.push(message.origin);
          delete Task.requests[responseOriginTabID];

          setTimeout(() => {
            // Response needed
            message.response = {};
            MessageApi.send(message);
          }, 100);
        },
        // authorization-deny
        [JsonRpcMethod.AuthorizationDeny]: (d) => {
          const { responseOriginTabID } = d.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          auth.message.error = {
            message: RequestErrors.NotAuthorized,
          };
          extensionBrowser.windows.remove(auth.window_id);
          delete Task.requests[responseOriginTabID];

          setTimeout(() => {
            MessageApi.send(message);
          }, 100);
        },
      },
      extension: {
        // sign-allow
        [JsonRpcMethod.SignAllow]: (request: any, sendResponse: Function) => {
          const { passphrase, responseOriginTabID } = request.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          const {
            from,
            // to,
            // fee,
            // amount,
            // firstRound,
            // lastRound,
            genesisID,
            // genesisHash,
            // note,
          } = message.body.params.transaction;

          let ledger;
          switch (genesisID) {
            case 'mainnet-v1.0':
              ledger = Ledger.MainNet;
              break;
            case 'testnet-v1.0':
              ledger = Ledger.TestNet;
              break;
          }

          const context = new encryptionWrap(passphrase);
          context.unlock(async (unlockedValue: any) => {
            if ('error' in unlockedValue) {
              sendResponse(unlockedValue);
              return false;
            }

            extensionBrowser.windows.remove(auth.window_id);

            let account;

            // Find address to send algos from
            for (let i = unlockedValue[ledger].length - 1; i >= 0; i--) {
              if (unlockedValue[ledger][i].address === from) {
                account = unlockedValue[ledger][i];
                break;
              }
            }

            const recoveredAccount = algosdk.mnemonicToSecretKey(
              account.mnemonic
            );

            const txn = { ...message.body.params.transaction };

            Object.keys({ ...message.body.params.transaction }).forEach(
              (key) => {
                if (txn[key] === undefined || txn[key] === null) {
                  delete txn[key];
                }
              }
            );

            // Modify base64 encoded fields
            if ('note' in txn && txn.note !== undefined) {
              txn.note = new Uint8Array(Buffer.from(txn.note));
            }
            // Application transactions only
            if (txn && txn.type == 'appl') {
              if ('appApprovalProgram' in txn) {
                txn.appApprovalProgram = Uint8Array.from(
                  Buffer.from(txn.appApprovalProgram)
                );
              }
              if ('appClearProgram' in txn) {
                txn.appClearProgram = Uint8Array.from(
                  Buffer.from(txn.appClearProgram)
                );
              }
              if ('appArgs' in txn) {
                const tempArgs = [];
                txn.appArgs.forEach((element) => {
                  logging.log(element);
                  tempArgs.push(Uint8Array.from(Buffer.from(element)));
                });
                txn.appArgs = tempArgs;
              }
            }

            try {
              const signedTxn = algosdk.signTransaction(
                txn,
                recoveredAccount.sk
              );
              const b64Obj = Buffer.from(signedTxn.blob).toString('base64');

              message.response = {
                txID: signedTxn.txID,
                blob: b64Obj,
              };
            } catch (e) {
              message.error = e.message;
            }

            // Clean class saved request
            delete Task.requests[responseOriginTabID];
            MessageApi.send(message);
          });
          return true;
        },
        [JsonRpcMethod.SignDeny]: (
          request: any
          // sendResponse: Function
        ) => {
          const { responseOriginTabID } = request.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          auth.message.error = {
            message: RequestErrors.NotAuthorized,
          };
          extensionBrowser.windows.remove(auth.window_id);
          delete Task.requests[responseOriginTabID];

          setTimeout(() => {
            MessageApi.send(message);
          }, 100);
        },
        [JsonRpcMethod.CreateWallet]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.CreateWallet](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.DeleteWallet]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.DeleteWallet](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.CreateAccount]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.CreateAccount](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.Login]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.Login](request, sendResponse);
        },
        [JsonRpcMethod.GetSession]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetSession](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.SaveAccount]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.SaveAccount](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.ImportAccount]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.ImportAccount](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.DeleteAccount]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.DeleteAccount](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.Transactions]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.Transactions](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.AccountDetails]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.AccountDetails](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.AssetDetails]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.AssetDetails](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.AssetsAPIList]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.AssetsAPIList](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.AssetsVerifiedList]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.AssetsVerifiedList](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.SignSendTransaction]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.SignSendTransaction](
            request,
            sendResponse
          );
        },
        [JsonRpcMethod.ChangeLedger]: (
          request: any,
          sendResponse: Function
        ) => {
          return InternalMethods[JsonRpcMethod.ChangeLedger](
            request,
            sendResponse
          );
        },
      },
    };
  }
}
