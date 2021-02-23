/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const algosdk = require('algosdk');

import { RequestErrors } from '@algosigner/common/types';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { API, Ledger } from './types';
import {
  getValidatedTxnWrap,
  getLedgerFromGenesisId,
  calculateEstimatedFee,
} from '../transaction/actions';
import { ValidationStatus } from '../utils/validator';
import { InternalMethods } from './internalMethods';
import { MessageApi } from './api';
import encryptionWrap from '../encryptionWrap';
import { Settings } from '../config';
import { extensionBrowser } from '@algosigner/common/chrome';
import { logging } from '@algosigner/common/logging';
import { InvalidTransactionStructure } from '../../errors/validation';
import { buildTransaction } from '../utils/transactionBuilder';
import { getSigningAccounts } from '../utils/multisig';

const popupProperties = {
  type: 'popup',
  focused: true,
  width: 400 + 12,
  height: 550 + 34,
};

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
          const res: Object = {
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
                ...popupProperties,
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
        [JsonRpcMethod.SignTransaction]: (d: any, resolve: Function, reject: Function) => {
          let transactionWrap = undefined;
          let validationError = undefined;
          try {
            transactionWrap = getValidatedTxnWrap(d.body.params, d.body.params['type']);
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
            Object.entries(transactionWrap.validityObject).forEach(([key, value]) => {
              if (value['status'] === ValidationStatus.Invalid) {
                invalidKeys.push(`${key}`);
              }
            });
            d.error = {
              message: `Validation failed for transaction because of invalid properties [${invalidKeys.join(
                ','
              )}].`,
            };
            reject(d);
          } else {
            // Get Ledger params
            const conn = Settings.getBackendParams(
              getLedgerFromGenesisId(transactionWrap.transaction.genesisID),
              API.Algod
            );
            const sendPath = '/v2/transactions/params';
            const fetchParams: any = {
              headers: {
                ...conn.headers,
              },
              method: 'GET',
            };

            let url = conn.url;
            if (conn.port.length > 0) url += ':' + conn.port;

            Task.fetchAPI(`${url}${sendPath}`, fetchParams).then((params) => {
              calculateEstimatedFee(transactionWrap, params);
              d.body.params = transactionWrap;
              console.log('T-wrap');
              console.log(transactionWrap);

              extensionBrowser.windows.create(
                {
                  url: extensionBrowser.runtime.getURL('index.html#/sign-transaction'),
                  ...popupProperties,
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
            });
          }
        },
        [JsonRpcMethod.SignMultisigTransaction]: (d: any, resolve: Function, reject: Function) => {
          // TODO: Possible support for blob transfer on previously signed transactions

          let transactionWrap = undefined;
          let validationError = undefined;
          try {
            transactionWrap = getValidatedTxnWrap(d.body.params.txn, d.body.params.txn['type']);
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
            Object.entries(transactionWrap.validityObject).forEach(([key, value]) => {
              if (value['status'] === ValidationStatus.Invalid) {
                invalidKeys.push(`${key}`);
              }
            });
            d.error = {
              message: `Validation failed for transaction because of invalid properties [${invalidKeys.join(
                ','
              )}].`,
            };
            reject(d);
          } else {
            // Get Ledger params
            const conn = Settings.getBackendParams(
              getLedgerFromGenesisId(transactionWrap.transaction.genesisID),
              API.Algod
            );
            const sendPath = '/v2/transactions/params';
            const fetchParams: any = {
              headers: {
                ...conn.headers,
              },
              method: 'GET',
            };

            let url = conn.url;
            if (conn.port.length > 0) url += ':' + conn.port;

            Task.fetchAPI(`${url}${sendPath}`, fetchParams).then((params) => {
              calculateEstimatedFee(transactionWrap, params);

              d.body.params.validityObject = transactionWrap.validityObject;
              d.body.params.txn = transactionWrap.transaction;
              d.body.params.estimatedFee = transactionWrap.estimatedFee;

              const msig_txn = { msig: d.body.params.msig, txn: d.body.params.txn };
              const session = InternalMethods.getHelperSession();
              const ledger = getLedgerFromGenesisId(transactionWrap.transaction.genesisID);
              const accounts = session.wallet[ledger];
              const multisigAccounts = getSigningAccounts(accounts, msig_txn);

              if (multisigAccounts.error) {
                d.error = multisigAccounts.error.message;
                reject(d);
              } else {
                if (multisigAccounts.accounts && multisigAccounts.accounts.length > 0) {
                  d.body.params.account = multisigAccounts.accounts[0]['address'];
                  d.body.params.name = multisigAccounts.accounts[0]['name'];
                }

                extensionBrowser.windows.create(
                  {
                    url: extensionBrowser.runtime.getURL('index.html#/sign-multisig-transaction'),
                    ...popupProperties,
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
            });
          }
        },
        // algod
        [JsonRpcMethod.SendTransaction]: (d: any, resolve: Function, reject: Function) => {
          const { params } = d.body;
          const conn = Settings.getBackendParams(params.ledger, API.Algod);
          const sendPath = '/v2/transactions';
          const fetchParams: any = {
            headers: {
              ...conn.headers,
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
        [JsonRpcMethod.Algod]: (d: any, resolve: Function, reject: Function) => {
          const { params } = d.body;
          const conn = Settings.getBackendParams(params.ledger, API.Algod);

          const contentType = params.contentType ? params.contentType : '';

          const fetchParams: any = {
            headers: {
              ...conn.headers,
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
        [JsonRpcMethod.Indexer]: (d: any, resolve: Function, reject: Function) => {
          const { params } = d.body;
          const conn = Settings.getBackendParams(params.ledger, API.Indexer);

          const contentType = params.contentType ? params.contentType : '';

          const fetchParams: any = {
            headers: {
              ...conn.headers,
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
        /* eslint-disable-next-line no-unused-vars */
        [JsonRpcMethod.Accounts]: (d: any, resolve: Function, reject: Function) => {
          const session = InternalMethods.getHelperSession();
          // If we don't have a ledger requested, respond with an error giving available ledgers
          if (!d.body.params.ledger) {
            const baseNetworks = Object.keys(Ledger);
            const injectedNetworks = Settings.getCleansedInjectedNetworks();
            d.error = {
              message: `Ledger not provided. Please use a base ledger: [${baseNetworks}] or an available custom one ${JSON.stringify(
                injectedNetworks
              )}.`,
            };
            reject(d);
            return;
          }

          const accounts = session.wallet[d.body.params.ledger];
          // If we have requested a ledger but don't have it, respond with an error
          if (accounts === undefined) {
            d.error = {
              message: RequestErrors.UnsupportedLedger,
            };
            reject(d);
            return;
          }

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

          const ledger = getLedgerFromGenesisId(genesisID);

          const context = new encryptionWrap(passphrase);
          context.unlock(async (unlockedValue: any) => {
            if ('error' in unlockedValue) {
              sendResponse(unlockedValue);
              return false;
            }

            extensionBrowser.windows.remove(auth.window_id);

            let account;

            if (unlockedValue[ledger] === undefined) {
              message.error = RequestErrors.UnsupportedLedger;
              MessageApi.send(message);
            }
            // Find address to send algos from
            for (let i = unlockedValue[ledger].length - 1; i >= 0; i--) {
              if (unlockedValue[ledger][i].address === from) {
                account = unlockedValue[ledger][i];
                break;
              }
            }

            const recoveredAccount = algosdk.mnemonicToSecretKey(account.mnemonic);

            const txn = { ...message.body.params.transaction };

            Object.keys({ ...message.body.params.transaction }).forEach((key) => {
              if (txn[key] === undefined || txn[key] === null) {
                delete txn[key];
              }
            });

            // Modify base64 encoded fields
            if ('note' in txn && txn.note !== undefined) {
              txn.note = new Uint8Array(Buffer.from(txn.note));
            }
            // Application transactions only
            if (txn && txn.type == 'appl') {
              if ('appApprovalProgram' in txn) {
                try {
                  txn.appApprovalProgram = Uint8Array.from(
                    Buffer.from(txn.appApprovalProgram, 'base64')
                  );
                } catch {
                  message.error =
                    'Error trying to parse appApprovalProgram into a Uint8Array value.';
                }
              }
              if ('appClearProgram' in txn) {
                try {
                  txn.appClearProgram = Uint8Array.from(Buffer.from(txn.appClearProgram, 'base64'));
                } catch {
                  message.error = 'Error trying to parse appClearProgram into a Uint8Array value.';
                }
              }
              if ('appArgs' in txn) {
                try {
                  const tempArgs = [];
                  txn.appArgs.forEach((element) => {
                    logging.log(element);
                    tempArgs.push(Uint8Array.from(Buffer.from(element, 'base64')));
                  });
                  txn.appArgs = tempArgs;
                } catch {
                  message.error = 'Error trying to parse appArgs into Uint8Array values.';
                }
              }
            }

            try {
              // This step transitions a raw object into a transaction style object
              const builtTx = buildTransaction(txn);
              // We are combining the tx id get and sign into one step/object because of legacy,
              // this may not need to be the case any longer.
              const signedTxn = {
                txID: builtTx.txID().toString(),
                blob: builtTx.signTxn(recoveredAccount.sk),
              };
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
        // sign-allow-multisig
        [JsonRpcMethod.SignAllowMultisig]: (request: any, sendResponse: Function) => {
          const { passphrase, responseOriginTabID } = request.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          // Map the full multisig transaction here
          const msig_txn = { msig: message.body.params.msig, txn: message.body.params.txn };

          // Use MainNet if specified - default to TestNet
          const ledger = getLedgerFromGenesisId(msig_txn.txn.genesisID);

          // Create an encryption wrap to get the needed signing account information
          const context = new encryptionWrap(passphrase);
          context.unlock(async (unlockedValue: any) => {
            if ('error' in unlockedValue) {
              sendResponse(unlockedValue);
              return false;
            }

            extensionBrowser.windows.remove(auth.window_id);

            // Verify this is a multisig sign occurs in the getSigningAccounts
            // This get may receive a .error in return if an appropriate account is not found
            let account;
            const multisigAccounts = getSigningAccounts(unlockedValue[ledger], msig_txn);
            if (multisigAccounts.error) {
              message.error = multisigAccounts.error.message;
            } else {
              // TODO: Currently we are grabbing the first non-signed account. This may change.
              account = multisigAccounts.accounts[0];
            }

            if (account) {
              // We can now use the found account match to get the sign key
              const recoveredAccount = algosdk.mnemonicToSecretKey(account.mnemonic);

              // Use the received txn component of the transaction, but remove undefined and null values
              Object.keys({ ...msig_txn.txn }).forEach((key) => {
                if (msig_txn.txn[key] === undefined || msig_txn.txn[key] === null) {
                  delete msig_txn.txn[key];
                }
              });

              // Modify base64 encoded fields
              if ('note' in msig_txn.txn && msig_txn.txn.note !== undefined) {
                msig_txn.txn.note = new Uint8Array(Buffer.from(msig_txn.txn.note));
              }
              // Application transactions only
              if (msig_txn.txn && msig_txn.txn.type == 'appl') {
                if ('appApprovalProgram' in msig_txn.txn) {
                  try {
                    msig_txn.txn.appApprovalProgram = Uint8Array.from(
                      Buffer.from(msig_txn.txn.appApprovalProgram, 'base64')
                    );
                  } catch {
                    message.error =
                      'Error trying to parse appApprovalProgram into a Uint8Array value.';
                  }
                }
                if ('appClearProgram' in msig_txn.txn) {
                  try {
                    msig_txn.txn.appClearProgram = Uint8Array.from(
                      Buffer.from(msig_txn.txn.appClearProgram, 'base64')
                    );
                  } catch {
                    message.error =
                      'Error trying to parse appClearProgram into a Uint8Array value.';
                  }
                }
                if ('appArgs' in msig_txn.txn) {
                  try {
                    const tempArgs = [];
                    msig_txn.txn.appArgs.forEach((element) => {
                      tempArgs.push(Uint8Array.from(Buffer.from(element, 'base64')));
                    });
                    msig_txn.txn.appArgs = tempArgs;
                  } catch {
                    message.error = 'Error trying to parse appArgs into Uint8Array values.';
                  }
                }
              }

              try {
                // This step transitions a raw object into a transaction style object
                const builtTx = buildTransaction(msig_txn.txn);

                // Building preimg - This allows the pks to be passed, but still use the default multisig sign with addrs
                const version = msig_txn.msig.v || msig_txn.msig.version;
                const threshold = msig_txn.msig.thr || msig_txn.msig.threshold;
                const addrs =
                  msig_txn.msig.addrs ||
                  msig_txn.msig.subsig.map((subsig) => {
                    return subsig.pk;
                  });
                const preimg = {
                  version: version,
                  threshold: threshold,
                  addrs: addrs,
                };

                let signedTxn;
                const appendEnabled = false; // TODO: This disables append functionality until blob objects are allowed and validated.
                // Check for existing signatures. Append if there are any.
                if (appendEnabled && msig_txn.msig.subsig.some((subsig) => subsig.s)) {
                  // TODO: This should use a sent multisig blob if provided. This is a future enhancement as validation doesn't allow it currently.
                  // It is subject to change and is built as scaffolding for future functionality.
                  const encodedBlob = message.body.params.txn;
                  const decodedBlob = Buffer.from(encodedBlob, 'base64');
                  signedTxn = algosdk.appendSignMultisigTransaction(
                    decodedBlob,
                    preimg,
                    recoveredAccount.sk
                  );
                } else {
                  // If this is the first signature then do a normal sign
                  signedTxn = algosdk.signMultisigTransaction(builtTx, preimg, recoveredAccount.sk);
                }

                // Converting the blob to an encoded string for transfer back to dApp
                const b64Obj = Buffer.from(signedTxn.blob).toString('base64');

                message.response = {
                  txID: signedTxn.txID,
                  blob: b64Obj,
                };
              } catch (e) {
                message.error = e.message;
              }
            }
            // Clean class saved request
            delete Task.requests[responseOriginTabID];
            MessageApi.send(message);
          });
          return true;
        },
        /* eslint-disable-next-line no-unused-vars */
        [JsonRpcMethod.SignDeny]: (request: any, sendResponse: Function) => {
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
        [JsonRpcMethod.CreateWallet]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.CreateWallet](request, sendResponse);
        },
        [JsonRpcMethod.DeleteWallet]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.DeleteWallet](request, sendResponse);
        },
        [JsonRpcMethod.CreateAccount]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.CreateAccount](request, sendResponse);
        },
        [JsonRpcMethod.Login]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.Login](request, sendResponse);
        },
        [JsonRpcMethod.Logout]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.Logout](request, sendResponse);
        },
        [JsonRpcMethod.GetSession]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetSession](request, sendResponse);
        },
        [JsonRpcMethod.SaveAccount]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.SaveAccount](request, sendResponse);
        },
        [JsonRpcMethod.ImportAccount]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.ImportAccount](request, sendResponse);
        },
        [JsonRpcMethod.DeleteAccount]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.DeleteAccount](request, sendResponse);
        },
        [JsonRpcMethod.Transactions]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.Transactions](request, sendResponse);
        },
        [JsonRpcMethod.AccountDetails]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.AccountDetails](request, sendResponse);
        },
        [JsonRpcMethod.AssetDetails]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.AssetDetails](request, sendResponse);
        },
        [JsonRpcMethod.AssetsAPIList]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.AssetsAPIList](request, sendResponse);
        },
        [JsonRpcMethod.AssetsVerifiedList]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.AssetsVerifiedList](request, sendResponse);
        },
        [JsonRpcMethod.SignSendTransaction]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.SignSendTransaction](request, sendResponse);
        },
        [JsonRpcMethod.ChangeLedger]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.ChangeLedger](request, sendResponse);
        },
        [JsonRpcMethod.SaveNetwork]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.SaveNetwork](request, sendResponse);
        },
        [JsonRpcMethod.DeleteNetwork]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.DeleteNetwork](request, sendResponse);
        },
        [JsonRpcMethod.GetLedgers]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetLedgers](request, sendResponse);
        },
      },
    };
  }
}
